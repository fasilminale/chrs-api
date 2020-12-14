const mongoose = require('mongoose')
const { Rate, validate } = require('../models/rate')
const express = require("express");
const router = express.Router()

router.get("/", async(req, res) => {
    const rates = await Rate.find().sort('code')
    res.send(rates);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const rate = await Rate.findById(req.params.id)

    if (!rate)
        return res.status(404).send("The rate with the given ID was not found.");

    res.send(rate);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const rate = new Rate({
        code: req.body.code,
        value: req.body.value,
    });
    await rate.save()
    res.send(rate);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const rate = await Rate.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        value: req.body.value,
    }, { new: true })

    if (!rate)
        return res.status(404).send("The rate with the given ID was not found.");

    // Return the updated rate
    res.status(200).send(rate)
});

router.delete("/:id", async(req, res) => {
    //Lookup the rate and remove
    //Not existing,return 404
    const rate = await Rate.findByIdAndRemove(req.params.id)

    if (!rate)
        return res.status(404).send("The rate with the given ID was not found.");

    //return the rate that was deleted.
    res.send(rate)
});

module.exports = router