const path = require("path");
const pool = require("../db/pool");
const db = require("../db/queries");
const fs = require("fs");

async function createFile(req, res) {
  const { originalname, path } = req.file;
  const userID = req.user.id;

  await db.createFile(originalname, path, userID);
  res.redirect("/drive");
}

async function createFileInFolder(req, res) {
  const { originalname, path } = req.file;
  const userID = req.user.id;
  const folderId = req.params.id;
  try {
    await db.createFileInFolder(originalname, path, userID, folderId);
  } catch (error) {
    res.send("Error");
  }
  res.redirect(`/drive/folder/${folderId}`);
}

async function deleteFile(req, res) {
  const userID = req.user.id;
  const fileId = req.params.id;

  await db.deleteFile(fileId, userID);

  res.redirect("/drive");
}

async function deleteFileFromFolder(req, res) {
  const userID = req.user.id;
  const fileId = req.params.id;
  const folderId = req.params.id2;

  await db.deleteFile(fileId, userID);

  res.redirect(`/drive/folder/${folderId}`);
}

async function getFileById(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const file = await db.getFileById(id, userId);
  console.log("file ", file);

  const filePath = path.join(__dirname, "../", file.file_path); // Kreira apsolutnu putanju do fajla

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found on the server" });
  }

  res.sendFile(filePath);
}

async function downloadFile(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const file = await db.getFileById(id, userId);

  const filePath = path.join(__dirname, "../", file.file_path); // Kreira apsolutnu putanju do fajla

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found on the server" });
  }

  res.download(filePath);
}

// fieldname: 'filename',
//   originalname: 'ghuts.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',
//   filename: '51b5e7decd1cd74dd1a08feb49f5597b',
//   path: 'uploads/51b5e7decd1cd74dd1a08feb49f5597b',
//   size: 386021
module.exports = {
  createFile,
  createFileInFolder,
  deleteFile,
  deleteFileFromFolder,
  getFileById,
  downloadFile,
};
