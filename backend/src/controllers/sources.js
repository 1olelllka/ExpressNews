const Sources = require("../databases/schemas/sources");
const User = require("../databases/schemas/localUser");
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");
const client = require("../databases/redis");

const getSources = async (req, res) => {
  const sources = await Sources.find();
  return res.send(sources);
};

const getFollowing = async (req, res) => {
  const userId = req.user._id;
  try {
    const exists = await client.hGet(userId.toString(), "following");
    if (exists) {
      res.send(JSON.parse(exists));
    } else {
      const user =
        (await User.findById(req.user._id)) ||
        (await discordUser.findById(req.user._id)) ||
        (await googleUser.findById(req.user._id));

      await client.hSet(
        userId.toString(),
        "following",
        JSON.stringify(user.subscribed)
      );

      const result = await client.hGet(userId.toString(), "following");
      res.send(JSON.parse(result));
    }
  } catch (err) {
    console.log(err);
  }
};

const follow = async (req, res) => {
  const { sourceId } = req.body;
  const source = await Sources.findById(sourceId);
  const user =
    (await User.findById(req.user._id)) ||
    (await discordUser.findById(req.user._id)) ||
    (await googleUser.findById(req.user._id));

  if (!source) {
    return res.status(400).json({ message: "Source is required" });
  }

  try {
    user.subscribed.push(source);
    await user.save();
    await client.hSet(
      req.user._id.toString(),
      "following",
      JSON.stringify(user.subscribed)
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

const unfollow = async (req, res) => {
  const userId = req.user._id;
  const { sourceId } = req.body;
  const source = await Sources.findById(sourceId);
  const user =
    (await User.findById(userId)) ||
    (await discordUser.findById(userId)) ||
    (await googleUser.findById(userId));
  try {
    const index = user.subscribed.indexOf(source);
    await user.subscribed.splice(index, 1);
    await user.save();
    console.log(user.subscribed);
    await client.hSet(
      userId.toString(),
      "following",
      JSON.stringify(user.subscribed)
    );
    res.sendStatus(202);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { getSources, follow, getFollowing, unfollow };
