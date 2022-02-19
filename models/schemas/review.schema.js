const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    User: {
        UserLogin: { 
            type: String, 
            required: true
        },
        _id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
    },
    Product: {
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
        _id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
    },
    LengthOfUse: {
        type: String,
        default: '',
        required: true
    },
    ReviewText: { 
        type: String,
        required: true
    },
    ReviwedAt: {
        type : Date, 
        default: Date.now
    }
});