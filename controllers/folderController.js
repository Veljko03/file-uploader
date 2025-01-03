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
  res.render("folders", { currFolder: singleFolder, childFolders: null });
});

const updateFolder = asyncHandler(async (req, res) => {
  console.log(req.params, " id controller");
});

module.exports = { createFolder, getFolderById, updateFolder };
