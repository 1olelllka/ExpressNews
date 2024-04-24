const { Router } = require("express");
const { register, login } = require("../../controllers/auth");
const passport = require("passport");

const routes = Router();

routes.post("/register", register);
routes.post("/login", login);

// Discord Auth
routes.get(
  "/discord",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    res.sendStatus(200);
  }
);

routes.get(
  "/discord/redirect",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    if (req.authInfo.token && req.authInfo.userId) {
      req.session.token = req.authInfo.token;
      req.session.userId = req.authInfo.userId;
      res.sendStatus(201);
    } else {
      res.sendStatus(401);
    }
  }
);

// Google Auth
routes.get(
  "/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.sendStatus(200);
  }
);
routes.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (req.authInfo.token && req.authInfo.userId) {
      req.session.token = req.authInfo.token;
      req.session.userId = req.authInfo.userId;
      res.sendStatus(201);
    } else {
      res.sendStatus(401);
    }
  }
);

routes.get("/", (req, res) => {
  res.send(req.session);
});

module.exports = routes;
