var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var passport = require('../../lib/auth');
var helpers = require('../../lib/helpers');
var Store = require('../../models/store');


// ** stores ** //

// get ALL stores
router.get('/stores', helpers.ensureAdminJSON,
  function(req, res, next) {
  Store.findQ()
  .then(function(stores) {
    res.status(200)
    .json({
      status: 'success',
      data: stores,
      message: 'Retrieved stores.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// get SINGLE store
router.get('/stores/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
  Store.findByIdQ(req.params.id)
  .then(function(store) {
    res.status(200)
    .json({
      status: 'success',
      data: store,
      message: 'Retrieved store.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new product
router.post('/stores', helpers.ensureAdminJSON,
  function(req, res, next) {
  var store = new Store({
    'name': req.body.name,
    'description': req.body.description,
  });
  store.saveQ()
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Created store.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// update single store
router.put('/stores/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  Store.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated store.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// delete SINGLE store
router.delete('/stores/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
  Store.findByIdAndRemoveQ(req.params.id)
  .then(function(store) {
    res.status(200)
    .json({
      status: 'success',
      data: store,
      message: 'Removed store.'
    });
  })
  .then(function(err) {
    return next(err);
  })
  .done();
});


module.exports = router;