const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const { feedback } = require("../controllers/feedback");

const routes = Router();

routes.post("/", feedback);

module.exports = routes;
