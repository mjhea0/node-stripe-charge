var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Customer = new Schema({
  username: String,
  password: String,
  productID: String,
  token: String,
  time: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false }
});

Customer.plugin(passportLocalMongoose);

module.exports = mongoose.model('customers', Customer);