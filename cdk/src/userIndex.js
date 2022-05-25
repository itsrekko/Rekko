require('./database');
const Response = require('./util/response');
const userModel = require('./models/user.model');
const userInfoModel = require('./models/userInformation.model');
const errorTypes = require('./consts/errorTypes');
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

async function addNewUser(userName) {
    let newUser = new userModel({
        UserName: userName
    });
    await newUser.save();
    return newUser;
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

exports.getAllUsers = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    var responseVal = undefined;
    try{
        const mongoRequest = await getAllUsers();
        responseVal = responseObj.constructResponseObject(`Successfully fetched all users`, event.headers, mongoRequest);
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error, error.name)
    }
    finally{
        return responseVal;
    }
}

exports.createNewUser = async (event, context) => {
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;
    
    const body = JSON.parse(event.body);
    console.log(body);
    const userName = body.userName;
    var responseVal = undefined;
    try{
        // response validation
        if (!userName || userName === null || userName === undefined){
            responseVal = responseObj.constructResponseObject(`Request body requires param userName`, event.headers, `Request body requires param userName`, errorTypes.default.badQuery)
        }
        else{
            // check if the user exists first
            let userCheck = await this.checkIfUserExists(userName);
            if (userCheck){
                // create a login value
                await updateUserName(userCheck?._id);
                responseVal = responseObj.constructResponseObject(`User with login ${userName} already exists`, event.headers, 
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
                responseVal = responseObj.constructResponseObject(`Successfully created a user with login ${userName}`, event.headers, mongoRequest);
            }
        }
        
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message || 'Internal server error', error.headers, error, error.name || errorTypes.default.serverError)
    }
    finally{
        console.log(responseVal);
        return responseVal;
    }
}