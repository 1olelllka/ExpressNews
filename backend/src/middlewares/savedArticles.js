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
    (await User.findById(userId)) ||
    (await discordUser.findById(userId)) ||
    (await googleUser.findById(userId));
  console.log(isAlreadySaved);

  if (isAlreadySaved.saved_stories.includes(storyId)) {
    return res.status(400).json({ message: "Already saved" });
  }
  (await User.findByIdAndUpdate(userId, {
    $push: { saved_stories: storyId },
  })) ||
    (await discordUser.findByIdAndUpdate(userId, {
      $push: { saved_stories: storyId },
    })) ||
    (await googleUser.findByIdAndUpdate(userId, {
      $push: { saved_stories: storyId },
    }));
  res.sendStatus(200);
  next();
}

module.exports = { addToSavedArticles };
