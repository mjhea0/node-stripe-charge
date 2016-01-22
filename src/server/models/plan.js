var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Plan = new Schema({
  name: String,
  description: String,
  cost: Number
});


module.exports = mongoose.model('plans', Plan);