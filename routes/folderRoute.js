const express = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/log-in");
}

folderRouter.post("/folder", isLoggedIn, folderController.createFolder);

folderRouter.post(
  "/drive/folder/:id",
  isLoggedIn,
  folderController.createFolderWithParent
);
folderRouter.get(
  "/drive/folder/:id",
  isLoggedIn,
  folderController.getFolderById
);

folderRouter.get(
  "/renameFolder/:id",
  isLoggedIn,
  folderController.updateFolder
);

folderRouter.get(
  "/deleteFolder/:id",
  isLoggedIn,
  folderController.deleteFolder
);

folderRouter.get(
  "/deleteFolderInFolder/:id/:id2",
  isLoggedIn,
  folderController.deleteFolderDiffRed
);

module.exports = folderRouter;
