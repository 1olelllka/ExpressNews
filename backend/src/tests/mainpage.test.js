const app = require("../../index");
const supertest = require("supertest");
const request = supertest(app);

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../databases/schemas/User");
const client = require("../databases/redis");

require("dotenv").config();

jest.mock("jsonwebtoken");
const user_data = {
  username: "test",
  password: "test",
  full_name: "test",
  email: "test",
};

describe("Main Page", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    const user = await User.create(user_data);

    const mockVerify = jest.fn().mockReturnValue({ userId: user._id });
    jwt.verify = mockVerify;
  });

  afterAll(async () => {
    client.flushAll(); // Maybe I'll change it later
    await User.deleteOne(user_data);
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("Home", () => {
    it("Should return 401 when user is unauthorized", async () => {
      const res = await request.get("/api/v1/home");
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("message");
    });
    it("Should return 200 when user is authorized", async () => {
      const res = await request
        .get("/api/v1/home")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.length).toBeGreaterThan(0);
    });
    it("Should return 200 when user access another page", async () => {
      const res = await request
        .get("/api/v1/home/?page=2")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });
  });
  describe("Search", () => {
    it("Should return 401 when user is unauthorized", async () => {
      const res = await request.get("/api/v1/home/search/?query=story");
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("message");
    });
    it("Should return 200 when user search for stories", async () => {
      const res = await request
        .get("/api/v1/home/search/?query=story")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });
    it("Should return 200 when user search for stories and scrolls to another page", async () => {
      const res = await request
        .get("/api/v1/home/search/?query=story&page=2")
        .set("Authorization", "JWT valid-token");
      const user = await User.findOne({ username: "test" });

      const cache = await client.hGet(user._id.toString(), "searches");
      console.log(cache);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });
    // it("Should have a search history", async () => {
    //   const user = await User.findOne({ username: "test" });
    //   const res = await client.hGet(user._id.toString(), "searches");
    //   expect(res).toEqual(JSON.stringify(["story*", "story*"]));
    //   expect(res.length).toEqual(19);
    // });
  });

  // It's just a demo, as I didn't implement the redis and rabbitmq mocking
  describe("Notifications", () => {
    it("Should return 401 when user is unauthorized", async () => {
      const res = await request.get("/api/v1/home/notifications");
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("message");
    });
    it("Should return 200 when user is authorized and has no notifications", async () => {
      const res = await request
        .get("/api/v1/home/notifications")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body.length).toEqual(0);
    });
  });
});