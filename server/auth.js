// authentication

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/user'),
    config = require('./_config');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = passport;