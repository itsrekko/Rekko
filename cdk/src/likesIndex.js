const Response = require('./util/response');
const reviewModel = require('./models/review.model');
const commentModel = require('./models/comment.model');

const responseObj = new Response();

async function incrementLikes(model, id, userName) {
    console.log("Trying to increment likes")
    return await model.findByIdAndUpdate(id, {$addToSet: {Likes: userName}}, {new: true})
        .then(results => {
            console.log(results);
            return results;
    }).catch(error => {
        console.log(error);
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
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    const body = JSON.parse(event.body);
    const userName = body.userName;
    const reviewId = body.reviewId;
    const hasUserLiked = body.hasUserLiked;

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
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    const body = JSON.parse(event.body);
    const userName = body.userName;
    const commentId = body.commentId;
    const hasUserLiked = body.hasUserLiked;
    console.log(userName);
    console.log(commentId);
    console.log(hasUserLiked);
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