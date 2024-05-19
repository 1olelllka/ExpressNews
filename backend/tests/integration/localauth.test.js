const app = require("../../index");
const supertest = require("supertest");
const request = supertest(app);

const mongoose = require("mongoose");
const User = require("../../src/databases/schemas/User");
const client = require("../../src/databases/redis");

require("dotenv").config();

const user_data = {
  username: "test",
  password: "test",
  full_name: "test",
  email: "testauth",
};

describe("Local Authentication API Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
  });
  afterEach(async () => {
    await User.deleteMany({ username: "test" });
  });
  afterAll(async () => {
    await client.flushAll();
    await client.disconnect();
    await mongoose.disconnect();
    await mongoose.connection.close();
    await app.stopServer();
  });
  describe("Local Register", () => {
    it("Should return 201 when user is registered successfully", async () => {
      const res = await request.post("/api/v1/auth/register").send(user_data);
      expect(res.status).toEqual(201);
      expect(res.body).toEqual({});
    });
    it("Should return 400 if user hasn't provided all required fields", async () => {
      let res = await request.post("/api/v1/auth/register").send({});
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        message: "All fields are required",
      });
      res = await request
        .post("/api/v1/auth/register")
        .send({ username: "test" });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        message: "All fields are required",
      });
      res = await request
        .post("/api/v1/auth/register")
        .send({ username: "test", password: "test" });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        message: "All fields are required",
      });
    });
    it("Password is hashed", async () => {
      const res = await request.post("/api/v1/auth/register").send(user_data);
      expect(res.body.password).not.toEqual(user_data.password);
    });
    it("Should return 409 if user already exists", async () => {
      await request.post("/api/v1/auth/register").send(user_data);
      const res = await request.post("/api/v1/auth/register").send(user_data);
      expect(res.status).toEqual(409);
      expect(res.body).toEqual({
        message: "User with the same username already exists",
      });
    });
  });
  describe("Local Login", () => {
    beforeEach(async () => {
      await request.post("/api/v1/auth/register").send(user_data);
    });
    // TODO: Implement the sessions check
    it("Should return 200 when user logged in successfully", async () => {
      const res = await request
        .post("/api/v1/auth/login")
        .send({ username: user_data.username, password: user_data.password });
      expect(res.status).toEqual(200);
    });
    it("Should return 404 if user doesn't exist", async () => {
      const res = await request
        .post("/api/v1/auth/login")
        .send({ username: "Invalid username", password: "Invalid password" });
      expect(res.status).toEqual(404);
      expect(res.body).toEqual({ message: "User not found" });
    });
    it("Should return 401 if password is incorrect", async () => {
      const res = await request
        .post("/api/v1/auth/login")
        .send({ username: user_data.username, password: "Invalid Password" });
      expect(res.status).toEqual(401);
      expect(res.body).toEqual({ message: "Invalid password" });
    });
  });
  describe("Developers Debugging Endpoint", () => {
    it("Should return 200 when accessing the endpoint", async () => {
      const res = await request.get("/api/v1/auth/");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual("application/json");
    });
  });
});
