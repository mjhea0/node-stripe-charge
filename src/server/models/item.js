var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
  name: String,
  descriptiont: String,
  cost: Number
});


module.exports = mongoose.model('items', Item);