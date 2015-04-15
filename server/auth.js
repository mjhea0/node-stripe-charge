// authentication

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/user'),
    Customer = require('./models/user'),
    config = require('./_config');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(Customer.authenticate()));
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

module.exports = passport;