const { Router } = require("express");
const { feedback } = require("../../controllers/feedback");
const feedbackValidate = require("../../validators/feedbackValidator");

const routes = Router();

routes.post("/", feedbackValidate, feedback);

module.exports = routes;
