var User = require('../models/user.js');


function ensureAuthenticated(req, res, next) {
  if (req.session.id !== null && req.session.id !== undefined) {
    return next();
  } else {
   res.redirect('/auth/login');
  }
}

function ensureAdmin(req, res, next) {
  if (req.session.id !== null && req.session.id !== undefined) {
    User.findById(req.session.id, function(err, user) {
      if (!user.admin) {
        res.redirect('/auth/login');
      }
      return next();
    });
  } else {
   res.redirect('/auth/login');
  }
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  ensureAdmin: ensureAdmin
};