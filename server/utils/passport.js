const passport = require('passport');
const GoogleOAuth = require('passport-google-oauth20').Strategy;
const LinkedInOAuth = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/userModel');
require('dotenv').config();

//serialize and deserialize
passport.serializeUser((user, done) => {
  //here user id is the id mongo db gives us
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleOAuth(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('Google profile Id == >', profile.id);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log('User with this Google ID already exists');
          done(null, existingUser);
        }
        const user = new User({ googleId: profile.id });
        user.save((err, user) => {
          if (user) {
            done(null, user);
          }
          return 'Not being able to save user';
        });
      });
    }
  )
);

//linkedin
passport.use(
  new LinkedInOAuth(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/linkedin/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('LinkedIn Profile Id == >', profile.id);
      User.findOne({ linkedInId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log('User with this LinkedIn ID already exists');
          done(null, existingUser);
        }
        const user = new User({ linkedInId: profile.id });
        user.save().then((user) => {
          if (user) {
            done(null, user);
          }
          return 'Unable to save user';
        });
      });
    }
  )
);
