const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/RatingController');

router.get('/', RatingController.getAllRatings);
router.post('/', RatingController.submitRating);
router.put('/:id', RatingController.updateRating);

module.exports = router;