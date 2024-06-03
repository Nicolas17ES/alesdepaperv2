const express = require('express');
const {postPaymentProcess} = require('../controllers/ordersController.js');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/post-payment', postPaymentProcess);
router.post('/view-orders', postPaymentProcess);



module.exports = router;