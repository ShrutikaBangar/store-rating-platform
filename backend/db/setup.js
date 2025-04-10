const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.error('Connection failed:', err);
    return;
  }

  // Create DB
  db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`, (err) => {
    if (err) throw err;
    console.log('✅ Database ready');

    // Use DB
    db.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      const userTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE,
          password VARCHAR(255),
          address TEXT,
          role ENUM('user','owner','admin') DEFAULT 'user'
        );
      `;

      const storeTable = `
        CREATE TABLE IF NOT EXISTS stores (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100),
          address TEXT,
          user_id INT DEFAULT NULL
        );
      `;

      const ratingTable = `
        CREATE TABLE IF NOT EXISTS ratings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          store_id INT,
          value INT CHECK (value >= 1 AND value <= 5),
          comment TEXT
        );
      `;

      db.query(userTable);
      db.query(storeTable);
      db.query(ratingTable, () => {
        console.log('✅ Tables created');

        const sampleUser = `INSERT IGNORE INTO users (name, email, password, address, role)
          VALUES ('Test User', 'user@example.com', '$2b$10$zVrDF5vM1cM6Py3ADrkE5eNv3eYIkHzWptuH8YpZtKBSO6LFgrhZ6', '123 Street', 'user');`;

        db.query(sampleUser, () => {
          console.log('✅ Sample data inserted');
          db.end();
        });
      });
    });
  });
});
