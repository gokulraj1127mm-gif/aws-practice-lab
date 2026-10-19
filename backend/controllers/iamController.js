const Resource = require('../models/Resource');
const { createIAMUser, createIAMRole, createIAMPolicy, IAM_POLICIES } = require('../simulators/iamSimulator');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity } = require('../services/activityService');

const getUsers = async (req, res, next) => {
  try {
    const users = await Resource.find({ userId: req.user._id, service: 'IAM', resourceType: 'User' }).sort({ createdAt: -1 });
    return sendSuccess(res, users);
  } catch (err) { next(err); }
};
const createUser = async (req, res, next) => {
  try {
    const user = await createIAMUser(req.user._id, req.body);
    return sendSuccess(res, user, 'IAM user created', 201);
  } catch (err) { next(err); }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'IAM', resourceType: 'User' });
    if (!user) return sendError(res, 'User not found', 404);
    await logActivity(req.user._id, { service: 'IAM', action: 'DELETE_USER', resourceId: user.resourceId, resourceName: user.resourceName, description: `Deleted IAM user: ${user.resourceName}` });
    return sendSuccess(res, null, 'IAM user deleted');
  } catch (err) { next(err); }
};

const getRoles = async (req, res, next) => {
  try {
    const roles = await Resource.find({ userId: req.user._id, service: 'IAM', resourceType: 'Role' }).sort({ createdAt: -1 });
    return sendSuccess(res, roles);
  } catch (err) { next(err); }
};
const createRole = async (req, res, next) => {
  try {
    const role = await createIAMRole(req.user._id, req.body);
    return sendSuccess(res, role, 'IAM role created', 201);
  } catch (err) { next(err); }
};
const deleteRole = async (req, res, next) => {
  try {
    await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'IAM', resourceType: 'Role' });
    return sendSuccess(res, null, 'IAM role deleted');
  } catch (err) { next(err); }
};

const getPolicies = async (req, res, next) => {
  try {
    const policies = await Resource.find({ userId: req.user._id, service: 'IAM', resourceType: 'Policy' }).sort({ createdAt: -1 });
    return sendSuccess(res, { userPolicies: policies, awsManagedPolicies: IAM_POLICIES });
  } catch (err) { next(err); }
};
const createPolicy = async (req, res, next) => {
  try {
    const policy = await createIAMPolicy(req.user._id, req.body);
    return sendSuccess(res, policy, 'IAM policy created', 201);
  } catch (err) { next(err); }
};

module.exports = { getUsers, createUser, deleteUser, getRoles, createRole, deleteRole, getPolicies, createPolicy };
