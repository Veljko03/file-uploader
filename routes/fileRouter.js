const express = require("express");
require("dotenv").config();
const fileController = require("../controllers/fileController");
const path = require("path");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
//   },
// });
// const storage = new CloudinaryStorage({
//   cloudinary,
// });

// const upload = multer({ storage: storage });

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",

    public_id: (req, file) => Date.now() + path.extname(file.originalname),
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 } });

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
fileRouter.get("/download/:id", isLoggedIn, fileController.downloadFile);

module.exports = fileRouter;
