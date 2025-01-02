const pool = require("./pool");

async function createNewUser(email, username, hashedPassword) {
  await pool.query(
    "INSERT INTO users (email,user_name, password_hash) VALUES ($1, $2,$3)",
    [email, username, hashedPassword]
  );
}

async function createNewFolder(folderName, userID) {
  await pool.query("INSERT INTO folders (name,user_id) VALUES ($1,$2)", [
    folderName,
    userID,
  ]);
}

async function getFolders() {
  const a = await pool.query("SELECT * FROM folders");
  return a.rows;
}

module.exports = {
  createNewUser,
  createNewFolder,
  getFolders,
};
