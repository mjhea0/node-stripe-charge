var express = require('express'),
    Product = require('../models/product'),
    router = express.Router(),
    passport = require('../auth');


// ensure authenticated - add!

// GET products
router.get('/products', function(req, res, next) {

  Product.find({}, function (err, results) {
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });

});

// GET product
router.get('/product/:id', function(req, res, next) {

  Product.findById(id, function(err, results) {
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });

});

// POST product
router.post('/product/:id', function(req, res, next) {

  var newProduct = req.body;
  var product = new Product(newProduct);

  product.save(function(err, results){
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });

});

// PUT product
router.put('/product/:id', function(req, res, next) {

  // var productID = req.params.SOMETHING;

  Product.findByIdAndUpdate(productID, PAYLOAD, function(err, results){
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });

});

// DELETE product
router.delete('/product/:id', function(req, res, next) {

  Product.findByIdAndRemove(id, function(err, results){
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });

});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}

module.exports = router;