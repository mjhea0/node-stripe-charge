var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../lib/auth');
var User = require('../models/user');
var Store = require('../models/store');


// ** stores ** //

// get ALL stores
router.get('/stores', function(req, res, next) {
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
router.get('/store/:id', function(req, res, next) {
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

// add new store
router.post('/stores', auth.ensureAdmin, function(req, res, next) {
  var store = new Store({
    'name': req.body.name,
    'description': req.body.description,
    'cost': req.body.cost
  });
  store.save(function() {
    res.status(200)
    .json({
      status: 'success',
      data: {
        name: store.name,
        description: store.description,
        cost: store.cost
      },
      message: 'Created store.'
    });
  });
});

// update single store
router.put('/store/:id', auth.ensureAdmin, function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  store.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated store.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE store
router.delete('/store/:id', auth.ensureAdmin, function(req, res, next) {
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
