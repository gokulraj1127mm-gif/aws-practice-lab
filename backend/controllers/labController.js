const Lab = require('../models/Lab');
const Progress = require('../models/Progress');
const { validateLab } = require('../services/labValidationService');
const { awardLabCompletionXP } = require('../services/xpService');
const { logActivity } = require('../services/activityService');
const { sendSuccess, sendError } = require('../utils/responseHelper');

/**
 * Get all published labs
 * @route GET /api/labs
 */
exports.getAllLabs = async (req, res, next) => {
  try {
    const labs = await Lab.find({ published: true }).sort({ order: 1, createdAt: 1 });
    return sendSuccess(res, labs);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single lab by ID
 * @route GET /api/labs/:id
 */
exports.getLabById = async (req, res, next) => {
  try {
    const lab = await Lab.findOne({ _id: req.params.id, published: true });
    if (!lab) {
      return sendError(res, 'Lab not found', 404);
    }
    return sendSuccess(res, lab);
  } catch (error) {
    next(error);
  }
};

/**
 * Start a lab (creates progress entry)
 * @route POST /api/labs/:id/start
 */
exports.startLab = async (req, res, next) => {
  try {
    const lab = await Lab.findOne({ _id: req.params.id, published: true });
    if (!lab) {
      return sendError(res, 'Lab not found', 404);
    }

    let progress = await Progress.findOne({ userId: req.user._id, labId: lab._id });

    if (!progress) {
      progress = await Progress.create({
        userId: req.user._id,
        labId: lab._id,
        status: 'in_progress',
        startedAt: new Date()
      });
    } else if (progress.status === 'not_started') {
      progress.status = 'in_progress';
      progress.startedAt = new Date();
      await progress.save();
    }

    await logActivity(req.user._id, 'LAB', 'LAB_STARTED', lab._id, `Started lab: ${lab.title}`);

    return sendSuccess(res, progress, 'Lab started successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Check lab progress (Validation Engine)
 * @route POST /api/labs/:id/check
 */
exports.checkLab = async (req, res, next) => {
  try {
    const lab = await Lab.findOne({ _id: req.params.id, published: true });
    if (!lab) {
      return sendError(res, 'Lab not found', 404);
    }

    let progress = await Progress.findOne({ userId: req.user._id, labId: lab._id });
    if (!progress) {
      return sendError(res, 'You have not started this lab yet', 400);
    }

    progress.attempts += 1;

    // Run validation service
    const validationResult = await validateLab(req.user._id, lab);

    progress.score = validationResult.score;
    progress.feedback = validationResult.details || [];
    
    if (validationResult.completed) {
      const isFirstCompletion = progress.status !== 'completed';
      
      progress.status = 'completed';
      progress.resourceId = validationResult.resourceId;
      if (isFirstCompletion) {
        progress.completedAt = new Date();
      }
      
      await progress.save();

      let xpResult = null;
      if (isFirstCompletion) {
        xpResult = await awardLabCompletionXP(req.user._id, lab.points, lab.title);
        await logActivity(req.user._id, 'LAB', 'LAB_COMPLETED', lab._id, `Completed lab: ${lab.title}`);
      }

      return sendSuccess(res, {
        completed: true,
        score: validationResult.score,
        feedback: validationResult.feedback,
        details: validationResult.details,
        xpAwarded: xpResult ? xpResult.xpAwarded : 0,
        levelUp: xpResult ? xpResult.levelUp : false
      }, 'Lab completed successfully!');
      
    } else {
      progress.status = 'in_progress'; // or 'failed' depending on logic
      await progress.save();

      return sendSuccess(res, {
        completed: false,
        score: validationResult.score,
        feedback: validationResult.feedback,
        details: validationResult.details
      }, 'Lab requirements not fully met');
    }

  } catch (error) {
    next(error);
  }
};
