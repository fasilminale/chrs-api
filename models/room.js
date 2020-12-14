const mongoose = require("mongoose");
const Joi = require("joi");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        minlength: 4,
        maxlength: 50,
    },
    numberOfRooms: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 4,
    },
    price: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 20,
    },
    maxAdultsCapacity: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 4,
    },
    smoke: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
    },
    roomName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomName'
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType'
    },
    bedType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BedType'
    },
    amenities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amentities'
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }

});

const Room = mongoose.model("Room", roomSchema);

function validateRoom(room) {
    const schema = {
        name: Joi.string().min(4).max(50),
        numberOfRooms: Joi.number().min(1).max(4).required(),
        price: Joi.number().min(1).max(20).required(),
        maxAdultsCapacity: Joi.number().min(1).max(4).required(),
        smoke: Joi.string().min(10).max(50).required(),
        roomName: Joi.string().min(5).max(50).required(),
        roomType: Joi.string().min(5).max(50).required(),
        bedType: Joi.string().min(5).max(50).required(),
        amenities: Joi.string().min(8).max(50).required(),
        hotel: Joi.string().min(10).max(50).required(),
    };
    return Joi.validate(room, schema);
}

exports.Room = Room;
exports.validate = validateRoom;