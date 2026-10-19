const Resource = require('../models/Resource');
const { createFunction, invokeFunction } = require('../simulators/lambdaSimulator');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity } = require('../services/activityService');

const getFunctions = async (req, res, next) => {
  try {
    const fns = await Resource.find({ userId: req.user._id, service: 'Lambda', status: { $ne: 'deleted' } }).sort({ createdAt: -1 });
    return sendSuccess(res, fns);
  } catch (err) { next(err); }
};
const createFunctionHandler = async (req, res, next) => {
  try {
    const fn = await createFunction(req.user._id, req.body);
    return sendSuccess(res, fn, 'Function created', 201);
  } catch (err) { next(err); }
};
const getFunction = async (req, res, next) => {
  try {
    const fn = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'Lambda' });
    if (!fn) return sendError(res, 'Function not found', 404);
    return sendSuccess(res, fn);
  } catch (err) { next(err); }
};
const updateFunction = async (req, res, next) => {
  try {
    const fn = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'Lambda' });
    if (!fn) return sendError(res, 'Function not found', 404);
    if (req.body.code) fn.configuration.code = req.body.code;
    if (req.body.description) fn.configuration.description = req.body.description;
    if (req.body.timeout) fn.configuration.timeout = req.body.timeout;
    if (req.body.memorySize) fn.configuration.memorySize = req.body.memorySize;
    fn.markModified('configuration');
    await fn.save();
    return sendSuccess(res, fn, 'Function updated');
  } catch (err) { next(err); }
};
const deleteFunctionHandler = async (req, res, next) => {
  try {
    const fn = await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'Lambda' });
    if (!fn) return sendError(res, 'Function not found', 404);
    await logActivity(req.user._id, { service: 'Lambda', action: 'DELETE_FUNCTION', resourceId: fn.resourceId, resourceName: fn.resourceName, description: `Deleted Lambda function: ${fn.resourceName}` });
    return sendSuccess(res, null, 'Function deleted');
  } catch (err) { next(err); }
};
const invokeFunctionHandler = async (req, res, next) => {
  try {
    const result = await invokeFunction(req.user._id, req.params.id, req.body.payload || {});
    return sendSuccess(res, result, 'Function invoked successfully');
  } catch (err) { next(err); }
};

module.exports = { getFunctions, createFunctionHandler, getFunction, updateFunction, deleteFunctionHandler, invokeFunctionHandler };
