const Response = require('../util/response');
const errorTypes = require('../consts/errorTypes');
const productModel = require('../models/product.model');
const reviewModel = require('../models/review.model');

const responseObj = new Response();

async function getAllProducts() {
    return await productModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all products with error: ${error}`)
    })
}

exports.getAllProducts = async (req, res, next) => {
    var responseVal = undefined;
    try{
        const mongoRequest = await getAllProducts();
        responseVal = responseObj.constructResponseObject(`Successfully fetched all products`, req.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}

async function getProductsByProductName(productName) {

    return await productModel.find({ProductName: productName})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch product for product name: ${productName} with error: ${error}`)
    })
}

exports.getProductsByProductName = async (req, res, next) => {
    var responseVal = undefined;
    const productName = req.query.productName;
    try{
        const mongoRequest = await getProductsByProductName(productName);
        responseVal = responseObj.constructResponseObject(`Successfully fetched product for product name ${productName}`, req.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}

async function createNewReview(userID, productID, reviewText) {
    let newUserReview = new reviewModel({
        UserId: userID,
        ProductId: productID,
        ReviewText: reviewText
    });

    await newUserReview.save();

    return newUserReview;
}

async function checkIfProductExists(productBrand, productName) {
    return await productModel.exists({ProductBrand: productBrand, ProductName: productName})
    .then(result => {
        return result;
    })
    .catch(error => {
        console.error(`Failed to check if product exists with error: ${error}`);
        throw(error);
    });
}

async function addOrUpdateProduct(productBrand, productName, productURI = null) {
    let productCheck = await checkIfProductExists(productBrand, productName);
    if (productCheck){
        if (productURI && productURI !== null && productURI !== undefined & productURI !== ''){
            // update the product
            return await productModel.findOneAndUpdate({_id: productCheck?._id}, 
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
        let newProduct = new productModel({
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
    const userID = req.body.userID;
    const productBrand = req.body.productBrand;
    const productName = req.body.productName;
    const productURI = req.body.productURI;
    const reviewText = req.body.reviewText;
    var responseVal = undefined;
    try {
        // response validation
        if (!userID || userID === null || userID === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param userID`, req.headers, null, errorTypes.default.badQuery)
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
            // check if the product exists
            // if not add the product 
            // if it does exist update any info missing
            // create a new user review
            const productVal = await addOrUpdateProduct(productBrand, productName, productURI);
            const newReview = await createNewReview(userID, productVal?._id, reviewText);
            responseVal = responseObj.constructResponseObject(`Created a new product review`, req.headers, 
            {
                "userID": newReview?.UserId,
                "reviewID": newReview?.ProductId,
                "reviewText": newReview?.ReviewText,
                "reviewedAt": newReview?.ReviewedAt
            });
        }
    }
    catch (err) {
        responseVal = responseObj.constructResponseObject(err.message || 'Internal server error', err.headers, null, err.name || errorTypes.default.serverError)
    }
    finally {
        res.status(responseVal.statusCode).send(responseVal);
    }
}