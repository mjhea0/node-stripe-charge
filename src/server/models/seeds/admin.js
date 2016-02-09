var mongoose = require('mongoose-q')(require('mongoose'));

var User = require('../user');
var auth = require('../../lib/auth');


var seedAdmin = function() {
  User.findQ()
  .then(function(users) {
    if (users.length === 0) {
      var user = new User({
        email: 'ad@min.com',
        admin: true,
        password: 'admin'
      });
      user.save(function() {
        console.log('Dummy admin added!');
      });
    }
  })
  .done();
};

module.exports = seedAdmin;