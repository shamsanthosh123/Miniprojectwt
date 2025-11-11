const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide donor name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide donation amount'],
    min: [1, 'Donation amount must be at least ₹1']
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: [true, 'Please specify campaign']
  },
  campaignTitle: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  displayPublicly: {
    type: Boolean,
    default: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
donorSchema.index({ campaignId: 1, date: -1 });
donorSchema.index({ email: 1 });

module.exports = mongoose.model('Donor', donorSchema);
