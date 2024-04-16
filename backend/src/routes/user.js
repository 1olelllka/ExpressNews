const { Router } = require("express");
const User = require("../databases/schemas/User");
const { authenticate } = require("../middlewares/auth");

const routes = Router();

routes.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = routes;
