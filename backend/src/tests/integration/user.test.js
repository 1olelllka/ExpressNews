const app = require("../../../index");
const supertest = require("supertest");
const request = supertest(app);

const mongoose = require("mongoose");
const User = require("../../databases/schemas/User");
const client = require("../../databases/redis");
const jwt = require("jsonwebtoken");

require("dotenv").config();
jest.mock("jsonwebtoken");

const user_data = {
  username: "test",
  password: "test",
  full_name: "test",
  email: "test",
};

describe("User Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    const user = await User.create(user_data);
    const mockVerify = jest.fn().mockReturnValue({ userId: user._id });
    console.log(await client.hGet(user._id.toString(), "searches"));
    jwt.verify = mockVerify;
  });
  afterAll(async () => {
    await client.flushAll();
    await client.disconnect();
    await User.deleteMany({ username: "test" });
    await mongoose.disconnect();
    await mongoose.connection.close();
    await app.stopServer();
  });
  describe("Profile", () => {
    it("Should return 401 when user is unauthorized", async () => {
      const res = await request.get("/api/v1/user/profile");
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("message");
    });
    it("Should return 200 when user is authorized", async () => {
      const res = await request
        .get("/api/v1/user/profile")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("user");
      console.log(res.body);
    });
  });
  describe("Searches", () => {
    it("Should return 401 when user is unauthorized", async () => {
      const res = await request.get("/api/v1/user/searches");
      expect(res.status).toEqual(401);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("message");
    });
    it("Should return 200 when user is authorized", async () => {
      const res = await request
        .get("/api/v1/user/searches")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
    });
    it("Should return empty list when user doesn't have any searches or user is new", async () => {
      const res = await request
        .get("/api/v1/user/searches/")
        .set("Authorization", "JWT valid-token");
      expect(res.body).toEqual({});
    });
    // ! TODO ADD THE TEST CASE WHERE USER HAS SOME SEARCHES (IDK WHY DOESN'T IT WORK)
  });
  describe("Saved Articles", () => {
    it("Should return 400 if user is unauthorized", async () => {
      var res = await request.get("/api/v1/user/saved-articles");
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message");
      res = await request.post("/api/v1/user/save-article");
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message");
      res = await request.delete("/api/v1/user/delete-article");
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message");
    });
    it("Should return 200 if user is authorized", async () => {
      const res = await request
        .get("/api/v1/user/saved-articles")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
    });
    it("Should return empty list if user is new", async () => {
      const res = await request
        .get("/api/v1/user/saved-articles")
        .set("Authorization", "JWT valid-token");
      expect(res.status).toEqual(200);
      expect(res.body).toEqual([]);
    });
    it("Should add the article to user's saved articles", async () => {
      const res = await request
        .post("/api/v1/user/save-article")
        .set("Authorization", "JWT valid-token")
        .send({
          storyId: new mongoose.Types.ObjectId("5f5b0d5b0d5b0d5b0d5b0d5b"),
        });
      expect(res.status).toEqual(201);
      var check_user = await request
        .get("/api/v1/user/profile")
        .set("Authorization", "JWT valid-token");
      expect(check_user.body.user).toHaveProperty("saved_stories");
      expect(check_user.body.user.saved_stories).toHaveProperty("length", 1);
    });
    it("Should delete a saved article from user's saved articles", async () => {
      const res = await request
        .delete("/api/v1/user/delete-article")
        .set("Authorization", "JWT valid-token")
        .send({
          storyId: new mongoose.Types.ObjectId("5f5b0d5b0d5b0d5b0d5b0d5b"),
        });
      expect(res.status).toEqual(202);
      var check_user = await request
        .get("/api/v1/user/profile")
        .set("Authorization", "JWT valid-token");
      expect(check_user.body.saved_stories).toBe(undefined);
    });
  });
});
