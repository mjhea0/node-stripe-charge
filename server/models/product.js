var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Product = new Schema({
  name: String,
  amount: Number,
  currency: String,
  forSale: { type: Boolean, default: false },
});

Product.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', Product);