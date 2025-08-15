require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db/pool');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  const { displayName, emails, photos } = profile;
  const email = emails[0]?.value;
  const picture = photos[0]?.value;
  const timestamp = new Date();

  try {
    await pool.query(
      `INSERT INTO users (name, email, picture, timestamp)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      [displayName, email, picture, timestamp]
    );
    console.log("✅ User saved to DB:", email);
    done(null, email); // ✅ only serialize email
  } catch (err) {
    console.error("❌ DB Error:", err.stack);
    done(err, null);
  }
}));

passport.serializeUser((email, done) => {
  done(null, email);
});

passport.deserializeUser((email, done) => {
  done(null, { email });
});


