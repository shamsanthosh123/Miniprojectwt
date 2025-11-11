const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationStats
} = require('../controllers/donorController');

// Public routes
router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/stats', getDonationStats);
router.get('/:id', getDonationById);

module.exports = router;
