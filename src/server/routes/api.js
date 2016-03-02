var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var passport = require('../lib/auth');
var helpers = require('../lib/helpers');
var User = require('../models/user');
var Product = require('../models/product');


// ** users ** //

// get ALL users
router.get('/users', helpers.ensureAdmin, function(req, res, next) {
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

// get SINGLE user
router.get('/users/:id', helpers.ensureAdmin, function(req, res, next) {
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
          password: req.body.password,
          admin: req.body.admin || false
        });
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
router.put('/users/:id', helpers.ensureAdmin, function(req, res, next) {
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
router.delete('/users/:id', helpers.ensureAdmin, function(req, res, next) {
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


// ** products ** //

// get ALL products
router.get('/products', helpers.ensureAdmin, function(req, res, next) {
  Product.findQ()
  .then(function(products) {
    res.status(200)
    .json({
      status: 'success',
      data: products,
      message: 'Retrieved products.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// get SINGLE product
router.get('/products/:id', helpers.ensureAdmin, function(req, res, next) {
  Product.findByIdQ(req.params.id)
  .then(function(product) {
    res.status(200)
    .json({
      status: 'success',
      data: product,
      message: 'Retrieved product.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new product
router.post('/products', function(req, res, next) {
  var product = new Product({
    name: req.body.name,
    amount: req.body.amount
  });
  product.saveQ()
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Created product.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// update SINGLE product
router.put('/products/:id', helpers.ensureAdmin, function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  Product.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated product.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE product
router.delete('/products/:id', helpers.ensureAdmin, function(req, res, next) {
  Product.findByIdAndRemoveQ(req.params.id)
  .then(function(product) {
    res.status(200)
    .json({
      status: 'success',
      data: product,
      message: 'Removed product.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});


module.exports = router;