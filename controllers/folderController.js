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
  const userID = req.user.id;
  const singleFolder = await db.getFolderById(id, userID);
  res.render("folders", { currFolder: singleFolder, childFolders: null });
});

const updateFolder = asyncHandler(async (req, res) => {
  const { folderName } = req.query;
  const { id } = req.params;
  const userID = req.user.id;

  await db.updateFolderName(folderName, id, userID);

  res.redirect("/drive");
});

const deleteFolder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;
  await db.deleteFolder(id, userID);
  res.redirect("/drive");
});

module.exports = { createFolder, getFolderById, updateFolder, deleteFolder };
