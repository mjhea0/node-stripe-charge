var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {type: String, unique: true},
  password: String,
  products: [
    {
      productID: String,
      token: String,
      time: { type: Date, default: Date.now }
    }
  ],
  admin: { type: Boolean, default: false }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);