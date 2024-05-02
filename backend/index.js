const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
require("dotenv").config();

const connectDB = require("./src/databases/database");
const client = require("./src/databases/redis");

// Middleware to check if user is logged in
const { authenticate } = require("./src/middlewares/authentication");

const app = express();

const PORT = 8000;
const basicUrl = "/api/v1";

connectDB();
// connect to redis
client.connect().then(console.log("Connected to Redis")).catch(console.error);

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
    cookie: { maxAge: 1000 * 60 * 60 }, // 60 minutes
    store: new RedisStore({
      client: client,
      secret: process.env.SESSIONS_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
  })
);
require("./src/middlewares/discordAuth");
require("./src/middlewares/googleAuth");

app.use(`${basicUrl}/home`, authenticate, require("./src/routes/mainPage"));
app.use(`${basicUrl}/auth`, require("./src/routes/auth/auth"));
app.use(`${basicUrl}/user`, authenticate, require("./src/routes/user"));
app.use(`${basicUrl}/feedback`, authenticate, require("./src/routes/feedback"));
app.use(`${basicUrl}/sources`, authenticate, require("./src/routes/sources"));

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
