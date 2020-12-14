const mongoose = require("mongoose");
const Joi = require("joi");

const rateSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
    },
    value: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    }

});

const Rate = mongoose.model("Rate", rateSchema);

function validateRate(rate) {
    const schema = {
        code: Joi.string().min(8).max(50).required(),
        value: Joi.string().min(10).max(50).required()
    };
    return Joi.validate(rate, schema);
}

exports.Rate = Rate;
exports.validate = validateRate;