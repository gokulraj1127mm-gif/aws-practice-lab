const express = require('express');
const router = express.Router();
const { askTutor } = require('../controllers/tutorController');

// POST /api/tutor/ask
router.post('/ask', askTutor);

module.exports = router;
