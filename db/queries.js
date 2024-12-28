const pool = require("./pool");

async function createNewUser(email, username, hashedPassword) {
  await pool.query(
    "INSERT INTO users (email,user_name, password_hash) VALUES ($1, $2,$3)",
    [email, username, hashedPassword]
  );
}

module.exports = {
  createNewUser,
};
