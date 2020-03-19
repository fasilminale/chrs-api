const mongoose = require('mongoose')
const { RoomType, validate } = require('../models/roomType')
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    const roomTypes = await RoomType.find().sort('name')
    res.send(roomTypes);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const roomType = new RoomType({
        name: req.body.name
    });
    await roomType.save()
    res.send(roomType);
});

module.exports = router