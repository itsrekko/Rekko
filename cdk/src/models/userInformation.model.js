const mongoose = require('mongoose');
const userInformationSchema = require('./schemas/userInformation.schema');

module.exports = mongoose.model('UserInformation', userInformationSchema);