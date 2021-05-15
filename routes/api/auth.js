const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const refreshTokens = [];

// @route     GET api/auth
// @desc      Test route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route     POST api/auth
// @desc      Authenicate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // return jwt

      const payload = {
        user: {
          id: user._id,
        },
      };

      const accessToken = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "20s",
      });
      const refreshToken = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "1d",
      });

      refreshTokens.push(refreshToken);

      return res.json({ token: accessToken, refreshToken });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/refreshAccessToken", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(403).json({ msg: "user not authenticated2" });
  }

  const decoded = jwt.verify(refreshToken, config.get("jwtSecret"));

  req.user = decoded.user;

  const payload = {
    user: {
      id: decoded.user.id,
    },
  };
  const accessToken = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: "20s",
  });

  return res.status(201).json({ accessToken });
});
module.exports = router;
