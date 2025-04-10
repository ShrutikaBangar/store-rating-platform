const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const storeRoutes = require('./routes/stores');
const ratingRoutes = require('./routes/ratings');
const { verifyToken } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/stores', verifyToken, storeRoutes);
app.use('/api/ratings', verifyToken, ratingRoutes);

app.get('/', (req, res) => {
  res.send('Store Rating Platform API');
});

module.exports = app;
