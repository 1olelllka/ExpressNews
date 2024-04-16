const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../databases/schemas/User");

const register = async (req, res, next) => {
  const { username, email, password, full_name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
    });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, "somesecret", {
      expiresIn: "1h",
    });
    res.json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
