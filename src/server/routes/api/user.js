var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var passport = require('../../lib/auth');
var helpers = require('../../lib/helpers');
var User = require('../../models/user');


// ** users ** //

// get ALL users
router.get('/users', helpers.ensureAdminJSON,
  function(req, res, next) {
  User.findQ()
  .then(function(users) {
    return res.status(200)
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

// get SINGLE user
router.get('/users/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
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
router.post('/users', helpers.ensureAdminJSON,
  function(req, res, next) {
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
        var user = new User(req.body);
        user.saveQ()
          .then(function(result) {
            res.status(200)
            .json({
              status: 'success',
              data: {
                email: user.email,
                admin: user.admin
              },
              message: 'Created user.'
            });
          })
          .catch(function(err) {
            return next(err);
          })
          .done();
      }
    })
    .catch(function(err) {
      return next(err);
    })
    .done();
});

// update SINGLE user
router.put('/users/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  User.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated user.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE user
router.delete('/users/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
  User.findByIdAndRemoveQ(req.params.id)
  .then(function(user) {
    res.status(200)
    .json({
      status: 'success',
      data: user,
      message: 'Removed user.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});


module.exports = router;