var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../lib/auth');
var User = require('../models/user');
var Item = require('../models/item');
var config = require('../../_config');



// ** items ** //

//get ALL items
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


module.exports = router;
