const db = require("../db/queries");

function getMainPage(req, res) {
  res.render("index", { user: req.user });
}

async function getDrive(req, res) {
  const allFolders = await db.getFolders();
  console.log(allFolders, " folders");
  res.render("drive", { user: req.user, folders: allFolders });
}

async function createFolder(req, res) {
  const { folderName } = req.body;
  const userID = req.user.id;

  await db.createNewFolder(folderName, userID);
  const allFolders = await db.getFolders();
  console.log(allFolders, " folders");

  res.redirect("drive");
}

module.exports = { getMainPage, createFolder, getDrive };
