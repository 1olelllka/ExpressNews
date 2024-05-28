const { Router } = require("express");
const {
  showSavedStories,
  saveStory,
  deleteStory,
} = require("../../controllers/savedArticles");
const client = require("../../databases/redis");
const User = require("../../databases/schemas/User");
const patchUserValidate = require("../../validators/patchUserValidator");

const routes = Router();

routes.get("/profile", (req, res) => {
  res.status(200).send(req.user);
});

routes.patch("/profile", patchUserValidate, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "full_name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
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
