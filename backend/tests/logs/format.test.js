const { formatHttpLoggerResponse } = require("../../src/logs/format");

describe("Logs Format", () => {
  it("Should format the data correctly", async () => {
    const req = {
      headers: {
        host: "localhost",
      },
      method: "POST",
      body: {
        username: "test",
        password: "test",
        email: "test",
        full_name: "test",
        discordId: "test",
        googleId: "test",
      },
      baseUrl: "someurl",
      params: {},
      query: {},
    };
    const res = {
      getHeaders: () => {
        return {
          "content-type": "application/json",
        };
      },
      statusCode: 200,
      body: { _doc: { username: "test" } },
    };

    expect(formatHttpLoggerResponse(req, res, res.body)).toEqual({
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
        body: { username: "********" },
      },
    });
  });
});
