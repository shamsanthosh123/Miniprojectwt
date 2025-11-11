const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminSummary,
  getAllDonorsAdmin,
  getAllCampaignsAdmin,
  createDefaultAdmin
} = require('../controllers/adminController');
const { protect, isSuperAdmin } = require('../middleware/auth');

// Public routes
router.post('/login', adminLogin);
router.post('/create-default', createDefaultAdmin); // Disable this in production

// Protected routes (Admin only)
router.get('/summary', protect, getAdminSummary);
router.get('/donors', protect, getAllDonorsAdmin);
router.get('/campaigns', protect, getAllCampaignsAdmin);

module.exports = router;
