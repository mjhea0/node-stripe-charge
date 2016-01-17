var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../lib/auth');
var User = require('../models/user');
var Product = require('../models/product');



// ** users ** //

//get ALL users
router.get('/users', auth.ensureAuthenticated, function(req, res, next) {
  User.findQ()
  .then(function(users) {
    res.status(200)
    .json({
      status: 'success',
      data: users,
      message: 'Retrieved users'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

//get SINGLE user
router.get('/user/:id', auth.ensureAuthenticated, function(req, res, next) {
  User.findByIdQ(req.params.id)
  .then(function(user) {
    res.status(200)
    .json({
      status: 'success',
      data: user,
      message: 'Retrieved user'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new user

// update single user

// delete single user


module.exports = router;
