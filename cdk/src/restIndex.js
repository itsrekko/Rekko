const mongoose = require('mongoose');

exports.healthHandler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('You have reached the test endpoint. Wallahi Neyah Eh!'),
    };
    return response;
};
