const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide campaign title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide campaign description'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Health', 'Education', 'Food & Nutrition', 'Environment', 'Animals', 'Community', 'Other']
  },
  goal: {
    type: Number,
    required: [true, 'Please set funding goal'],
    min: [1000, 'Goal must be at least ₹1,000']
  },
  collected: {
    type: Number,
    default: 0,
    min: [0, 'Collected amount cannot be negative']
  },
  image: {
    type: String,
    default: ''
  },
  documents: [{
    type: String
  }],
  duration: {
    type: Number,
    required: [true, 'Please specify campaign duration'],
    min: [1, 'Duration must be at least 1 day']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'expired', 'pending'],
    default: 'active'
  },
  creatorName: {
    type: String,
    default: 'Anonymous'
  },
  creatorEmail: {
    type: String,
    default: ''
  },
  donorCount: {
    type: Number,
    default: 0
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for progress percentage
campaignSchema.virtual('progressPercentage').get(function() {
  return Math.min(Math.round((this.collected / this.goal) * 100), 100);
});

// Virtual for days remaining
campaignSchema.virtual('daysRemaining').get(function() {
  const now = new Date();
  const end = new Date(this.endDate);
  const diff = end - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Ensure virtuals are included in JSON
campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

// Index for faster queries
campaignSchema.index({ status: 1, startDate: -1 });
campaignSchema.index({ category: 1 });

// Pre-save middleware to set endDate
campaignSchema.pre('save', function(next) {
  if (this.isNew && this.duration) {
    const start = this.startDate || new Date();
    this.endDate = new Date(start.getTime() + (this.duration * 24 * 60 * 60 * 1000));
  }
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema);
