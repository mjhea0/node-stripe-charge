var express = require('express');
var router = express.Router();


router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = router;