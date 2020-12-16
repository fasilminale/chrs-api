const mongoose = require('mongoose')
const { Hotel, validate } = require('../models/hotel')
const express = require("express");
const router = express.Router()

router.get("/", async(req, res) => {
    const hotels = await Hotel.find().sort('code')
    res.send(hotels);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const hotel = await Hotel.findById(req.params.id)

    if (!hotel)
        return res.status(404).send("The hotel with the given ID was not found.");

    res.send(hotel);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const hotel = new Hotel({
        name: req.body.name,
        description: req.body.description,
        pictures: req.body.pictures,
        city: req.body.city,
        rules: req.body.rules,
        fasilities: req.body.fasilities,
        manager: req.body.manager,
    });
    await hotel.save()
    res.send(hotel);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        pictures: req.body.pictures,
        city: req.body.city,
        rules: req.body.rules,
        fasilities: req.body.fasilities,
        manager: req.body.manager,
    }, { new: true })

    if (!hotel)
        return res.status(404).send("The hotel with the given ID was not found.");

    // Return the updated hotel
    res.status(200).send(hotel)
});

router.delete("/:id", async(req, res) => {
    //Lookup the hotel and remove
    //Not existing,return 404
    const hotel = await Hotel.findByIdAndRemove(req.params.id)

    if (!hotel)
        return res.status(404).send("The hotel with the given ID was not found.");

    //return the hotel that was deleted.
    res.send(hotel)
});

module.exports = router