const Progress = require('../models/Progress');
const Lab = require('../models/Lab');
const { sendSuccess, sendError } = require('../utils/responseHelper');

/**
 * Get overall progress for the user
 * @route GET /api/progress
 */
exports.getOverallProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalLabs = await Lab.countDocuments({ published: true });
    const allProgress = await Progress.find({ userId }).populate('labId', 'service');

    const completedLabs = allProgress.filter(p => p.status === 'completed');
    const inProgressLabs = allProgress.filter(p => p.status === 'in_progress');

    // Service-wise progress
    const serviceProgress = {};
    const services = ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda'];
    
    for (const service of services) {
      const serviceLabsCount = await Lab.countDocuments({ published: true, service });
      const completedServiceLabsCount = completedLabs.filter(p => p.labId && p.labId.service === service).length;
      
      serviceProgress[service] = {
        total: serviceLabsCount,
        completed: completedServiceLabsCount,
        percentage: serviceLabsCount === 0 ? 0 : Math.round((completedServiceLabsCount / serviceLabsCount) * 100)
      };
    }

    const completionPercentage = totalLabs === 0 ? 0 : Math.round((completedLabs.length / totalLabs) * 100);

    return sendSuccess(res, {
      totalLabs,
      completedLabs: completedLabs.length,
      inProgressLabs: inProgressLabs.length,
      totalXP: req.user.xp,
      currentLevel: req.user.level,
      levelName: req.user.getLevelName(),
      completionPercentage,
      serviceProgress
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get progress summary (recent completed labs, etc)
 * @route GET /api/progress/summary
 */
exports.getProgressSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const recentCompletedLabs = await Progress.find({ userId, status: 'completed' })
      .sort({ completedAt: -1 })
      .limit(5)
      .populate('labId', 'title service difficulty points');

    const totalLabs = await Lab.countDocuments({ published: true });
    const completedLabsCount = await Progress.countDocuments({ userId, status: 'completed' });

    const completionPercentage = totalLabs === 0 ? 0 : Math.round((completedLabsCount / totalLabs) * 100);

    return sendSuccess(res, {
      totalXP: req.user.xp,
      currentLevel: req.user.level,
      levelName: req.user.getLevelName(),
      completionPercentage,
      recentCompletedLabs
    });
  } catch (error) {
    next(error);
  }
};
