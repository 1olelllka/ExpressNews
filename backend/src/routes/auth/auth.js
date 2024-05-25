const { Router } = require("express");
const { register, login, logout } = require("../../controllers/auth");
const passport = require("passport");
const registerValidate = require("../../middlewares/registerValidate");
const loginValidate = require("../../middlewares/loginValidation");

const routes = Router();

routes.post("/register", registerValidate, register);
routes.post("/login", loginValidate, login);

routes.get("/logout", logout);

// Discord Auth
routes.get(
  "/discord",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    res.status(200);
  }
);

routes.get(
  "/discord/redirect",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    if (req.authInfo.token && req.authInfo.userId) {
      req.session.token = req.authInfo.token;
      req.session.userId = req.authInfo.userId;
      res
        .status(200)
        .send(`User ${req.authInfo.userId} has logged through Discord`);
    } else {
      res.status(400).send("The user has failed to log with Discord");
    }
  }
);

// Google Auth
routes.get(
  "/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.status(200);
  }
);
routes.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (req.authInfo.token && req.authInfo.userId) {
      req.session.token = req.authInfo.token;
      req.session.userId = req.authInfo.userId;
      res
        .status(200)
        .send(`User ${req.authInfo.userId} has logged through Google`);
    } else {
      res.status(400).send("User has failed to log through Google");
    }
  }
);

// WHEN DEBUG
routes.get("/", (req, res) => {
  res.send(req.session);
});

module.exports = routes;
