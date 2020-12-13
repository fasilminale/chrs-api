const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("firstName");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  // Lookup
  // If not existing, return 404
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.post("/", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Lookup and update
  // If not existing, return 404
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // Return the updated customer
  res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  //Lookup the customer and remove
  //Not existing,return 404
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  //return the customer that was deleted.
  res.send(customer);
});

module.exports = router;
