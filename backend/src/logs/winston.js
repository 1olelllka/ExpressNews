const winston = require("winston");
const { combine, json, metadata } = winston.format;
const mongoose = require("mongoose");
require("winston-mongodb");

const httpLogger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(json(), metadata()),
  transports: [
    new winston.transports.MongoDB({
      db: mongoose.connection.useDb("ExpressNews"),
      options: { useUnifiedTopology: true },
      collection: "logs",
      capped: false,
      expireAfterSeconds: 60 * 60,
    }),
  ],
});

module.exports = { httpLogger };
