const mongoose = require('mongoose');
const { Review, validate } = require('../models/review');
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const reviews = await Review.find().sort('code')
    res.send(reviews);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const review = await Review.findById(req.params.id)
    if (!review)
        return res.status(404).send("The review with the given ID was not found.");

    res.send(review);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const review = new Review({
        comment: req.body.comment,
        hotel: req.body.hotel,
        costomer: req.body.costomer,
        rate: req.body.rate,
    });
    await review.save()
    res.send(review);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const review = await Review.findByIdAndUpdate(req.params.id, {
        comment: req.body.comment,
        hotel: req.body.hotel,
        costomer: req.body.costomer,
        rate: req.body.rate,
    }, { new: true })

    if (!review)
        return res.status(404).send("The review with the given ID was not found.");

    // Return the updated review
    res.status(200).send(review)
});

router.delete("/:id", async(req, res) => {
    //Lookup the review and remove
    //Not existing,return 404
    const review = await Review.findByIdAndRemove(req.params.id)

    if (!review)
        return res.status(404).send("The review with the given ID was not found.");

    //return the review that was deleted.
    res.send(review)
});

module.exports = router