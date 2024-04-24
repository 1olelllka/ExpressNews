const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const {
  getStories,
  getStoriesSearch,
  getStoriesCategory,
} = require("../controllers/mainPage");

const routes = Router();

routes.get("/", authenticate, getStories);
routes.get("/search", authenticate, getStoriesSearch);
routes.get("/category", authenticate, getStoriesCategory);

module.exports = routes;
