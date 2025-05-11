const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1];
    } 
    // Set token from x-auth-token header
    else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }
    // Set token from cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');

      // Add user to request
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          error: 'User no longer exists'
        });
      }

      next();
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid authentication token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};