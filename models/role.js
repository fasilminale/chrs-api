const mongoose = require("mongoose");
const Joi = require("joi");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },

});

const Role = mongoose.model("Role", roleSchema);

function validateRole(role) {
    const schema = {
        name: Joi.string().min(4).max(15).required(),
    };
    return Joi.validate(role, schema);
}

exports.Role = Role;
exports.validate = validateRole;