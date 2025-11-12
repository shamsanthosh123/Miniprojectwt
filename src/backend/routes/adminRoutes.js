const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  adminLogin,
  getDashboardSummary,
  getAllDonors,
  getAllCampaigns,
  approveCampaign,
  rejectCampaign,
  createDefaultAdmin,
  getAdminProfile
} = require('../controllers/adminController');

// Validation middleware
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/login', loginValidation, adminLogin);
router.post('/create-default', createDefaultAdmin);

// Protected routes (Admin only)
router.get('/summary', protect, getDashboardSummary);
router.get('/donors', protect, getAllDonors);
router.get('/campaigns', protect, getAllCampaigns);
router.get('/profile', protect, getAdminProfile);
router.put('/campaigns/:id/approve', protect, approveCampaign);
router.put('/campaigns/:id/reject', protect, rejectCampaign);

module.exports = router;
