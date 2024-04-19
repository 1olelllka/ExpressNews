const passport = require("passport");
const { Strategy } = require("passport-discord");
const DiscordUser = require("../databases/schemas/discordUser");
const jwt = require("jsonwebtoken");

passport.serializeUser((user, done) => {
  console.log("Serializing User");
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User");
  try {
    const user = await DiscordUser.findById(id);
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
      callbackURL: "http://localhost:8000/api/v1/auth/discord/redirect/",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const username = profile.username;
      const email = profile.email;
      try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if (user) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          console.log(token);
          return done(null, user, { token: token, userId: user._id });
        } else {
          const newUser = new DiscordUser({
            username,
            email: email,
            full_name: profile.username,
            discordId: profile.id,
          });
          await newUser.save();
          console.log("New User: ", newUser.username);
          const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return done(null, newUser, { token: token, userId: newUser._id });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
