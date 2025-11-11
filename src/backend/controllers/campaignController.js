const Campaign = require('../models/Campaign');

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Public
const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      goal,
      duration,
      image,
      documents,
      creatorName,
      creatorEmail,
      isUrgent
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !goal || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create campaign
    const campaign = await Campaign.create({
      title,
      description,
      category,
      goal: Number(goal),
      duration: Number(duration),
      image: image || '',
      documents: documents || [],
      creatorName: creatorName || 'Anonymous',
      creatorEmail: creatorEmail || '',
      isUrgent: isUrgent || false,
      status: 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign
    });

  } catch (error) {
    console.error('Error creating campaign:', error);
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
    const { category, status, search, limit, page, sortBy } = req.query;

    const filter = {};

    // Filter by category
    if (category && category !== 'All Campaigns') {
      filter.category = category;
    }

    // Filter by status
    if (status) {
      filter.status = status;
    } else {
      // By default, show only active campaigns
      filter.status = 'active';
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sort = { startDate: -1 }; // Default: newest first
    if (sortBy === 'urgent') {
      sort = { isUrgent: -1, startDate: -1 };
    } else if (sortBy === 'popular') {
      sort = { donorCount: -1 };
    } else if (sortBy === 'goal') {
      sort = { goal: -1 };
    }

    const campaigns = await Campaign.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Campaign.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: campaigns
    });

  } catch (error) {
    console.error('Error fetching campaigns:', error);
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

    res.status(200).json({
      success: true,
      data: campaign
    });

  } catch (error) {
    console.error('Error fetching campaign:', error);
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

    const allowedUpdates = [
      'title',
      'description',
      'goal',
      'image',
      'documents',
      'status',
      'isUrgent',
      'duration'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        campaign[field] = req.body[field];
      }
    });

    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign
    });

  } catch (error) {
    console.error('Error updating campaign:', error);
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

    await campaign.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting campaign:', error);
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
    const totalCampaigns = await Campaign.countDocuments({ status: 'active' });
    
    const totalRaised = await Campaign.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$collected' } } }
    ]);

    const categoryCounts = await Campaign.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const urgentCampaigns = await Campaign.find({ isUrgent: true, status: 'active' })
      .sort({ startDate: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalCampaigns,
        totalRaised: totalRaised[0]?.total || 0,
        categoryCounts,
        urgentCampaigns
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
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
  getCampaignStats
};
