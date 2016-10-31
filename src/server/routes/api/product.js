const express = require('express');
const router = express.Router();
const mongoose = require('mongoose-q')(require('mongoose'));

const passport = require('../../lib/auth');
const helpers = require('../../lib/helpers');
const Product = require('../../models/product');


// ** products ** //

// get ALL products
router.get('/products', helpers.ensureAdminJSON,
  (req, res, next) => {
    Product.findQ()
      .then(products => {
        res.status(200)
          .json({
            status: 'success',
            data: products,
            message: 'Retrieved products.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// get SINGLE product
router.get('/products/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    Product.findByIdQ(req.params.id)
      .then(product => {
        res.status(200)
          .json({
            status: 'success',
            data: product,
            message: 'Retrieved product.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// add new product
router.post('/products', helpers.ensureAdminJSON,
  (req, res, next) => {
    const product = new Product({
      name: req.body.name,
      amount: req.body.amount
    });
    product.saveQ()
      .then(result => {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Created product.'
          });
      })
      .catch(err => {
        res.send(err);
      })
      .done();
  });

// update SINGLE product
router.put('/products/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    const options = {
      new: true,
      upsert: true
    };

    Product.findByIdAndUpdateQ(id, update, options)
      .then(result => {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Updated product.'
          });
      })
      .catch(err => {
        res.send(err);
      })
      .done();
  });

// delete SINGLE product
router.delete('/products/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    Product.findByIdAndRemoveQ(req.params.id)
      .then(product => {
        res.status(200)
          .json({
            status: 'success',
            data: product,
            message: 'Removed product.'
          });
      })
      .catch(err => {
        res.send(err);
      })
      .done();
  });


module.exports = router;
