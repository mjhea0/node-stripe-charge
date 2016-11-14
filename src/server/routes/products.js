const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const routeHelpers = require('./_helpers');
const productQueries = require('../db/queries/products');

router.get('/', (req, res, next) => {
  productQueries.getAllProducts()
  .then((products) => {
    const renderObject = {
      title: 'all products',
      user: req.user,
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
      user: req.user,
      messages: req.flash('messages'),
      product: product
    };
    res.render('product.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/charge', authHelpers.loginRequired, (req, res, next) => {
  const productID = parseInt(req.params.id);
  productQueries.getSingleProduct(productID)
  .then((product) => {
    const renderObject = {
      title: `buy ${product.name}`,
      user: req.user,
      messages: req.flash('messages'),
      product: product
    };
    res.render('charge.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/:id/stripe', authHelpers.loginRequired, (req, res, next) => {
  const stripeToken = req.body.stripeToken;
  const productID = parseInt(req.body.productID);
  const productAmount = req.body.productAmount;
  const userID = parseInt(req.user.id);
  // validate product
  return routeHelpers.validateProduct(productID, productAmount)
  .then((product) => {
    // create charge
    const charge = {
      amount: productAmount * 100,
      currency: product.currency,
      card: stripeToken
    };
    routeHelpers.createCharge(charge, productID, userID);
  })
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: `Thanks for purchasing a ${req.body.productName}!`
    });
    res.redirect('/products');
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/', authHelpers.adminRequired, (req, res, next) => {
  productQueries.addProduct(req.body)
  .then((product) => {
    if (!product) { throw new Error('Something went wrong'); }
    req.flash('messages', {
      status: 'success',
      value: 'Product added!'
    });
    return res.redirect('/');
  })
  .catch((err) => { next(err); });
});

module.exports = router;
