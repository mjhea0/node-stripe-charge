// *** main dependencies *** //
require('dotenv').load();

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var swig = require('swig');
var passport = require('./lib/auth');
var LocalStrategy = require('passport-local').Strategy;


// *** seed the database *** //
if (process.env.NODE_ENV === 'development') {
  var seedAdmin = require('./models/seeds/admin.js');
  var productAdmin = require('./models/seeds/product.js');
  seedAdmin();
  productAdmin();
}


// *** config file *** //
var config = require('../_config');


// *** routes *** //
var mainRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');
var chargeRoutes = require('./routes/charge');
var productAPIRoutes = require('./routes/api/product');
var storeAPIRoutes = require('./routes/api/store');
var userAPIRoutes = require('./routes/api/user');


// *** express instance *** //
var app = express();


// *** view engine *** ///
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** ///
app.set('views', path.join(__dirname, './views'));


// *** config middleware *** //
if (process.env.NODE_ENV !== 'test') {
  var logger = morgan('combined');
  app.use(logger);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY || 'change_me',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next){
  res.locals.success = req.flash('success');
  res.locals.danger = req.flash('danger');
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../', 'client')));


// *** mongo *** //
app.set('dbUrl', config.mongoURI[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


// *** main routes *** //
app.use('/', mainRoutes);
app.use('/', chargeRoutes);
app.use('/auth', authRoutes);
app.use('/api/v1/', productAPIRoutes);
app.use('/api/v1/', storeAPIRoutes);
app.use('/api/v1/', userAPIRoutes);


// *** error handlers *** //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
