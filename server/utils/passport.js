const passport = require('passport');
const GoogleOAuth = require('passport-google-oauth20').Strategy;
const LinkedInOAuth = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/userModel');
require('dotenv').config();

passport.use(
  new GoogleOAuth(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log('Google profile Id == >', profile.id);
      const user = new User({ googleId: profile.id });
      user.save((err, user) => {
        if (err) {
          return 'Not being able to save user';
        }
        return user;
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
    (accessToken, refreshToken, profile, cb) => {
      console.log('LinkedIn Profile Id == >', profile.id);
      const user = new User({ linkedInId: profile.id });
      user.save((err, user) => {
        if (err) {
          return 'Not being able to save user';
        }
        return user;
      });
    }
  )
);
