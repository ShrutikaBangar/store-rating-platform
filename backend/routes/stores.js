const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/StoreController');

router.get('/', StoreController.getAllStores);
router.post('/', StoreController.addStore);

module.exports = router;