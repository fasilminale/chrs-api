const request = require("supertest");
const { User } = require("../../models/user");
const { Room } = require("../../models/room");
describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Room.remove({});
    server.close();
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/rooms")
      .set("x-auth-token", token)
      .send({ name: "room1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });
  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
