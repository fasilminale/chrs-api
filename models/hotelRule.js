const mongoose = require("mongoose");
const Joi = require("joi");

const hotelRuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
});

const HotelRule = mongoose.model("HotelRule", hotelRuleSchema);

function validateHotelRule(hotelRule) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(hotelRule, schema);
}

exports.hotelRuleSchema = hotelRuleSchema;
exports.HotelRule = HotelRule;
exports.validate = validateHotelRule;
