const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../databases/schemas/User");
const client = require("../databases/redis");

const register = async (req, res, next) => {
  const { username, email, password, full_name } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send("User with the same username already exists");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
    });
    await user.save();
    res.status(201).send(`User ${user._id} has been registered`);
  } catch (err) {
    res.status(500).send(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send(`User ${username} not found`);
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).send(`User ${username} wrote wrong password`);
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    req.session.userId = user._id;
    req.session.token = token;
    res.status(200).send(`User ${user._id} has logged in successfully`);
  } catch (err) {
    res.status(500).send(err);
    next(err);
  }
};

const logout = async (req, res, next) => {
  console.log(req.sessionID);
  await client.del("sess:" + req.sessionID.toString());
  await client.del(req.session.userId.toString() + "_breaking_news");
  await client.del(req.session.userId.toString());
  req.session = null;
  req.user = null;
  res.status(200).send("User has logged out successfully");
  next();
};

module.exports = { register, login, logout };
