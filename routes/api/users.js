
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config= require('config');
const auth = require('../../middleware/auth');
const {check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route     POST api/users
// @desc      Register user
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more  characters').isLength({min: 6})
    ],
   async (req, res) => {
       const errors = validationResult(req);
       
       if (!errors.isEmpty()) {
              return res.status(400).json( errors);
       }
       
       const {name, email, password} = req.body;
       
       try {
              // see if user exists
              let user = await User.findOne({ email });
              if (user) {
                     return res.status(400).json({errors: [{msg: 'User already exists'}]});
              }
       
              // get users gravatar
              const avatar = gravatar.url(email, {
                     s: '200',
                     r: 'pg',
                     d: 'mm'
              })
              
              user = new User({
                     name,
                     email,
                     avatar,
                     password
              });
              //encrypt password
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(password, salt);
              
              await user.save();
              // return jwt
              
              const payload = {
                     user: {
                            id: user.id
                     }
              };
              jwt.sign(payload, config.get("jwtSecret"),
                  {expiresIn: 360000},
                  (err,token) => {
                     if (err) throw err;
                    res.json({ token });
                  }
              );

       } catch (e) {
              console.error(e.message);
              res.status(500).send('Server error');
       }
});

// @route     POST api/users/connectionRequest/:id
// @desc      Add connections
// @access   Private
router.put("/connectionRequest/:id", auth, async (req, res) => {
        try {
                let sender = await User.findOne({_id: req.user.id});
                let receiver = await User.findOne({_id: req.params.id});

                try {

                        if (receiver.connectionRequests.length > 0) {
                                receiver.connectionRequests.map(connectionRequests => {
                                        if (connectionRequests === req.user.id)  {
                                                return res.status(400).json({errors: [{msg: 'User already exists in your connection list!'}]});
                                        } else {
                                                receiver.connectionRequests.push(req.user.id);
                                        }
                                });
                        } else {
                                receiver.connectionRequests.push(req.user.id);
                        }
                        await receiver.save();

                        if (sender.sentInvitations.length > 0) {
                                sender.sentInvitations.map(connectionRequests => {
                                        if (connectionRequests === req.params.id)  {
                                                return res.status(400).json({errors: [{msg: 'User already exists in your connection list!'}]});
                                        } else {
                                                sender.sentInvitations.push(req.params.id);
                                        }
                                });
                        } else {
                                sender.sentInvitations.push(req.params.id);
                        }
                        await sender.save();

                        return res.json(receiver);

                } catch (e) {
                        console.error(e.message);
                        res.status(500).send('Server error');
                }

        } catch (e) {
                console.error(e.message)
                return res.status(500).send(e.message);
        }
});
// @route     GET api/users/connectionRequests
// @desc      Get all users connection requests
// @access   Public
router.get("/connectionRequests", auth, async (req, res) => {

        try {
                const user = await User.findOne({_id: req.user.id});

                return res.json(user.connectionRequests);
        } catch (err) {
                console.error(err.message)
                return res.status(500).send('Server error');
        }

});

router.get("/sentInvitations", auth, async (req, res) => {

        try {
                const user = await User.findOne({_id: req.user.id});

                return res.json(user.sentInvitations);
        } catch (err) {
                console.error(err.message)
                return res.status(500).send('Server error');
        }

});


// @route     GET api/users/deleteConnectionRequests/:id
// @desc      Delete a connection request
// @access   Public
router.delete("/deleteConnectionRequests/:id", auth, async (req, res) => {

        try {
                const sender = await User.findOne({_id: req.user.id});
                const receiver = await User.findOne({_id: req.params._id});

                receiver.connectionRequests.map(request => {
                     if (request === req.params._id) {
                             receiver.connectionRequests.remove(request);
                     }
                });

                sender.sentInvitations(invitation => {
                        if (invitation === req.params._id) {
                                sender.connectionRequests.remove(invitation);
                        }
                });

                await sender.save();
                await receiver.save();

                return res.json({msg: 'Request deleted'});
        } catch (err) {
                console.error(err.message)
                return res.status(500).send('Server error');
        }

});



// @route     GET api/users/connections
// @desc      Get all connections from user
// @access   Public
router.get("/:id/connections", auth, async (req, res) => {

        try {
                const user = await User.findOne({_id: req.params._id});

                return res.json(user.connections);
        } catch (err) {
                console.error(err.message)
                return res.status(500).send('Server error');
        }

});

// @route     GET api/users/deleteConnection
// @desc      Delete a connection request
// @access   Public
router.delete("/deleteConnection/:id", auth, async (req, res) => {

        try {
                const sender = await User.findOne({_id: req.user.id});
                const receiver = await User.findOne({_id: req.params._id});

                receiver.connections.map(request => {
                        if (request === req.params._id) {
                                receiver.connections.remove(request);
                        }
                });

                sender.connections(invitation => {
                        if (invitation === req.params._id) {
                                sender.connections.remove(invitation);
                        }
                });

                await sender.save();
                await receiver.save();

                return res.json({msg: 'Request deleted'});
        } catch (err) {
                console.error(err.message)
                return res.status(500).send('Server error');
        }

});


module.exports = router;