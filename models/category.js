const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    }
})

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const schema = {
        name: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(category, schema)
}

exports.Category = Category;
exports.validate = validateCategory;