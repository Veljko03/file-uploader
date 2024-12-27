const express = require("express");
const path = require("node:path");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "views");
app.use(express.static(assetsPath));

app.get("/", (req, res) => res.send("helooo"));
app.listen(3000, () => console.log("app listening on port 3000!"));
