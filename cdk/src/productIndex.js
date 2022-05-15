require('./database');
const Response = require('./util/response');
const errorTypes = require('./consts/errorTypes');
const productModel = require('./models/product.model');

var userController = require('./userIndex');
var reviewController = require('./reviewsIndex');

const responseObj = new Response();

async function checkIfProductExists(productBrand, productName){
    return await productModel.findOne({ProductBrand: productBrand, ProductName: productName})
    .then(result => {
        return result;
    })
    .catch(error => {
        console.error(`Failed to check if product exists with error: ${error}`);
        return [];
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

async function getAllProducts() {
    return await productModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all products with error: ${error}`);
        return [];
    })
}

async function getAllProducts() {
    return await productModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all products with error: ${error}`);
        return [];
    })
}

async function getProductsByProductName(productName) {

    return await productModel.find({ProductName: productName})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch product for product name: ${productName} with error: ${error}`);
        return [];
    })
}

exports.getAllProducts = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    var responseVal = undefined;
    try{
        const mongoRequest = await getAllProducts();
        console.log(mongoRequest);
        responseVal = responseObj.constructResponseObject(`Successfully fetched all products`, event.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
}

exports.getProductsByProductName = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    var responseVal = undefined;
    const productName = event.queryStringParameters.productName;
    try{
        const mongoRequest = await getProductsByProductName(productName);
        responseVal = responseObj.constructResponseObject(`Successfully fetched product for product name ${productName}`, event.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
}

exports.home = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    return responseObj.constructResponseObject('Welcome to product page', event.headers);
}

exports.addNewProductReview = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    const body = JSON.parse(event.body);
    const userName = body.userName;
    const productBrand = body.productBrand;
    const productName = body.productName;
    const productURI = body.productURI;
    const lengthOfUse = body.lengthOfUse;
    const imageName = body.imageName;
    const reviewText = body.reviewText;

    var responseVal = undefined;
    try {
        if (!userName || userName === null || userName === undefined) {
            responseVal = responseObj.constructResponseObject(`Response body requires param userName`, event.headers, `Response body requires param userName`, errorTypes.default.badQuery)
        }
        else if (!productBrand || productBrand === null || productBrand === undefined){
            responseVal = responseObj.constructResponseObject(`Response body requires param productBrand`, event.headers, `Response body requires param productBrand`, errorTypes.default.badQuery)
        }
        else if (!productName || productName === null || productName === undefined){
            responseVal = responseObj.constructResponseObject(`Response body requires param productName`, event.headers, `Response body requires param productName`, errorTypes.default.badQuery)
        }
        else if (!reviewText || reviewText === null || reviewText === undefined){
            responseVal = responseObj.constructResponseObject(`Response body requires param reviewText`, event.headers, `Response body requires param reviewText`, errorTypes.default.badQuery)
        }
        // response validation
        else if (!imageName || imageName === null || imageName === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param imageName`, event.headers, `Response body requires param imageName`, errorTypes.default.badQuery)
        }
        else{
            const userCheck = await userController.checkIfUserExists(userName);
            if (!userCheck || userCheck === undefined || userCheck === null){
                responseVal = responseObj.constructResponseObject('User does not exist. Create a user before posting a review', event.headers, 'User does not exist. Create a user before posting a review', errorTypes.default.badQuery)
            }
            else{
                const productVal = await addOrUpdateProduct(productBrand, productName, productURI);
                const newReview = await reviewController.createNewReview(
                    userCheck,
                    productVal,
                    lengthOfUse,
                    imageName,
                    reviewText);
                responseVal = responseObj.constructResponseObject(`Created a new product review`, event.headers, 
                {
                    "user": newReview?.User,
                    "product": newReview?.Product,
                    "lengthOfUse": newReview?.LengthOfUse,
                    "imageName": newReview?.ImageName,
                    "reviewText": newReview?.ReviewText,
                    "reviewedAt": newReview?.ReviewedAt
                });
            }
        }
    }
    catch (err) {
        responseVal = responseObj.constructResponseObject(err.message || 'Internal server error', err.headers, err, err.name || errorTypes.default.serverError)
    }
    finally {
        return responseVal;
    }
}