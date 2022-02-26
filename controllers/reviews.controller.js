const Response = require('../util/response');
const mongoose = require('mongoose');
const reviewModel = require('../models/review.model');
const errorTypes = require('../consts/errorTypes');
const responseObj = new Response();

exports.createNewReview = async (userModel, productModel, lengthOfUse, reviewText) => {
    let newUserReview = new reviewModel({
        User: userModel,
        Product: productModel,
        LengthOfUse: lengthOfUse,
        ReviewText: reviewText
    });

    await newUserReview.save();

    return newUserReview;
}

async function getAllReviews () {
    return await reviewModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all reviews with error: ${error}`);
    })
}

async function getReview (productId) {
    const productIdObject = mongoose.Types.ObjectId(productId);
    return await reviewModel.find({ProductId: productIdObject})
    .then(results => {
        return results;
    })
}

async function searchThroughEntireReviews (searchText) {
    return await reviewModel.find(
        {$or: 
            [
                {
                    'Product.ProductBrand': {
                        "$regex": searchText, 
                        "$options": "i"
                    }
                }, 
                {
                    'Product.ProductName': {
                        "$regex": searchText, 
                        "$options": "i"
                    }
                }, 
                {
                    'User.UserLogin': {
                            "$regex": searchText, 
                            "$options": "i"
                    }
                }, 
                {
                    ReviewText: { 
                        "$regex": searchText, 
                        "$options": "i"
                    }
                }
            ]
        })
    .then(results => {
        return results;
    });
    
    return await reviewModel.find(
        {$or: 
            [
                {
                    Product: {
                        ProductBrand: 
                        {
                            "$regex": searchText, 
                            "$options": "i"
                        }
                    }
                }, 
                {
                    Product: {
                        ProductName: 
                        {
                            "$regex": searchText, 
                            "$options": "i"
                        }
                    }
                }, 
                {
                    User: {
                        UserLogin: 
                        {
                            "$regex": searchText, 
                            "$options": "i"
                        }
                    }
                }, 
                {
                    ReviewText: { 
                        "$regex": searchText, 
                        "$options": "i"
                    }
                }
            ]
        })
    .then(results => {
        return results;
    })
}

exports.getAllReviews = async (req, res, next) => {
    var responseVal = undefined;
    try {
        const mongoRequest = await getAllReviews();
        responseVal = responseObj.constructResponseObject(`Successfully fetched all reviews`, req.headers, mongoRequest);
    } catch (error) {
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    } finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}

exports.getReview = async (req, res, next) => {
    var responseVal = undefined;
    const productID = req.query.productId;

    try {
        if (!productID || productID === null || productID === undefined) {
            responseVal = responseObj.constructResponseObject(`Fetching review requires param productId`, req.headers, null, errorTypes.default.badQuery)
        }
        else{
            const mongoRequest = await getReview(productID);
            responseVal = responseObj.constructResponseObject(`Successfully fetched review`, req.headers, mongoRequest);
        }
    } catch (error) {
        console.error(`Error is: ${error}`);
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    } finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}


exports.searchThroughEntireReview = async (req, res, next) => {
    var responseVal = undefined;
    const reviewRegex = req.query.reviewRegex;
    try {
        if (!reviewRegex || reviewRegex === null || reviewRegex === undefined) {
            responseVal = responseObj.constructResponseObject(`Fetching review by text requires param reviewRegex`, req.headers, null, errorTypes.default.badQuery)
        }
        else{
            const mongoRequest = await searchThroughEntireReviews(reviewRegex);
            responseVal = responseObj.constructResponseObject(`Successfully fetched review`, req.headers, mongoRequest);
        }
    } catch (error) {
        console.error(`Error is: ${error}`);
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    } finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}