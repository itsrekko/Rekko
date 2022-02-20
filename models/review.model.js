const mongoose = require('mongoose');
const reviewSchema = require('./schemas/review.schema');

// uncomment the following line to have a unique review
// need to think this through
//reviewSchema.index({UserId: 1, ProductId: 1, ReviewText: 1}, {unique: true});
module.exports = mongoose.model('Review', reviewSchema);