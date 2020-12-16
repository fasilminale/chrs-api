const mongoose = require("mongoose");
const Joi = require("joi");
const hotelRuleSchema = require("./hotelRule");
const facilitySchema = require("./facility");
const userSchema = require("./user");

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

    roomName: Joi.string(),
    roomType: Joi.string(),
    bedType: Joi.string(),
    quantity: Joi.string(),
    guestMaxCapacity: Joi.string(),
    isSmokingAllowed: Joi.string(),
    price: Joi.string(),
  };
  return Joi.validate(hotel, schema);
}

exports.hotelSchema = hotelSchema;
exports.Hotel = Hotel;
exports.validate = validateHotel;
