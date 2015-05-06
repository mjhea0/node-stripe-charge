var express = require('express'),
    router = express.Router(),
    passport = require('../auth'),
    moment = require('moment'),
    User = require('../models/user');


router.get('/register', function(req, res, next){
  res.render('register', { user: req.user });
});


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      req.flash('success', 'Sorry. That username already exists. Try again.');
      return res.redirect("/auth/register");
    } else {
      passport.authenticate('local')(req, res, function() {
        req.flash('success', 'Successfully registered (and logged in).');
        return res.redirect('/');
      });
    }
  });
});


router.get('/login', function(req, res, next){
  res.render('login', { user: req.user });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('success', 'Sorry. That username and/or password is incorrect. Try again.');
      return res.redirect('/auth/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash('success', 'Successfully logged in.');
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', ensureAuthenticated, function(req, res){
  req.logout();
  req.flash('success', 'Successfully logged out.');
  res.redirect('/');
});

router.get('/profile', ensureAuthenticated, function(req, res){
  res.render('profile', { user: req.user });
});

router.get('/admin', ensureAuthenticated, function(req, res){
  return User.find({}, function(err, data) {
    if (err) {
      return next(err);
    } else {
      var allProducts = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].products.length > 0) {
          for (var j = 0; j < data[i].products.length; j++) {
            allProducts.push(data[i].products[j]);
          }
        }
      }
      allProducts.reverse();
      return res.render('admin', {data: allProducts, moment: moment, user: req.user});
    }
  });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}


module.exports = router;
