const mongoose = require("mongoose");
const Joi = require("joi");

const { roomNameSchema } = require("./roomName");
const { roomTypeSchema } = require("./roomType");
const { bedTypeSchema } = require("./bedType");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 50,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  guestMaxCapacity: {
    type: Number,
    required: true,
  },
  isSmokingAllowed: {
    type: String,
    required: true,
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
});

const Room = mongoose.model("Room", roomSchema);

function validateRoom(room) {
  const schema = {
    name: Joi.string().min(4).max(50),
    quantity: Joi.number().min(1).max(4).required(),
    price: Joi.number().min(1).required(),
    guestMaxCapacity: Joi.number().min(1).max(4).required(),
    isSmokingAllowed: Joi.string().min(10).max(50).required(),
    roomNameId: Joi.objectId().required(),
    roomTypeId: Joi.objectId().required(),
    bedTypeId: Joi.objectId().required(),
  };
  return Joi.validate(room, schema);
}

exports.roomSchema = roomSchema;
exports.Room = Room;
exports.validate = validateRoom;
