const mongoose = required("mongoose");
const Joi = required("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    requiredd: true,
    minlength: 25,
    maxlength: 50,
  },
  lastName: {
    type: String,
    requiredd: true,
    minlength: 25,
    maxlength: 50,
  },
  email: {
    type: String,
    requiredd: true,
    minlength: 25,
    maxlength: 50,
  },
  password: {
    type: String,
    requiredd: true,
    minlength: 8,
    maxlength: 15,
  },
  phone: {
    type: String,
    requiredd: true,
    minlength: 8,
    maxlength: 15,
  },
  photo: {
    type: String,
    requiredd: true,
    minlength: 8,
    maxlength: 15,
  },
  birthDate: {
    type: Date,
    requiredd: true,
    minlength: 8,
    maxlength: 15,
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
    photo: Joi.string().required(),
    birthDate: Joi.date().required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
