const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 15,
  },
  photo: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  isCustomer: Boolean,
  isHotelAdmin: Boolean,
  isSuperAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isCustomer: this.isCustomer,
      isHotelAdmin: this.isHotelAdmin,
      isSuperAdmin: this.isSuperAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().max(15).required(),
    photo: Joi.string(),
    birthDate: Joi.date().required(),
    isCustomer: Joi.boolean(),
    isHotelAdmin: Joi.boolean(),
    isSuperAdmin: Joi.boolean(),
  };
  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
