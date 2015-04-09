var express = require('express');
var router = express.Router();
var Customer = require('../models/customer.js');
var config = require('../_config.js');
var stripe = require('stripe')(config.StripeKeys.secretKey);


router.get('/charge', function(req, res, next) {
  res.render('charge');
});

router.get('/stripe', function(req, res, next) {
  res.send("Scram!");
});

router.post('/stripe', function(req, res, next) {
  // Obtain StripeToken
  var transaction = req.body;
  var stripeToken = transaction.stripeToken;
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
    amount: 10*100,
    currency: 'USD',
    card: stripeToken
  };
  stripe.charges.create(charge,
    function(err, charge) {
      if(err) {
        if (err) { return next(err); }
      } else {
        console.log('Successful charge sent to Stripe!');
        res.render('congrats', { charge: charge.amount/100.00});
      }
    }
  );
});


module.exports = router;