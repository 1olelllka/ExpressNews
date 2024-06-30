const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const https = require("node:https");
const http = require("node:http");
const fs = require("fs");
// Config
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const basicUrl = process.env.BASIC_URL;

// Server and Socket.io
// const server = https.createServer(
//   {
//     key: fs.readFileSync(process.env.CERTIFICATE_SECRET_PATH),
//     cert: fs.readFileSync(process.env.CERTIFICATE_PATH),
//   },
//   app
// );
const server = http.createServer(app);
const io = new Server(server);
module.exports = { io }; // for messages

// Documentation
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./documentation/options");
const specs = swaggerJsdoc(options);

// Sessions Middleware
const session = require("express-session");
const cookieParser = require("cookie-parser");
const RedisStore = require("connect-redis").default;

// Databases
const connectDB = require("./src/databases/database");
const client = require("./src/databases/redis");
const { httpLogger } = require("./src/logs/winston");

connectDB();
client
  .connect()
  .catch((err) => httpLogger.alert("Error connecting to Redis", err));

// Middlewares
const { authenticate } = require("./src/middlewares/authentication");
const { responseInterceptor } = require("./src/logs/intercept");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes -> During development
  max: 10000000000,
  message: "Too many requests from this IP, please try again after 15 minutes",
  headers: true,
});
app.use(responseInterceptor);
app.use(limiter);
app.use(helmet());

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
app.use(cookieParser());
require("./src/middlewares/discordAuth");
require("./src/middlewares/googleAuth");

// Routes
app.use(`${basicUrl}/auth`, require("./src/routes/auth/auth"));
app.use(`${basicUrl}/home`, authenticate, require("./src/routes/mainPage"));
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
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// RabbitMQ + Socket.IO
require("./src/messages/messages");
const { rabbitMQ } = require("./src/messages/rabbitmq");

rabbitMQ(io);

// Server
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});

app.stopServer = () => {
  server.close();
};

module.exports = app;
