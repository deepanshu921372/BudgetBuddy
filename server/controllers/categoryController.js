const Category = require('../models/Category');

// @desc    Get all categories for a user
// @route   GET /api/categories
// @access  Private
exports.getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const query = { userId: req.user.id };

    if (type) query.type = type;

    const categories = await Category.find(query).sort('name').lean();

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add new category
// @route   POST /api/categories
// @access  Private
exports.addCategory = async (req, res) => {
  try {
    const { name, type, icon, color } = req.body;

    // Check if category already exists for this user
    const existingCategory = await Category.findOne({
      userId: req.user.id,
      name: name.trim(),
      type
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'Category already exists'
      });
    }

    const category = await Category.create({
      userId: req.user.id,
      name: name.trim(),
      type,
      icon,
      color
    });

    res.status(201).json({
      success: true,
      data: category
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

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Don't allow updating default categories
    if (category.isDefault) {
      return res.status(400).json({
        success: false,
        error: 'Cannot modify default categories'
      });
    }

    // Check if new name conflicts with existing category
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        userId: req.user.id,
        name: name.trim(),
        type: category.type,
        _id: { $ne: category._id }
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          error: 'Category name already exists'
        });
      }
    }

    category.name = name || category.name;
    category.icon = icon || category.icon;
    category.color = color || category.color;

    await category.save();

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Don't allow deleting default categories
    if (category.isDefault) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete default categories'
      });
    }

    await category.remove();

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