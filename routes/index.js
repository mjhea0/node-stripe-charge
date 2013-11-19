var path = require("path");

exports.index = function(req, res){
  res.render('index', { title: "Node-Stripe"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.charge = function(req, res){
  res.render('charge', { title: "Process a charge!"});
};
