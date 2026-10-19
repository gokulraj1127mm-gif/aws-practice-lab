const { generateSimId, simulateDelay } = require('../utils/idGenerator');
const Resource = require('../models/Resource');
const { logActivity, createNotification } = require('../services/activityService');

const IAM_POLICIES = [
  'AdministratorAccess',
  'AmazonEC2FullAccess',
  'AmazonS3FullAccess',
  'AmazonS3ReadOnlyAccess',
  'AmazonRDSFullAccess',
  'AWSLambdaFullAccess',
  'AmazonVPCFullAccess',
  'ReadOnlyAccess',
  'PowerUserAccess',
];

const createIAMUser = async (userId, config) => {
  await simulateDelay(300, 600);

  const resourceId = generateSimId('iam', 'user');
  const accessKeyId = `SIMA${Math.random().toString(36).toUpperCase().slice(2, 18)}`;
  const secretKey = `sim-secret-${Math.random().toString(36).slice(2, 34)}`;

  const user = await Resource.create({
    userId,
    service: 'IAM',
    resourceType: 'User',
    resourceName: config.username || 'sim-user',
    resourceId,
    region: 'global',
    status: 'active',
    configuration: {
      username: config.username || 'sim-user',
      accessType: config.accessType || 'Programmatic access',
      policies: config.policies || [],
      groups: [],
      accessKeyId: accessKeyId,
      secretAccessKey: `${secretKey.slice(0, 8)}...${secretKey.slice(-4)}`,
      mfaEnabled: false,
      passwordEnabled: config.accessType === 'Console access',
      arn: `arn:aws:iam::simulated:user/${config.username || 'sim-user'}`,
    },
  });

  await logActivity(userId, {
    service: 'IAM',
    action: 'CREATE_USER',
    resourceId,
    resourceName: config.username,
    description: `Created simulated IAM user: ${config.username || resourceId}`,
  });

  await createNotification(userId, {
    type: 'success',
    title: 'IAM User Created',
    message: `Simulated IAM user "${config.username}" created.`,
  });

  return user;
};

const createIAMRole = async (userId, config) => {
  await simulateDelay(200, 500);

  const resourceId = generateSimId('iam', 'role');

  const role = await Resource.create({
    userId,
    service: 'IAM',
    resourceType: 'Role',
    resourceName: config.roleName || 'sim-role',
    resourceId,
    region: 'global',
    status: 'active',
    configuration: {
      roleName: config.roleName || 'sim-role',
      trustedEntity: config.trustedEntity || 'AWS service',
      useCase: config.useCase || 'EC2',
      policies: config.policies || [],
      arn: `arn:aws:iam::simulated:role/${config.roleName || 'sim-role'}`,
      maxSessionDuration: 3600,
    },
  });

  await logActivity(userId, {
    service: 'IAM',
    action: 'CREATE_ROLE',
    resourceId,
    resourceName: config.roleName,
    description: `Created simulated IAM role: ${config.roleName || resourceId}`,
  });

  return role;
};

const createIAMPolicy = async (userId, config) => {
  await simulateDelay(200, 400);

  const resourceId = generateSimId('iam', 'policy');

  const policy = await Resource.create({
    userId,
    service: 'IAM',
    resourceType: 'Policy',
    resourceName: config.policyName || 'sim-policy',
    resourceId,
    region: 'global',
    status: 'active',
    configuration: {
      policyName: config.policyName || 'sim-policy',
      description: config.description || 'Simulated IAM policy',
      policyDocument: config.policyDocument || JSON.stringify({
        Version: '2012-10-17',
        Statement: [{ Effect: 'Allow', Action: ['s3:GetObject'], Resource: '*' }],
      }),
      arn: `arn:aws:iam::simulated:policy/${config.policyName || 'sim-policy'}`,
    },
  });

  return policy;
};

module.exports = { createIAMUser, createIAMRole, createIAMPolicy, IAM_POLICIES };
