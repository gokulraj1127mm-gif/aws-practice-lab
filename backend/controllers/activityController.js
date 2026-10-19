const Activity = require('../models/Activity');
const { sendSuccess } = require('../utils/responseHelper');

const getActivity = async (req, res, next) => {
  try {
    const { service, page = 1, limit = 20 } = req.query;
    const query = { userId: req.user._id };
    if (service) query.service = service;

    const [activities, total] = await Promise.all([
      Activity.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Activity.countDocuments(query),
    ]);

    return sendSuccess(res, { activities, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

module.exports = { getActivity };
