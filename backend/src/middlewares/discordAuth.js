const passport = require("passport");
const { Strategy } = require("passport-discord");
const User = require("../databases/schemas/User");
const jwt = require("jsonwebtoken");
const { httpLogger } = require("../logs/winston");
const { formatHttpLoggerResponse } = require("../logs/format");

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
passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "https://localhost:8000/api/v1/auth/discord/redirect/",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const username = profile.username;
      const email = profile.email;
      try {
        const user = await User.findOne({ discordId: profile.id });
        if (user) {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            {
              expiresIn: "1d",
            }
          );
          return done(null, user, {
            token: token,
            refreshToken: refreshToken,
            userId: user._id,
          });
        } else {
          const newUser = new User({
            username,
            email: email,
            full_name: profile.username,
            discordId: profile.id,
          });
          await newUser.save();
          const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          const refreshToken = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_REFRESH_SECRET,
            {
              expiresIn: "1d",
            }
          );
          return done(null, newUser, {
            token: token,
            refreshToken: refreshToken,
            userId: newUser._id,
          });
        }
      } catch (err) {
        httpLogger.error(
          "Discord Auth Login Error",
          formatHttpLoggerResponse(err)
        );
        return done(err);
      }
    }
  )
);

module.exports = passport;
