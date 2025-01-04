const express = require("express");
const path = require("node:path");
const app = express();
const index = require("./routes/indexRoute");
const authRouter = require("./routes/authRoute");
const passport = require("passport");
const sessionMidd = require("./config/sessionMiddlewer");
const folderRouter = require("./routes/folderRoute");
const fileRouter = require("./routes/fileRouter");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "views");
app.use(express.static(assetsPath));

app.use(sessionMidd);

require("./config/passport");
app.use(passport.session());
app.use(index);
app.use(authRouter);
app.use(folderRouter);

app.use(fileRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
