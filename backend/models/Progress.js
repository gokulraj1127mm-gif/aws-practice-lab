const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lab',
      required: true,
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed', 'failed'],
      default: 'not_started',
    },
    score: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    feedback: [{ field: String, message: String, passed: Boolean }],
    startedAt: Date,
    completedAt: Date,
    resourceId: String, // the resource used for lab validation
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, labId: 1 }, { unique: true });
progressSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Progress', progressSchema);
