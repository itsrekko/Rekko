const mongoose = require('mongoose');
const mongoCreds = require('./consts/mongoCreds');

// TODO: Update this to an env
// myFirstDataBase is for testing. Please uncomment the line after to put it to prod
let dev_url =  `mongodb+srv://${mongoCreds.default.user}:${mongoCreds.default.password}@cluster0.e4fma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//let dev_url = `mongodb+srv://${mongoCreds.default.user}:${mongoCreds.default.password}@cluster0.e4fma.mongodb.net/rekkoInitial?retryWrites=true&w=majority`;
let mongoDB = process.env.MONGO_URI || dev_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));