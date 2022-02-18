const Response = require('../util/response');
const errorTypes = require('../consts/errorTypes');
const Product = require('../models/product.model');
const Review = require('../models/review.model');
const responseObj = new Response();
var indexController = require('./index.controller');

async function createNewReview(userModel, productModel, numberOfYearsUsed, reviewText){
    let newUserReview = new Review({
        User: userModel,
        Product: productModel,
        NumberOfYearsUsed: numberOfYearsUsed,
        ReviewText: reviewText
    });

    await newUserReview.save();

    return newUserReview;
}

async function checkIfProductExists(productBrand, productName){
    return await Product.findOne({ProductBrand: productBrand, ProductName: productName})
    .then(result => {
        return result;
    })
    .catch(error => {
        console.error(`Failed to check if product exists with error: ${error}`);
        throw(error);
    });
}

async function addOrUpdateProduct(productBrand, productName, productURI = null){
    let productCheck = await checkIfProductExists(productBrand, productName);
    if (productCheck){
        if (productURI && productURI !== null && productURI !== undefined & productURI !== ''){
            // update the product
            return await Product.findOneAndUpdate({_id: productCheck?._id}, 
                {$set:{ProductURI:productURI}},
                {new: true})
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Failed to update product URI');
                throw(err);
            });
        }
        else{
            return productCheck;
        }
    }
    else{
        let newProduct = new Product({
            ProductBrand: productBrand,
            ProductName: productName,
            ProductURI: productURI != null ? productURI : ''
        });
        
        await newProduct.save(function(err){
            if (err){
                console.error('Failed to create a new product');
                throw(err);
            }
        })

        return newProduct;
    }
}

exports.home = (req, res, next) => {
    res.send('product home');
}

exports.addNewProductReview = async (req, res, next) => {
    const userLogin = req.body.userLogin;
    const productBrand = req.body.productBrand;
    const productName = req.body.productName;
    const productURI = req.body.productURI;
    const numberOfYearsUsed = req.body.numberOfYearsUsed;
    const reviewText = req.body.reviewText;
    var responseVal = undefined;
    try {
        // response validation
        if (!userLogin || userLogin === null || userLogin === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param userLogin`, req.headers, null, errorTypes.default.badQuery)
        }
        // response validation
        else if (!productBrand || productBrand === null || productBrand === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param productBrand`, req.headers, null, errorTypes.default.badQuery)
        }
        // response validation
        else if (!productName || productName === null || productName === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param productName`, req.headers, null, errorTypes.default.badQuery)
        }
        // response validation
        else if (!reviewText || reviewText === null || reviewText === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param reviewText`, req.headers, null, errorTypes.default.badQuery)
        }
        else{
            // check if the user exists
            // check if the product exists
            // if not add the product 
            // if it does exist update any info missing
            // create a new user review
            const userCheck = await indexController.checkIfUserExists(userLogin);
            if (!userCheck || userCheck === undefined || userCheck === null){
                responseVal = responseObj.constructResponseObject('User does not exist. Create a user before posting a review', req.headers, null, errorTypes.default.badQuery)
            }
            else{
                const productVal = await addOrUpdateProduct(productBrand, productName, productURI);
                const newReview = await createNewReview(
                    userCheck,
                    productVal,
                    numberOfYearsUsed,
                    reviewText);
                responseVal = responseObj.constructResponseObject(`Created a new product review`, req.headers, 
                {
                    "user": newReview?.User,
                    "product": newReview?.Product,
                    "numberOfYearsUsed": newReview?.NumberOfYearsUsed,
                    "reviewText": newReview?.ReviewText,
                    "reviewedAt": newReview?.ReviewedAt
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        responseVal = responseObj.constructResponseObject(err.message || 'Internal server error', err.headers, null, err.name || errorTypes.default.serverError)
    }
    finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}