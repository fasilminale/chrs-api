const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer) {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(50).required(),
        city: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(customer, schema)
}

exports.Customer = Customer;
exports.validate = validateCustomer;