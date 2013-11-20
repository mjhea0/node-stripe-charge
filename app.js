// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('./users.js');
var util = require('util')

// main config
var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// env config
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// user authentication
function findById(id, fn) {
  var idx = id - 1;
  if (userModel[idx]) {
    fn(null, userModel[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}
function findByUsername(username, fn) {
  for (var i = 0, len = userModel.length; i < len; i++) {
    var user = userModel[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

// mongo config
var MONGOLAB_URI= "add_your_mongolab_uri_here"
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/node-stripe-charge'
mongoose.connect(mongo);

// mongo model
var Customer = require('./models/customer.js');

// parse objects through POST
app.use(express.bodyParser());

// requirements
require('./charge.js')(app);

// routes
var routes = require('./routes');
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/charge', routes.charge);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/admin', ensureAuthenticated, routes.admin);
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/admin');
  }
);

// authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// run server
app.listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});
