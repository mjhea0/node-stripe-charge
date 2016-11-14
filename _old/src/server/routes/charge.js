const express = require('express'),
  router = express.Router(),
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const helpers = require('../lib/helpers'),
  User = require('../models/user.js'),
  Product = require('../models/product.js');


router.get('/products', (req, res, next) => {
  return Product.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    return res.render('products', {
      products: data,
      user: req.user
    });
  });
});

router.get('/product/:id', (req, res, next) => {
  const productID = req.params.id;
  Product.findById(productID, (err, data) => {
    if (err) {
      return next(err);
    }
    if (!req.user) {
      req.flash('message', {
        status: 'danger',
        value: 'Please log in to Purchase!'
      });
    }
    return res.render('product', {
      product: data,
      user: req.user,
      message: req.flash('message')[0]
    });
  });
});

router.get('/charge/:id', helpers.ensureAuthenticated, (req, res, next) => {
  const productID = req.params.id;
  return Product.findById(productID, (err, data) => {
    if (err) {
      return next(err);
    }
    return res.render('charge', {
      product: data,
      user: req.user
    });
  });
});

router.get('/stripe', (req, res) => {
  res.send('Scram!');
});


router.post('/stripe', helpers.ensureAuthenticated, (req, res, next) => {
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var userID = req.user._id;
  // Simple validation
  Product.findById(req.body.productID, (err, data) => {
    if (err) {
      return next(err);
    }
    if (parseInt(req.body.productAmount) !== data.amount) {
      req.flash('message', {
        status: 'danger',
        value: 'Error!'
      });
      return res.redirect('/');
    }
    // Get product details
    User.findById(userID, (err, data) => {
      if (err) {
        return next(err);
      }
      data.products.push({
        productID: req.body.productID,
        token: stripeToken });
      data.save();
    });
    // Create Charge
    const charge = {
      amount: parseInt(req.body.productAmount) * 100,
      currency: 'USD',
      card: stripeToken
    };
    stripe.charges.create(charge, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('message', {
        status: 'success',
        value: `Thanks for purchasing a ${req.body.productName}!`
      });
      res.redirect('auth/profile');
    });
  });
});


module.exports = router;