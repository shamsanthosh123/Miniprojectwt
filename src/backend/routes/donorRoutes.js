const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationStats,
  getDonationsByCampaign,
  getRecentDonations
} = require('../controllers/donorController');

// Validation middleware
const donationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('amount').isNumeric().isFloat({ min: 1 }).withMessage('Amount must be at least ₹1'),
  body('campaignId').notEmpty().withMessage('Campaign ID is required')
];

// Public routes
router.post('/', donationValidation, createDonation);
router.get('/', getAllDonations);
router.get('/stats', getDonationStats);
router.get('/recent', getRecentDonations);
router.get('/campaign/:campaignId', getDonationsByCampaign);
router.get('/:id', getDonationById);

module.exports = router;
