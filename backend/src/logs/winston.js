const winston = require("winston");
const { combine, timestamp, json, printf } = winston.format;
const { randomBytes } = require("crypto");
const timeStampFormat = "MMM-DD-YYYY HH:ms:ss";

const httpLogger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    timestamp({ format: timeStampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        logId: randomBytes(10).toString("hex"),
        timestamp,
        message,
        data,
      };
      return JSON.stringify(response);
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = { httpLogger };
