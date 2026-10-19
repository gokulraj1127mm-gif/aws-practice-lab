const Resource = require('../models/Resource');
const { createDatabase, ENGINES, INSTANCE_CLASSES } = require('../simulators/rdsSimulator');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity } = require('../services/activityService');

const getDatabases = async (req, res, next) => {
  try {
    const dbs = await Resource.find({ userId: req.user._id, service: 'RDS', status: { $ne: 'deleted' } }).sort({ createdAt: -1 });
    return sendSuccess(res, dbs);
  } catch (err) { next(err); }
};
const createDatabaseHandler = async (req, res, next) => {
  try {
    const db = await createDatabase(req.user._id, req.body);
    return sendSuccess(res, db, 'Database created', 201);
  } catch (err) { next(err); }
};
const getDatabase = async (req, res, next) => {
  try {
    const db = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'RDS' });
    if (!db) return sendError(res, 'Database not found', 404);
    return sendSuccess(res, db);
  } catch (err) { next(err); }
};
const updateDatabase = async (req, res, next) => {
  try {
    const db = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'RDS' });
    if (!db) return sendError(res, 'Database not found', 404);
    if (req.body.instanceClass) db.configuration.instanceClass = req.body.instanceClass;
    if (req.body.storage) db.configuration.storage = req.body.storage;
    db.markModified('configuration');
    await db.save();
    return sendSuccess(res, db, 'Database updated');
  } catch (err) { next(err); }
};
const deleteDatabase = async (req, res, next) => {
  try {
    const db = await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'RDS' });
    if (!db) return sendError(res, 'Database not found', 404);
    await logActivity(req.user._id, { service: 'RDS', action: 'DELETE_DATABASE', resourceId: db.resourceId, resourceName: db.resourceName, description: `Deleted RDS database: ${db.resourceName}` });
    return sendSuccess(res, null, 'Database deleted');
  } catch (err) { next(err); }
};

module.exports = { getDatabases, createDatabaseHandler, getDatabase, updateDatabase, deleteDatabase };
