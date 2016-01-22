var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Store = new Schema({
  name: String,
  description: String
});


module.exports = mongoose.model('stores', Store);