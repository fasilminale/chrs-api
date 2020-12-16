const mongoose = require("mongoose");
const Joi = require("joi");

const hotelSchema = require("./room");
const customerSchema = require("./customer");
const rateSchema = require("./rate");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 254,
    },
    hotel: {
        type: hotelSchema,
    },
    costomer: {
        type: customerSchema,
    },
    rate: {
        type: rateSchema,
    }

});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
    const schema = {
        comment: Joi.string().min(1).max(254).required(),
        hotelId: Joi.objectId().required(),
        costomerId: Joi.objectId().required(),
        rateId: Joi.objectId().required()
    };
    return Joi.validate(review, schema);
}

exports.Review = Review;
exports.validate = validateReview;