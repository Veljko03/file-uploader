const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const { checkLogIn, validateUser } = require("../validation/userValidation");

authRouter.get("/log-in", (req, res) => res.render("log-in"));
authRouter.get("/sign-up", (req, res) => res.render("sign-up"));
authRouter.get("/auth/google", passport.authenticate("google"));
authRouter.get("/google/callback", authController.googleLogInPost);

authRouter.get("/auth/failure", (req, res) => res.send("FAILL"));

authRouter.get("/log-out", authController.logOut);
authRouter.post("/sign-up", validateUser, authController.createNewUser);
authRouter.post("/log-in", checkLogIn, authController.logInPost);

module.exports = authRouter;
