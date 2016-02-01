var express = require('express');
var router = express.Router();

var auth = require('../lib/auth');
var User = require('../models/user');


router.get('/login/', function(req, res, next) {
  res.render('login', {user: req.user});
});

router.post('/login', function(req, res) {
  User.findOneQ({email: req.body.email}, '+password', function(err, user) {
    if (!user) {
      return res.status(401)
      .json({
        status: 'error',
        data: null,
        message: 'Incorrect email.'
      });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401)
        .json({
          status: 'error',
          data: null,
          message: 'Wrong email address and/or password.'
        });
      }
      user = user.toObject();
      delete user.password;
      var token = auth.createToken(user);
      req.flash('success', 'Successfully logged in.');
      return res.redirect('/');
    });
  });
});


module.exports = router;
