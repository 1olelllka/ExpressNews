const jwt = require("jsonwebtoken");
const User = require("../../src/databases/schemas/User");
const client = require("../../src/databases/redis");
const { authenticate } = require("../../src/middlewares/authentication");

jest.mock("jsonwebtoken");
jest.mock("../../src/databases/schemas/User");
jest.mock("../../src/databases/redis");

describe("Authenticate function", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { session: {}, headers: {} };
    res = { status: jest.fn(() => res), send: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return 401 for invalid token", async () => {
    req.headers.authorization = "Bearer invalid_token";
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });
    await authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should return 404 for non-existent user", async () => {
    req.session.token = "valid_token";
    const decoded = { userId: 1 };
    jwt.verify.mockReturnValue(decoded);
    await User.findById.mockReturnValue(null);
    await authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should attach user and handle redis for existing user", async () => {
    req.session.token = "valid_token";
    const decoded = { userId: 1 };
    const mockUser = { _id: 1 };
    jwt.verify.mockReturnValue(decoded);
    User.findById.mockReturnValue(mockUser);
    client.json.type.mockReturnValue(null);
    await authenticate(req, res, next);
    expect(req.user).toEqual(mockUser);
    expect(client.json.set).toHaveBeenCalledWith("1_breaking_news", "$", {
      breaking: [],
    });
    expect(client.expire).toHaveBeenCalledWith("1_breaking_news", 60 * 30);
    expect(next).toHaveBeenCalled();
  });
});
