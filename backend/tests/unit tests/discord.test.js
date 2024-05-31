const { discordVerify } = require("../../src/middlewares/discordAuth");
const User = require("../../src/databases/schemas/User");
const jwt = require("jsonwebtoken");

jest.mock("../../src/databases/schemas/User");
jest.mock("jsonwebtoken");

const accessToken = "123";
const refreshToken = "543";
const profile = {
  id: "123",
  username: "test",
  email: "test@me.com",
};
const done = jest.fn((x) => x);

describe("Discord Auth Unit Test", () => {
  it("Should return user if found", async () => {
    const mockedUser = {
      id: "id_123",
      discordId: profile.id,
      createdAt: new Date(),
    };
    jwt.sign = jest.fn(() => "token");
    User.findOne.mockResolvedValueOnce(mockedUser);
    await discordVerify(accessToken, refreshToken, profile, done);
    expect(User.findOne).toHaveBeenCalledWith({
      discordId: profile.id,
    });
    expect(done).toHaveBeenCalledWith(null, mockedUser, {
      token: "token",
      userId: undefined,
      refreshToken: "token",
    });
  });
  it("should create user & return if not found", async () => {
    const newProfile = {
      id: "12312",
      username: "test",
      email: "test@me.com",
    };
    const newUser = {
      id: 1,
      discordId: "12312",
      createdAt: new Date(),
    };
    jwt.sign = jest.fn(() => "token");
    User.create.mockResolvedValueOnce(newUser);
    User.findOne.mockImplementationOnce(() => undefined);
    await discordVerify(accessToken, refreshToken, newProfile, done);
    expect(User.findOne).toHaveBeenCalledWith({
      discordId: newProfile.id,
    });
    expect(User.findOne).toHaveReturnedWith(undefined);
    expect(User.create).toHaveBeenCalledWith({
      discordId: newProfile.id,
      username: newProfile.username,
      email: newProfile.email,
      full_name: newProfile.username,
    });
    expect(done).toHaveBeenCalledWith(null, newUser, {
      token: "token",
      userId: undefined,
      refreshToken: "token",
    });
  });
});
