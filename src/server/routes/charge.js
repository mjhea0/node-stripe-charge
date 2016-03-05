var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var helpers = require('../lib/helpers');
var User = require('../models/user.js');
var Product = require('../models/product.js');


router.get('/products', function(req, res, next){
  return Product.find({}, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('products', {products: data, user: req.user});
    }
  });
});

router.get('/product/:id', function(req, res, next) {
  var productID = req.params.id;
  Product.findById(productID, function(err, data) {
    if(err) {
      return next(err);
    } else {
      return res.render('product', {product: data, user: req.user});
    }
  });
});

router.get('/charge/:id', helpers.ensureAuthenticated, function(req, res, next) {
  var productID = req.params.id;
  return Product.findById(productID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('charge', {product: data, user: req.user});
    }
  });
});

router.get('/stripe', function(req, res, next) {
  res.send("Scram!");
});


router.post('/stripe', helpers.ensureAuthenticated, function(req, res, next) {
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var userID = req.user._id;
  // Simple validation
  Product.findById(req.body.productID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      if (parseInt(req.body.productAmount) !== data.amount) {
        req.flash('message', {
          status: 'danger',
          value: 'Error!'
        });
        return res.redirect('/');
      } else {
        // Get product details
        User.findById(userID, function(err, data) {
          if (err) {
            return next(err);
          } else {
            data.products.push({ productID: req.body.productID, token: stripeToken });
            data.save();
          }
        });
        // Create Charge
        var charge = {
          amount: parseInt(req.body.productAmount)*100,
          currency: 'USD',
          card: stripeToken
        };
        stripe.charges.create(charge, function(err, charge) {
          if(err) {
            return next(err);
          } else {
            req.flash('message', {
              status: 'success',
              value: 'Thanks for purchasing a '+req.body.productName+'!'
            });
            res.redirect('auth/profile');
          }
        });
      }
    }
  });
});


module.exports = router;