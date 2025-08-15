require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth/google');
const path = require('path');
console.log("DEBUG: CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const name = encodeURIComponent(req.user.name);
    res.redirect(`/welcome.html?name=${name}`);
  }
);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running: http://localhost:${PORT}`));
