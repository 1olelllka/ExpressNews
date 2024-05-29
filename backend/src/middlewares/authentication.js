const jwt = require("jsonwebtoken");
const User = require("../databases/schemas/User");
const client = require("../databases/redis");

const authenticate = async (req, res, next) => {
  const token = req.session.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Invalid token");
  }
  try {
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name == "TokenExpiredError") {
        if (req.cookies?.jwt) {
          const refreshToken = req.cookies.jwt;
          const newToken = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
          );
          if (newToken) {
            const { userId } = newToken;
            const user = await User.findById(userId);
            if (user) {
              const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              );
              req.session.token = token;
              req.user = user;
              const exists = await client.json.type(
                req.user._id.toString() + "_breaking_news"
              );
              if (exists == null) {
                await client.json.set(
                  req.user._id.toString() + "_breaking_news",
                  "$",
                  {
                    breaking: [],
                  }
                );
                await client.expire(
                  req.user._id.toString() + "_breaking_news",
                  60 * 30
                );
              }
              return next();
            } else {
              return res.status(404).send(`User ${userId} not found`);
            }
          }
        }
      }
      return res.status(401).send("Invalid token");
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send(`User ${decoded.userId} not found`);
    }
    // TEMPORARILY DISABLED FOR DEBUGING PURPOSES
    // if (decoded.userId != req.session.userId) {
    //   return res.status(403);
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
    return res.status(500).send(err);
  }
};

module.exports = { authenticate };
