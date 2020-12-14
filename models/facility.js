const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const Joi = require("joi");

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  category: {
    type: categorySchema,
    required: true,
  },
});

const Facility = mongoose.model("Facility", facilitySchema);

function validateFacility(facility) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    categoryId: Joi.objectId().required(),
  };

  return Joi.validate(facility, schema);
}

exports.facilitySchema = facilitySchema;
exports.Facility = Facility;
exports.validate = validateFacility;
