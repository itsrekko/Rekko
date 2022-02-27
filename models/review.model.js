const mongoose = require('mongoose');
const reviewSchema = require('./schemas/review.schema');

// uncomment the following line to have a unique review
// need to think this through
module.exports = mongoose.model('Review', reviewSchema);