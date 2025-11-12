const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Campaign title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Campaign description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['schools', 'children', 'health', 'other'],
      message: '{VALUE} is not a valid category'
    },
    lowercase: true
  },
  goal: {
    type: Number,
    required: [true, 'Funding goal is required'],
    min: [100, 'Goal must be at least ₹100']
  },
  collected: {
    type: Number,
    default: 0,
    min: [0, 'Collected amount cannot be negative']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 day']
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  image: {
    type: String,
    default: null
  },
  documents: [{
    type: String
  }],
  creatorName: {
    type: String,
    required: [true, 'Creator name is required'],
    trim: true
  },
  creatorEmail: {
    type: String,
    required: [true, 'Creator email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  donorCount: {
    type: Number,
    default: 0
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rejectionReason: {
    type: String,
    default: null
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  approvedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for percentage completion
campaignSchema.virtual('percentageCompleted').get(function() {
  return Math.min(Math.round((this.collected / this.goal) * 100), 100);
});

// Virtual for days remaining
campaignSchema.virtual('daysRemaining').get(function() {
  const now = new Date();
  const end = new Date(this.endDate);
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Virtual for checking if campaign is expired
campaignSchema.virtual('isExpired').get(function() {
  return new Date() > new Date(this.endDate);
});

// Pre-save middleware to calculate end date
campaignSchema.pre('save', function(next) {
  if (this.isNew && this.duration) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + this.duration);
    this.endDate = endDate;
  }
  next();
});

// Pre-save middleware to update status based on conditions
campaignSchema.pre('save', function(next) {
  // Auto-complete campaign if goal is reached
  if (this.collected >= this.goal && this.status === 'active') {
    this.status = 'completed';
  }
  
  // Auto-cancel if expired and not completed
  if (this.isExpired && this.status === 'active') {
    this.status = 'cancelled';
  }
  
  next();
});

// Index for faster queries
campaignSchema.index({ status: 1, category: 1 });
campaignSchema.index({ creatorEmail: 1 });
campaignSchema.index({ createdAt: -1 });
campaignSchema.index({ endDate: 1 });

// Static method to get active campaigns
campaignSchema.statics.getActiveCampaigns = function(filter = {}) {
  return this.find({ 
    status: 'active',
    endDate: { $gt: new Date() },
    ...filter
  }).sort({ createdAt: -1 });
};

// Static method to get campaign statistics
campaignSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalCampaigns: { $sum: 1 },
        activeCampaigns: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        completedCampaigns: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        totalGoal: { $sum: '$goal' },
        totalCollected: { $sum: '$collected' },
        totalDonors: { $sum: '$donorCount' }
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0] : {
    totalCampaigns: 0,
    activeCampaigns: 0,
    completedCampaigns: 0,
    totalGoal: 0,
    totalCollected: 0,
    totalDonors: 0
  };
};

module.exports = mongoose.model('Campaign', campaignSchema);
