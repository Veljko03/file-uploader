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
  const a = await pool.query("SELECT * FROM folders ORDER BY created_at DESC");
  return a.rows;
}

async function getFolderById(id) {
  const a = await pool.query("select * from folders where id = $1", [id]);
  return a.rows[0];
}

async function updateFolderName(folderName, id) {
  await pool.query("UPDATE folders SET name= $1 WHERE id =$2", [
    folderName,
    id,
  ]);
}

module.exports = {
  createNewUser,
  createNewFolder,
  getFolders,
  getFolderById,

  updateFolderName,
};
