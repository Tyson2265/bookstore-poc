import request from "supertest";
import app from "../app";
import User from "../models/user.model";

beforeEach(async () => {
  await User.destroy({ where: { username: "tyson" } });
});

describe("Auth", () => {
  it("registers and logs in a user", async () => {
    await request(app)
      .post("/auth/register")
      .send({ username: "tyson", email: "t@t.com", password: "123", pseudonym: "T" });
    const res = await request(app).post("/auth/login").send({ username: "tyson", password: "123" });
    expect(res.status).toBe(200);
    expect(res.body.access_token).toBeDefined();
  });
});
