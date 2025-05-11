const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    protect,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      location,
      about,
      preferences
    } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Build user profile object
      const userFields = {
        name,
        email,
        phone: phone || user.phone,
        location: location || user.location,
        about: about || user.about,
        preferences: {
          emailNotifications: preferences?.emailNotifications ?? user.preferences?.emailNotifications ?? true,
          monthlyReport: preferences?.monthlyReport ?? user.preferences?.monthlyReport ?? true
        }
      };

      // Update user
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      ).select('-password');

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router; 