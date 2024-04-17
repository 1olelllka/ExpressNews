const express = require("express");
const session = require("express-session");
require("dotenv").config();

const mainPage = require("./src/routes/mainPage");
const auth = require("./src/routes/auth/auth");
const userRoute = require("./src/routes/user");

const connectDB = require("./src/databases/database");

const app = express();

const PORT = 8000;
const basicUrl = "/api/v1";

connectDB();
require("./src/middlewares/discordAuth");
require("./src/middlewares/googleAuth");

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(`${basicUrl}`, mainPage);
app.use(`${basicUrl}/auth`, auth);
app.use(`${basicUrl}/user`, userRoute);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
