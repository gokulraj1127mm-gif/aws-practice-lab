const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    service: {
      type: String,
      required: true,
      enum: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda', 'CloudWatch'],
    },
    resourceType: { type: String, required: true },
    resourceName: { type: String, required: true, trim: true },
    resourceId: { type: String, required: true, unique: true },
    region: { type: String, default: 'ap-south-1' },
    status: {
      type: String,
      enum: [
        'running', 'stopped', 'terminated', 'pending', 'available',
        'active', 'deleting', 'creating', 'deleted', 'failed',
      ],
      default: 'running',
    },
    configuration: { type: mongoose.Schema.Types.Mixed, default: {} },
    tags: { type: Map, of: String, default: {} },
  },
  { timestamps: true }
);

// Compound index for user + service queries
resourceSchema.index({ userId: 1, service: 1 });
resourceSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
