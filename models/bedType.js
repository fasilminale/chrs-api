const Joi = require('joi')
const mongoose = require('mongoose')


const bedTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
})

const BedType = mongoose.model('Bedtype', bedTypeSchema);

function validateBedType(bedType) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(bedType, schema)
}

exports.bedTypeSchema = bedTypeSchema;
exports.BedType = BedType;
exports.validate = validateBedType;