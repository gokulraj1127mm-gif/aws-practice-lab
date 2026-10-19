const Activity = require('../models/Activity');
const Notification = require('../models/Notification');
const User = require('../models/User');

/**
 * Log an activity event for a user
 */
const logActivity = async (userId, { service, action, resourceId, resourceName, description, metadata = {}, status = 'success' }) => {
  try {
    await Activity.create({
      userId,
      service,
      action,
      resourceId,
      resourceName,
      description,
      metadata,
      status,
    });
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
};

/**
 * Create a notification for a user
 */
const createNotification = async (userId, { type = 'info', title, message, link }) => {
  try {
    await Notification.create({ userId, type, title, message, link });
    // Increment user notification count (fire and forget)
    User.findByIdAndUpdate(userId, { $inc: { notifications: 1 } }).exec();
  } catch (err) {
    console.error('Notification error:', err.message);
  }
};

/**
 * Award XP to a user and recalculate level + badges
 */
const awardXP = async (userId, xpAmount, reason = '') => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    user.xp += xpAmount;
    user.level = user.calculateLevel();

    // Badge checks
    const badges = user.badges.map((b) => b.id);

    const badgesToCheck = [
      { id: 'first_resource', name: 'First Resource', description: 'Created your first simulated resource', condition: () => !badges.includes('first_resource') },
      { id: 'xp_100', name: 'XP Milestone', description: 'Earned 100+ XP', condition: () => user.xp >= 100 && !badges.includes('xp_100') },
      { id: 'xp_500', name: 'XP Explorer', description: 'Earned 500+ XP', condition: () => user.xp >= 500 && !badges.includes('xp_500') },
      { id: 'cloud_practitioner', name: 'Cloud Practitioner', description: 'Reached Level 3', condition: () => user.level >= 3 && !badges.includes('cloud_practitioner') },
    ];

    const newBadges = badgesToCheck.filter((b) => b.condition());
    for (const badge of newBadges) {
      user.badges.push({ id: badge.id, name: badge.name, description: badge.description });
      await createNotification(userId, {
        type: 'achievement',
        title: '🏆 Badge Earned!',
        message: `You earned the "${badge.name}" badge!`,
      });
    }

    await user.save();

    if (reason) {
      await createNotification(userId, {
        type: 'success',
        title: `+${xpAmount} XP`,
        message: `You earned ${xpAmount} XP! ${reason}`,
      });
    }

    return user;
  } catch (err) {
    console.error('Award XP error:', err.message);
  }
};

module.exports = { logActivity, createNotification, awardXP };
