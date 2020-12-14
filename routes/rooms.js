const mongoose = require('mongoose')
const { Room, validate } = require('../models/room')
const express = require("express");
const router = express.Router()

router.get("/", async(req, res) => {
    const rooms = await Room.find().sort('code')
    res.send(rooms);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const room = await Room.findById(req.params.id)

    if (!room)
        return res.status(404).send("The room with the given ID was not found.");

    res.send(room);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const room = new Room({
        name: req.body.name,
        numberOfRooms: req.body.numberOfRooms,
        price: req.body.price,
        maxAdultsCapacity: req.body.maxAdultsCapacity,
        smoke: req.body.smoke,
        roomName: req.body.roomName,
        roomType: req.body.roomType,
        bedType: req.body.bedType,
        amenities: req.body.amenities,
        hotel: req.body.hotel,
    });
    await room.save()
    res.send(room);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const room = await Room.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        numberOfRooms: req.body.numberOfRooms,
        price: req.body.price,
        maxAdultsCapacity: req.body.maxAdultsCapacity,
        smoke: req.body.smoke,
        roomName: req.body.roomName,
        roomType: req.body.roomType,
        bedType: req.body.bedType,
        amenities: req.body.amenities,
        hotel: req.body.hotel,
    }, { new: true })

    if (!room)
        return res.status(404).send("The room with the given ID was not found.");

    // Return the updated room
    res.status(200).send(room)
});

router.delete("/:id", async(req, res) => {
    //Lookup the rate and remove
    //Not existing,return 404
    const room = await Room.findByIdAndRemove(req.params.id)

    if (!room)
        return res.status(404).send("The room with the given ID was not found.");

    //return the room that was deleted.
    res.send(room)
});

module.exports = router