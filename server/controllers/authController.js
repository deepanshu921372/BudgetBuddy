const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/user
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email } = req.body;

    // Check if email exists for another user
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ success: false, error: 'Email already in use' });
      }
    }

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array(),
        error: 'Validation failed' 
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both current and new password'
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user has a password
    if (!user.password) {
      return res.status(400).json({
        success: false,
        error: 'No password set for this account. Please set up a password first.'
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    console.log('Password verification result:', { userId: user._id, isMatch });

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Check if new password is same as old password
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        error: 'New password must be different from current password'
      });
    }

    try {
      // Update password
      user.password = newPassword;
      await user.save();
      console.log('Password updated in database for user:', user._id);

      // Generate new token
      const token = user.getSignedJwtToken();

      // Remove password from response
      user.password = undefined;

      res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        token,
        user
      });
    } catch (saveError) {
      console.error('Error saving new password:', saveError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save new password'
      });
    }
  } catch (err) {
    console.error('Password update error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while updating password'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.json({ success: true, data: {} });
};

// @desc    Register or login user with Firebase credentials
// @route   POST /api/auth/firebase
// @access  Public
exports.handleFirebaseAuth = async (req, res) => {
  try {
    const { name, email, firebaseUid, provider, token } = req.body;

    if (!email || !firebaseUid) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and Firebase UID'
      });
    }

    // Check if user exists
    let user = await User.findOne({ 
      $or: [
        { email },
        { firebaseUid }
      ]
    });

    if (user) {
      // Update existing user
      user.firebaseUid = firebaseUid;
      user.provider = provider;
      user.lastLogin = Date.now();
      if (name && (!user.name || user.name === user.email.split('@')[0])) {
        user.name = name;
      }
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        firebaseUid,
        provider,
        password: Math.random().toString(36).slice(-8) // Random password for non-local auth
      });
    }

    // Create token
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    // Return response
    res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Firebase Auth Error:', error);
    res.status(500).json({
      success: false,
      error: 'Error processing Firebase authentication'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Check if user has password set
// @route   GET /api/auth/has-password
// @access  Private
exports.checkPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    
    res.status(200).json({
      success: true,
      hasPassword: !!user.password && user.provider === 'password'
    });
  } catch (error) {
    console.error('Check password error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Set initial password
// @route   PUT /api/auth/set-password
// @access  Private
exports.setInitialPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array(),
        error: 'Validation failed' 
      });
    }

    const { newPassword } = req.body;

    // Get user
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if password is already set
    if (user.password && user.provider === 'password') {
      return res.status(400).json({
        success: false,
        error: 'Password is already set. Use password update instead.'
      });
    }

    // Set password and update provider
    user.password = newPassword;
    user.provider = 'password';
    await user.save();

    // Generate new token
    const token = user.getSignedJwtToken();

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Password set successfully',
      token,
      user
    });
  } catch (err) {
    console.error('Set password error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while setting password'
    });
  }
};

// @desc    Verify current password
// @route   POST /api/auth/verify-password
// @access  Private
exports.verifyPassword = async (req, res) => {
  try {
    const { currentPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide current password'
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user has a password
    if (!user.password) {
      return res.status(400).json({
        success: false,
        error: 'No password set for this account'
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    console.log('Password verification result:', { userId: user._id, isMatch });

    return res.status(200).json({
      success: isMatch,
      message: isMatch ? 'Password verified successfully' : 'Current password is incorrect'
    });

  } catch (err) {
    console.error('Password verification error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server error while verifying password'
    });
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};