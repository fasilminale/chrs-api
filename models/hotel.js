const mongoose = require("mongoose");
const Joi = require("joi");
const hotelRuleSchema = require("./hotelRule");
const facilitySchema = require("./facility");
const userSchema = require("./user");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  pictures: {
    type: [String],
  },
  city: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  rules: {
    type: hotelRuleSchema,
  },
  facilities: {
    type: facilitySchema,
  },
  manager: {
    type: userSchema,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

function validateHotel(hotel) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(hotel, schema);
}

exports.hotelSchema = hotelSchema;
exports.Hotel = Hotel;
exports.validate = validateHotel;
