const pool = require("../db/pool");
const db = require("../db/queries");

async function createFile(req, res) {
  const { originalname, path } = req.file;
  const userID = req.user.id;

  await db.createFile(originalname, path, userID);
  res.redirect("/drive");
}

// fieldname: 'filename',
//   originalname: 'ghuts.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',
//   filename: '51b5e7decd1cd74dd1a08feb49f5597b',
//   path: 'uploads/51b5e7decd1cd74dd1a08feb49f5597b',
//   size: 386021
module.exports = { createFile };
