var path = require("path");
var Customer = require('../models.js');

exports.index = function(req, res){
  res.render('index', { title: "Node-Stripe"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.charge = function(req, res){
  res.render('charge', { title: "Process a charge!"});
};

exports.admin = function(req, res){
  return Customer.find({}, function(err, data) {
    if (err) {
      return console.log('err');
    } else {
      return res.render('admin', {'allTokens':data, 'total':data.length});
    }
  });
};
