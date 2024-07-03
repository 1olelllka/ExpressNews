const User = require("../databases/schemas/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const googleLogin = async (req, res) => {
  const { googleId, username, email, full_name, image } = req.body;
  const user = await User.findOne({ googleId: googleId });
  if (user) {
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ token });
  } else {
    const newUser = await User.create({
      googleId: googleId,
      username: username,
      email: email,
      full_name: full_name,
      image: image,
    });

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(201).json({ token });
  }
};

module.exports = { googleLogin };
