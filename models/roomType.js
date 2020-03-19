const Joi = require('joi')
const mongoose = require('mongoose')


const roomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
})

const RoomType = mongoose.model('Roomtype', roomTypeSchema);

function validateRoomType(roomType) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(roomType, schema)
}

exports.roomTypeSchema = roomTypeSchema;
exports.RoomType = RoomType;
exports.validate = validateRoomType;