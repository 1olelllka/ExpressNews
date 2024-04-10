const express = require("express");

const startPage = require("./routes/start_page");

const app = express();

const PORT = 8000;

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use(startPage);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
