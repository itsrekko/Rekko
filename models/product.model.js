const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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

module.exports = ProductModel = mongoose.model('Product', ProductSchema);