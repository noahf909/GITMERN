const express = require('express');
const { createPaymentIntent, saveOrder } = require('../controllers/stripeController');

const router = express.Router();

// Route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Route to save the order after payment
router.post('/save-order', saveOrder);

module.exports = router;
