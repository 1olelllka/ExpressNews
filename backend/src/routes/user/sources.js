const { Router } = require("express");
const {
  getSources,
  follow,
  unfollow,
  getFollowing,
} = require("../../controllers/sources");

const routes = Router();

routes.get("/", getSources);

routes.get("/my-following", getFollowing);
routes.post("/follow", follow);
routes.delete("/unfollow", unfollow);

module.exports = routes;
