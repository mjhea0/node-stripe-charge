var User = require('../models/user.js');


function ensureAuthenticated(req, res, next) {
  if (req.session.email !== null && req.session.email !== undefined) {
    return next();
  } else {
    req.flash('danger', 'You must be logged in to do that.');
    res.redirect('/auth/login');
  }
}

function ensureAdmin(req, res, next) {
  if (req.session.email !== null && req.session.email !== undefined) {
    User.findById(req.session.email, function(err, user) {
      if (!user.admin) {
        res.redirect('/auth/login');
      }
      return next();
    });
  } else {
   res.redirect('/auth/login');
  }
}

function loginRedirect(req, res, next) {
  if (req.session.email) {
    req.flash('danger', 'You are already logged in');
    res.redirect('/');
  } else {
    return next();
  }
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  ensureAdmin: ensureAdmin,
  loginRedirect: loginRedirect
};