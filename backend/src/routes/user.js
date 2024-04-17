const { Router } = require("express");
const User = require("../databases/schemas/localUser");
const { authenticate } = require("../middlewares/authentication");

const routes = Router();

routes.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = routes;
