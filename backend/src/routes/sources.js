const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const { getSources, follow, getFollowing } = require("../controllers/sources");

const routes = Router();

routes.get("/", authenticate, getSources);

routes.post("/follow", authenticate, follow);

routes.get("/my-following", authenticate, getFollowing);
module.exports = routes;
