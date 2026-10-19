const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['success', 'info', 'warning', 'achievement'],
      default: 'info',
    },
    title: String,
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    link: String,
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, read: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
