const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/vpcController');

router.use(protect);
router.get('/', ctrl.getVPCs);
router.post('/', ctrl.createVPCHandler);
router.get('/:id', ctrl.getVPC);
router.delete('/:id', ctrl.deleteVPC);
router.get('/:id/subnets', ctrl.getSubnets);
router.post('/:id/subnets', ctrl.createSubnetHandler);
router.get('/:id/security-groups', ctrl.getSGs);
router.post('/:id/security-groups', ctrl.createSGHandler);

module.exports = router;
