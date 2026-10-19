const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/iamController');

router.use(protect);
router.get('/users', ctrl.getUsers);
router.post('/users', ctrl.createUser);
router.delete('/users/:id', ctrl.deleteUser);
router.get('/roles', ctrl.getRoles);
router.post('/roles', ctrl.createRole);
router.delete('/roles/:id', ctrl.deleteRole);
router.get('/policies', ctrl.getPolicies);
router.post('/policies', ctrl.createPolicy);

module.exports = router;
