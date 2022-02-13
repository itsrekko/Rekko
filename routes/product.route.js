const express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');

/* GET home page. */
router.get('/', productController.home);
router.post('/addNewProductReview', productController.addNewProductReview);

module.exports = router;
