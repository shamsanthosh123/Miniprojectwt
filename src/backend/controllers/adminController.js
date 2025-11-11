const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Campaign = require('../models/Campaign');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// @desc    Get admin dashboard summary
// @route   GET /api/admin/summary
// @access  Private (Admin)
const getAdminSummary = async (req, res) => {
  try {
    // Total campaigns
    const totalCampaigns = await Campaign.countDocuments();
    const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
    const completedCampaigns = await Campaign.countDocuments({ status: 'completed' });

    // Total donations
    const totalDonations = await Donor.countDocuments();
    
    // Total amount collected
    const totalAmountResult = await Donor.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalAmount = totalAmountResult[0]?.total || 0;

    // Amount by campaign
    const campaignSummary = await Campaign.aggregate([
      {
        $match: { status: { $in: ['active', 'completed'] } }
      },
      {
        $project: {
          title: 1,
          category: 1,
          goal: 1,
          collected: 1,
          donorCount: 1,
          status: 1,
          progressPercentage: {
            $min: [
              { $multiply: [{ $divide: ['$collected', '$goal'] }, 100] },
              100
            ]
          }
        }
      },
      { $sort: { collected: -1 } },
      { $limit: 10 }
    ]);

    // Recent donations
    const recentDonations = await Donor.find()
      .sort({ date: -1 })
      .limit(10)
      .populate('campaignId', 'title category');

    // Donations by category
    const categoryBreakdown = await Campaign.aggregate([
      { $match: { status: { $in: ['active', 'completed'] } } },
      {
        $group: {
          _id: '$category',
          totalCollected: { $sum: '$collected' },
          campaignCount: { $sum: 1 }
        }
      },
      { $sort: { totalCollected: -1 } }
    ]);

    // Monthly donation trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrend = await Donor.aggregate([
      { $match: { date: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalCampaigns,
          activeCampaigns,
          completedCampaigns,
          totalDonations,
          totalAmount
        },
        campaignSummary,
        recentDonations,
        categoryBreakdown,
        monthlyTrend
      }
    });

  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin summary',
      error: error.message
    });
  }
};

// @desc    Get all donors (admin view)
// @route   GET /api/admin/donors
// @access  Private (Admin)
const getAllDonorsAdmin = async (req, res) => {
  try {
    const { page, limit, search, campaignId } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (campaignId) {
      filter.campaignId = campaignId;
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const donors = await Donor.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('campaignId', 'title category');

    const total = await Donor.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: donors.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: donors
    });

  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donors',
      error: error.message
    });
  }
};

// @desc    Get all campaigns (admin view)
// @route   GET /api/admin/campaigns
// @access  Private (Admin)
const getAllCampaignsAdmin = async (req, res) => {
  try {
    const { page, limit, status, category } = req.query;

    const filter = {};
    
    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const campaigns = await Campaign.find(filter)
      .sort({ startDate: -1 })
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

// @desc    Create default admin account (run once)
// @route   POST /api/admin/create-default
// @access  Public (should be disabled in production)
const createDefaultAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@donation.com' });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Default admin already exists'
      });
    }

    // Create default admin
    const admin = await Admin.create({
      email: 'admin@donation.com',
      password: 'admin123',
      name: 'Super Administrator',
      role: 'superadmin'
    });

    res.status(201).json({
      success: true,
      message: 'Default admin created successfully',
      data: {
        email: admin.email,
        name: admin.name,
        note: 'Please change the default password immediately'
      }
    });

  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

module.exports = {
  adminLogin,
  getAdminSummary,
  getAllDonorsAdmin,
  getAllCampaignsAdmin,
  createDefaultAdmin
};
