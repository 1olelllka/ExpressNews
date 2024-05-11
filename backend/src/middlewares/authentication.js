const jwt = require("jsonwebtoken");
const User = require("../databases/schemas/User");
const client = require("../databases/redis");

const authenticate = async (req, res, next) => {
  console.log(req.session);
  const token = req.session.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // TEMPORARILY DISABLED FOR DEBUGING PURPOSES
    // if (decoded.userId != req.session.userId) {
    //   return res.status(401).json({ message: "Error, try again later" });
    // }

    req.user = user;
    const exists = await client.json.type(
      req.user._id.toString() + "_breaking_news"
    );
    if (exists == null) {
      await client.json.set(req.user._id.toString() + "_breaking_news", "$", {
        breaking: [],
      });
      await client.expire(req.user._id.toString() + "_breaking_news", 60 * 30);
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
