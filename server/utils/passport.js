const passport = require('passport');
const GoogleOAuth = require('passport-google-oauth20').Strategy;
const LinkedInOAuth = require('passport-linkedin-oauth2').Strategy;

require('dotenv').config();

passport.use(
  new GoogleOAuth(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log('Access Token == >', accessToken);
      console.log('refresh Token == >', refreshToken);
      console.log('Profile == >', profile);
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
      console.log('Access Token == >', accessToken);
      console.log('refresh Token == >', refreshToken);
      console.log('Profile == >', profile);
    }
  )
);
