var passport = require('passport');
var User = require('../user');


var seedAdmin = function() {
  User.find({}, function(err, documents) {
    if (documents.length === 0){
      var password = 'admin';
      var user = new User({
        email: 'ad@min.com',
        admin: true,
        password: password
      });
      user.generateHash(password, function(err, hash) {
        user.password = hash;
        user.save();
        console.log('Dummy admin added!');
      });
    }
  });
};

module.exports = seedAdmin;