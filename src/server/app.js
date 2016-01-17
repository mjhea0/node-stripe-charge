// *** main dependencies *** //
require('dotenv').load();

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose');

// *** seed the database *** //
// if (process.env.NODE_ENV === 'development') {
//   var seedAdmin = require('./models/seeds/admin.js');
//   var productAdmin = require('./models/seeds/product.js');
//   seedAdmin();
//   productAdmin();
// }


// *** config file *** //
var config = require('../_config');


// *** routes *** //
var mainRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
// var authRoutes = require('./routes/auth');
// var chargeRoutes = require('./routes/charge');
// var apiRoutes = require('./routes/api');


// *** express instance *** //
var app = express();


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY || 'change_me',
  resave: false,
  saveUninitialized: true
}));


// *** mongo *** //
app.set('dbUrl', config.mongoURI[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


// *** main routes *** //
app.use('/', mainRoutes);
app.use('/', userRoutes);
// app.use('/', chargeRoutes);
// app.use('/auth', authRoutes);
// app.use('/api/v1/', apiRoutes);


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
    res.json({
      status: 'error',
      data: null,
      message: err.message
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    data: null,
    message: err.message
  });
});


module.exports = app;
