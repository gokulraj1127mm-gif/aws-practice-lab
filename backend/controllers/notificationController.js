const Notification = require('../models/Notification');
const { sendSuccess, sendError } = require('../utils/responseHelper');

/**
 * Get all notifications for a user
 * @route GET /api/notifications
 */
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
      
    return sendSuccess(res, notifications);
  } catch (error) {
    next(error);
  }
};

/**
 * Mark a specific notification as read
 * @route PATCH /api/notifications/:id/read
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return sendError(res, 'Notification not found or unauthorized', 404);
    }

    return sendSuccess(res, notification, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

/**
 * Mark all notifications as read for a user
 * @route PATCH /api/notifications/read-all
 */
exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, read: false },
      { read: true }
    );

    return sendSuccess(res, null, 'All notifications marked as read');
  } catch (error) {
    next(error);
  }
};
