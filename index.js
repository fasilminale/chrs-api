const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const customers = require("./routes/customers")
const categories = require("./routes/categories")
const facilities = require("./routes/facilities")
const express = require("express");
const app = express();

mongoose.connect('mongodb://localhost/chrs')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error("Could not connect to MongoDB..."))

app.use(express.json());  // this enables pasrsing of json object in the body of a request.
app.use("/api/customers", customers)
app.use("/api/categories", categories)
app.use("/api/facilities", facilities)

app.get("/", (req, res) => {
  res.send("Central customer reservation system");
});

const port = process.env.PORT | 3000;
app.listen(3000, () => console.log(`Listing on port ${port}...`));
