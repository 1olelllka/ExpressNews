const { Router } = require("express");
const {
  showSavedStories,
  saveStory,
  deleteStory,
} = require("../../controllers/savedArticles");
const client = require("../../databases/redis");
const User = require("../../databases/schemas/User");

const routes = Router();

routes.get("/profile", (req, res) => {
  res.status(200).send(req.user);
});

routes.delete("/delete-account", async (req, res) => {
  await client.del(req.user._id.toString());
  await client.del(req.user._id.toString() + "_breaking_news");
  await client.del("sess:" + req.sessionID.toString());
  await User.findByIdAndDelete(req.user._id);
  req.session = null;
  req.user = null;
  res.status(202).send("User has been deleted");
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
