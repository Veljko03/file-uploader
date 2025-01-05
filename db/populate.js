const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(255),
    google_id VARCHAR(255),
    email VARCHAR(100)   UNIQUE,
    password_hash VARCHAR(255)  
);

CREATE TABLE folders (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    parent_folder_id INT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_folder_id) REFERENCES folders (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE files (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    user_id INT NOT NULL,
    folder_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE

);
  
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });

  await client.connect();
  console.log("daaaa..");
  await client.query(SQL);
  console.log("raaaaa..");
  await client.end();
  console.log("done");
}

main();
