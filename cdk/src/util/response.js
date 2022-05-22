const errorTypes = require('../consts/errorTypes');
module.exports = class Response {
    constructor(){
        this.statusCode = 500; // default error code
    }

    constructResponseObject(message, headerJSON = undefined, data = undefined, errorValues = undefined){
        // construct statusCode
        if (errorValues === undefined){
            this.statusCode = 200;
        }
        if (errorValues === errorTypes.default.accessDenied){
            this.statusCode = 403;
        }
        if (errorValues === errorTypes.default.serverError){
            this.statusCode = 502;
        }
        if (errorValues === errorTypes.default.badQuery){
            this.statusCode = 404;
        }
        if (errorValues === errorTypes.default.duplicateUserError){
            this.statusCode = 409;
        }
        // construct headers
        // these can be tightened up in the future
        this.headers = {
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "X-Requested-With": "*"
        }

        if (this.statusCode !== 200){
            this.headers['Error'] = errorValues
        }
        for (let val in headerJSON){
            this.headers[val] = headerJSON[val]
        }
        
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: this.data === null | undefined ? message : JSON.stringify(data) 
        }
    }
}