const Resource = require('../models/Resource');
const { createVPC, createSubnet, createSecurityGroup } = require('../simulators/vpcSimulator');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity } = require('../services/activityService');

const getVPCs = async (req, res, next) => {
  try {
    const vpcs = await Resource.find({ userId: req.user._id, service: 'VPC', resourceType: 'VPC', status: { $ne: 'deleted' } }).sort({ createdAt: -1 });
    return sendSuccess(res, vpcs);
  } catch (err) { next(err); }
};
const createVPCHandler = async (req, res, next) => {
  try {
    const vpc = await createVPC(req.user._id, req.body);
    return sendSuccess(res, vpc, 'VPC created', 201);
  } catch (err) { next(err); }
};
const getVPC = async (req, res, next) => {
  try {
    const vpc = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'VPC' });
    if (!vpc) return sendError(res, 'VPC not found', 404);
    return sendSuccess(res, vpc);
  } catch (err) { next(err); }
};
const deleteVPC = async (req, res, next) => {
  try {
    const vpc = await Resource.findOneAndDelete({ _id: req.params.id, userId: req.user._id, service: 'VPC' });
    if (!vpc) return sendError(res, 'VPC not found', 404);
    await logActivity(req.user._id, { service: 'VPC', action: 'DELETE_VPC', resourceId: vpc.resourceId, resourceName: vpc.resourceName, description: `Deleted VPC: ${vpc.resourceId}` });
    return sendSuccess(res, null, 'VPC deleted');
  } catch (err) { next(err); }
};
const createSubnetHandler = async (req, res, next) => {
  try {
    const { vpc, subnet } = await createSubnet(req.user._id, req.params.id, req.body);
    return sendSuccess(res, { vpc, subnet }, 'Subnet created', 201);
  } catch (err) { next(err); }
};
const getSubnets = async (req, res, next) => {
  try {
    const vpc = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'VPC' });
    if (!vpc) return sendError(res, 'VPC not found', 404);
    return sendSuccess(res, vpc.configuration.subnets || []);
  } catch (err) { next(err); }
};
const createSGHandler = async (req, res, next) => {
  try {
    const { vpc, securityGroup } = await createSecurityGroup(req.user._id, req.params.id, req.body);
    return sendSuccess(res, { vpc, securityGroup }, 'Security group created', 201);
  } catch (err) { next(err); }
};
const getSGs = async (req, res, next) => {
  try {
    const vpc = await Resource.findOne({ _id: req.params.id, userId: req.user._id, service: 'VPC' });
    if (!vpc) return sendError(res, 'VPC not found', 404);
    return sendSuccess(res, vpc.configuration.securityGroups || []);
  } catch (err) { next(err); }
};

module.exports = { getVPCs, createVPCHandler, getVPC, deleteVPC, createSubnetHandler, getSubnets, createSGHandler, getSGs };
