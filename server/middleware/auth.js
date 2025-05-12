const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    // 1. Extract token from various possible sources
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized - authentication token required'
      });
    }

    // 3. Verify JWT secret exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET environment variable is not set!');
      return res.status(500).json({ 
        success: false, 
        error: 'Server configuration error'
      });
    }

    // 4. Verify token
    try {
      const decoded = jwt.verify(token, secret);
      
      // 5. Find user from token
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: 'User associated with this token no longer exists'
        });
      }
      
      // 6. Attach user to request object
      req.user = user;
      next();
      
    } catch (err) {
      console.error('Token verification error:', err.message);
      
      // Provide more specific error messages based on error type
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid authentication token'
        });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication token expired'
        });
      } else {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication failed'
        });
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};