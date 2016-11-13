const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.get('/login', authHelpers.loginRedirect, (req, res, next) => {
  res.render('login', {
    user: req.user,
    messages: req.flash('messages')
  });
});

router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((user) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { handleResponse(res, 500, 'error'); }
      if (!user) { handleResponse(res, 404, 'User not found'); }
      if (user) { handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('messages', {
        status: 'danger',
        value: 'Invalid username and/or password.'
      });
      return res.redirect('/auth/login');
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        req.flash('messages', {
          status: 'success',
          value: 'Welcome!'
        });
        return res.redirect('/');
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  return res.status(code).json({status: statusMsg});
}

module.exports = router;
