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

module.exports = folderRouter;
