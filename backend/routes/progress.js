const express = require('express');
const router = express.Router();
const { getOverallProgress, getProgressSummary } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getOverallProgress);
router.get('/summary', getProgressSummary);

module.exports = router;
