const mongoose = require('mongoose')
const { BedType, validate } = require('../models/bedType')
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    const bedTypes = await BedType.find().sort('name')
    res.send(bedTypes);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const bedType = new BedType({
        name: req.body.name
    });
    await bedType.save()
    res.send(bedType);
});

module.exports = router