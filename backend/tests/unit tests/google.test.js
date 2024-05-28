const { googleVerify } = require("../../src/middlewares/googleAuth");
const User = require("../../src/databases/schemas/User");
const jwt = require("jsonwebtoken");

jest.mock("../../src/databases/schemas/User");
jest.mock("jsonwebtoken");

const accessToken = "123";
const refreshToken = "543";
const profile = {
  _json: {
    sub: "123",
    name: "test",
    email: "test@me.com",
  },
};
const done = jest.fn((x) => x);

describe("Google Auth Unit Test", () => {
  it("Should return user if found", async () => {
    const mockedUser = {
      id: "id_123",
      googleId: profile._json.sub,
      createdAt: new Date(),
    };
    jwt.sign = jest.fn(() => "token");
    User.findOne.mockResolvedValueOnce(mockedUser);
    await googleVerify(accessToken, refreshToken, profile, done);
    expect(User.findOne).toHaveBeenCalledWith({
      googleId: profile._json.sub,
    });
    expect(done).toHaveBeenCalledWith(null, mockedUser, {
      token: "token",
      userId: undefined,
    });
  });
  it("should create user & return if not found", async () => {
    const newProfile = {
      _json: {
        sub: "12312",
        name: "test",
        email: "test@me.com",
      },
    };
    const newUser = {
      id: 1,
      googleId: "12312",
      createdAt: new Date(),
    };
    jwt.sign = jest.fn(() => "token");
    User.create.mockResolvedValueOnce(newUser);
    User.findOne.mockImplementationOnce(() => undefined);
    await googleVerify(accessToken, refreshToken, newProfile, done);
    expect(User.findOne).toHaveBeenCalledWith({
      googleId: newProfile._json.sub,
    });
    expect(User.findOne).toHaveReturnedWith(undefined);
    expect(User.create).toHaveBeenCalledWith({
      googleId: newProfile._json.sub,
      username: newProfile._json.name,
      email: newProfile._json.email,
      full_name: newProfile._json.name,
    });
    expect(done).toHaveBeenCalledWith(null, newUser, {
      token: "token",
      userId: undefined,
    });
  });
});
