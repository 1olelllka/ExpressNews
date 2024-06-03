const { responseInterceptor } = require("../../src/logs/intercept");
const { httpLogger } = require("../../src/logs/winston");

jest.mock("../../src/logs/winston");
httpLogger.info = jest.fn();
httpLogger.warning = jest.fn();
httpLogger.error = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Logs Interceptor", () => {
  it("Should intercept the response", async () => {
    const req = {
      headers: {
        host: "localhost",
      },
    };
    const res = {
      statusCode: 200,
      body: { _doc: { username: "test" } },
    };
    const next = jest.fn();
    responseInterceptor(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res).toHaveProperty("send");
  });
});
