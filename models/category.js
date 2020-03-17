const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    }
})

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const schema = {
        name: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(category, schema)
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;