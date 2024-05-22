const { httpLogger } = require("./winston");
const { formatHttpLoggerResponse } = require("./format");

// Interseptor for urls, res.send();
const responseInterceptor = (req, res, next) => {
  const originalSend = res.send;

  let responseSent = false;
  res.send = function (body) {
    if (!responseSent) {
      if (res.statusCode < 400) {
        httpLogger.info("Success", formatHttpLoggerResponse(req, res, body));
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        httpLogger.warning(
          body.message,
          formatHttpLoggerResponse(req, res, body)
        );
      } else {
        httpLogger.error(
          body.message,
          formatHttpLoggerResponse(req, res, body)
        );
      }

      responseSent = true;
    }

    return originalSend.call(this, body);
  };

  next();
};

module.exports = { responseInterceptor };
