const Response = require('../util/response');
const userModel = require('../models/user.model');
const userInfoModel = require('../models/userInformation.model');
const errorTypes = require('../consts/errorTypes');
const responseObj = new Response();

async function updateUserName(userID) {
    let newUserName  = new userInfoModel({
        UserId: userID,
        LoginStatus: true
    });
    await newUserName.save();
    return newUserName;
}

async function getAllUsers() {
    return await userModel.find({})
    .then(results => {
        return results;
    })
    .catch(error => {
        console.error(`Failed to fetch all users with error: ${error}`)
        throw (error);
    })
}

exports.checkIfUserExists = async (userName) => {
    return await userModel.findOne({UserName: userName})
    .then(result => {
        return result;
    })
    .catch(error => {
        console.error(`Failed to check if userName exists with error: ${error}`);
        throw(error);
    });
}

async function addNewUser(userName) {
    let newUser = new userModel({
        UserName: userName
    });
    await newUser.save();
    return newUser;
}

exports.getAllUsers = async (req, res, next) => {
    var responseVal = undefined;
    try{
        const mongoRequest = await getAllUsers();
        responseVal = responseObj.constructResponseObject(`Successfully fetched all users`, req.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], null, error.name)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}

exports.createNewUser = async (req, res, next) => {
    console.log(req.body);
    const userName = req.body.userName;
    var responseVal = undefined;
    try{
        // response validation
        if (!userName || userName === null || userName === undefined){
            responseVal = responseObj.constructResponseObject(`Request body requires param userName`, req.headers, null, errorTypes.default.badQuery)
        }
        else{
            // check if the user exists first
            let userCheck = await this.checkIfUserExists(userName);
            if (userCheck){
                // create a login value
                await updateUserName(userCheck?._id);
                responseVal = responseObj.constructResponseObject(`User with login ${userName} already exists`, req.headers, 
                {
                    "UserName": userName,
                    "_id": userCheck?._id,
                    "existingUser": true
                });
            }
            else{
                const mongoRequest = await addNewUser(userName);
                // create a login value
                await updateUserName(mongoRequest?._id);
                responseVal = responseObj.constructResponseObject(`Successfully created a user with login ${userName}`, req.headers, mongoRequest);
            }
        }
        
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message || 'Internal server error', error.headers, null, error.name || errorTypes.default.serverError)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}