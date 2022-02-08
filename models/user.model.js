const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    UserLogin: { 
        type: String, 
        unique: true,
        index: true,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);