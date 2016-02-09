var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {user: req.session.id});
});

router.get('/ping', function(req, res, next) {
  res.send("pong!");
});



module.exports = router;