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
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        };

        if (this.statusCode !== 200){
            this.headers['Error'] = errorValues
        }
        for (let val in headerJSON){
            this.headers[val] = headerJSON[val]
        }
        
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: JSON.stringify(data)
        }
    }
}