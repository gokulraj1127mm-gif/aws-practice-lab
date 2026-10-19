const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    service: {
      type: String,
      enum: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda', 'CloudWatch', 'Auth', 'Lab', 'System'],
    },
    action: { type: String, required: true },
    resourceId: String,
    resourceName: String,
    description: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ['success', 'failed', 'info'], default: 'success' },
  },
  { timestamps: true }
);

activitySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', activitySchema);
