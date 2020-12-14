const mongoose = require('mongoose')
const { Role, validate } = require('../models/role')
const express = require("express");
const router = express.Router()

router.get("/", async(req, res) => {
    const roles = await Rate.find().sort('code')
    res.send(roles);
});

router.get("/:id", async(req, res) => {
    // Lookup
    // If not existing, return 404
    const role = await Rate.findById(req.params.id)

    if (!role)
        return res.status(404).send("The role with the given ID was not found.");

    res.send(role);
});

router.post("/", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const role = new Role({
        name: req.body.name,
    });
    await role.save()
    res.send(role);
});

router.put("/:id", async(req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    // Lookup and update
    // If not existing, return 404
    const role = await Role.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })

    if (!role)
        return res.status(404).send("The role with the given ID was not found.");

    // Return the updated role
    res.status(200).send(role)
});

router.delete("/:id", async(req, res) => {
    //Lookup the rate and remove
    //Not existing,return 404
    const role = await Role.findByIdAndRemove(req.params.id)

    if (!role)
        return res.status(404).send("The role with the given ID was not found.");

    //return the role that was deleted.
    res.send(role)
});

module.exports = router