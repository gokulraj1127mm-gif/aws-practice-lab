const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const badgeSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  icon: String,
  earnedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [badgeSchema],
    notifications: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Calculate level from XP
userSchema.methods.calculateLevel = function () {
  if (this.xp < 200) return 1;
  if (this.xp < 500) return 2;
  if (this.xp < 1000) return 3;
  return 4;
};

// Level name
userSchema.methods.getLevelName = function () {
  const names = {
    1: 'Cloud Beginner',
    2: 'Cloud Explorer',
    3: 'Cloud Practitioner',
    4: 'Cloud Engineer',
  };
  return names[this.level] || 'Cloud Beginner';
};

module.exports = mongoose.model('User', userSchema);
