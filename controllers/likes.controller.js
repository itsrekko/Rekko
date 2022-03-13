const Response = require('../util/response');
const mongoose = require('mongoose');
const reviewModel = require('../models/review.model');
const commentModel = require('../models/comment.model');
const errorTypes = require('../consts/errorTypes');
const responseObj = new Response();

async function incrementLikes(model, id, userName) {
    return await model.findByIdAndUpdate(id, {$addToSet: {Likes: userName}}, {new: true})
        .then(results => {
            return results;
    }).catch(error => {
        console.error(`Failed to add liked user ${error}`);
        throw(error);
    })
}

async function decrementLikes(model, id, userName) {
    return await model.findByIdAndUpdate(id, {$pull: {Likes: userName}}, {new: true})
        .then(results => {
            return results;
    })
    .catch(error => {
        console.error(`Failed to remove liked user ${error}`);
        throw(error);
    })
}

exports.updateReviewLikes = async (req, res, next) => {
    const userName = req.body.userName;
    const reviewId = req.body.reviewId;
    const hasUserLiked = req.body.hasUserLiked;

    try {
        var updatedReview;
        if (hasUserLiked) {
            updatedReview = await decrementLikes(reviewModel, reviewId, userName);

        } else {
            updatedReview = await incrementLikes(reviewModel, reviewId, userName);
        }
        responseVal = responseObj.constructResponseObject(`Incremented the like`, req.headers, JSON.stringify(updatedReview.Likes));
    } catch (error) {
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    } finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}

exports.updateCommentLikes = async (req, res, next) => {
    const userName = req.body.userName;
    const commentId = req.body.commentId;
    const hasUserLiked = req.body.hasUserLiked;

    try {
        var updatedReview;
        if (hasUserLiked) {
            updatedReview = await decrementLikes(commentModel, commentId, userName);

        } else {
            updatedReview = await incrementLikes(commentModel, commentId, userName);
        }
        responseVal = responseObj.constructResponseObject(`Incremented the like`, req.headers, JSON.stringify(updatedReview.Likes));
    } catch (error) {
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    } finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}