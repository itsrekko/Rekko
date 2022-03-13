const mongoose = require('mongoose');
const brandSchema = require('./schemas/brand.schema');

module.exports = mongoose.model('Brand', brandSchema);