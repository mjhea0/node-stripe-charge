var express = require('express');
var router = express.Router();
var Customer = require('../models/customer.js');
var config = require('../_config.js');
var stripe = require('stripe')(config.StripeKeys.secretKey);
var passport = require('passport');


router.get('/charge', function(req, res, next) {
  res.render('charge');
});

router.get('/stripe', function(req, res, next) {
  res.send("Scram!");
});

router.post('/stripe', function(req, res, next) {
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  Customer.register(new Customer(
    { username : req.body.username, token: stripeToken }),
    req.body.password,
    function(err, user) {
      if (err) {
        if (err) { return next(err); }
      } else {
        passport.authenticate('local')(req, res, function () {
          console.log("Success!");
        });
      }
    }
  );
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