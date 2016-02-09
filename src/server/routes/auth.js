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
      res.redirect("/auth/register");
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = router;