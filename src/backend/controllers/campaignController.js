const Campaign = require('../models/Campaign');
const Donor = require('../models/Donor');
const { validationResult } = require('express-validator');

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Public
const createCampaign = async (req, res) => {
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

    const {
      title,
      description,
      category,
      goal,
      duration,
      creatorName,
      creatorEmail,
      image,
      documents,
      isUrgent
    } = req.body;

    // Create campaign
    const campaign = await Campaign.create({
      title,
      description,
      category: category.toLowerCase(),
      goal,
      duration,
      creatorName,
      creatorEmail,
      image: image || null,
      documents: documents || [],
      isUrgent: isUrgent || false,
      status: 'pending' // All campaigns start as pending for review
    });

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully and is pending review',
      data: campaign
    });

  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating campaign',
      error: error.message
    });
  }
};

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getAllCampaigns = async (req, res) => {
  try {
    const {
      category,
      status = 'active',
      search,
      limit = 20,
      page = 1,
      sortBy = 'createdAt'
    } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Ensure only active campaigns are shown to public (unless status is specified)
    if (!req.admin && status === 'active') {
      query.endDate = { $gt: new Date() };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort options
    const sortOptions = {
      createdAt: { createdAt: -1 },
      recent: { createdAt: -1 },
      goal: { goal: -1 },
      collected: { collected: -1 },
      ending: { endDate: 1 }
    };

    const sort = sortOptions[sortBy] || sortOptions.createdAt;

    const campaigns = await Campaign.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Campaign.countDocuments(query);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: campaigns
    });

  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns',
      error: error.message
    });
  }
};

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Get recent donors for this campaign
    const recentDonors = await Donor.getByCampaign(campaign._id, 10);

    res.status(200).json({
      success: true,
      data: {
        ...campaign.toObject(),
        recentDonors
      }
    });

  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign',
      error: error.message
    });
  }
};

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Admin
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Update allowed fields
    const allowedUpdates = [
      'title',
      'description',
      'goal',
      'status',
      'isUrgent',
      'isFeatured',
      'rejectionReason'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        campaign[field] = req.body[field];
      }
    });

    // If status is being changed to active, record approval
    if (req.body.status === 'active' && campaign.status !== 'active') {
      campaign.approvedBy = req.admin._id;
      campaign.approvedAt = new Date();
    }

    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign
    });

  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating campaign',
      error: error.message
    });
  }
};

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Admin
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Check if campaign has donations
    const donationCount = await Donor.countDocuments({ 
      campaignId: campaign._id,
      paymentStatus: 'completed'
    });

    if (donationCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete campaign with existing donations. Please cancel it instead.'
      });
    }

    await campaign.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully'
    });

  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting campaign',
      error: error.message
    });
  }
};

// @desc    Get campaign statistics
// @route   GET /api/campaigns/stats/overview
// @access  Public
const getCampaignStats = async (req, res) => {
  try {
    const stats = await Campaign.getStatistics();

    // Get category breakdown
    const categoryStats = await Campaign.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalGoal: { $sum: '$goal' },
          totalCollected: { $sum: '$collected' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        categoryBreakdown: categoryStats
      }
    });

  } catch (error) {
    console.error('Get campaign stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign statistics',
      error: error.message
    });
  }
};

// @desc    Get featured campaigns
// @route   GET /api/campaigns/featured
// @access  Public
const getFeaturedCampaigns = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const campaigns = await Campaign.find({
      status: 'active',
      isFeatured: true,
      endDate: { $gt: new Date() }
    })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });

  } catch (error) {
    console.error('Get featured campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured campaigns',
      error: error.message
    });
  }
};

// @desc    Get urgent campaigns
// @route   GET /api/campaigns/urgent
// @access  Public
const getUrgentCampaigns = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const campaigns = await Campaign.find({
      status: 'active',
      isUrgent: true,
      endDate: { $gt: new Date() }
    })
    .sort({ endDate: 1 }) // Sort by ending soon
    .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });

  } catch (error) {
    console.error('Get urgent campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching urgent campaigns',
      error: error.message
    });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignStats,
  getFeaturedCampaigns,
  getUrgentCampaigns
};
