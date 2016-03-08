var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Store = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('stores', Store);