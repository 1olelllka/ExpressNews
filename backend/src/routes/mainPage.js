const { Router } = require("express");
const {
  getStories,
  getStoriesSearch,
  getNotifications,
} = require("../controllers/mainPage");

const routes = Router();

routes.get("/", getStories);
routes.get("/search", getStoriesSearch);
routes.get("/notifications", getNotifications);

module.exports = routes;
