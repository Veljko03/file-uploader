const express = require("express");

const multer = require("multer");
const fileController = require("../controllers/fileController");
const upload = multer({ dest: "uploads/" });

const fileRouter = express.Router();

function isLoggedIn(req, res, next) {
  console.log("usao u logged in");
  console.log(req.user);

  req.user ? next() : res.redirect("/log-in");
}

fileRouter.post(
  "/uploadFile",
  isLoggedIn,
  upload.single("filename"),
  fileController.createFile
);

module.exports = fileRouter;
