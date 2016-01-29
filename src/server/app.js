// *** main dependencies *** //
require('dotenv').load();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var swig = require('swig');


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
var mainAPIRoutes = require('./routes/api/index');
var userAPIRoutes = require('./routes/api/user');
var authAPIRoutes = require('./routes/api/auth');
var itemAPIRoutes = require('./routes/api/item');
var storeAPIRoutes = require('./routes/api/store');
var planAPIRoutes = require('./routes/api/plan');
var mainRoutes = require('./routes/index');
// var chargeRoutes = require('./routes/charge');
// var apiRoutes = require('./routes/api');


// *** express instance *** //
var app = express();


// *** view engine *** ///
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './views'));


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
app.use(express.static(path.join(__dirname, '../', 'client')));


// *** mongo *** //
app.set('dbUrl', config.mongoURI[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


// *** main routes *** //
app.use('/api/', mainAPIRoutes);
app.use('/api/', userAPIRoutes);
app.use('/api/auth', authAPIRoutes);
app.use('/api/', itemAPIRoutes);
app.use('/api/', storeAPIRoutes);
app.use('/api/', planAPIRoutes);
app.use('/', mainRoutes);
// app.use('/', chargeRoutes);
// app.use('/api/v1/', apiRoutes);


// *** error handlers *** //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    data: null,
    message: err.message
  });
});


module.exports = app;
