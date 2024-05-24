const express = require('express');
const {getProducts, getSingleProduct} = require('../controllers/birdController.js');

const router = express.Router();

// cget all birds
router.get('/get', getProducts);
router.get('/get/:id', getSingleProduct);



module.exports = router;