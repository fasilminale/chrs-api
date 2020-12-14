const request = require("supertest");
const { Room } = require("../../models/room");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

let server;
describe("/api/rooms", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Room.remove({});
    server.close();
  });
  describe("GET /", () => {
    it("should return all rooms", async () => {
      await Room.collection.insertMany([{ name: "room1" }, { name: "room2" }]);
      const res = await request(server).get("/api/rooms");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "room1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "room2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a room if valid id is passed", async () => {
      const room = new Room({ name: "room1" });
      await room.save();
      const res = await request(server).get("/api/rooms/" + room._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", room.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/rooms/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no room with the give id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/rooms/" + id);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    /**
     * Define the happy path, and then in each test, we change
     * one parameter that clearly aligns with the name of the
     * test.
     */
    let token;
    let name;

    //Define the happy path
    const exec = async () => {
      return await request(server)
        .post("/api/rooms")
        .set("x-auth-token", token)
        .send({ name });
    };

    // we set parameters token, and name to valid values
    //and in each test depending on what we wanna test
    // we modify one of this parameters

    beforeEach(() => {
      //the value for happy path
      token = new User().generateAuthToken();
      name = "room1";
    });

    /**Testing the authorization(auth middleware) */
    it("should return 401 is client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    /**Testing invalid input (Using only 2 test, but it can be morethan 2)*/
    it("should return 400 if room is less than 5 characters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if room is more than 50 characters", async () => {
      name = new Array(52).join("a"); // to create name of 51 character

      const res = await exec();

      expect(res.status).toBe(400);
    });

    /** Testing the room is saved in the database // The Happy Path | if not errror*/
    it("should save the room if it is valid", async () => {
      await exec();

      const room = await Room.find({ name: "room1" });

      expect(room).not.toBeNull();
    });

    /** To make shure the room is in the body of the response */
    it("should return the room if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "room1");
    });
  });

  describe("PUT /:id", () => {
    let token;
    let newName;
    let room;
    let id;

    const exec = async () => {
      return await request(server)
        .put("/api/rooms/" + id)
        .set("x-auth-token", token)
        .send({ name: newName });
    };

    beforeEach(async () => {
      // Before each test we need to create a room and
      // put it in the database.
      room = new Room({ name: "room1" });
      await room.save();

      token = new User().generateAuthToken();
      id = room._id;
      newName = "updatedName";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if room is less than 5 characters", async () => {
      newName = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if room is more than 50 characters", async () => {
      newName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 404 if id is invalid", async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 404 if room with the given id was not found", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should update the room if input is valid", async () => {
      await exec();

      const updatedRoom = await Room.findById(room._id);

      expect(updatedRoom.name).toBe(newName);
    });

    it("should return the updated room if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newName);
    });
  });

  describe("DELETE /:id", () => {
    let token;
    let room;
    let id;

    const exec = async () => {
      return await request(server)
        .delete("/api/rooms/" + id)
        .set("x-auth-token", token)
        .send();
    };

    beforeEach(async () => {
      // Before each test we need to create a room and
      // put it in the database.
      room = new Room({ name: "room1" });
      await room.save();

      id = room._id;
      token = new User({ isAdmin: true }).generateAuthToken();
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 if the user is not an admin", async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 404 if id is invalid", async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 404 if no room with the given id was found", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should delete the room if input is valid", async () => {
      await exec();

      const roomInDb = await Room.findById(id);

      expect(roomInDb).toBeNull();
    });

    it("should return the removed room", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id", room._id.toHexString());
      expect(res.body).toHaveProperty("name", room.name);
    });
  });
});
