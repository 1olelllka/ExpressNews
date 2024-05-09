const Stories = require("../databases/schemas/Story");
const client = require("../databases/redis");

const getStories = async (req, res) => {
  try {
    var page = req.query.page;
    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * 5;
    if (req.query.category) {
      const stories = await Stories.find({ category: req.query.category })
        .limit(5)
        .skip(startIndex);
      return res.send(stories);
    }
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
    var searches = [];
    const exists = await client.hGet(req.user._id.toString(), "searches");

    if (exists) {
      searches = JSON.parse(exists);
    }

    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * 5;
    const stories = await Stories.find({ $text: { $search: search } })
      .limit(5)
      .skip(startIndex);

    searches.push(search);
    await client.hSet(
      req.user._id.toString(),
      "searches",
      JSON.stringify(searches)
    );
    res.send(stories);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getStories, getStoriesSearch };
