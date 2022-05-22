const Response = require('../util/response');
const mongoose = require('mongoose');
const commentModel = require('../models/comment.model');
const responseObj = new Response();

async function addNewComment (userName, reviewId, commentText) {
    const reviewIdObject = mongoose.Types.ObjectId(reviewId);
    let newComment = new commentModel({
        UserName: userName,
        ReviewId: reviewIdObject,
        Text: commentText
    });
    await newComment.save();
    return newComment;
}

exports.createNewComment = async (req, res, next) => {
    const userName = req.body.userName;
    const reviewId = req.body.reviewId;
    const commentText = req.body.commentText;
    try{
        await addNewComment(userName, reviewId, commentText);
        const mongoRequest = await getCommentsForReviewId(reviewId);
        responseVal = responseObj.constructResponseObject(`Successfully added new comment for review ${reviewId}`, req.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
        console.error('ERROR: ', responseVal);
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}

async function getCommentsForReviewId (reviewId) {
    const reviewIdObject = mongoose.Types.ObjectId(reviewId);
    return await commentModel.find({ReviewId: reviewIdObject})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all comments with error: ${error} for reviewId: ${reviewId}`);
    })
}

exports.getCommentsForReview = async (req, res, next) => {
    const reviewId = req.query.reviewId;
    try{
        const mongoRequest = await getCommentsForReviewId(reviewId);
        responseVal = responseObj.constructResponseObject(`Successfully fetched all comments for review ${reviewId}`, req.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}