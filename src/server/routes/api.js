var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var passport = require('../lib/auth');
var User = require('../models/user');
var Product = require('../models/product');


// ** users ** //

// get ALL users
router.get('/users', ensureAdmin, function(req, res, next) {
  User.findQ()
  .then(function(users) {
    res.status(200)
    .json({
      status: 'success',
      data: users,
      message: 'Retrieved users.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// get SINGLE user
router.get('/user/:id', ensureAdmin, function(req, res, next) {
  User.findByIdQ(req.params.id)
  .then(function(user) {
    res.status(200)
    .json({
      status: 'success',
      data: user,
      message: 'Retrieved user.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new user
router.post('/users', function(req, res, next) {
  User.findOneQ({email: req.body.email})
  .then(function(existingUser) {
    if (existingUser) {
      res.status(409)
      .json({
        status: 'error',
        data: null,
        message: 'Email is already in use.'
      });
    } else {
      var user = new User({
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin || false
      });
      user.save(function(err, results) {
        if (err) {
          return next(err);
        } else {
        res.status(200)
        .json({
          status: 'success',
          data: {
            email: user.email,
            admin: user.admin
          },
          message: 'Created user.'
        });
        }
      });
    }
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// update single user
router.put('/user/:id', ensureAdmin, function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
  User.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated user.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE user
router.delete('/user/:id', ensureAdmin, function(req, res, next) {
  User.findByIdAndRemoveQ(req.params.id)
  .then(function(user) {
    res.status(200)
    .json({
      status: 'success',
      data: user,
      message: 'Removed user.'
    });
  })
  .then(function(err) {
    return next(err);
  })
  .done();
});


// products

router.get('/products', ensureAuthenticated, function(req, res, next) {
  Product.find({}, function (err, results) {
    if(err) {
      return next(err);
    } else {
      res.send(results);
    }
  });
});

router.post('/products', function(req, res) {
  var product = new Product({ name: req.body.name, amount: req.body.amount });
  product.save(function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.send(results);
    }
  });
});

router.get('/product/:id', function(req, res, next) {
  var productID = req.params.id;
  Product.findById(productID, function(err, results) {
    if(err) {
      return next(err);
    } else {
      res.send(results);
    }
  });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
      return next();
  }
  res.redirect('/auth/login');
}

module.exports = router;
