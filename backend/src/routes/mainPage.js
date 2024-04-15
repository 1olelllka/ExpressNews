const { Router } = require("express");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("First Text");
});

module.exports = routes;
