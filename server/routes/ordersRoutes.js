const express = require('express');
const {postPaymentProcess, getAllOrders, changeOrderStatus} = require('../controllers/ordersController.js');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/post-payment', postPaymentProcess);
router.get('/view-orders', protect, getAllOrders);
router.put('/status', protect, changeOrderStatus);



module.exports = router;