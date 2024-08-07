const { httpLogger } = require("./winston");
const { formatHttpLoggerResponse } = require("./format");

const responseInterceptor = (req, res, next) => {
  const originalSend = res.send;

  let responseSent = false;
  res.send = function (body) {
    if (!responseSent) {
      if (res.statusCode < 400) {
        httpLogger.info("Success", formatHttpLoggerResponse(req, res, body));
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        httpLogger.warning(
          "Error on client side",
          formatHttpLoggerResponse(req, res, body)
        );
      } else {
        httpLogger.error(
          "Error on server side",
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
