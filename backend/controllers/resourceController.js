const Resource = require('../models/Resource');
const { sendSuccess, sendError } = require('../utils/responseHelper');

const getResources = async (req, res, next) => {
  try {
    const { service, status, region, search, page = 1, limit = 20 } = req.query;
    const query = { userId: req.user._id, status: { $nin: ['deleted'] } };
    if (service) query.service = service;
    if (status) query.status = status;
    if (region) query.region = region;
    if (search) {
      query.$or = [
        { resourceName: { $regex: search, $options: 'i' } },
        { resourceId: { $regex: search, $options: 'i' } },
      ];
    }

    const [resources, total] = await Promise.all([
      Resource.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Resource.countDocuments(query),
    ]);

    return sendSuccess(res, { resources, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

const getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resource) return sendError(res, 'Resource not found', 404);
    return sendSuccess(res, resource);
  } catch (err) { next(err); }
};

module.exports = { getResources, getResource };
