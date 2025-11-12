const Admin = require('../models/Admin');
const Campaign = require('../models/Campaign');
const Donor = require('../models/Donor');
const { generateToken } = require('../middleware/auth');
const { validationResult } = require('express-validator');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// @desc    Get admin dashboard summary
// @route   GET /api/admin/summary
// @access  Admin
const getDashboardSummary = async (req, res) => {
  try {
    // Get campaign statistics
    const campaignStats = await Campaign.getStatistics();

    // Get donation statistics
    const donorStats = await Donor.getStatistics();

    // Get pending campaigns
    const pendingCampaigns = await Campaign.countDocuments({ status: 'pending' });

    // Get recent donations
    const recentDonations = await Donor.find({ paymentStatus: 'completed' })
      .populate('campaignId', 'title')
      .sort({ date: -1 })
      .limit(10)
      .select('name email amount campaignId date');

    // Get top campaigns by funds raised
    const topCampaigns = await Campaign.find({ status: 'active' })
      .sort({ collected: -1 })
      .limit(5)
      .select('title category goal collected donorCount');

    // Calculate daily stats (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyDonations = await Donor.aggregate([
      {
        $match: {
          date: { $gte: thirtyDaysAgo },
          paymentStatus: 'completed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalCampaigns: campaignStats.totalCampaigns,
          activeCampaigns: campaignStats.activeCampaigns,
          completedCampaigns: campaignStats.completedCampaigns,
          pendingCampaigns,
          totalDonations: donorStats.totalDonations,
          totalDonors: donorStats.totalDonors,
          totalFundsRaised: donorStats.totalAmount,
          averageDonation: donorStats.averageAmount
        },
        recentDonations,
        topCampaigns,
        dailyStats: dailyDonations
      }
    });

  } catch (error) {
    console.error('Get dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard summary',
      error: error.message
    });
  }
};

// @desc    Get all donors (admin view)
// @route   GET /api/admin/donors
// @access  Admin
const getAllDonors = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      campaignId,
      status = 'completed'
    } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.paymentStatus = status;
    }

    if (campaignId) {
      query.campaignId = campaignId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const donors = await Donor.find(query)
      .populate('campaignId', 'title category')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Donor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: donors.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: donors
    });

  } catch (error) {
    console.error('Get all donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donors',
      error: error.message
    });
  }
};

// @desc    Get all campaigns (admin view)
// @route   GET /api/admin/campaigns
// @access  Admin
const getAllCampaigns = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      search
    } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { creatorName: { $regex: search, $options: 'i' } },
        { creatorEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const campaigns = await Campaign.find(query)
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
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
    console.error('Get all campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns',
      error: error.message
    });
  }
};

// @desc    Approve campaign
// @route   PUT /api/admin/campaigns/:id/approve
// @access  Admin
const approveCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    campaign.status = 'active';
    campaign.approvedBy = req.admin._id;
    campaign.approvedAt = new Date();
    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign approved successfully',
      data: campaign
    });

  } catch (error) {
    console.error('Approve campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving campaign',
      error: error.message
    });
  }
};

// @desc    Reject campaign
// @route   PUT /api/admin/campaigns/:id/reject
// @access  Admin
const rejectCampaign = async (req, res) => {
  try {
    const { reason } = req.body;

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    campaign.status = 'rejected';
    campaign.rejectionReason = reason || 'Campaign does not meet our guidelines';
    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign rejected',
      data: campaign
    });

  } catch (error) {
    console.error('Reject campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting campaign',
      error: error.message
    });
  }
};

// @desc    Create default admin (for initial setup)
// @route   POST /api/admin/create-default
// @access  Public (should be disabled in production)
const createDefaultAdmin = async (req, res) => {
  try {
    // Check if any admin exists
    const adminExists = await Admin.findOne({});

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists. Use the login endpoint.'
      });
    }

    // Create default admin
    const admin = await Admin.create({
      email: 'admin@donation.com',
      password: 'admin123',
      name: 'Platform Admin',
      role: 'superadmin'
    });

    res.status(201).json({
      success: true,
      message: 'Default admin created successfully',
      data: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Create default admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating default admin',
      error: error.message
    });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Admin
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');

    res.status(200).json({
      success: true,
      data: admin
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

module.exports = {
  adminLogin,
  getDashboardSummary,
  getAllDonors,
  getAllCampaigns,
  approveCampaign,
  rejectCampaign,
  createDefaultAdmin,
  getAdminProfile
};
