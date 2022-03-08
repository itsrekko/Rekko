const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    ReviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    UserName: { 
        type: String,
        required: true
    },
    Text: {
        type: String, 
        required: true
    },
    Likes: {
        type: [String],
        uniqueItems: true,
        required: true,
        default: []
    },
    CommentedAt: {
        type : Date, 
        default: Date.now
    },
    isEdited: {
        type: Boolean,
        default: false
    }
    // isHidden flag needs to be discussed
});