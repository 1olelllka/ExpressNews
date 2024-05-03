const express = require("express");
// Config
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const basicUrl = process.env.BASIC_URL;

// Sessions Middleware
const session = require("express-session");
const RedisStore = require("connect-redis").default;

// Databases
const connectDB = require("./src/databases/database");
const client = require("./src/databases/redis");

connectDB();
client.connect().then(console.log("Connected to Redis")).catch(console.error);

// Middlewares
const { authenticate } = require("./src/middlewares/authentication");
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
app.use(`${basicUrl}/user`, authenticate, require("./src/routes/user/user"));
app.use(
  `${basicUrl}/feedback`,
  authenticate,
  require("./src/routes/user/feedback")
);
app.use(
  `${basicUrl}/sources`,
  authenticate,
  require("./src/routes/user/sources")
);

// Server
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
