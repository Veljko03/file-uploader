const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const createFolder = asyncHandler(async (req, res) => {
  const { folderName } = req.body;
  const userID = req.user.id;

  await db.createNewFolder(folderName, userID);

  res.redirect("drive");
});

const getFolderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;
  const singleFolder = await db.getFolderById(id, userID);
  const childFolders = await db.getChildFolders(id, userID);

  res.render("folders", {
    currFolder: singleFolder,
    childFolders: childFolders,
  });
});

const updateFolder = asyncHandler(async (req, res) => {
  const { folderName } = req.query;
  const { id } = req.params;
  const userID = req.user.id;

  await db.updateFolderName(folderName, id, userID);

  const folder = await db.getFolderById(id, userID);

  res.redirect(`/drive/folder/${folder.parent_folder_id}`);
});

const deleteFolder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;

  await db.deleteFolder(id, userID);
  res.redirect("/drive");
});

const deleteFolderDiffRed = asyncHandler(async (req, res) => {
  const parentID = req.params.id;
  const toDeleteID = req.params.id2;

  const userID = req.user.id;

  await db.deleteFolder(toDeleteID, userID);
  res.redirect(`/drive/folder/${parentID}`);
});

const createFolderWithParent = asyncHandler(async (req, res) => {
  const parentID = req.params.id;
  const userID = req.user.id;
  const { folderName } = req.body;

  await db.createFolderWParent(folderName, parentID, userID);

  res.redirect(`/drive/folder/${parentID}`);
});

module.exports = {
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
  createFolderWithParent,
  deleteFolderDiffRed,
};
