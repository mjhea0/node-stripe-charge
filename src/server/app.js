// *** main dependencies *** //
require('dotenv').load();

const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  mongoose = require('mongoose'),
  passport = require('./lib/auth');
let swig = require('swig');


// *** seed the database *** //
if (process.env.NODE_ENV === 'development') {
  const seedAdmin = require('./models/seeds/admin.js'),
    productAdmin = require('./models/seeds/product.js');
  seedAdmin();
  productAdmin();
}


// *** config file *** //
const config = require('../_config');


// *** routes *** //
const mainRoutes = require('./routes/index'),
  authRoutes = require('./routes/auth'),
  chargeRoutes = require('./routes/charge'),
  productAPIRoutes = require('./routes/api/product'),
  storeAPIRoutes = require('./routes/api/store'),
  userAPIRoutes = require('./routes/api/user');


// *** express instance *** //
const app = express();


// *** view engine *** ///
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** ///
app.set('views', path.join(__dirname, './views'));


// *** config middleware *** //
if (process.env.NODE_ENV !== 'test') {
  const logger = morgan('combined');
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
app.use((req, res, next) => {
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
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
