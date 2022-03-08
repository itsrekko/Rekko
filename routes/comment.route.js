const express = require('express');
var router = express.Router();
var commentController = require('../controllers/comments.controller');
var likesController = require('../controllers/likes.controller');

router.get('/', commentController.getCommentsForReview);

router.post('/', commentController.createNewComment);

router.put('/likes', likesController.updateCommentLikes);

module.exports = router;