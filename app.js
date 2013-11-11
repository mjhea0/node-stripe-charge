// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var app = express();


// config
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// parse objects through POST
app.use(express.bodyParser());

// requirements
require('./charge.js')(app);
require('./recurring.js')(app);

// routes
app.get('/ping', routes.ping);
app.get('/', routes.index);

app.listen(app.get('port'), function(){
  ("Express server listening on port " + app.get('port'))
});