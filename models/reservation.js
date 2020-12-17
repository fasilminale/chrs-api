const mongoose = require("mongoose");
const Joi = require("joi");

const { roomSchema } = require("./room");
const { userSchema } = require("./user");
const { hotelSchema } = require("./hotel");

const reservationSchema = new mongoose.Schema({
  confirmationNumber: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookedOnDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    required: true,
  },
  customer: {
    type: userSchema,
  },
  room: {
    type: roomSchema,
  },
  hotel: {
    type: hotelSchema,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

function validateReservation(reservation) {
  const schema = {
    confirmationNumber: Joi.string().min(1).max(254).required(),
    checkInDate: Joi.date().required(),
    checkOutDate: Joi.date().required(),
    status: Joi.string(),
    userId: Joi.objectId(),
    roomId: Joi.objectId(),
    hotelId: Joi.objectId(),
  };
  return Joi.validate(reservation, schema);
}

exports.reservationSchema = reservationSchema;
exports.Reservation = Reservation;
exports.validate = validateReservation;
