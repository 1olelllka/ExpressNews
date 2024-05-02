const { Router } = require("express");
const {
  showSavedStories,
  saveStory,
  deleteStory,
} = require("../middlewares/savedArticles");
const client = require("../databases/redis");

const routes = Router();

routes.get("/profile", (req, res) => {
  res.json({ user: req.user });
});

routes.get("/searches", async (req, res) => {
  const searches = await client.hGet(req.user._id.toString(), "searches");
  res.send(searches);
});

// Saved Articles
routes.get("/saved-articles", showSavedStories);
routes.post("/save-article", saveStory);
routes.delete("/delete-article", deleteStory);

module.exports = routes;
