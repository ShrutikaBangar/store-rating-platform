const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.put('/password', UserController.updatePassword);

module.exports = router;