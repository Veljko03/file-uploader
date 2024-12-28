const express = require("express");
const path = require("node:path");
const session = require("express-session");
const app = express();
const index = require("./routes/indexRoute");
const passport = require("passport");
const pool = require("./db/pool");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "views");
app.use(express.static(assetsPath));

app.use(
  session({
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
  })
);

app.use(passport.session());
app.use(index);
app.listen(3000, () => console.log("app listening on port 3000!"));
