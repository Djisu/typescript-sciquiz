const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
//const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// // @route  POST api/profile
// // @desc   Test route
// // @access Public
// router.get('/', (req, res) => res.send('profile route'))

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/profile
// @desc   Create or update a user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('status', 'Status is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('bio', 'bio is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('in profile post/put');

    const { user, school, status, name } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (school) profileFields.school = school;
    if (status) profileFields.status = status;
    if (name) profileFields.name = name;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);

      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/profile
// @desc   GET all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find(); //.populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/user/:user_id
// @desc   GET profile by user ID
// @access Public
router.get('/user/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id
    }); //.populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/:status
// @desc   GET profile by status
// @access Public
router.get('/:status', async (req, res) => {
  console.log('in profile by status', req.params.status);

  console.log('req==', req);

  try {
    // const user = await User.findById(req.user.id).select('-password')

    const profile = await Profile.find({
      status: { $eq: req.params.status }
    });

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    // console.log('profile===', profile)

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/profile/:id
// @desc   Delete profile, user & posts
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;