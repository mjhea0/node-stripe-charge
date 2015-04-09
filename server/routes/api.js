var express = require('express'),
    router = express.Router(),
    passport = require('../auth'),
    Customer = require('../models/customer'),
    Product = require('../models/product');


// customers

router.get('/customers', function(req, res, next) {
  Customer.find({}, function(err, data) {
    if (err) {
      if (err) { return next(err); }
    } else {
      return res.send(data);
    }
  });
});

router.get('/customer/:id', function(req, res, next) {
  var userID = req.params.id;
  Customer.findById(userID, function(err, data) {
    if (err) {
      if (err) { return next(err); }
    } else {
      return res.send(data);
    }
  });
});


// products

router.get('/products', function(req, res, next) {
  Product.find({}, function (err, results) {
    if(err) {
      if (err) { return next(err); }
    } else {
      res.send(results);
    }
  });

});

router.get('/product/:id', function(req, res, next) {
  var productID = req.params.id;
  Product.findById(productID, function(err, results) {
    if(err) {
      if (err) { return next(err); }
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
