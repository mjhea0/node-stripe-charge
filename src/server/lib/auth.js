var moment = require('moment');
var jwt = require('jwt-simple');

var config = require('../../_config');
var User = require('../models/user.js');


function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // check if the token has expired
  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired. '
    });
  }

  // check if the user still exists in the db
  User.findById(payload.sub, function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'User no longer exists. '
      });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated
};