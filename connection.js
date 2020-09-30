const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

require('dotenv').config();
var dbUrl = process.env.DB_URL;
//var dbUrl = "mongodb+srv://root:OhKrNLVxKzHPYnEh@cluster0-r8mo4.mongodb.net/healthcare?retryWrites=true&w=majority";
//console.log(dbUrl)



mongoose.connect('mongodb+srv://root:b7WXz3uuvsz8inSJ@cluster0.5chth.mongodb.net/measurement?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;

module.exports = {
  User: require('./model/Clerk.js'),
  User: require('./model/Clinic.js'),
  User: require('./model/User.js'),
  User: require('./model/Post.js'),
}; 