const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    UserName: { 
        type: String, 
        unique: true,
        index: true,
        required: true
    },
});