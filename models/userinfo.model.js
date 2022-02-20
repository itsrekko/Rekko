const mongoose = require('mongoose');
const userInformationSchema = require('./schemas/userInfo.schema');

module.exports = mongoose.model('UserInformation', userInformationSchema);