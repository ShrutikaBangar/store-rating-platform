// filepath: c:\Users\Shurtika\Downloads\store-rating-platform-full\backend\routes\auth.js
const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/login
router.post('/login', AuthController.login);

module.exports = router;