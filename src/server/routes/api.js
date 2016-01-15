var express = require('express'),
    router = express.Router(),
    passport = require('../auth'),
    User = require('../models/user'),
    Product = require('../models/product');


// users

router.get('/users', function(req, res, next) {
  User.find({}, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.send(data);
    }
  });
});

router.get('/user/:id', function(req, res, next) {
  var userID = req.params.id;
  User.findById(userID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.send(data);
    }
  });
});


// products

router.get('/products', ensureAuthenticated, function(req, res, next) {
  Product.find({}, function (err, results) {
    if(err) {
      return next(err);
    } else {
      res.send(results);
    }
  });
});

router.post('/products', function(req, res) {
  var product = new Product({ name: req.body.name, amount: req.body.amount });
  product.save(function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.send(results);
    }
  });
});

router.get('/product/:id', function(req, res, next) {
  var productID = req.params.id;
  Product.findById(productID, function(err, results) {
    if(err) {
      return next(err);
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
