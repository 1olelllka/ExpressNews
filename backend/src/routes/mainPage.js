const { Router } = require("express");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("main page");
});

module.exports = routes;
