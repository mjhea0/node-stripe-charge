const passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
},
  (req, email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, (error, isMatch) => {
        if (error) {
          return done(error);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (!err) {
      done(null, user);
    } else {
      done(err, null);
    }
  });
});

module.exports = passport;
