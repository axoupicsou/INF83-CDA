const request = require("supertest");
const mongoose = require("mongoose");
let server;

beforeAll(async () => {
  // Start the server
  server = require("./index");
  // Wait for mongoose to connect
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("GET /set-data", () => {
  it("should create a new kitten and return it", async () => {
    const res = await request("http://localhost:3000").get("/set-data");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(typeof res.body.name).toBe("string");
  });
});

describe("GET /get-data", () => {
  it("should return an array of kittens", async () => {
    const res = await request("http://localhost:3000").get("/get-data");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
