const Joi = require("joi");
const mongoose = require("mongoose");

const roomNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
});

const RoomName = mongoose.model("Roomname", roomNameSchema);

function validateRoomName(roomName) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(roomName, schema);
}

exports.roomNameSchema = roomNameSchema;
exports.RoomName = RoomName;
exports.validate = validateRoomName;
