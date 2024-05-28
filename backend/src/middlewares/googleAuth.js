const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const User = require("../databases/schemas/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.serializeUser((user, done) => {
  console.log("Serializing User");
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User");
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

async function googleVerify(accessToken, refreshToken, profile, done) {
  const googleId = profile._json.sub;
  try {
    const user = await User.findOne({ googleId: googleId });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return done(null, user, { token: token, userId: user._id });
    } else {
      const newUser = await User.create({
        googleId: googleId,
        username: profile._json.name.replace(/\s+/g, ""),
        email: profile._json.email,
        full_name: profile._json.name,
        image: profile._json.picture,
      });
      console.log("New Google Auth User: ", newUser.username);
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return done(null, newUser, { token: token, userId: newUser._id });
    }
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
}
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google/redirect/",
      scope: ["profile", "email"],
    },
    googleVerify
  )
);

module.exports = { googleVerify };
