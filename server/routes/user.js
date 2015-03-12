var express = require('express'),
    router = express.Router(),
    passport = require('../auth'),
    moment = require('moment'),
    Customer = require('../models/customer');


router.get('/login', function(req, res, next){
  res.render('login', { user: req.user });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login'}), function(req, res) {
    req.flash('success', 'Successfully logged in.');
    res.redirect('/admin');
  }
);

router.get('/logout', ensureAuthenticated, function(req, res){
  req.logout();
  req.flash('success', 'Successfully logged out.');
  res.redirect('/');
});

router.get('/admin', ensureAuthenticated, function(req, res){
  return Customer.find({}, function(err, data) {
    if (err) {
      return console.log('err');
    } else {
      return res.render('admin', {
        'allTokens': data,
        moment: moment,
        'total':data.length,
        user: req.user
      });
    }
  });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


module.exports = router;
