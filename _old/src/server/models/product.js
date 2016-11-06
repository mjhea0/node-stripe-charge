const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: String,
  amount: Number,
  currency: {
    type: String,
    default: 'USD'
  },
  forSale: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('products', Product);
