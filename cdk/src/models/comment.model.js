const mongoose = require('mongoose');
const commentSchema = require('./schemas/comment.schema');

module.exports = mongoose.model('Comment', commentSchema);