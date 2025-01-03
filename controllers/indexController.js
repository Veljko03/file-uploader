const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

function getMainPage(req, res) {
  res.render("index", { user: req.user });
}

const getDrive = asyncHandler(async (req, res) => {
  const userID = req.user.id;

  const allFolders = await db.getFolders(userID);
  res.render("drive", { user: req.user, folders: allFolders });
});

module.exports = { getMainPage, getDrive };
