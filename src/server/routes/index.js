var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/test', function(req, res, next) {
  res.json({
    status: 'success',
    data: null,
    message: 'Welcome to the API!'
  });
});

router.get('/ping', function(req, res, next) {
  res.json({
    status: 'success',
    data: null,
    message: 'pong!'
  });
});



module.exports = router;
