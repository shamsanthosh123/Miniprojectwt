const Donor = require('../models/Donor');
const Campaign = require('../models/Campaign');
const { validationResult } = require('express-validator');

// @desc    Create new donation
// @route   POST /api/donors
// @access  Public
const createDonation = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, amount, campaignId, message, displayPublicly } = req.body;

    // Check if campaign exists and is active
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    if (campaign.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Campaign is not active for donations'
      });
    }

    // Check if campaign is expired
    if (campaign.isExpired) {
      return res.status(400).json({
        success: false,
        message: 'Campaign has expired'
      });
    }

    // Create donation
    const donation = await Donor.create({
      name,
      email,
      phone,
      amount,
      campaignId,
      message: message || null,
      displayPublicly: displayPublicly !== undefined ? displayPublicly : true,
      paymentStatus: 'completed', // In production, this would be 'pending' until payment gateway confirms
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: donation
    });

  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating donation',
      error: error.message
    });
  }
};

// @desc    Get all donations
// @route   GET /api/donors
// @access  Public
const getAllDonations = async (req, res) => {
  try {
    const { campaignId, limit = 50, page = 1, status = 'completed' } = req.query;

    const query = { paymentStatus: status };
    
    if (campaignId) {
      query.campaignId = campaignId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const donations = await Donor.find(query)
      .populate('campaignId', 'title category')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Donor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: donations.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: donations
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
};

// @desc    Get donation by ID
// @route   GET /api/donors/:id
// @access  Public
const getDonationById = async (req, res) => {
  try {
    const donation = await Donor.findById(req.params.id)
      .populate('campaignId', 'title category goal collected');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });

  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation',
      error: error.message
    });
  }
};

// @desc    Get donation statistics
// @route   GET /api/donors/stats
// @access  Public
const getDonationStats = async (req, res) => {
  try {
    const stats = await Donor.getStatistics();

    // Get recent donations
    const recentDonations = await Donor.getRecentDonations(10);

    // Get top donors
    const topDonors = await Donor.getTopDonors(5);

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        recentDonations,
        topDonors
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// @desc    Get donations by campaign
// @route   GET /api/donors/campaign/:campaignId
// @access  Public
const getDonationsByCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { limit = 20 } = req.query;

    const donations = await Donor.getByCampaign(campaignId, parseInt(limit));

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });

  } catch (error) {
    console.error('Get campaign donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign donations',
      error: error.message
    });
  }
};

// @desc    Get recent donations (public feed)
// @route   GET /api/donors/recent
// @access  Public
const getRecentDonations = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const donations = await Donor.getRecentDonations(parseInt(limit));

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });

  } catch (error) {
    console.error('Get recent donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent donations',
      error: error.message
    });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationStats,
  getDonationsByCampaign,
  getRecentDonations
};
