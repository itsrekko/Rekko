const Response = require('../util/response');
const brandModel = require('../models/brand.model');
const responseObj = new Response();

exports.addNewBrand = async (brandName) => {
    const newBrand = new brandModel({
        Name: brandName,
    });
    await newBrand.save();
    return newBrand;
}

async function getAllBrands() {
    return await brandModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all brands with error: ${error}`)
    })
}

exports.getAllBrands = async (req, res, next) => {
    var responseVal = undefined;
    try{
        const mongoRequest = await getAllBrands();
        responseVal = responseObj.constructResponseObject(`Successfully fetched all brands`, req.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}
