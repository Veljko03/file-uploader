const db = require("../db/queries");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const asyncHandler = require("express-async-handler");

const logInPost = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return res.status(400).render("log-in", {
      errors: errors.array(), // Prosledi greške view-u
    });
  }
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })(req, res, next);
});

function googleLogInPost(req, res, next) {
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/failure",
  })(req, res, next);
}

const createNewUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  // Ako validacija ima greške, prikaži ih korisniku
  if (!errors.isEmpty()) {
    console.log(errors);

    return res.status(400).render("sign-up", {
      errors: errors.array(), // Prosledi greške view-u
    });
  }
  const { email, username, password, confirm } = req.body;
  console.log(req.body);

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return;
    }
    await db.createNewUser(email, username, hashedPassword);
  });

  res.redirect("/log-in");
});

function logOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  createNewUser,
  logInPost,
  logOut,
  googleLogInPost,
};
