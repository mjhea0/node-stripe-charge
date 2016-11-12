const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const productQueries = require('../db/queries/products');

router.get('/', (req, res, next) => {
  productQueries.getAllProducts()
  .then((products) => {
    const renderObject = {
      title: 'all products',
      messages: req.flash('messages'),
      products: products
    };
    res.render('products.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id', (req, res, next) => {
  const productID = parseInt(req.params.id);
  productQueries.getSingleProduct(productID)
  .then((product) => {
    const renderObject = {
      title: product.name,
      messages: req.flash('messages'),
      product: product
    };
    res.render('product.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/charge', (req, res, next) => {
  const productID = parseInt(req.params.id);
  productQueries.getSingleProduct(productID)
  .then((product) => {
    const renderObject = {
      title: `buy ${product.name}`,
      messages: req.flash('messages'),
      product: product
    };
    res.render('charge.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/:id/stripe', (req, res, next) => {
  // Obtain StripeToken
  const stripeToken = req.body.stripeToken;
  const productID = parseInt(req.body.productID);
  const productAmount = req.body.productAmount;
  // Simple validation
  // (1) Does the product exist?
  productQueries.getSingleProduct(productID)
  .then((product) => {
    // (2) Does the product amount align?
    if (productAmount !== product.amount) return next('Incorrect Product');
    // create charge
    const charge = {
      amount: productAmount * 100,
      currency: product.currency,
      card: stripeToken
    };
    stripe.charges.create(charge, (err) => {
      if (err) return next(err);
      req.flash('messages', {
        status: 'success',
        value: `Thanks for purchasing a ${req.body.productName}!`
      });
      res.redirect('/products');
    });
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
