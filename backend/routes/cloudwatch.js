const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/cloudwatchController');

router.use(protect);
router.get('/dashboard', ctrl.getDashboard);
router.get('/log-groups', ctrl.getLogGroupsHandler);
router.get('/log-groups/:id/logs', ctrl.getLogsHandler);
router.get('/metrics', ctrl.getMetrics);

module.exports = router;
