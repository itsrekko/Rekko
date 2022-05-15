require('./database');
const mongoose = require('mongoose');
const Response = require('./util/response');
const commentModel = require('./models/comment.model');
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

//
exports.createNewComment = async (event, context) => {
    const body = JSON.parse(event.body);
    const userName = body.userName;
    const reviewId = body.reviewId;
    const commentText = body.commentText;
    try{
        await addNewComment(userName, reviewId, commentText);
        const mongoRequest = await getCommentsForReviewId(reviewId);
        responseVal = responseObj.constructResponseObject(`Successfully added new comment for review ${reviewId}`, event.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
}

exports.getCommentsForReview = async (event, context) => {
    const reviewId = event.queryStringParameters.reviewId; // update
    try{
        const mongoRequest = await getCommentsForReviewId(reviewId);
        responseVal = responseObj.constructResponseObject(`Successfully fetched all comments for review ${reviewId}`, event.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
}