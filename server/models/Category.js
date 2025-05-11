const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  icon: {
    type: String,
    default: 'default-icon' // Default icon identifier
  },
  color: {
    type: String,
    default: '#6366F1' // Default violet color
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for unique categories per user
categorySchema.index({ userId: 1, name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema); 