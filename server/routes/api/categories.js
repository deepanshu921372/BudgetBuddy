const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../../controllers/categoryController');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Private
router.get('/', protect, getCategories);

// @route   POST /api/categories
// @desc    Add category
// @access  Private
router.post('/', protect, addCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private
router.put('/:id', protect, updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private
router.delete('/:id', protect, deleteCategory);

module.exports = router; 