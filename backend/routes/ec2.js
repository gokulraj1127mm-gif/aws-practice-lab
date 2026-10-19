const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/ec2Controller');

router.use(protect);
router.get('/instances', ctrl.getInstances);
router.post('/instances', ctrl.launchInstance);
router.get('/instances/:id', ctrl.getInstance);
router.patch('/instances/:id/start', ctrl.startInstance);
router.patch('/instances/:id/stop', ctrl.stopInstance);
router.patch('/instances/:id/restart', ctrl.restartInstance);
router.patch('/instances/:id/terminate', ctrl.terminateInstance);
router.delete('/instances/:id', ctrl.deleteInstance);

module.exports = router;
