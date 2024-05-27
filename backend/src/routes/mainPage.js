const { Router } = require("express");
const {
  getStories,
  getStoriesSearch,
  getNotifications,
  getStoryDetail,
} = require("../controllers/mainPage");
const storyDetailValidate = require("../validators/storyDetailValidation");

const routes = Router();

routes.get("/", getStories);
routes.get("/story/:id", storyDetailValidate, getStoryDetail);
routes.get("/search", getStoriesSearch);
routes.get("/notifications", getNotifications);

module.exports = routes;
