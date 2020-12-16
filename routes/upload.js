var multer = require("multer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
var upload = multer({ storage: storage });

router.post("/", upload.single("file"), function (req, res, next) {
  console.log(req.file);
  if (!req.file) {
    return res.status(500);
  }
  res.json({ fileUrl: "http://localhost:3000/images/" + req.file.filename });
});

module.exports = router;
