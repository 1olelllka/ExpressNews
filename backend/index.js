const express = require("express");

const mainPage = require("./src/routes/mainPage");
const localAuth = require("./src/routes/auth/localAuth");
const userRoute = require("./src/routes/user");
const connectDB = require("./src/databases/database");

const app = express();

const PORT = 8000;
const basicUrl = "/api/v1";

connectDB();

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use(express.json());

app.use(`${basicUrl}`, mainPage);
app.use(`${basicUrl}/auth/local`, localAuth);
app.use(`${basicUrl}/user`, userRoute);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
