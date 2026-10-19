const Resource = require('../models/Resource');
const { createBucket, addSimulatedObject } = require('../simulators/s3Simulator');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity } = require('../services/activityService');

const getBuckets = async (req, res, next) => {
  try {
    const buckets = await Resource.find({ userId: req.user._id, service: 'S3', status: { $ne: 'deleted' } }).sort({ createdAt: -1 });
    return sendSuccess(res, buckets);
  } catch (err) { next(err); }
};

const createBucketHandler = async (req, res, next) => {
  try {
    const bucket = await createBucket(req.user._id, req.body);
    return sendSuccess(res, bucket, 'Bucket created successfully', 201);
  } catch (err) { next(err); }
};

const getBucket = async (req, res, next) => {
  try {
    const bucket = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'S3' });
    if (!bucket) return sendError(res, 'Bucket not found', 404);
    return sendSuccess(res, bucket);
  } catch (err) { next(err); }
};

const updateBucket = async (req, res, next) => {
  try {
    const bucket = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'S3' });
    if (!bucket) return sendError(res, 'Bucket not found', 404);
    const allowedUpdates = ['versioning', 'blockPublicAccess', 'encryption', 'websiteHosting'];
    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) bucket.configuration[key] = req.body[key];
    });
    bucket.markModified('configuration');
    await bucket.save();
    return sendSuccess(res, bucket, 'Bucket updated');
  } catch (err) { next(err); }
};

const deleteBucket = async (req, res, next) => {
  try {
    const bucket = await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'S3' });
    if (!bucket) return sendError(res, 'Bucket not found', 404);
    await logActivity(req.user._id, { service: 'S3', action: 'DELETE_BUCKET', resourceId: bucket.resourceId, resourceName: bucket.resourceName, description: `Deleted S3 bucket: ${bucket.resourceName}` });
    return sendSuccess(res, null, 'Bucket deleted');
  } catch (err) { next(err); }
};

const getObjects = async (req, res, next) => {
  try {
    const bucket = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'S3' });
    if (!bucket) return sendError(res, 'Bucket not found', 404);
    return sendSuccess(res, bucket.configuration.objects || []);
  } catch (err) { next(err); }
};

const addObject = async (req, res, next) => {
  try {
    const bucket = await addSimulatedObject(req.user._id, req.params.id, req.body);
    return sendSuccess(res, bucket, 'Object added', 201);
  } catch (err) { next(err); }
};

const deleteObject = async (req, res, next) => {
  try {
    const bucket = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'S3' });
    if (!bucket) return sendError(res, 'Bucket not found', 404);
    bucket.configuration.objects = (bucket.configuration.objects || []).filter((o) => o.objectId !== req.params.objectId);
    bucket.configuration.objectCount = bucket.configuration.objects.length;
    bucket.markModified('configuration');
    await bucket.save();
    return sendSuccess(res, null, 'Object deleted');
  } catch (err) { next(err); }
};

module.exports = { getBuckets, createBucketHandler, getBucket, updateBucket, deleteBucket, getObjects, addObject, deleteObject };
