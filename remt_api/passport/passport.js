const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use('local', new LocalStrategy({
  usernameField: 'phoneNumber'
}, (username, password, done)=>{
  User.findOne({'userInfos.phoneNumber': username}).then(user=>{
      if (!user) return done(null, false, 'Incorrect Phone Number.');
      
      if (!user.isValidPassword(password)) return done(null, false, 'Incorrect password.');

      return done(null, user);
  }).catch(err=> done(err))
}));