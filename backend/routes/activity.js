const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getActivity } = require('../controllers/activityController');

router.get('/', protect, getActivity);

module.exports = router;
