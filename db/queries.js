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
    "SELECT * FROM folders where user_id=$1 and parent_folder_id is null ORDER BY created_at DESC",
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
  await pool.query("DELETE FROM folders WHERE id = $1 AND user_id=$2", [
    id,
    userID,
  ]);
}

async function createFolderWParent(name, parentID, userID) {
  const a = await pool.query(
    "INSERT INTO folders (name,parent_folder_id,user_id) VALUES ($1,$2,$3)",
    [name, parentID, userID]
  );
  return a.rows;
}

async function getChildFolders(id, userID) {
  const a = await pool.query(
    "SELECT * FROM folders WHERE parent_folder_id = $1 AND user_id=$2",
    [id, userID]
  );
  return a.rows;
}

async function getParentName(id, user) {
  const a = await pool.query(
    "SELECT * from folders f inner join folders r on f.parent_folder_id = r.id where r.id=$1 and r.user_id=$2 ",
    [id, user]
  );
  console.log(a);
}

//FILES
async function createFile(originalname, path, userID) {
  await pool.query(
    "INSERT INTO files (name,file_path,user_id) VALUES ($1,$2,$3)",
    [originalname, path, userID]
  );
}

async function getFiles(userID) {
  const a = await pool.query(
    "SELECT * FROM files where user_id = $1 and folder_id is null ORDER BY created_at DESC",
    [userID]
  );
  return a.rows;
}

async function getFilesFromFolder(userID, folder_id) {
  const a = await pool.query(
    "SELECT * FROM files where user_id = $1 and folder_id=$2 ORDER BY created_at DESC",
    [userID, folder_id]
  );
  return a.rows;
}

async function getFileById(id, userID) {
  const a = await pool.query("SELECT * FROM files where id=$1 and user_id=$2", [
    id,
    userID,
  ]);

  return a.rows[0];
}

async function createFileInFolder(originalname, path, userID, folderId) {
  await pool.query(
    "INSERT INTO files (name,file_path,user_id,folder_id) VALUES ($1,$2,$3,$4)",
    [originalname, path, userID, folderId]
  );
}

async function deleteFile(id, user_id) {
  await pool.query("DELETE FROM files where id=$1 and user_id=$2", [
    id,
    user_id,
  ]);
}

module.exports = {
  createNewUser,
  createNewFolder,
  getFolders,
  getFolderById,
  deleteFolder,
  updateFolderName,
  createFolderWParent,
  getChildFolders,
  getParentName,
  createFile,
  getFiles,
  getFileById,
  getFilesFromFolder,
  createFileInFolder,
  deleteFile,
};
