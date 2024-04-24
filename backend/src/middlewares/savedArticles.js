const mongoose = require("mongoose");
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");
const User = require("../databases/schemas/localUser");
const Story = require("../databases/schemas/Story");

async function addToSavedArticles(req, res, next) {
  const userId = req.user._id;

  const storyId = req.body.storyId;
  const story = await Story.findById(storyId);
  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }
  const isAlreadySaved =
    (await User.findById(userId).where("saved_articles").in([storyId])) ||
    (await discordUser
      .findById(userId)
      .where("saved_articles")
      .in([storyId])) ||
    (await googleUser.findById(userId).where("saved_articles").in([storyId]));
  if (isAlreadySaved) {
    return res.status(400).json({ message: "Already saved" });
  }
  (await User.findByIdAndUpdate(userId, {
    $push: { saved_articles: storyId },
  })) ||
    (await discordUser.findByIdAndUpdate(userId, {
      $push: { saved_articles: storyId },
    })) ||
    (await googleUser.findByIdAndUpdate(userId, {
      $push: { saved_articles: storyId },
    }));
  res.sendStatus(200);
  next();
}

module.exports = { addToSavedArticles };
