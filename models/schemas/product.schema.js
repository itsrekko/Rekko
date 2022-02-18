const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
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