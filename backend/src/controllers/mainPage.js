const Stories = require("../databases/schemas/Story");
const client = require("../databases/redis");

// In production change the limit !
const getStories = async (req, res) => {
  try {
    var page = req.query.page;
    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * 5;
    if (req.query.category) {
      const stories = await Stories.find({ category: req.query.category })
        .sort("-publishedAt")
        .limit(5)
        .skip(startIndex);
      return res.send(stories);
    }
    const stories = await Stories.find()
      .sort("-publishedAt")
      .limit(5)
      .skip(startIndex);
    return res.send(stories);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getStoryDetail = async (req, res) => {
  try {
    const story = await Stories.findById(req.params.id);
    if (!story) {
      return res.status(404).send("Story not found");
    }
    res.status(200).send(story);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getStoriesSearch = async (req, res) => {
  try {
    var page = req.query.page;
    const search = req.query.query + "*";
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
      .sort("-publishedAt")
      .limit(5)
      .skip(startIndex);

    searches.push(search);
    await client.hSet(
      req.user._id.toString(),
      "searches",
      JSON.stringify(searches)
    );
    res.status(200).send(stories);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await client.json.get(
      req.user._id + "_breaking_news"
    );
    res.send(notifications.breaking);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getStories,
  getStoriesSearch,
  getNotifications,
  getStoryDetail,
};
