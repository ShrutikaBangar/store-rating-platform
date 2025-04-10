const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const seedUsers = async () => {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const ownerPassword = await bcrypt.hash('owner123', 10);

  const users = [
    ['Admin User', 'admin@example.com', adminPassword, 'Admin City', 'admin'],
    ['Store Owner', 'owner@example.com', ownerPassword, 'Owner Town', 'owner'],
  ];

  db.connect((err) => {
    if (err) {
      console.error('DB connection failed:', err);
      return;
    }

    users.forEach(user => {
      db.query(
        'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
        user,
        (err, result) => {
          if (err && err.code !== 'ER_DUP_ENTRY') {
            console.error('Insert failed:', err);
          } else {
            console.log(`User ${user[1]} inserted`);
          }
        }
      );
    });
  });
};

seedUsers();
