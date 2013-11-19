// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

// config
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// mongo config
var MONGOLAB_URI= "add_your_mongolab_uri_here"
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/node-stripe-charge'
mongoose.connect(mongo);

// mongo model
Customer = mongoose.model('StripeCustomers', {
  token: String,
	time: {type: Date, default: Date.now}
});

// test
var quote = new Customer({token: "test" })
quote.save();

// parse objects through POST
app.use(express.bodyParser());

// requirements
require('./charge.js')(app);

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/charge', routes.charge);

// run server
app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'));
});
