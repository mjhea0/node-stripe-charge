var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var passport = require('../../lib/auth');
var helpers = require('../../lib/helpers');
var Product = require('../../models/product');


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
router.post('/products', helpers.ensureAdmin, function(req, res, next) {
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