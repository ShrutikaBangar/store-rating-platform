// filepath: c:\Users\Shurtika\Downloads\store-rating-platform-full\backend\server.js
const express = require('express');
const { createConnection } = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
    app.locals.db = db;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});