const client = require("../databases/redis");

const checkCache = async (req, res, next) => {
  const exists = await client.hGet(user._id.toString(), "stories");

  if (!exists) {
    await client.hSet(
      user._id.toString(),
      "stories",
      JSON.stringify(user.saved_stories)
    );
  }
};

module.exports = checkCache;
