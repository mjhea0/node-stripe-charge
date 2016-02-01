var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var auth = require('../../lib/auth');
var User = require('../../models/user');



// ** auth ** //

router.post('/login', function(req, res) {
  User.findOneQ({email: req.body.email}, '+password', function(err, user) {
    if (!user) {
      return res.status(401)
      .json({
        status: 'error',
        data: null,
        message: 'Incorrect email.'
      });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401)
        .json({
          status: 'error',
          data: null,
          message: 'Wrong email address and/or password.'
        });
      }
      user = user.toObject();
      delete user.password;
      var token = auth.createToken(user);
      return res.status(200)
      .json({
        status: 'success',
        data: {
          token: token,
          email: user.email,
          admin: user.admin
        },
        message: 'Generated token.'
      });
    });
  });
});


module.exports = router;
