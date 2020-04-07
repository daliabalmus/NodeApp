const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();

const auth = require('../../middleware/auth');
const profile = require('../../models/Profile');
const user = require('../../models/User');
const {check, validationResult} = require('express-validator');

// @route     GET api/profile/me
// @desc      Get current users profile
// @access   Private
// http://localhost:5000/api/profile/me
router.get('/me', auth, async (req, res) => {
        try {
                const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

                if (!profile) {
                        return res.status(400).json({msg: 'There is no profile for this user'})
                }

                res.json(profile);
        } catch (e) {
                console.error(e.message)
                res.status(500).send('Server error')
;        }
});

// @route     POST api/profile
// @desc      Create or update user profile
// @access   Private
router.post('/', [auth, [
                check('status', 'Status is required').not().isEmpty(),
                check('skills', 'Skills is required').not().isEmpty()
        ]
], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json(errors);
        }

        const {
                        company, website, location, bio, status, githubusername, skills, youtube,facebook, twitter, instagram, linkedin
                } = req.body;

        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
                profileFields.skills = skills.split(",").map(skill => skill.trim());
        }

        // build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
                let profile = await Profile.findOne({user: req.user.id});

                if (profile) {
                        // update
                        profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
                        return res.json(profile);
                }

                // create
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile);
        } catch (e) {
                console.error(e.message);
                res.status(500).send('Server error');
        }
        console.log(profileFields);
        res.send('Hello');
});

// @route     GET api/profile
// @desc      Get all profiles
// @access   Private
router.get("/",async (req, res) => {
        try {
                const profiles = await Profile.find().populate('user', ['name', 'avatar']);
                res.json(profiles);
        } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
        }
})

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user ID
// @access   Private
router.get("/user/:user_id", async (req, res) => {
        try {
                const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);

                if(!profile) {
                        return res.status(400).json({msg: "There is no profile for this user"});
                }

                res.json(profile);
        } catch (err) {
                console.error(err.message);
                if (err.kind == 'ObjectId') {
                        return res.status(400).json({msg: "There is no profile for this user"});
                }
                res.status(500).send('Server error');
        }
});

// @route     DELETE api/profile/user/:user_id
// @desc      DELETE profile, user & posts
// @access   Private
router.delete("/",auth,async (req, res) => {
        try {
                // remove profile
                //TODO - remove users posts
                await Profile.findOneAndRemove({user: req.user.id});
                // remove user
                await User.findOneAndRemove({_id:  req.user.id});
                res.json({msg: 'User deleted'});
        } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
        }
})

// @route     PUT api/profile/exierience
// @desc      Add profile experience
// @access   Private
router.put('/experience', [auth, [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json(errors);
                }

                const {
                        title, company, location, from, to, current, description
                } = req.body;

                const newExp = {
                        title,
                        company,
                        location, from, to, current, description
                };

                try {
                        const profile = await Profile.findOne({user: req.user.id});
                        profile.experience.unshift(newExp);

                       await profile.save();
                       res.json(profile);
                } catch (err) {
                        console.error(err.message);
                        res.status(500).send('Server error');
                }
        } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
        }
})

// @route     DELETE api/profile/exierience
// @desc      DELETE profile experience
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
     try {
                const profile = await Profile.findOne({user: req.user.id});

                // get remove index

                const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

                profile.experience.splice(removeIndex, 1);

                await profile.save();

                res.json(profile);
     } catch (err) {
             console.error(err.message);
             res.status(400).send({msg : 'server error'});
     }
});

// @route     PUT api/profile/education
// @desc      Add profile education
// @access   Private
router.put('/education', [auth, [
        check('school', 'Scool is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json(errors);
                }

                const {
                        school, degree, fieldofstudy, from, to, current, description
                } = req.body;

                const newEduc = {
                        school,
                        degree,
                        fieldofstudy,
                        from, to, current, description
                };

                try {
                        const profile = await Profile.findOne({user: req.user.id});
                        profile.education.unshift(newEduc);

                        await profile.save();
                        res.json(profile);
                } catch (err) {
                        console.error(err.message);
                        res.status(500).send('Server error');
                }
        } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
        }
})

// @route     DELETE api/profile/education
// @desc      DELETE profile education
// @access   Private
router.delete('/education/:educ_id', auth, async (req, res) => {
        try {
                const profile = await Profile.findOne({user: req.user.id});

                // get remove index

                const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.educ_id);

                profile.education.splice(removeIndex, 1);

                await profile.save();

                res.json(profile);
        } catch (err) {
                console.error(err.message);
                res.status(400).send({msg : 'server error'});
        }
});

// @route     GET api/profile/github/:username
// @desc      GET profile github username
// @access   Public
        router.get("/github/:username", async (req, res) => {
        try {
                const options = {
                        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
                        method: 'GET',
                        headers: {'user-agent': 'node.js'}
                }
                request(options, (error, response, body) => {
                        if (error) {
                                console.error();
                        }
                        if (response.statusCode !== 200) {
                                return res.status(404),json({msg: 'No github profile found'});
                        }

                        res.json(JSON.parse(body));
                })
        } catch (err) {
                console.error(err.message);
                res.status(500).send({msg : 'server error'});
        }
})

module.exports = router;