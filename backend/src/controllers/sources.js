const Sources = require("../databases/schemas/sources");
const client = require("../databases/redis");

const getSources = async (req, res) => {
  const sources = await Sources.find();
  return res.send(sources);
};

const follow = async (req, res) => {
  const { sourceId } = req.body;
  const source = await Sources.findById(sourceId);
  var followingList = [];
  const exists = await client.hGet(req.user._id.toString(), "following");

  if (!source) {
    return res.status(400).json({ message: "Source is required" });
  }
  if (exists) {
    followingList = JSON.parse(exists);
  }
  if (followingList.includes(source)) {
    return res.sendStatus(200);
  }

  try {
    followingList.push(source);
    await client.hSet(
      req.user._id.toString(),
      "following",
      JSON.stringify(followingList)
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

const getFollowing = async (req, res) => {
  const user = req.user;
  const exists = await client.hGet(user._id.toString(), "following");
  if (!exists) {
    await client.hSet(
      user._id.toString(),
      "following",
      JSON.stringify(user.subscribed)
    );
  }
  return res.send(JSON.parse(exists));
};

module.exports = { getSources, follow, getFollowing };
