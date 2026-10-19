const User = require('../models/User');
const Notification = require('../models/Notification');

/**
 * Award XP to a user for completing a lab.
 * Ensures XP is only awarded once per lab (controlled by progress status).
 * 
 * @param {string} userId
 * @param {number} points
 * @param {string} labTitle
 */
const awardLabCompletionXP = async (userId, points, labTitle) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const oldLevel = user.level;
    
    // Add XP
    user.xp += points;
    
    // Calculate new level
    user.level = user.calculateLevel();

    await user.save();

    // Create Notification for XP
    await Notification.create({
      userId: user._id,
      type: 'success',
      title: 'Lab Completed',
      message: `Congratulations! You completed ${labTitle} and earned ${points} XP.`,
    });

    // Create Notification for Level Up
    if (user.level > oldLevel) {
      const levelName = user.getLevelName();
      await Notification.create({
        userId: user._id,
        type: 'achievement',
        title: 'Level Up!',
        message: `You reached Level ${user.level}: ${levelName}!`,
      });
    }

    return {
      xpAwarded: points,
      newTotalXp: user.xp,
      level: user.level,
      levelUp: user.level > oldLevel
    };
  } catch (error) {
    console.error('XP Award Error:', error);
    return null;
  }
};

module.exports = { awardLabCompletionXP };
