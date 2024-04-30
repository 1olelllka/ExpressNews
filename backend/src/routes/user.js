const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const { addToSavedArticles } = require("../middlewares/savedArticles");
const client = require("../databases/redis");

const routes = Router();

routes.get("/profile", (req, res) => {
  res.json({ user: req.user });
});

routes.get("/searches", async (req, res) => {
  const searches = await client.hGet(req.user._id.toString(), "searches");
  res.send(searches);
});

// Will be tested when frontend is ready
routes.post("/articles/save", addToSavedArticles);

module.exports = routes;
