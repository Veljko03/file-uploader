const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

function getMainPage(req, res) {
  res.render("index", { user: req.user });
}

const getDrive = asyncHandler(async (req, res) => {
  const userID = req.user.id;

  const allFolders = await db.getFolders(userID);
  const allFiles = await db.getFiles(userID);
  console.log((allFiles, " files"));

  res.render("drive", { user: req.user, folders: allFolders, files: allFiles });
});

module.exports = { getMainPage, getDrive };
