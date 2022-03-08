const express = require('express');
var router = express.Router();
var reviewController = require('../controllers/reviews.controller');
var likesController = require('../controllers/likes.controller');

router.get('/getAllReviews', reviewController.getAllReviews);
router.get('/getReviews?:productId', reviewController.getReview);
router.get('/searchThroughEntireReview', reviewController.searchThroughEntireReview);

router.put('/likes', likesController.updateReviewLikes);

module.exports = router;