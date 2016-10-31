const express = require('express');
const router = express.Router();
const mongoose = require('mongoose-q')(require('mongoose'));

const passport = require('../../lib/auth');
const helpers = require('../../lib/helpers');
const Store = require('../../models/store');


// ** stores ** //

// get ALL stores
router.get('/stores', helpers.ensureAdminJSON,
  (req, res, next) => {
    Store.findQ()
      .then(stores => {
        res.status(200)
          .json({
            status: 'success',
            data: stores,
            message: 'Retrieved stores.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// get SINGLE store
router.get('/stores/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    Store.findByIdQ(req.params.id)
      .then(store => {
        res.status(200)
          .json({
            status: 'success',
            data: store,
            message: 'Retrieved store.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// add new product
router.post('/stores', helpers.ensureAdminJSON,
  (req, res, next) => {
    const store = new Store({
      name: req.body.name,
      description: req.body.description
    });
    store.saveQ()
      .then(result => {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Created store.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// update single store
router.put('/stores/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    const options = {
      new: true,
      upsert: true
    };

    Store.findByIdAndUpdateQ(id, update, options)
      .then(result => {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Updated store.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// delete SINGLE store
router.delete('/stores/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    Store.findByIdAndRemoveQ(req.params.id)
      .then(store => {
        res.status(200)
          .json({
            status: 'success',
            data: store,
            message: 'Removed store.'
          });
      })
      .then(err => {
        return next(err);
      })
      .done();
  });


module.exports = router;
