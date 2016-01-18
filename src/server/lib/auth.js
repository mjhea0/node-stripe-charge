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

  decodeToken();

  // check if the user still exists in the db
  User.findById(payload.sub, function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'User no longer exists.'
      });
    }
    req.user = user;
    next();
  });

}

function ensureAdmin(req, res, next) {

  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  decodeToken();

  // check if the user still exists in the db
  User.findById(payload.sub, function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'User no longer exists.'
      });
    }
    if (!user.admin) {
      return res.status(401).send({
        message: 'User is not authorized.'
      });
    }
    req.user = user;
    next();
  });

}

// decode the token
function decodeToken() {
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired.'
    });
  }
}

function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  ensureAdmin: ensureAdmin,
  createToken: createToken
};