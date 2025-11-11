const express = require('express');
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignStats
} = require('../controllers/campaignController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllCampaigns);
router.get('/stats/overview', getCampaignStats);
router.get('/:id', getCampaignById);
router.post('/', createCampaign);

// Protected routes (Admin only)
router.put('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);

module.exports = router;
