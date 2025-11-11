const Donor = require('../models/Donor');
const Campaign = require('../models/Campaign');

// @desc    Create new donation
// @route   POST /api/donors
// @access  Public
const createDonation = async (req, res) => {
  try {
    const { name, email, phone, amount, campaignId, message, displayPublicly } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !amount || !campaignId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Check if campaign is active
    if (campaign.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This campaign is no longer accepting donations'
      });
    }

    // Create donation
    const donor = await Donor.create({
      name,
      email,
      phone,
      amount: Number(amount),
      campaignId,
      campaignTitle: campaign.title,
      message: message || '',
      displayPublicly: displayPublicly !== undefined ? displayPublicly : true,
      paymentStatus: 'completed'
    });

    // Update campaign collected amount and donor count
    campaign.collected += Number(amount);
    campaign.donorCount += 1;

    // Check if goal is reached
    if (campaign.collected >= campaign.goal) {
      campaign.status = 'completed';
    }

    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: donor,
      campaign: {
        id: campaign._id,
        title: campaign.title,
        collected: campaign.collected,
        goal: campaign.goal,
        progressPercentage: campaign.progressPercentage
      }
    });

  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing donation',
      error: error.message
    });
  }
};

// @desc    Get all donations
// @route   GET /api/donors
// @access  Public
const getAllDonations = async (req, res) => {
  try {
    const { campaignId, limit, page } = req.query;

    const filter = {};
    if (campaignId) {
      filter.campaignId = campaignId;
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 50;
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
    console.error('Error fetching donations:', error);
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
    const donor = await Donor.findById(req.params.id).populate('campaignId');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donor
    });

  } catch (error) {
    console.error('Error fetching donation:', error);
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
    const totalDonations = await Donor.countDocuments();
    const totalAmount = await Donor.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentDonations = await Donor.find()
      .sort({ date: -1 })
      .limit(10)
      .populate('campaignId', 'title');

    res.status(200).json({
      success: true,
      data: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        recentDonations
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
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationStats
};
