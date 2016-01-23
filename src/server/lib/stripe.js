var config = require('../_config');
var stripe = require('stripe')(config.STRIPE_SECRET_KEY);


function createCustomer(req, res, next) {

  var user = req.user.id;
  var stripeToken = req.params.stripe_token;

  stripe.customers.create({
    description: 'Customer created for ' + user,
    source: stripeToken
  }, function(err, customer) {
    if (err) {
      return next( err );
    }
    if (!req.stripe) {
      req.stripe = {};
    }
    req.stripe.customer = customer;
    next();
  });

}

function createCharge(req, res, next) {

  var user = req.user.id;
  var stripeCustomer = req.stripe.customer_id;
  var amount = req.plan.amount;
  var name = req.plan.name;

  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: stripeCustomer,
    description: name + ' for ' + user
  }, function(err, charge) {
    if (err) {
      return next(err);
    }
    if (!req.stripe) {
      req.stripe = {};
    }
    req.stripe.charge = charge;
    next();
  });
}