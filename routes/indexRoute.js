const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => res.render("index", { user: req.user }));

module.exports = indexRouter;
