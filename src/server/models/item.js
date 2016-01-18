var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
  name: String,
  description: String,
  cost: Number
});


module.exports = mongoose.model('items', Item);