const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 25,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 25,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 25,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
    },
    photo: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
    },
    birthDate: {
        type: Date,
        required: true,
        minlength: 8,
        maxlength: 15,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles'
    },

});

const User = mongoose.model("User", userSchema);


function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(25).max(50).require(),
        lastName: Joi.string().min(25).max(50).require(),
        email: Joi.string().min(25).max(50).require(),
        password: Joi.string().min(8).max(15).require(),
        phone: Joi.string().min(8).max(15).require(),
        photo: Joi.string().min(8).max(15).require(),
        birthDate: Joi.string().min(8).max(15).require(),
        role: Joi.string().min(4).max(15).require(),
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;