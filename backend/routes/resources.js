const express = require('express');
const router = express.Router();
const { getResources, getResource } = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getResources);
router.get('/:id', getResource);

module.exports = router;
