const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  field: String,
  operator: { type: String, enum: ['eq', 'gte', 'lte', 'contains', 'in'], default: 'eq' },
  value: mongoose.Schema.Types.Mixed,
  label: String,
}, { _id: false });

const labSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    service: {
      type: String,
      required: true,
      enum: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda'],
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    description: { type: String, required: true },
    estimatedTime: { type: Number, default: 15 }, // minutes
    points: { type: Number, default: 100 },
    instructions: [{ step: Number, title: String, content: String }],
    requirements: [requirementSchema],
    objectives: [String],
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lab', labSchema);
