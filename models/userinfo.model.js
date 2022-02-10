const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userInformationSchema = new Schema({
    UserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    LoginStatus: {
        type: Boolean,
        required: true
    },
    Timestamp: {
        type : Date, 
        default: Date.now
    }
});


module.exports = mongoose.model('UserInformation', userInformationSchema);