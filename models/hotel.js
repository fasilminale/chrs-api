const mongoose = require("mongoose");
const Joi = require("joi");
const { userSchema } = require("./user");
const { roomSchema } = require("./room");

const hotelSchema = new mongoose.Schema({
  name: String,
  star: String,
  contactName: String,
  contactNumber: String,
  streetAdress: String,
  city: String,
  facilities: [String],
  isParkingAvailable: String,
  isBreakFastAvailable: String,
  language: String,
  isChildrenAllowed: String,
  isPetsAllowed: String,
  pictures: [String],
  manager: {
    type: userSchema,
  },
  rooms: [roomSchema],
});

const Hotel = mongoose.model("Hotel", hotelSchema);

function validateHotel(hotel) {
  const schema = {
    hotelName: Joi.string(),
    star: Joi.string(),
    contactName: Joi.string(),
    contactNumber: Joi.string(),
    streetAdress: Joi.string(),
    city: Joi.string(),
    facilities: Joi.array(),
    isParkingAvailable: Joi.string(),
    isBreakFastAvailable: Joi.string(),
    language: Joi.string(),
    isChildrenAllowed: Joi.string(),
    isPetsAllowed: Joi.string(),
    pictures: Joi.array(),

    roomName: Joi.string(),
    roomType: Joi.string(),
    bedType: Joi.string(),
    quantity: Joi.string(),
    guestMaxCapacity: Joi.string(),
    isSmokingAllowed: Joi.string(),
    price: Joi.string(),
    userId: Joi.string(),
  };
  return Joi.validate(hotel, schema);
}

exports.hotelSchema = hotelSchema;
exports.Hotel = Hotel;
exports.validate = validateHotel;
