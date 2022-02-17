const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    ProductBrand: {
        type: String, 
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductURI: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('Product', productSchema);