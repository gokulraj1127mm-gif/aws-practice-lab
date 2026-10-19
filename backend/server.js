require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Request parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', apiLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AWS Practice Lab API is running', simulation: true });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/ec2', require('./routes/ec2'));
app.use('/api/s3', require('./routes/s3'));
app.use('/api/iam', require('./routes/iam'));
app.use('/api/vpc', require('./routes/vpc'));
app.use('/api/rds', require('./routes/rds'));
app.use('/api/lambda', require('./routes/lambda'));
app.use('/api/cloudwatch', require('./routes/cloudwatch'));
app.use('/api/labs', require('./routes/labs'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/tutor', require('./routes/tutor'));
app.use('/api/admin', require('./routes/admin'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AWS Practice Lab API running on port ${PORT}`);
  console.log(`🔒 Simulation Mode: No real AWS resources will be created`);
  console.log(`🌍 Client URL: ${process.env.CLIENT_URL}`);
});

module.exports = app;
