const User = require("../databases/schemas/User");
const Story = require("../databases/schemas/Story");
const client = require("../databases/redis");

async function showSavedStories(req, res) {
  const userId = req.user._id;
  try {
    const cached = await client.hGet(userId.toString(), "stories");
    if (cached) {
      const result = await Story.find({ _id: { $in: JSON.parse(cached) } });
      return res.send(result);
    } else {
      const dbUser = await User.findById(userId);
      const saved_stories = dbUser.saved_stories;
      await client.hSet(
        userId.toString(),
        "stories",
        JSON.stringify(saved_stories)
      );
      const result = await Story.find({ _id: { $in: saved_stories } });
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function saveStory(req, res) {
  const userId = req.user._id;
  const { storyId } = req.body;
  const user = await User.findById(userId);
  try {
    user.saved_stories.push(storyId);
    await user.save();

    await client.hSet(
      userId.toString(),
      "stories",
      JSON.stringify(user.saved_stories)
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function deleteStory(req, res) {
  const userId = req.user._id;
  const { storyId } = req.body;
  const user = await User.findById(userId);
  try {
    await user.saved_stories.pull(storyId);
    await user.save();
    await client.hSet(
      userId.toString(),
      "stories",
      JSON.stringify(user.saved_stories)
    );
    res.sendStatus(202);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = { showSavedStories, saveStory, deleteStory };
