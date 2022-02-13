const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
    UserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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

//reviewSchema.index({UserId: 1, ProductId: 1, ReviewText: 1}, {unique: true});
module.exports = mongoose.model('Review', reviewSchema);