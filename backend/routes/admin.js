const express = require('express');
const router = express.Router();
const { getAdminMetrics, getUsersList, updateUserRole } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// All admin routes require valid authentication token AND admin role
router.use(protect);
router.use(adminOnly);

router.get('/metrics', getAdminMetrics);
router.get('/users', getUsersList);
router.patch('/users/:id/role', updateUserRole);

module.exports = router;
