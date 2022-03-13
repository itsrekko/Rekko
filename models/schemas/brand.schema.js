const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    Name: {
        type: String,
        required: true
    }
})