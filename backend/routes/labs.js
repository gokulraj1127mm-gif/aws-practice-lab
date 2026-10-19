const express = require('express');
const router = express.Router();
const { getAllLabs, getLabById, startLab, checkLab } = require('../controllers/labController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllLabs);
router.get('/:id', getLabById);
router.post('/:id/start', startLab);
router.post('/:id/check', checkLab);

module.exports = router;
