const express = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/log-in");
}

indexRouter.get("/", indexController.getMainPage);
indexRouter.get("/drive", isLoggedIn, indexController.getDrive);

indexRouter.post("/folder", indexController.createFolder);

module.exports = indexRouter;
