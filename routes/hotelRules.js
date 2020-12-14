const mongoose = require("mongoose");
const { HotelRule, validate } = require("../models/hotelRule");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await HotelRule.find().sort("name");
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const hotelRule = await HotelRule.findById(req.params.id);

  if (!hotelRule)
    return res
      .status(404)
      .send("The hotel Rule with the given ID was not found.");

  res.send(hotelRule);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hotelRule = new HotelRule({
    name: req.body.name,
  });
  await hotelRule.save();
  res.send(hotelRule);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hotelRule = await HotelRule.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!hotelRule)
    return res
      .status(404)
      .send("The hotel Rule with the given ID was not found.");

  res.status(200).send(hotelRule);
});

router.delete("/:id", async (req, res) => {
  const hotelRule = await HotelRule.findByIdAndRemove(req.params.id);

  if (!hotelRule)
    return res
      .status(404)
      .send("The hotel Rule with the given ID was not found.");

  res.send(hotelRule);
});

module.exports = router;
