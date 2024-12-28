const db = require("../db/queries");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");

async function logInPost(req, res, next) {
  console.log("dosao ovde");

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })(req, res, next);
}

async function createNewUser(req, res, next) {
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

  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return;
      }
      await db.createNewUser(email, username, hashedPassword);
    });

    res.redirect("/log-in");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createNewUser,
  logInPost,
};
