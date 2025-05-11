const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  register,
  login,
  getUser,
  updateProfile,
  setInitialPassword,
  checkPassword,
  logout,
  handleFirebaseAuth,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  register
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

// Get current user
router.get('/user', protect, getUser);

// Update profile
router.put(
  '/profile',
  protect,
  [
    check('name', 'Name is required').optional(),
    check('email', 'Please include a valid email').optional().isEmail()
  ],
  updateProfile
);

// Logout user
router.get('/logout', logout);

// Firebase authentication route
router.post('/firebase', handleFirebaseAuth);

// Get current user route
router.get('/me', protect, getMe);

// Check if user has password set
router.get('/has-password', protect, checkPassword);

// Set initial password
router.put(
  '/set-password',
  protect,
  [
    check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  setInitialPassword
);

module.exports = router;