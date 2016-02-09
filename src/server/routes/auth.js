var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  var newUser = {
    email: req.body.email,
    password: req.body.password
  };
  User.create(newUser, function(err, user) {
    if (user) {
      req.session.id = user._id;
      req.flash('success', 'Successfully registered (and logged in).');
      res.redirect('/');
    } else {
      req.flash('danger', 'Sorry. That email already exists. Try again.');
      res.redirect('/auth/register');
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  };
  User.authenticate(user, function(err, user) {
    if (!err && user !== null) {
      req.session.id = user._id;
      req.flash('success', 'Successfully logged in.');
      res.redirect('/');
    } else {
      req.flash('danger', 'Sorry. That email and/or password is incorrect. Try again.');
      res.redirect('/auth/login');
    }
  });
});


module.exports = router;