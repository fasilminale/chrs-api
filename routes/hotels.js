const mongoose = require("mongoose");
const { Hotel, validate } = require("../models/hotel");
const { Room } = require("../models/room");
const { BedType } = require("../models/bedType");
const { RoomType } = require("../models/roomType");
const { RoomName } = require("../models/roomName");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const hotels = await Hotel.find().sort("code");
  res.send(hotels);
});

router.get("/:id", async (req, res) => {
  // Lookup
  // If not existing, return 404
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel)
    return res.status(404).send("The hotel with the given ID was not found.");

  res.send(hotel);
});

router.post("/", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User.");
  const roomType = await RoomType.findById(req.body.roomType);
  if (!roomType) return res.status(400).send("Invalid Room Type.");
  const roomName = await RoomName.findById(req.body.roomName);
  if (!roomName) return res.status(400).send("Invalid Room Name.");
  const bedType = await BedType.findById(req.body.bedType);
  if (!bedType) return res.status(400).send("Invalid Bed Type.");

  const room = new Room({
    roomName: req.body.roomName,
    quantity: req.body.quantity,
    price: req.body.price,
    guestMaxCapacity: req.body.guestMaxCapacity,
    isSmokingAllowed: req.body.isSmokingAllowed,
    roomName: {
      _id: roomName._id,
      name: roomName.name,
    },
    roomType: {
      _id: roomType._id,
      name: roomType.name,
    },
    bedType: {
      _id: bedType._id,
      name: bedType.name,
    },
  });

  await room.save();

  const hotel = new Hotel({
    name: req.body.hotelName,
    star: req.body.star,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    streetAdress: req.body.streetAdress,
    city: req.body.city,
    facilities: req.body.facilities,
    isParkingAvailable: req.body.isParkingAvailable,
    isBreakFastAvailable: req.body.isBreakFastAvailable,
    language: req.body.language,
    isChildrenAllowed: req.body.isChildrenAllowed,
    isPetsAllowed: req.body.isPetsAllowed,
    pictures: req.body.pictures,
    manager: {
      ...user,
    },
    rooms: [room],
  });

  await hotel.save();

  res.send(hotel);
});

router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Lookup and update
  // If not existing, return 404
  const hotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      pictures: req.body.pictures,
      city: req.body.city,
      rules: req.body.rules,
      fasilities: req.body.fasilities,
      manager: req.body.manager,
    },
    { new: true }
  );

  if (!hotel)
    return res.status(404).send("The hotel with the given ID was not found.");

  // Return the updated hotel
  res.status(200).send(hotel);
});

router.delete("/:id", async (req, res) => {
  //Lookup the hotel and remove
  //Not existing,return 404
  const hotel = await Hotel.findByIdAndRemove(req.params.id);

  if (!hotel)
    return res.status(404).send("The hotel with the given ID was not found.");

  //return the hotel that was deleted.
  res.send(hotel);
});

module.exports = router;
