const express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');

router.get('/', productController.home);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProducts?:productName', productController.getProductsByProductName);
router.post('/addNewProductReview', productController.addNewProductReview);

module.exports = router;