const { Router } = require("express");
const {
  showSavedStories,
  saveStory,
  deleteStory,
} = require("../../controllers/savedArticles");
const client = require("../../databases/redis");

const routes = Router();

routes.get("/profile", (req, res) => {
  res.status(200).send(req.user);
});

routes.get("/searches", async (req, res) => {
  const searches = await client.hGet(req.user._id.toString(), "searches");
  res.status(200).send(searches);
});

// Saved Articles
routes.get("/saved-articles", showSavedStories);
routes.post("/save-article", saveStory);
routes.delete("/delete-article", deleteStory);

module.exports = routes;
