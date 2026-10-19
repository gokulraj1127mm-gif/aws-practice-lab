const Resource = require('../models/Resource');
const { createInstance, changeInstanceState } = require('../simulators/ec2Simulator');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity } = require('../services/activityService');

// GET /api/ec2/instances
const getInstances = async (req, res, next) => {
  try {
    const instances = await Resource.find({
      userId: req.user._id,
      service: 'EC2',
      status: { $ne: 'deleted' },
    }).sort({ createdAt: -1 });
    return sendSuccess(res, instances);
  } catch (err) { next(err); }
};

// POST /api/ec2/instances
const launchInstance = async (req, res, next) => {
  try {
    const instance = await createInstance(req.user._id, req.body);
    return sendSuccess(res, instance, 'Instance launched successfully', 201);
  } catch (err) { next(err); }
};

// GET /api/ec2/instances/:id
const getInstance = async (req, res, next) => {
  try {
    const instance = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'EC2' });
    if (!instance) return sendError(res, 'Instance not found', 404);
    return sendSuccess(res, instance);
  } catch (err) { next(err); }
};

// PATCH /api/ec2/instances/:id/start
const startInstance = async (req, res, next) => {
  try {
    const instance = await changeInstanceState(req.user._id, req.params.id, 'running');
    return sendSuccess(res, instance, 'Instance started');
  } catch (err) { next(err); }
};

// PATCH /api/ec2/instances/:id/stop
const stopInstance = async (req, res, next) => {
  try {
    const instance = await changeInstanceState(req.user._id, req.params.id, 'stopped');
    return sendSuccess(res, instance, 'Instance stopped');
  } catch (err) { next(err); }
};

// PATCH /api/ec2/instances/:id/restart
const restartInstance = async (req, res, next) => {
  try {
    await changeInstanceState(req.user._id, req.params.id, 'stopped');
    const instance = await changeInstanceState(req.user._id, req.params.id, 'running');
    return sendSuccess(res, instance, 'Instance restarted');
  } catch (err) { next(err); }
};

// PATCH /api/ec2/instances/:id/terminate
const terminateInstance = async (req, res, next) => {
  try {
    const instance = await changeInstanceState(req.user._id, req.params.id, 'terminated');
    return sendSuccess(res, instance, 'Instance terminated');
  } catch (err) { next(err); }
};

// DELETE /api/ec2/instances/:id
const deleteInstance = async (req, res, next) => {
  try {
    const instance = await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'EC2' });
    if (!instance) return sendError(res, 'Instance not found', 404);
    await logActivity(req.user._id, {
      service: 'EC2', action: 'DELETE_INSTANCE',
      resourceId: instance.resourceId, resourceName: instance.resourceName,
      description: `Deleted simulated EC2 instance: ${instance.resourceId}`,
    });
    return sendSuccess(res, null, 'Instance deleted');
  } catch (err) { next(err); }
};

module.exports = { getInstances, launchInstance, getInstance, startInstance, stopInstance, restartInstance, terminateInstance, deleteInstance };
