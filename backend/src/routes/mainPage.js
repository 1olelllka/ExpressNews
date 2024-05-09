const { Router } = require("express");
const { getStories, getStoriesSearch } = require("../controllers/mainPage");

const routes = Router();

routes.get("/", getStories);
routes.get("/search", getStoriesSearch);

module.exports = routes;
