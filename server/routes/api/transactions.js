const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { 
  getTransactions, 
  addTransaction, 
  deleteTransaction,
  getAnalytics 
} = require('../../controllers/transactionController');

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', protect, getTransactions);

// @route   POST /api/transactions
// @desc    Add transaction
// @access  Private
router.post('/', protect, addTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', protect, deleteTransaction);

// @route   GET /api/transactions/analytics
// @desc    Get transaction analytics
// @access  Private
router.get('/analytics', protect, getAnalytics);

module.exports = router; 