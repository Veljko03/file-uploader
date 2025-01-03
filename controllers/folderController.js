const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const createFolder = asyncHandler(async (req, res) => {
  const { folderName } = req.body;
  const userID = req.user.id;

  await db.createNewFolder(folderName, userID);
  const allFolders = await db.getFolders();

  res.redirect("drive");
});

const getFolderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const singleFolder = await db.getFolderById(id);
  res.render("drive", { user: req.user, folders: null, folder: singleFolder });
});

module.exports = { createFolder, getFolderById };
