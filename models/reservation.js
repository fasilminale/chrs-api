const mongoose = require("mongoose");
const Joi = require("joi");

const reservationSchema = new mongoose.Schema({
    bookingNumber: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 254,
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
        required: true,
    },
    numberOfGuest: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 254,
    },

    costomer: {
        type: customerSchema,
    },
    room: {
        type: roomSchema,
    },
    hotel: {
        type: hotelSchema,
    },
});

const Review = mongoose.model("Review", reservationSchema);

function validateReview(review) {
    const schema = {
        bookingNumber: Joi.string().min(1).max(254).required(),
        checkInDate: Joi.date().required(),
        checkOutDate: Joi.date().required(),
        price: Joi.number().required(),
        bookedOnDate: Joi.date().required(),
        numberOfGuest: Joi.number().required(),
        status: Joi.string().min(1).max(254).required(),
        costomerId: Joi.objectId().required(),
        roomId: Joi.objectId().required(),
        hotelId: Joi.objectId().required(),
    };
    return Joi.validate(review, schema);
}

exports.Review = Review;
exports.validate = validateReview;