const express = require('express');
var router = express.Router();
var commentController = require('../controllers/comments.controller');

router.get('/', commentController.getCommentsForReview);
router.post('/', commentController.createNewComment);
// router.put('/likes', commentController.updateLikes);

module.exports = router;