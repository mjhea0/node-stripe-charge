const express = require('express');
const router = express.Router();

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

module.exports = router;
