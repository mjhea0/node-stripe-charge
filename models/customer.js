var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Customer = new Schema({
  token: String,
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Customer', Customer);
