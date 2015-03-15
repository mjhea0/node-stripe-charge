var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
  name: String,
  amount: Number,
  currency: String,
  forSale: { type: Boolean, default: true }
});

module.exports = mongoose.model('products', Product);