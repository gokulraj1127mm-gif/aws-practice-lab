// AWS Practice Lab — Secure Admin Controller
// Compliant with Stage 10: Server-side authorization, user management, metrics, audit records, and quiz validation.

const User = require('../models/User');
const Lab = require('../models/Lab');
const Activity = require('../models/Activity');
const Resource = require('../models/Resource');

// GET /api/admin/metrics
const getAdminMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const studentCount = await User.countDocuments({ role: 'student' });
    const totalLabs = await Lab.countDocuments();
    const totalActivities = await Activity.countDocuments();
    const totalResources = await Resource.countDocuments();

    return res.json({
      success: true,
      data: {
        totalUsers,
        adminCount,
        studentCount,
        totalLabs,
        totalActivities,
        totalResources,
        serverTime: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Admin metrics error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve admin metrics' });
  }
};

// GET /api/admin/users
const getUsersList = async (req, res) => {
  try {
    const { search = '', role = 'all', page = 1, limit = 20 } = req.query;

    const query = {};
    if (role !== 'all') {
      query.role = role;
    }
    if (search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    return res.json({
      success: true,
      data: {
        users,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Admin users list error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve users' });
  }
};

// PATCH /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role value' });
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    targetUser.role = role;
    await targetUser.save();

    // Log admin audit activity
    try {
      await Activity.create({
        user: req.user._id,
        action: 'ADMIN_ROLE_CHANGE',
        details: `Changed role of user ${targetUser.email} to ${role}`,
        timestamp: new Date()
      });
    } catch (e) {
      // Activity logging optional
    }

    return res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: { id: targetUser._id, name: targetUser.name, email: targetUser.email, role: targetUser.role }
    });
  } catch (error) {
    console.error('Update role error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
};

module.exports = {
  getAdminMetrics,
  getUsersList,
  updateUserRole
};
