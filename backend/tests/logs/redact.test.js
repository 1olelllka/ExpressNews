const { redact } = require("../../src/logs/redact");

describe("Logs Redact", () => {
  it("Should redact array data", async () => {
    const data = [
      {
        _doc: {
          username: "test",
          password: "test",
          email: "test",
          full_name: "test",
          discordId: "test",
          googleId: "test",
        },
      },
    ];

    expect(redact(data)).toEqual([
      {
        username: "********",
        password: "********",
        email: "********",
        full_name: "********",
        discordId: "********",
        googleId: "********",
      },
    ]);
  });
  it("Should redact object data", async () => {
    const data = {
      _doc: {
        username: "test",
        password: "test",
        email: "test",
        full_name: "test",
        discordId: "test",
        googleId: "test",
      },
    };

    expect(redact(data)).toEqual({
      username: "********",
      password: "********",
      email: "********",
      full_name: "********",
      discordId: "********",
      googleId: "********",
    });
  });
});
