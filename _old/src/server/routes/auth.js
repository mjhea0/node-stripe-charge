const express = require('express'),
  router = express.Router(),
  moment = require('moment'),
  passport = require('../lib/auth'),
  helpers = require('../lib/helpers'),
  User = require('../models/user');


router.get('/register', (req, res) => {
  res.render('register', {
    user: req.user,
    message: req.flash('message')[0]
  });
});


router.post('/register', (req, res, next) => {
  const newUser = new User(req.body);
  newUser.generateHash(req.body.password, (err, hash) => {
    if (err) {
      return next(err);
    }
    newUser.password = hash;
    newUser.save((err) => {
      if (err) {
        req.flash('message', {
          status: 'danger',
          value: 'Sorry. That email already exists. Try again.'
        });
        return res.redirect('/auth/register');
      }
      req.logIn(newUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash('message', {
          status: 'success',
          value: 'Successfully registered (and logged in).'
        });
        return res.redirect('/');
      });
    });
  });
});

router.get('/login', helpers.loginRedirect, (req, res) => {
  res.render('login', {
    user: req.user,
    message: req.flash('message')[0]
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('message', {
        status: 'danger',
        value: 'Invalid username and/or password.'
      });
      return res.redirect('/auth/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('message', {
        status: 'success',
        value: 'Welcome!'
      });
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', helpers.ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash('message', {
    status: 'success',
    value: 'Successfully logged out.'
  });
  res.redirect('/');
});

router.get('/profile', helpers.ensureAuthenticated, (req, res) => {
  res.render('profile', {
    user: req.user,
    message: req.flash('message')[0]
  });
});

router.get('/admin', helpers.ensureAuthenticated, (req, res, next) => {
  return User.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    const allProducts = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].products.length > 0) {
        for (let j = 0; j < data[i].products.length; j++) {
          allProducts.push(data[i].products[j]);
        }
      }
    }
    allProducts.reverse();
    return res.render('admin', {
      moment,
      data: allProducts,
      user: req.user
    });
  });
});


module.exports = router;
