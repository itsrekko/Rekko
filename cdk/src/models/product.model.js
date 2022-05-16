const mongoose = require('mongoose');
const productSchema = require('./schemas/product.schema');

module.exports = mongoose.model('Product', productSchema);