const { body, validationResult } = require("express-validator");

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

module.exports = { validateUser, checkLogIn };
