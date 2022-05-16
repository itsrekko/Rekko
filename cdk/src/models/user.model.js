const mongoose = require('mongoose');
const userSchema = require('./schemas/user.schema');

module.exports = mongoose.model('User', userSchema);