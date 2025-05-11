const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
  getTransactionsByCategory
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Get transaction summary
router.get('/summary', getTransactionSummary);

// Get transactions by category
router.get('/categories', getTransactionsByCategory);

// Get all transactions & Add a transaction
router
  .route('/')
  .get(getTransactions)
  .post(
    [
      check('description', 'Description is required').not().isEmpty(),
      check('amount', 'Amount is required').isNumeric(),
      check('type', 'Type must be either income or expense').isIn(['income', 'expense']),
      check('category', 'Category is required').not().isEmpty()
    ],
    addTransaction
  );

// Get, update, or delete a transaction
router
  .route('/:id')
  .get(getTransaction)
  .put(
    [
      check('description', 'Description is required').optional(),
      check('amount', 'Amount must be a number').optional().isNumeric(),
      check('type', 'Type must be either income or expense').optional().isIn(['income', 'expense']),
      check('category', 'Category is required').optional()
    ],
    updateTransaction
  )
  .delete(deleteTransaction);

module.exports = router;