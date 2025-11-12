const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignStats,
  getFeaturedCampaigns,
  getUrgentCampaigns
} = require('../controllers/campaignController');

// Validation middleware
const campaignValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['schools', 'children', 'health', 'other']).withMessage('Invalid category'),
  body('goal').isNumeric().isFloat({ min: 100 }).withMessage('Goal must be at least ₹100'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
  body('creatorName').trim().notEmpty().withMessage('Creator name is required'),
  body('creatorEmail').isEmail().withMessage('Valid creator email is required')
];

// Public routes
router.get('/', getAllCampaigns);
router.get('/stats/overview', getCampaignStats);
router.get('/featured', getFeaturedCampaigns);
router.get('/urgent', getUrgentCampaigns);
router.get('/:id', getCampaignById);
router.post('/', campaignValidation, createCampaign);

// Protected routes (Admin only)
router.put('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);

module.exports = router;
