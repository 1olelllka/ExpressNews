const supertest = require("supertest");
const app = require("../../../index");
const request = supertest(app);

const mongoose = require("mongoose");
const client = require("../../databases/redis");

// Just simple status checks
describe("Discord Authentication API Endpoints", () => {
  afterAll(async () => {
    await client.flushAll();
    await client.disconnect();
    await mongoose.disconnect();
    await mongoose.connection.close();
    await app.stopServer();
  });

  it("Should return 302 when user access the api", async () => {
    var res = await request.get("/api/v1/auth/discord/");
    expect(res.status).toEqual(302);
    res = await request.get("/api/v1/auth/discord/redirect/");
    expect(res.status).toEqual(302);
  });
});
describe("Google Authentication API Endpoints", () => {
  it("Should return 302 when user access the google api", async () => {
    var res = await request.get("/api/v1/auth/google/");
    expect(res.status).toEqual(302);
    res = await request.get("/api/v1/auth/google/redirect");
    expect(res.status).toEqual(302);
  });
});
