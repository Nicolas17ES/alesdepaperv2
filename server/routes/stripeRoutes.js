const express = require('express');
const {sendPublishableKey, paymentIntent, postPaymentProcess} = require('../controllers/stripeController.js');

const router = express.Router();

// cget all birds
router.get('/config', sendPublishableKey);
router.post('/create-payment-intent', paymentIntent);


module.exports = router;