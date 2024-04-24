const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const { addToSavedArticles } = require("../middlewares/savedArticles");

const routes = Router();

routes.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Will be tested when frontend is ready
routes.post("/articles/save", authenticate, addToSavedArticles);

module.exports = routes;
