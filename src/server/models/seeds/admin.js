var User = require('../user');
var passport = require('passport');

var seedAdmin = function() {

  User.find({}, function(err, documents) {

    if(documents.length === 0){

      User.register(new User({username: 'ad@min.com', admin: true}),
        'admin', function(err, user) {});

      console.log('Dummy admin added!');
    }

  });

};

module.exports = seedAdmin;