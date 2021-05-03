const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Post = require("../../models/Posts");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route     GET api/my-profile/me
// @desc      Get current users my-profile
// @access   Private
// http://localhost:5000/api/profile/me
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no my-profile for this user" });
    }

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route     POST api/my-profile
// @desc      Create or update user my-profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // build my-profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      if (Array.isArray(skills)) {
        profileFields.skills = skills;
      } else {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
      }
    }

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // create
      profile = new Profile(profileFields);
      await profile.save();

      return res.json(profile);
    } catch (e) {
      res.status(500).send("Server error");
    }
  }
);

// @route     GET api/my-profile
// @desc      Get all profiles
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    // const getMyProfile = await Profile.findOne({ user: req.user.id });
    const allUsers = await User.find();

    // get all users that are not in my connection list
    // TODO

    // console.log(getMyProfile.toString());

    const filteredProfiles = profiles.filter((profile) => {
      return profile.user._id.toString() !== req.user.id.toString();
    });

    return res.json(filteredProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route     GET api/my-profile/user/:user_id
// @desc      Get my-profile by user ID
// @access   Private
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no my-profile for this user" });
    }

    return await res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "There is no my-profile for this user" });
    }
    res.status(500).send("Server error");
  }
});

// @route     DELETE api/my-profile/user/:user_id
// @desc      DELETE my-profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // remove my-profile & posts
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove userp
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route     PUT api/my-profile/exierience
// @desc      Add my-profile experience
// @access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      } = req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route     DELETE api/my-profile/exierience
// @desc      DELETE my-profile experience
// @access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: "server error" });
  }
});

// @route     PUT api/my-profile/education
// @desc      Add my-profile education
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "Scool is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      } = req.body;

      const newEduc = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEduc);

        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route     DELETE api/my-profile/education
// @desc      DELETE my-profile education
// @access   Private
router.delete("/education/:educ_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.educ_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: "server error" });
  }
});

// @route     GET api/my-profile/github/:username
// @desc      GET my-profile github username
// @access   Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error();
      }
      if (response.statusCode !== 200) {
        return res.status(404), json({ msg: "No github my-profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "server error" });
  }
});

module.exports = router;
