const express = require("express");
const { body, validationResult } = require("express-validator");
const indexController = require("../controllers/indexController");
const indexRouter = express.Router();
const passport = require("passport");

const checkLogIn = [
  body("email").trim().isEmail().withMessage("Something is incorect"),
  //body("password").trim().withMessage("Something is incorect"),
];
const validateUser = [
  body("email").trim().isEmail().withMessage("Something is incorect"),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers.")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 10 characters."),

  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters."),

  body("confirm")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/log-in");
}

indexRouter.get("/", (req, res) => res.render("index", { user: req.user }));
indexRouter.get("/log-in", (req, res) => res.render("log-in"));
indexRouter.get("/sign-up", (req, res) => res.render("sign-up"));
indexRouter.get("/auth/google", passport.authenticate("google"));

indexRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/failure",
  })
);
indexRouter.get("/protected", isLoggedIn, (req, res) =>
  res.send("usao u protected")
);
indexRouter.get("/auth/failure", (req, res) => res.send("FAILL"));

indexRouter.get("/log-out", indexController.logOut);
indexRouter.post("/sign-up", validateUser, indexController.createNewUser);
indexRouter.post("/log-in", checkLogIn, indexController.logInPost);

module.exports = indexRouter;
