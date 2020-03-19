const mongoose = require('mongoose')
const { RoomName, validate } = require('../models/roomName')
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    const roomNames = await RoomName.find().sort('name')
    res.send(roomNames);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const roomName = new RoomName({
        name: req.body.name
    });
    await roomName.save()
    res.send(roomName);
});

module.exports = router