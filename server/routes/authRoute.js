const express = require('express');
const router = express.Router();
const passport = require('passport');

//Google

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.send(req.user);
  }
);

router.get('/google/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

//LinkedIn
router.get('/linkedin', passport.authenticate('linkedin'));

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.send(req.user);
  }
);

router.get('/linkedin/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;

//localhost:5000/auth/google/logout
