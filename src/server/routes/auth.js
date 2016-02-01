var express = require('express');
var router = express.Router();


router.get('/login/', function(req, res, next) {
  res.render('login', {user: req.user});
});


module.exports = router;
