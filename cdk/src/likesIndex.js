const Response = require('./util/response');
const reviewModel = require('./models/review.model');
const commentModel = require('./models/comment.model');

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

exports.updateReviewLikes = async (event, context) => {
    const userName = event.body.userName;
    const reviewId = event.body.reviewId;
    const hasUserLiked = event.body.hasUserLiked;

    try {
        var updatedReview;
        if (hasUserLiked) {
            updatedReview = await decrementLikes(reviewModel, reviewId, userName);

        } else {
            updatedReview = await incrementLikes(reviewModel, reviewId, userName);
        }
        responseVal = responseObj.constructResponseObject(`Incremented the like`, event.headers, JSON.stringify(updatedReview.Likes));
    } catch (error) {
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    } finally {
        return responseVal;
    }
}

exports.updateCommentLikes = async (event, context) => {
    const userName = event.body.userName;
    const commentId = event.body.commentId;
    const hasUserLiked = event.body.hasUserLiked;

    try {
        var updatedReview;
        if (hasUserLiked) {
            updatedReview = await decrementLikes(commentModel, commentId, userName);

        } else {
            updatedReview = await incrementLikes(commentModel, commentId, userName);
        }
        responseVal = responseObj.constructResponseObject(`Incremented the like`, event.headers, JSON.stringify(updatedReview.Likes));
    } catch (error) {
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    } finally {
        return responseVal;
    }
}