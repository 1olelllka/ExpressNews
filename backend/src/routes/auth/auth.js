const { Router } = require("express");
const { register, login } = require("../../controllers/auth");
const passport = require("passport");

const routes = Router();

routes.post("/register", register);
routes.post("/login", login);

// Discord Auth
routes.get("/discord", passport.authenticate("discord"), (req, res) => {
  res.sendStatus(200);
});

routes.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.json({ token: req.authInfo });
  }
);

// Google Auth
routes.get("/google", passport.authenticate("google"), (req, res) => {
  res.sendStatus(200);
});
routes.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.json({ token: req.authInfo });
});

module.exports = routes;
