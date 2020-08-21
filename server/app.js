const express = require('express');
const passport = require('passport');
const GoogleOAuth = require('passport-google-oauth20').Strategy;
const LinkedInOAuth = require('passport-linkedin-oauth2').Strategy;
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({ path: './config.env' });

// DB Connection
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log('DB CONNECTED SUCCESSFULLY');
//   })
//   .catch(() => {
//     console.log('PROBLEM CONNECTING DB');
//   });

const app = express();

// middlewares
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
// auth

//google
passport.use(
  new GoogleOAuth(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken) => {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log(accessToken);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

//linkedin
// passport.use(new LinkedInOAuth());

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
