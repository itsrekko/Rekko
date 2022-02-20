const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    UserLogin: { 
        type: String, 
        unique: true,
        index: true,
        required: true
    },
});