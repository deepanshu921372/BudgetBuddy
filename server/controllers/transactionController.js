const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate, sort = '-date' } = req.query;
    const query = { userId: req.user.id };

    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query)
      .sort(sort)
      .lean();

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get a single transaction
// @route   GET /api/transactions/:id
// @access  Private
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    // Check if user owns the transaction
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to access this transaction' });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;

    // Validate category exists
    const categoryExists = await Category.findOne({
      userId: req.user.id,
      name: category,
      type
    });

    if (!categoryExists) {
      // Create new category if it doesn't exist
      await Category.create({
        userId: req.user.id,
        name: category,
        type
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      type,
      amount,
      description,
      category,
      date: date || new Date()
    });

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { description, amount, type, category, date, notes } = req.body;

    // Find transaction by id
    let transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    // Check if user owns the transaction
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to update this transaction' });
    }

    // Build update object
    const updateFields = {};
    if (description) updateFields.description = description;
    if (amount) updateFields.amount = amount;
    if (type) updateFields.type = type;
    if (category) updateFields.category = category;
    if (date) updateFields.date = date;
    if (notes !== undefined) updateFields.notes = notes;

    // Update transaction
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    // Use deleteOne instead of remove which is deprecated
    await Transaction.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get transaction summary (total income, expenses, balance)
// @route   GET /api/transactions/summary
// @access  Private
exports.getTransactionSummary = async (req, res) => {
  try {
    // Add query parameters for filtering
    const query = { userId: req.user.id };

    // Add date range filtering if provided
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Group transactions by type and calculate totals
    const summary = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Format summary data
    let income = 0;
    let expenses = 0;

    summary.forEach(item => {
      if (item._id === 'income') {
        income = item.total;
      } else if (item._id === 'expense') {
        expenses = item.total;
      }
    });

    const balance = income - expenses;

    res.json({ income, expenses, balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get transactions by category
// @route   GET /api/transactions/categories
// @access  Private
exports.getTransactionsByCategory = async (req, res) => {
  try {
    // Add query parameters for filtering
    const query = { userId: req.user.id };

    // Add type filtering (default to expense)
    query.type = req.query.type || 'expense';

    // Add date range filtering if provided
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Group transactions by category and calculate totals
    const categories = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Format category data
    const formattedCategories = categories.map(category => ({
      category: category._id,
      amount: category.total,
      count: category.count
    }));

    res.json(formattedCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get transaction analytics
// @route   GET /api/transactions/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user.id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Get total income and expenses
    const totals = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Get category-wise breakdown
    const categoryBreakdown = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: { type: '$type', category: '$category' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          categories: {
            $push: {
              name: '$_id.category',
              total: '$total',
              count: '$count'
            }
          }
        }
      }
    ]);

    // Get monthly trends
    const monthlyTrends = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totals,
        categoryBreakdown,
        monthlyTrends
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};