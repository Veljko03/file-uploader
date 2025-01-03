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

async function getFolders(userID) {
  console.log(userID);

  const a = await pool.query(
    "SELECT * FROM folders where user_id=$1 ORDER BY created_at DESC",
    [userID]
  );
  return a.rows;
}

async function getFolderById(id, userID) {
  const a = await pool.query(
    "select * from folders where id = $1 AND user_id=$2",
    [id, userID]
  );
  return a.rows[0];
}

async function updateFolderName(folderName, id, userID) {
  await pool.query("UPDATE folders SET name= $1 WHERE id =$2 ", [
    folderName,
    id,
  ]);
}

async function deleteFolder(id, userID) {
  await pool.query("DELETE FROM folders WHERE id = $1 AND user_id", [
    id,
    userID,
  ]);
}

module.exports = {
  createNewUser,
  createNewFolder,
  getFolders,
  getFolderById,
  deleteFolder,
  updateFolderName,
};
