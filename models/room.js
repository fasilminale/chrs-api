const mongoose = require("mongoose");
const Joi = require("joi");

const roomNameSchema = require("./roomName");
const roomTypeSchema = require("./roomType");
const bedTypeSchema = require("./bedType");
const facilitySchema = require("./facility");
const hotelSchema = require("./hotel");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 50,
  },
  numberOfRooms: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 4,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  maxAdultsCapacity: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 4,
  },
  smoke: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
  },
  roomName: {
    type: roomNameSchema,
  },
  roomType: {
    type: roomTypeSchema,
  },
  bedType: {
    type: bedTypeSchema,
  },
  amenities: {
    type: facilitySchema,
  },
  hotel: {
    type: hotelSchema,
  },
});

const Room = mongoose.model("Room", roomSchema);

function validateRoom(room) {
  const schema = {
    name: Joi.string().min(4).max(50),
    numberOfRooms: Joi.number().min(1).max(4).required(),
    price: Joi.number().min(1).required(),
    maxAdultsCapacity: Joi.number().min(1).max(4).required(),
    smoke: Joi.string().min(10).max(50).required(),
    roomNameId: Joi.objectId().required(),
    roomTypeId: Joi.objectId().required(),
    bedTypeId: Joi.objectId().required(),
    amenities: Joi.array().required(),
    hotelId: Joi.objectId().required(),
  };
  return Joi.validate(room, schema);
}

exports.Room = Room;
exports.validate = validateRoom;
