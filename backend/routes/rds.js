const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/rdsController');

router.use(protect);
router.get('/databases', ctrl.getDatabases);
router.post('/databases', ctrl.createDatabaseHandler);
router.get('/databases/:id', ctrl.getDatabase);
router.patch('/databases/:id', ctrl.updateDatabase);
router.delete('/databases/:id', ctrl.deleteDatabase);

module.exports = router;
