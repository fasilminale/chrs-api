const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const customers = require("./routes/customers");
const categories = require("./routes/categories");
const facilities = require("./routes/facilities");
const roomNames = require("./routes/roomNames");
const roomTypes = require("./routes/roomTypes");
const bedTypes = require("./routes/bedTypes");
const rates = require("./routes/rates");
const users = require("./routes/users");
const auth = require("./routes/auth");
const rooms = require("./routes/rooms");
const roles = require("./routes/roles");
const reviews = require("./routes/reviews");
const reservations = require("./routes/reservations");
const hotels = require("./routes/hotels");
const upload = require("./routes/upload");
const express = require("express");
const app = express();
const db = config.get("db");

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json()); // this enables pasrsing of json object in the body of a request.
app.use(cors());
app.use(express.static("public"));
app.use("/api/customers", customers);
app.use("/api/categories", categories);
app.use("/api/facilities", facilities);
app.use("/api/roomnames", roomNames);
app.use("/api/roomtypes", roomTypes);
app.use("/api/bedtypes", bedTypes);
app.use("/api/rates", rates);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/rooms", rooms);
app.use("/api/roles", roles);
app.use("/api/reviews", reviews);
app.use("/api/reservations", reservations);
app.use("/api/hotels", hotels);
app.use("/api/upload", upload);

app.get("/", (req, res) => {
  res.send("Central customer reservation system");
});

const port = process.env.PORT | 3000;
app.listen(3000, () => console.log(`Listing on port ${port}...`));
