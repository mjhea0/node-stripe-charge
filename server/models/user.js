var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);