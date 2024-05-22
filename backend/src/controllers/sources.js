const Sources = require("../databases/schemas/sources");
const User = require("../databases/schemas/User");
const client = require("../databases/redis");

const getSources = async (req, res) => {
  const sources = await Sources.find();
  return res.status(200).send(sources);
};

const getFollowing = async (req, res) => {
  const userId = req.user._id;
  try {
    const exists = await client.hGet(userId.toString(), "following");
    if (exists) {
      res.send(JSON.parse(exists));
    } else {
      const user = await User.findById(userId);

      await client.hSet(
        userId.toString(),
        "following",
        JSON.stringify(user.subscribed)
      );

      const result = await client.hGet(userId.toString(), "following");
      res.status(200).send(JSON.parse(result));
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const follow = async (req, res) => {
  const { sourceId } = req.body;
  const source = await Sources.findById(sourceId);
  const user = await User.findById(req.user._id);

  if (!source) {
    return res.status(400).send("Source is not found");
  }

  try {
    user.subscribed.push(source);
    await user.save();
    await client.hSet(
      req.user._id.toString(),
      "following",
      JSON.stringify(user.subscribed)
    );
    res.status(200).send("Source has been followed");
  } catch (err) {
    res.status(500).send(err);
  }
};

const unfollow = async (req, res) => {
  const userId = req.user._id;
  const { sourceId } = req.body;
  const source = await Sources.findById(sourceId);
  const user = await User.findById(userId);
  if (!source) {
    return res.status(400).send("Source is not found");
  }
  try {
    const index = user.subscribed.indexOf(source);
    user.subscribed.splice(index, 1);
    await user.save();
    await client.hSet(
      userId.toString(),
      "following",
      JSON.stringify(user.subscribed)
    );
    res.status(202).send("Unfollowed successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getSources, follow, getFollowing, unfollow };
