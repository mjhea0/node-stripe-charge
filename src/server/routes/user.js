var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../lib/auth');
var User = require('../models/user');
var config = require('../../_config');



// ** users ** //

//get ALL users
router.get('/users', auth.ensureAdmin, function(req, res, next) {
  User.findQ()
  .then(function(users) {
    res.status(200)
    .json({
      status: 'success',
      data: users,
      message: 'Retrieved users.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

//get SINGLE user
router.get('/user/:id', auth.ensureAdmin, function(req, res, next) {
  User.findByIdQ(req.params.id)
  .then(function(user) {
    res.status(200)
    .json({
      status: 'success',
      data: user,
      message: 'Retrieved user.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new user
router.post('/users', function(req, res, next) {
  User.findOneQ({email: req.body.email})
  .then(function(existingUser) {
    if (existingUser) {
      res.status(409)
      .json({
        status: 'error',
        data: null,
        message: 'Email is already in use.'
      });
    } else {
      var user = new User({
        email: req.body.email,
        password: req.body.password
      });
      user.save(function() {
        var token = auth.createToken(user);
        res.status(200)
        .json({
          status: 'success',
          data: {
            email: user.email,
            admin: user.admin
          },
          message: 'Created user.'
        });
      });
    }
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});


// update single user
router.put('/user/:id', auth.ensureAdmin, function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  User.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.json(result);
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE user
router.delete('/user/:id', auth.ensureAdmin, function(req, res, next) {
  User.findByIdAndRemoveQ(req.params.id)
  .then(function(user) {
    res.status(200)
    .json({
      status: 'success',
      data: user,
      message: 'Removed user.'
    });
  })
  .then(function(err) {
    return next(err);
  })
  .done();
});


module.exports = router;
