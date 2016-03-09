function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  res.redirect('/auth/login');
}

function ensureAdminJSON(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  res.status(401)
  .json({
    status: 'error',
    message: 'You do not have permission to do that.'
  });
}

function loginRedirect(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    return next();
  }
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  ensureAdmin: ensureAdmin,
  ensureAdminJSON: ensureAdminJSON,
  loginRedirect: loginRedirect
};