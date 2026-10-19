const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logActivity, createNotification } = require('../services/activityService');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required.', 400);
    }
    if (password.length < 6) {
      return sendError(res, 'Password must be at least 6 characters.', 400);
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return sendError(res, 'An account with this email already exists.', 400);
    }

    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password });

    await logActivity(user._id, {
      service: 'Auth',
      action: 'REGISTER',
      description: 'Account registered successfully',
      status: 'success',
    });

    await createNotification(user._id, {
      type: 'success',
      title: 'Welcome to AWS Practice Lab! 🚀',
      message: 'Your account is ready. Start with a beginner lab to earn your first XP!',
    });

    const token = signToken(user._id);

    return sendSuccess(
      res,
      {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          xp: user.xp,
          level: user.level,
          badges: user.badges,
        },
      },
      'Account created successfully',
      201
    );
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required.', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    await logActivity(user._id, {
      service: 'Auth',
      action: 'LOGIN',
      description: 'Logged in successfully',
      status: 'success',
    });

    const token = signToken(user._id);

    return sendSuccess(res, {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
        notifications: user.notifications,
      },
    }, 'Logged in successfully');
  } catch (err) {
    next(err);
  }
};

// @route GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return sendSuccess(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp,
      level: user.level,
      badges: user.badges,
      notifications: user.notifications,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name.trim().length < 2) {
      return sendError(res, 'Name must be at least 2 characters.', 400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    return sendSuccess(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      level: user.level,
    }, 'Profile updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, updateProfile };
