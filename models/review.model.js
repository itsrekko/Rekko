const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel = require('./user.model');
const productModel = require('./product.model');

let reviewSchema = new Schema({
    User: {
        userModel, 
        required: true
    },
    Product: {
        productModel,
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

// uncomment the following line to have a unique review
// need to think this through
//reviewSchema.index({UserId: 1, ProductId: 1, ReviewText: 1}, {unique: true});
module.exports = mongoose.model('Review', reviewSchema);