const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user.schema');
const productSchema = require('./product.schema');

module.exports = new Schema({
    User: userSchema,
    Product: productSchema,
    ReviewText: { 
        type: String,
        required: true
    },
    ReviwedAt: {
        type : Date, 
        default: Date.now
    }
});