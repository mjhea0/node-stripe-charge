var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Customer = new Schema({
  username: String,
  password: String,
  token: String,
  time: {type: Date, default: Date.now}
});

Customer.plugin(passportLocalMongoose);

module.exports = mongoose.model('customers', Customer);