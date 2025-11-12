const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Donor name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Donation amount must be at least ₹1']
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: [true, 'Campaign ID is required']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
    default: null
  },
  displayPublicly: {
    type: Boolean,
    default: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'other'],
    default: 'other'
  },
  transactionId: {
    type: String,
    default: null,
    unique: true,
    sparse: true
  },
  receiptSent: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate transaction ID
donorSchema.pre('save', function(next) {
  if (this.isNew && !this.transactionId) {
    // Generate unique transaction ID
    this.transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

// Post-save middleware to update campaign's collected amount
donorSchema.post('save', async function() {
  try {
    const Campaign = mongoose.model('Campaign');
    const campaign = await Campaign.findById(this.campaignId);
    
    if (campaign && this.paymentStatus === 'completed') {
      // Update collected amount and donor count
      campaign.collected += this.amount;
      campaign.donorCount += 1;
      await campaign.save();
    }
  } catch (error) {
    console.error('Error updating campaign:', error);
  }
});

// Index for faster queries
donorSchema.index({ campaignId: 1, date: -1 });
donorSchema.index({ email: 1 });
donorSchema.index({ date: -1 });
donorSchema.index({ paymentStatus: 1 });

// Static method to get donation statistics
donorSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $match: { paymentStatus: 'completed' }
    },
    {
      $group: {
        _id: null,
        totalDonations: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        averageAmount: { $avg: '$amount' },
        uniqueDonors: { $addToSet: '$email' }
      }
    },
    {
      $project: {
        _id: 0,
        totalDonations: 1,
        totalAmount: 1,
        averageAmount: { $round: ['$averageAmount', 2] },
        totalDonors: { $size: '$uniqueDonors' }
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0] : {
    totalDonations: 0,
    totalAmount: 0,
    averageAmount: 0,
    totalDonors: 0
  };
};

// Static method to get donations by campaign
donorSchema.statics.getByCampaign = function(campaignId, limit = 10) {
  return this.find({ 
    campaignId,
    paymentStatus: 'completed',
    displayPublicly: true
  })
  .sort({ date: -1 })
  .limit(limit)
  .select('name amount message date');
};

// Static method to get recent donations
donorSchema.statics.getRecentDonations = function(limit = 20) {
  return this.find({ 
    paymentStatus: 'completed',
    displayPublicly: true
  })
  .populate('campaignId', 'title')
  .sort({ date: -1 })
  .limit(limit)
  .select('name amount campaignId date message');
};

// Static method to get top donors
donorSchema.statics.getTopDonors = async function(limit = 10) {
  return this.aggregate([
    {
      $match: { 
        paymentStatus: 'completed',
        displayPublicly: true
      }
    },
    {
      $group: {
        _id: '$email',
        name: { $first: '$name' },
        totalDonated: { $sum: '$amount' },
        donationCount: { $sum: 1 }
      }
    },
    {
      $sort: { totalDonated: -1 }
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: 0,
        email: '$_id',
        name: 1,
        totalDonated: 1,
        donationCount: 1
      }
    }
  ]);
};

module.exports = mongoose.model('Donor', donorSchema);
