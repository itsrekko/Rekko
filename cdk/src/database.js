const mongoose = require('mongoose');

// TODO: Update this to an env
let dev_url = 'mongodb+srv://admin:admin@cluster0.e4fma.mongodb.net/mohaimenTestDB?retryWrites=true&w=majority'; // add local URL for testing here
let mongoDB = dev_url;
if (!mongoDB){
    console.error('PLEASE ADD DB URI')
}
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));