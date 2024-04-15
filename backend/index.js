const express = require("express");

const startPage = require("./src/routes/mainPage");

const app = express();

const PORT = 8000;

require("./src/databases/database");
require("./src/databases/schemas/User");
require("./src/databases/schemas/Story");

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use("/api/v1", startPage);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
