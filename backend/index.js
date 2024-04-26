const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const MongoStore = require("connect-mongo");
require("dotenv").config();

const mainPage = require("./src/routes/mainPage");
const auth = require("./src/routes/auth/auth");
const userRoute = require("./src/routes/user");
const feedbackRoute = require("./src/routes/feedback");

const connectDB = require("./src/databases/database");
const client = require("./src/databases/redis");

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
    cookie: { maxAge: 1000 * 60 * 20 }, // 20 minutes
    // store: MongoStore.create({
    //   mongoUrl: process.env.DATABASE_URL,
    //   stringify: false,
    //   autoRemove: "native",
    // }),
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

app.use(`${basicUrl}`, mainPage);
app.use(`${basicUrl}/auth`, auth);
app.use(`${basicUrl}/user`, userRoute);
app.use(`${basicUrl}/feedback`, feedbackRoute);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
