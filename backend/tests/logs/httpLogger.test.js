const { httpLogger } = require("../../src/logs/winston");

describe("Simple Winston Test", () => {
  it("Should log info", () => {
    expect(httpLogger).toHaveProperty("info");
    expect(httpLogger).toHaveProperty("warning");
    expect(httpLogger).toHaveProperty("error");
    expect(httpLogger.info).toEqual(expect.any(Function));
    expect(httpLogger.warning).toEqual(expect.any(Function));
    expect(httpLogger.error).toEqual(expect.any(Function));
  });
});
