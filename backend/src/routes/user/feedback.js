const { Router } = require("express");
const { feedback } = require("../../controllers/feedback");
const feedbackValidate = require("../../middlewares/feedbackValidator");

const routes = Router();

routes.post("/", feedbackValidate, feedback);

module.exports = routes;
