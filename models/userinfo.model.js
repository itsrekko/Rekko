const mongoose = require('mongoose');
const userInformationSchema = require('./schemas/userinfo.schema');

module.exports = mongoose.model('UserInformation', userInformationSchema);