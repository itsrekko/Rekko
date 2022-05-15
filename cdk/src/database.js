const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager({
    region: 'us-west-2'
});
const secretARN = 'arn:aws:secretsmanager:us-west-2:032629023661:secret:mongoDBUrl-cfcOhq';
const params = {
    SecretId: secretARN /* required */
};

secretsmanager.getSecretValue(params, function(err, data) {
    if (err){
        // an error occurred
        console.error.bind(err, err.stack);
    }
    else {
        // successful response
        console.log(data);
        let mongoDBURL = data.SecretString;
        if (!mongoDBURL){
            console.error('PLEASE ADD DB URI')
        }
        mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
});