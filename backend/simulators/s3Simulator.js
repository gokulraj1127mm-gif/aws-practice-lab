const { generateSimId, simulateDelay } = require('../utils/idGenerator');
const Resource = require('../models/Resource');
const { logActivity, createNotification } = require('../services/activityService');

const createBucket = async (userId, config) => {
  await simulateDelay(300, 700);

  const resourceId = generateSimId('s3', 'bucket');
  const bucketName = config.bucketName
    ? config.bucketName.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    : `sim-bucket-${Date.now()}`;

  const bucket = await Resource.create({
    userId,
    service: 'S3',
    resourceType: 'Bucket',
    resourceName: bucketName,
    resourceId,
    region: config.region || 'ap-south-1',
    status: 'available',
    configuration: {
      bucketName,
      blockPublicAccess: config.blockPublicAccess !== false,
      versioning: config.versioning || false,
      encryption: config.encryption || 'AES256',
      storageClass: 'STANDARD',
      objectCount: 0,
      totalSize: 0,
      websiteHosting: false,
      loggingEnabled: false,
    },
  });

  await logActivity(userId, {
    service: 'S3',
    action: 'CREATE_BUCKET',
    resourceId,
    resourceName: bucketName,
    description: `Created simulated S3 bucket: ${bucketName}`,
    metadata: { region: config.region, versioning: config.versioning },
  });

  await createNotification(userId, {
    type: 'success',
    title: 'S3 Bucket Created',
    message: `Bucket "${bucketName}" is available.`,
    link: `/s3/${bucket._id}`,
  });

  return bucket;
};

const addSimulatedObject = async (userId, bucketId, objectConfig) => {
  const bucket = await Resource.findOne({ _id: bucketId, userId, service: 'S3' });
  if (!bucket) throw new Error('Bucket not found');

  const objectId = generateSimId('s3', 'obj');
  const objects = bucket.configuration.objects || [];
  objects.push({
    objectId,
    key: objectConfig.key || `file-${Date.now()}.txt`,
    size: objectConfig.size || Math.floor(Math.random() * 1024 * 100),
    contentType: objectConfig.contentType || 'text/plain',
    storageClass: 'STANDARD',
    lastModified: new Date().toISOString(),
  });

  bucket.configuration.objects = objects;
  bucket.configuration.objectCount = objects.length;
  bucket.configuration.totalSize = objects.reduce((sum, o) => sum + o.size, 0);
  bucket.markModified('configuration');
  await bucket.save();

  await logActivity(userId, {
    service: 'S3',
    action: 'PUT_OBJECT',
    resourceId: bucket.resourceId,
    resourceName: objectConfig.key,
    description: `Added simulated object: ${objectConfig.key}`,
  });

  return bucket;
};

module.exports = { createBucket, addSimulatedObject };
