const bcrypt = require('bcryptjs');

const knex = require('../db/connection');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    email: req.body.email,
    password: hash
  })
  .returning('*');
}

function loginRequired(req, res, next) {
  if (!req.user) {
    req.flash('messages', {
      status: 'danger',
      value: 'Please log in.'
    });
    return res.redirect('/auth/login');
  }
  return next();
}

function loginRedirect(req, res, next) {
  if (req.isAuthenticated() && req.user) res.redirect('/');
  else return next();
}

function adminRequired(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  req.flash('messages', {
    status: 'danger',
    value: 'You do not have permission to do that.'
  });
  res.redirect('/auth/login');
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  loginRedirect,
  adminRequired
};
