const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/s3Controller');

router.use(protect);
router.get('/buckets', ctrl.getBuckets);
router.post('/buckets', ctrl.createBucketHandler);
router.get('/buckets/:id', ctrl.getBucket);
router.patch('/buckets/:id', ctrl.updateBucket);
router.delete('/buckets/:id', ctrl.deleteBucket);
router.get('/buckets/:id/objects', ctrl.getObjects);
router.post('/buckets/:id/objects', ctrl.addObject);
router.delete('/buckets/:id/objects/:objectId', ctrl.deleteObject);

module.exports = router;
