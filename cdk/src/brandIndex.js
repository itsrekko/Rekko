require('./database');
const Response = require('./util/response');
const brandModel = require('./models/brand.model');
const responseObj = new Response();

async function getAllBrands() {
    return await brandModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all brands with error: ${error}`);
        return [];
    })
}

exports.addNewBrand = async (brandName) => {
    var responseVal = undefined;
    try{
        const newBrand = new brandModel({
            Name: brandName,
        });
        await newBrand.save();
        responseVal = responseObj.constructResponseObject('Added a new brand', 200);
    }
    catch(error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
   
    return newBrand;
}

exports.getAllBrands = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    var responseVal = undefined;
    try{
        const mongoRequest = await getAllBrands();
        responseVal = responseObj.constructResponseObject(`Successfully fetched all brands`, event.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
}
