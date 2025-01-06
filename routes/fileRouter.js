const express = require("express");

const multer = require("multer");
const fileController = require("../controllers/fileController");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

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

fileRouter.post(
  "/uploadFileInFolder/:id",
  isLoggedIn,
  upload.single("filename"),
  fileController.createFileInFolder
);

fileRouter.get("/deleteFile/:id", isLoggedIn, fileController.deleteFile);

fileRouter.get(
  "/deleteFileFromFolder/:id/:id2",
  isLoggedIn,
  fileController.deleteFileFromFolder
);

fileRouter.get("/getFile/:id", isLoggedIn, fileController.getFileById);

module.exports = fileRouter;
