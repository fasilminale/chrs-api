const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Central hotel reservation system");
});

app.listen(3000, () => console.log("Listing on port 3000..."));
