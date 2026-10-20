require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Connect to MongoDB and start HTTP server asynchronously
const PORT = process.env.PORT || 5000;

// Configure allowed origins for CORS
const allowedOrigins = [];
const configuredOrigins = process.env.FRONTEND_URL || process.env.CLIENT_URL;

if (configuredOrigins) {
  configuredOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach((origin) => {
      if (!allowedOrigins.includes(origin)) {
        allowedOrigins.push(origin);
      }
    });
}

// In non-production environments, allow local frontend dev servers
if (process.env.NODE_ENV !== 'production') {
  const localOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
  localOrigins.forEach((origin) => {
    if (!allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
  });
}

// Security middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (health checks, server-to-server, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.length === 0) {
      if (process.env.NODE_ENV === 'production') {
        console.error('⚠️ CORS Error: FRONTEND_URL or CLIENT_URL environment variable is not configured in production.');
        return callback(new Error('CORS blocked: FRONTEND_URL or CLIENT_URL is not configured'));
      }
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: Origin ${origin} is not allowed`));
  },
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

const startServer = async () => {
  try {
    // Ensure database connection succeeds before reporting ready and accepting requests
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 AWS Practice Lab API running on port ${PORT}`);
      console.log(`🔒 Simulation Mode: No real AWS resources will be created`);
      console.log(`🌍 Allowed CORS Origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : 'None explicitly set (development mode)'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
module.exports.startServer = startServer;
