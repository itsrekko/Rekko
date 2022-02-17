
const Response = require('../util/response');
const responseObj = new Response();

exports.home = (req, res, next) => {
    /* GET home page. */
    res.render('index', { title: 'Express' });
}

exports.test = (req, res, next) => {
    // test route
    responseVal = responseObj.constructResponseObject(`Hi user you have made a successful test GET request`)
    res.send("Hello darkness my old friend");
};