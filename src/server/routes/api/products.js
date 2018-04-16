const express = require('express');
const router = express.Router();

const authHelpers = require('../../auth/_helpers');
const productQueries = require('../../db/queries/products');

// get ALL products
router.get('/', authHelpers.adminRequiredJSON, (req, res, next) => {
  return productQueries.getAllProducts()
  .then((products) => {
    return res.status(200)
    .json({
      status: 'success',
      data: products,
      message: 'Retrieved all products.'
    });
  })
  .catch((err) => { return next(err); });
});

// get SINGLE product
router.get('/:id', authHelpers.adminRequiredJSON, (req, res, next) => {
  return productQueries.getSingleProduct(parseInt(req.params.id))
  .then((product) => {
    return res.status(200)
    .json({
      status: 'success',
      data: product,
      message: 'Retrieved single product.'
    });
  })
  .catch((err) => { return next(err); });
});

// add new product
router.post('/', authHelpers.adminRequiredJSON, (req, res, next) => {
  return productQueries.addProduct(req.body)
  .then((product) => {
    return res.status(200)
    .json({
      status: 'success',
      data: product[0],
      message: 'Created product.'
    });
  })
  .catch((err) => { return next(err); });
});

// update SINGLE product
router.put('/:id', authHelpers.adminRequiredJSON, (req, res, next) => {
  return productQueries.updateProduct(parseInt(req.params.id), req.body)
  .then((product) => {
    return res.status(200)
    .json({
      status: 'success',
      data: product[0],
      message: 'Updated product.'
    });
  })
  .catch((err) => { return next(err); });
});

// delete SINGLE product
router.delete('/:id', authHelpers.adminRequiredJSON, (req, res, next) => {
  return productQueries.deleteProduct(parseInt(req.params.id))
  .then((product) => {
    return res.status(200)
    .json({
      status: 'success',
      data: product[0],
      message: 'Removed product.'
    });
  })
  .catch((err) => { return next(err); });
});

module.exports = router;
