const { redact } = require("../logs/redact");

const formatHttpLoggerResponse = (req, res, responseBody) => {
  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
    },
    response: {
      headers: res.getHeaders(),
      statuscode: res.statusCode,
      body: redact(responseBody),
    },
  };
};

module.exports = { formatHttpLoggerResponse };
