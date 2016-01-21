var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../lib/auth');
var User = require('../models/user');
var Item = require('../models/item');
var config = require('../../_config');



// ** items ** //

// get ALL items
router.get('/items', function(req, res, next) {
  Item.findQ()
  .then(function(items) {
    res.status(200)
    .json({
      status: 'success',
      data: items,
      message: 'Retrieved items.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// get SINGLE item
router.get('/item/:id', function(req, res, next) {
  Item.findByIdQ(req.params.id)
  .then(function(item) {
    res.status(200)
    .json({
      status: 'success',
      data: item,
      message: 'Retrieved item.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new item
router.post('/items', auth.ensureAdmin, function(req, res, next) {
  var item = new Item({
    'name': req.body.name,
    'description': req.body.description,
    'cost': req.body.cost
  });
  item.save(function() {
    res.status(200)
    .json({
      status: 'success',
      data: {
        name: item.name,
        description: item.description,
        cost: item.cost
      },
      message: 'Created item.'
    });
  });
});

// update single item
router.put('/item/:id', auth.ensureAdmin, function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  Item.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated item.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE item
router.delete('/item/:id', auth.ensureAdmin, function(req, res, next) {
  Item.findByIdAndRemoveQ(req.params.id)
  .then(function(item) {
    res.status(200)
    .json({
      status: 'success',
      data: item,
      message: 'Removed item.'
    });
  })
  .then(function(err) {
    return next(err);
  })
  .done();
});


module.exports = router;
