const { Router } = require("express");
const { register, login, logout } = require("../../controllers/auth");
const passport = require("passport");
const registerValidate = require("../../validators/registerValidate");
const loginValidate = require("../../validators/loginValidation");

const { doubleCsrf } = require("csrf-csrf");
const {
  generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => "secret",
  getTokenFromRequest: (req) => req.cookies.csrf,
});

const routes = Router();

routes.get("/csrf", async (req, res) => {
  const token = generateToken(req, res);
  req.csrfToken = token;
  res.status(200).json({ token });
});
routes.post("/register", doubleCsrfProtection, registerValidate, register);
routes.post("/login", doubleCsrfProtection, loginValidate, login);

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
