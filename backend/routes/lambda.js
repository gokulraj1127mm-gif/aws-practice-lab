const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/lambdaController');

router.use(protect);
router.get('/functions', ctrl.getFunctions);
router.post('/functions', ctrl.createFunctionHandler);
router.get('/functions/:id', ctrl.getFunction);
router.patch('/functions/:id', ctrl.updateFunction);
router.delete('/functions/:id', ctrl.deleteFunctionHandler);
router.post('/functions/:id/invoke', ctrl.invokeFunctionHandler);

module.exports = router;
