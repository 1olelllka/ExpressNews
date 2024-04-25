const jwt = require("jsonwebtoken");
const User = require("../databases/schemas/localUser");
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");

const authenticate = async (req, res, next) => {
  console.log(req.session);
  const token = req.session.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user =
      (await User.findById(decoded.userId)) ||
      (await discordUser.findById(decoded.userId)) ||
      (await googleUser.findById(decoded.userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // TEMPORARILY DISABLED FOR DEBUGING PURPOSES
    // if (decoded.userId != req.session.userId) {
    //   return res.status(401).json({ message: "Error, try again later" });
    // }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
