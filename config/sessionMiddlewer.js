const session = require("express-session");
const pool = require("../db/pool");

const sessionMidd = session({
  store: new (require("connect-pg-simple")(session))({
    pool: pool,
  }),
  secret: "cat",
  resave: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  },
  saveUninitialized: false,
});

module.exports = sessionMidd;
