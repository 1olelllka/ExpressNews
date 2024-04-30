const { Router } = require("express");
const {
  getStories,
  getStoriesSearch,
  getStoriesCategory,
} = require("../controllers/mainPage");

const routes = Router();

routes.get("/", getStories);
routes.get("/search", getStoriesSearch);
routes.get("/category", getStoriesCategory);

module.exports = routes;
