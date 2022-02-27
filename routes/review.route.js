const express = require('express');
var router = express.Router();
var reviewController = require('../controllers/reviews.controller');

router.get('/getAllReviews', reviewController.getAllReviews);
router.get('/getReviews?:productId', reviewController.getReview);
router.get('/searchThroughEntireReview', reviewController.searchThroughEntireReview);
module.exports = router;