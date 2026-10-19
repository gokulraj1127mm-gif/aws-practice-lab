const Resource = require('../models/Resource');
const Progress = require('../models/Progress');
const Activity = require('../models/Activity');
const User = require('../models/User');
const { sendSuccess } = require('../utils/responseHelper');

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [resourceCounts, completedLabs, recentActivity, user] = await Promise.all([
      Resource.aggregate([
        { $match: { userId, status: { $ne: 'terminated' } } },
        { $group: { _id: '$service', count: { $sum: 1 } } },
      ]),
      Progress.countDocuments({ userId, status: 'completed' }),
      Activity.find({ userId }).sort({ createdAt: -1 }).limit(8).lean(),
      User.findById(userId),
    ]);

    const totalLabs = await require('../models/Lab').countDocuments({ published: true });

    // Build service-keyed resource map
    const resourceMap = {};
    resourceCounts.forEach((r) => { resourceMap[r._id] = r.count; });
    const totalResources = resourceCounts.reduce((sum, r) => sum + r.count, 0);

    const services = [
      { name: 'EC2', icon: 'server', description: 'Virtual machines', count: resourceMap.EC2 || 0, path: '/ec2', color: 'orange' },
      { name: 'S3', icon: 'database', description: 'Object storage', count: resourceMap.S3 || 0, path: '/s3', color: 'green' },
      { name: 'IAM', icon: 'shield', description: 'Identity & access', count: resourceMap.IAM || 0, path: '/iam', color: 'blue' },
      { name: 'VPC', icon: 'network', description: 'Virtual networking', count: resourceMap.VPC || 0, path: '/vpc', color: 'purple' },
      { name: 'RDS', icon: 'cylinder', description: 'Relational databases', count: resourceMap.RDS || 0, path: '/rds', color: 'yellow' },
      { name: 'Lambda', icon: 'zap', description: 'Serverless functions', count: resourceMap.Lambda || 0, path: '/lambda', color: 'pink' },
      { name: 'CloudWatch', icon: 'activity', description: 'Monitoring & logs', count: 0, path: '/cloudwatch', color: 'teal' },
    ];

    return sendSuccess(res, {
      stats: {
        totalLabs,
        completedLabs,
        xp: user.xp,
        level: user.level,
        levelName: user.getLevelName(),
        totalResources,
      },
      services,
      recentActivity,
      user: { name: user.name, level: user.level, xp: user.xp, badges: user.badges },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
