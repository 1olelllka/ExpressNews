const app = require("../../index");
const supertest = require("supertest");
const request = supertest(app);

const mongoose = require("mongoose");
const User = require("../../src/databases/schemas/User");
const client = require("../../src/databases/redis");
const jwt = require("jsonwebtoken");

require("dotenv").config();

jest.mock("../../src/databases/redis");
client.connect = jest.fn();
client.hGet = () => "[]";

const user_data = {
  username: "test",
  password: "test",
  full_name: "test",
  email: "test",
};

jest.mock("jsonwebtoken");

describe("Sources", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    const user = await User.create(user_data);
    const mockVerify = jest.fn().mockReturnValue({ userId: user._id });
    jwt.verify = mockVerify;
  });
  afterAll(async () => {
    await User.deleteOne(user_data);
    await mongoose.disconnect();
    await mongoose.connection.close();
    await app.stopServer();
  });
  afterEach(async () => {
    await jest.clearAllMocks();
  });
  describe("Get All Sources", () => {
    it("Should return 401 if user is unauthorized", async () => {
      const res = await request.get("/api/v1/sources");
      expect(res.status).toEqual(401);
    });
    it("Should return 200 if user is authorized", async () => {
      const res = await request
        .get("/api/v1/sources/")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.body.length).not.toEqual(0);
    });
  });
  describe("Following", () => {
    it("Should return 401 if user is unauthorized", async () => {
      const res = await request.post("/api/v1/sources/follow");
      expect(res.status).toEqual(401);
    });
    it("Should return 200 and empty list if user is authorized", async () => {
      const res = await request
        .get("/api/v1/sources/my-following")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.body).toEqual([]);
    });
    it("Should follow the source", async () => {
      const res = await request
        .post("/api/v1/sources/follow")
        .set("Authorization", "JWT valid-token")
        .send({ sourceId: "663b2600cebf98cfed0f3434" });
      expect(res.status).toEqual(201);
    });
    it("Should show the following list", async () => {
      client.hGet = () => JSON.stringify([{ _id: "663b2600cebf98cfed0f3434" }]);
      const res = await request
        .get("/api/v1/sources/my-following")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.body.length).not.toEqual(0);
    });
    it("Should unfollow the source", async () => {
      const res = await request
        .delete("/api/v1/sources/unfollow")
        .set("Authorization", "JWT valid-token")
        .send({ sourceId: "663b2600cebf98cfed0f3434" });
      expect(res.status).toEqual(202);
    });
  });
});
