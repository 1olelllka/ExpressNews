const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../databases/schemas/User");

const register = async (req, res, next) => {
  const { username, email, password, full_name } = req.body;
  if (!username || !email || !password || !full_name) {
    return res.status(400).json({ message: "All fields are required" });
  }
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
    res.status(201).send(`User ${username} has been registered`);
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
    res.status(200).send(`User ${username} has logged in successfully`);
  } catch (err) {
    res.status(500).send(err);
    next(err);
  }
};

module.exports = { register, login };
