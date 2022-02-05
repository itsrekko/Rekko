const Response = require('../util/response');
const userModel = require('../models/user.model');
const errorTypes = require('../consts/errorTypes');
const responseObj = new Response();

async function getAllUsers(){

}

async function checkIfUserExists(userLogin){
    return await userModel.exists({UserLogin: userLogin})
    .then(result => {
        return result;
    })
    .catch(error => {
        console.error(`Failed to check if userLogin exists with error: ${error}`);
        throw(error);
    });
}

async function addNewUser(userLogin){
    let newUser = new userModel({
        UserLogin: userLogin
    });

    await newUser.save(function(err){
        if (err){
            console.error(`Failed to create new user with error: ${err}`);
            throw(err);
        }
    });

    return newUser;
}

exports.test = (req, res, next) => {
    // test route
    responseVal = responseObj.constructResponseObject(`Hi user you have made a successful test GET request`)
    res.send("Hello darkness my old friend");
};

exports.home = (req, res, next) => {
    res.render('index', { title: 'Express' });
};

exports.createNewUser = async (req, res, next) => {
    const userLogin = req.body.userLogin;
    var responseVal = undefined;
    try{
        // response validation
        if (!userLogin || userLogin === null || userLogin === undefined){
            // user login has not been passed in
            responseVal = responseObj.constructResponseObject(`Response body requires param userLogin`, req.headers, errorTypes.default.badQuery)
        }
        else{
            // check if the user exists first
            let userCheck = await checkIfUserExists(userLogin);
            if (userCheck){
                responseVal = responseObj.constructResponseObject(`User with login ${userLogin} already exists`, req.headers, errorTypes.default.duplicateUserError)
            }
            else{
                const mongoRequest = await addNewUser(userLogin);
                if (mongoRequest){
                    responseVal = responseObj.constructResponseObject(`Successfully created a user with login ${userLogin}`, req.headers);
                }
            }
        }
        
    }
    catch (error){
        responseVal = responseObj.constructResponseObject(error.message, error['statusCode'], error.name)
    }
    finally{
        res.status(responseVal.statusCode).send(responseVal);
    }
}