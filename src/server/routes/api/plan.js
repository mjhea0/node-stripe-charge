var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../../lib/auth');
var User = require('../../models/user');
var Plan = require('../../models/plan');


// ** plans ** //

// get ALL plans
router.get('/plans', function(req, res, next) {
  Plan.findQ()
  .then(function(plans) {
    res.status(200)
    .json({
      status: 'success',
      data: plans,
      message: 'Retrieved plans.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// get SINGLE plan
router.get('/plan/:id', function(req, res, next) {
  Plan.findByIdQ(req.params.id)
  .then(function(plan) {
    res.status(200)
    .json({
      status: 'success',
      data: plan,
      message: 'Retrieved plan.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new plan
router.post('/plans', auth.ensureAdmin, function(req, res, next) {
  var plan = new Plan({
    'name': req.body.name,
    'description': req.body.description,
    'cost': req.body.cost
  });
  plan.save(function() {
    res.status(200)
    .json({
      status: 'success',
      data: {
        name: plan.name,
        description: plan.description,
        cost: plan.cost
      },
      message: 'Created plan.'
    });
  });
});

// update single plan
router.put('/plan/:id', auth.ensureAdmin, function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  Plan.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated plan.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE plan
router.delete('/plan/:id', auth.ensureAdmin, function(req, res, next) {
  Plan.findByIdAndRemoveQ(req.params.id)
  .then(function(plan) {
    res.status(200)
    .json({
      status: 'success',
      data: plan,
      message: 'Removed plan.'
    });
  })
  .then(function(err) {
    return next(err);
  })
  .done();
});


module.exports = router;
