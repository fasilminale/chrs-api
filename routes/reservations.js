const mongoose = require('mongoose');
const { Reservation, validate } = require('../models/reservation');
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const reservation = await Reservation.find().sort('code')
    res.send(reservation);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation)
        return res.status(404).send("The reservation with the given ID was not found.");

    res.send(reservation);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const reservation = new Reservation({
        bookingNumber: req.body.bookingNumber,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        price: req.body.price,
        bookedOnDate: req.body.bookedOnDate,
        numberOfGuest: req.body.numberOfGuest,
        status: req.body.status,
        costomer: req.body.costomer,
        room: req.body.room,
        hotel: req.body.hotel,
    });
    awaitreservation.save()
    res.send(reservation);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, {
        bookingNumber: req.body.bookingNumber,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        price: req.body.price,
        bookedOnDate: req.body.bookedOnDate,
        numberOfGuest: req.body.numberOfGuest,
        status: req.body.status,
        costomer: req.body.costomer,
        room: req.body.room,
        hotel: req.body.hotel,
    }, { new: true })

    if (!reservation)
        return res.status(404).send("The reservation with the given ID was not found.");

    // Return the updated reservation
    res.status(200).send(reservation)
});

router.delete("/:id", async(req, res) => {
    //Lookup the reservation and remove
    //Not existing,return 404
    const reservation = await Reservation.findByIdAndRemove(req.params.id)

    if (!reservation)
        return res.status(404).send("The reservation with the given ID was not found.");

    //return the reservation that was deleted.
    res.send(reservation)
});

module.exports = router