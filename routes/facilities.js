const mongoose = require('mongoose')
const { Facility, validate } = require('../models/facility')
const { Category } = require('../models/category')
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    const facilities = await Facility.find().sort('name')
    res.send(facilities);
});

router.get("/:id", async (req, res) => {
    const facility = await Facility.findById(req.params.id)

    if (!facility)
        return res.status(404).send("The facility with the given ID was not found.");

    res.send(facility);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category.")

    const facility = new Facility({
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        }
    });
    await facility.save()
    res.send(facility);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category.")

    const facility = await Facility.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        }

    }, { new: true })

    if (!facility)
        return res.status(404).send("The facility with the given ID was not found.");

    res.status(200).send(facility)
})

router.delete("/:id", async (req, res) => {
    const facility = await Facility.findByIdAndRemove(req.params.id)

    if (!facility)
        return res.status(404).send("The facility with the given ID was not found.");

    res.send(facility)
})

module.exports = router