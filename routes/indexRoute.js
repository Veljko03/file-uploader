const express = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = express.Router();

indexRouter.get("/", indexController.getMainPage);

module.exports = indexRouter;
