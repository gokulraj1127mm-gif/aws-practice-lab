const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas
 * Validates MONGO_URI, prevents duplicate connections,
 * and safely sanitizes any connection errors to avoid credential leakage.
 */
const connectDB = async () => {
  // Prevent duplicate connections if already connected or connecting
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGO_URI;

  // Validate that the URI is provided before attempting to connect
  if (!mongoUri || typeof mongoUri !== 'string' || !mongoUri.trim()) {
    console.error('❌ FATAL: Environment variable "MONGO_URI" is missing or empty.');
    console.error('   Please configure MONGO_URI with a valid MongoDB Atlas connection string.');
    console.error('   - Local: Define MONGO_URI in backend/.env');
    console.error('   - Render: Set MONGO_URI in Dashboard -> Environment Variables');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Sanitize any user credentials that could appear in error strings
    const sanitizedMsg = (error.message || '').replace(
      /\/\/([^:]+):([^@]+)@/g,
      '//***:***@'
    );
    console.error(`❌ MongoDB connection error: ${sanitizedMsg}`);
    console.error('   Troubleshooting Checklist:');
    console.error('   1. MongoDB Atlas Network Access: Verify 0.0.0.0/0 is allowed in IP Access List (required for Render).');
    console.error('   2. Database User: Ensure the database user exists, has readWrite permissions, and the password is correct.');
    console.error('   3. Connection String: Ensure the URI uses the standard mongodb+srv:// format.');
    process.exit(1);
  }
};

module.exports = connectDB;
