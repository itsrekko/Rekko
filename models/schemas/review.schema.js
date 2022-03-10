const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    User: {
        UserName: { 
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
    ImageName: {
        type: String,
        required: true, //every review should have a picture
        default: ''
    },
    LengthOfUse: {
        type: String,
        default: '',
        required: true
    },
    Likes: {
        type: [String],
        uniqueItems: true,
        required: true,
        default: []
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