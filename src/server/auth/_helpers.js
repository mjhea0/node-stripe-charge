const bcrypt = require('bcryptjs');

const knex = require('../db/connection');
const userQueries = require('../db/queries/users');

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
  const errorMessage = 'You do not have permission to do that.';
  if (!req.user) {
    throw new Error(errorMessage);
  } else {
    return userQueries.getUserByEmail(req.user.email)
    .then((user) => {
      if (!user) {
        throw new Error(errorMessage);
      }
      if (!user.admin) {
        throw new Error(errorMessage);
      }
      return next();
    })
    .catch((err) => {
      return next(errorMessage); });
  }
}

function adminRequiredJSON(req, res, next) {
  const errorMessage = 'You do not have permission to do that.';
  if (!req.user) {
    throw new Error(errorMessage);
  } else {
    return userQueries.getUserByEmail(req.user.email)
    .then((user) => {
      if (!user) {
        throw new Error(errorMessage);
      }
      if (!user.admin) {
        throw new Error(errorMessage);
      }
      return next();
    })
    .catch((err) => {
      res.status(401).json({
        status: 'error',
        message: errorMessage
      });
    });
  }
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  loginRedirect,
  adminRequired,
  adminRequiredJSON
};
