const express = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/log-in");
}

folderRouter.post("/folder", isLoggedIn, folderController.createFolder);

folderRouter.get(
  "/drive/folder/:id",
  isLoggedIn,
  folderController.getFolderById
);

folderRouter.put(
  "/renameFolder/:id",
  isLoggedIn,
  folderController.updateFolder
);

module.exports = folderRouter;
