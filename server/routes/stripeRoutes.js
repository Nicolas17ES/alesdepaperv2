const express = require('express');
const {sendPublishableKey, paymentIntent, sendConfirmationEmails} = require('../controllers/stripeController.js');

const router = express.Router();

// cget all birds
router.get('/config', sendPublishableKey);
router.post('/create-payment-intent', paymentIntent);
router.post('/email', sendConfirmationEmails);



module.exports = router;