const { check } = require('express-validator');

// Transaction validation
exports.validateTransaction = [
  check('description', 'Description is required').not().isEmpty().trim(),
  check('amount', 'Amount is required and must be a number').isNumeric(),
  check('type', 'Type must be either income or expense').isIn(['income', 'expense']),
  check('category', 'Category is required').not().isEmpty().trim(),
];

// User registration validation
exports.validateRegistration = [
  check('name', 'Name is required').not().isEmpty().trim(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

// User login validation
exports.validateLogin = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
];

// Password update validation
exports.validatePasswordUpdate = [
  check('currentPassword', 'Current password is required').exists(),
  check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

// Profile update validation
exports.validateProfileUpdate = [
  check('name', 'Name is required if provided').optional().not().isEmpty().trim(),
  check('email', 'Please include a valid email if provided').optional().isEmail().normalizeEmail(),
];