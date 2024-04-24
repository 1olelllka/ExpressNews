const Stories = require("../databases/schemas/Story");
const User = require("../databases/schemas/localUser");
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");

const getStories = async (req, res) => {
  try {
    var page = req.query.page;
    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * 5;
    const stories = await Stories.find().limit(5).skip(startIndex);
    return res.send(stories);
  } catch (err) {
    console.log(err);
  }
};

const getStoriesSearch = async (req, res) => {
  try {
    var page = req.query.page;
    const search = req.query.query;
    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * 5;
    const user =
      (await User.findById(req.session.userId)) ||
      (await discordUser.findById(req.session.userId)) ||
      (await googleUser.findById(req.session.userId));
    const stories = await Stories.find({ $text: { $search: search } })
      .limit(5)
      .skip(startIndex);
    user.saved_searches.push(search);
    await user.save();
    res.send(stories);
  } catch (err) {
    console.log(err);
  }
};

const getStoriesCategory = async (req, res) => {
  try {
    var category = req.query.category;
    if (!category) {
      res.sendStatus(400);
    }
    const stories = await Stories.find({
      category: { $regex: `${category}`, $options: "i" },
    });
    res.send(stories);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getStories, getStoriesSearch, getStoriesCategory };
