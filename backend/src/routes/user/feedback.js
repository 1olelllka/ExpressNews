const { Router } = require("express");
const { feedback } = require("../../controllers/feedback");

const routes = Router();

routes.post("/", feedback);

module.exports = routes;
