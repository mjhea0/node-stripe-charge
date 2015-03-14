var express = require('express'),
    router = express.Router();
    passport = require('../auth');


// GET products
router.get('/products', ensureAuthenticated, function(req, res, next) {
  res.send('WIP');
});

// GET product
router.get('/product/:id', ensureAuthenticated, function(req, res, next) {
  res.send('WIP');
});

// POST product
router.post('/product/:id', ensureAuthenticated, function(req, res, next) {
  res.send('WIP');
});

// PUT product
router.put('/product/:id', ensureAuthenticated, function(req, res, next) {
  res.send('WIP');
});

// DELETE product
router.delete('/product/:id', ensureAuthenticated, function(req, res, next) {
  res.send('WIP');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;