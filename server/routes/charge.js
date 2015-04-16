var express = require('express');
var router = express.Router();
var Customer = require('../models/customer.js');
var Product = require('../models/product.js');
var config = require('../_config.js');
var stripe = require('stripe')(config.StripeKeys.secretKey);
var passport = require('passport');


router.get('/products', function(req, res){
  return Product.find({}, function(err, data) {
    if (err) {
      if (err) { return next(err); }
    } else {
      return res.render('products', {products: data});
    }
  });
});

router.get('/charge/:id', function(req, res, next) {
  var productID = req.params.id;
  return Product.findById(productID, function(err, data) {
    if (err) {
      if (err) { return next(err); }
    } else {
      return res.render('charge', {product: data});
    }
  });
});

router.get('/stripe', function(req, res, next) {
  res.send("Scram!");
});

router.post('/stripe', function(req, res, next) {
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var newCustomer = new Customer({token: stripeToken });
  newCustomer.save(function(err) {
    if (err) {
      if (err) { return next(err); }
    } else {
      console.log("Success!");
    }
  });
  // Create Charge
  var charge =
  {
    amount: parseInt(req.body.amount)*100,
    currency: 'USD',
    card: stripeToken
  };
  stripe.charges.create(charge,
    function(err, charge) {
      if(err) {
        if (err) { return next(err); }
      } else {
        console.log('Successful charge sent to Stripe!');
        res.render('congrats', { charge: charge.amount/100.00, product: req.body.name});
      }
    }
  );
});


module.exports = router;