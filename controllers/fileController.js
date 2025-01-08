const path = require("path");
const pool = require("../db/pool");
const db = require("../db/queries");
const fs = require("fs");
const { log } = require("console");
const cloudinary = require("cloudinary").v2;
require("dotenv").config;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

async function createFile(req, res) {
  const { originalname, path, filename } = req.file;
  const userID = req.user.id;
  console.log(req.file, "  reqqqqqqqqqqqqqqq");

  await db.createFile(originalname, path, userID, filename);
  res.redirect("/drive");
}

async function createFileInFolder(req, res) {
  const { originalname, path, filename } = req.file;
  const userID = req.user.id;
  const folderId = req.params.id;
  try {
    await db.createFileInFolder(originalname, path, userID, folderId, filename);
  } catch (error) {
    res.send("Error");
  }
  res.redirect(`/drive/folder/${folderId}`);
}

async function deleteFile(req, res) {
  const userID = req.user.id;
  const fileId = req.params.id;
  const file = await db.getFileById(fileId, userID);

  console.log(file);
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  console.log(file.public_id);

  cloudinary.uploader.destroy(
    file.public_id,
    { resource_type: "raw" },
    function (result) {
      console.log(result, "delted ");
    }
  );

  await db.deleteFile(fileId, userID);

  res.redirect("/drive");
}

async function deleteFileFromFolder(req, res) {
  const userID = req.user.id;
  const fileId = req.params.id;
  const folderId = req.params.id2;
  const file = await db.getFileById(id, userId);
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  //cloudinary.uploader.destroy(, function(result) { console.log(result) });
  console.log(file);

  // await db.deleteFile(fileId, userID);

  res.redirect(`/drive/folder/${folderId}`);
}

async function getFileById(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const file = await db.getFileById(id, userId);
  console.log("file ", file);

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  res.redirect(file.file_path);
}

async function downloadFile(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const file = await db.getFileById(id, userId);
  console.log(file.public_id);
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  try {
    const downloadUrl = cloudinary.url(file.public_id, {
      resource_type: "auto",
      flags: "attachment",
      attachment: file.name,
    });
    res.download(file.file_path);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }

  //res.download(file.file_path);
}

module.exports = {
  createFile,
  createFileInFolder,
  deleteFile,
  deleteFileFromFolder,
  getFileById,
  downloadFile,
};
