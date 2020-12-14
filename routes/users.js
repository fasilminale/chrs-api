const mongoose = require('mongoose')
const { User, validate } = require('../models/user')
const express = require("express");
const router = express.Router()

router.get("/", async(req, res) => {
    const users = await User.find().sort('code')
    res.send(users);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const user = await User.findById(req.params.id)

    if (!user)
        return res.status(404).send("The user with the given ID was not found.");

    res.send(user);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        photo: req.body.photo,
        birthDate: req.body.birthDate,
        role: req.body.role,
    });
    await user.save()
    res.send(user);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        photo: req.body.photo,
        birthDate: req.body.birthDate,
        role: req.body.role,
    }, { new: true })

    if (!user)
        return res.status(404).send("The user with the given ID was not found.");

    // Return the updated user
    res.status(200).send(user)
});

router.delete("/:id", async(req, res) => {
    //Lookup the rate and remove
    //Not existing,return 404
    const user = await User.findByIdAndRemove(req.params.id)

    if (!user)
        return res.status(404).send("The user with the given ID was not found.");

    //return the user that was deleted.
    res.send(user)
});

module.exports = router