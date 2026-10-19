const { generateSimId, generatePrivateIP, generatePublicIP, simulateDelay } = require('../utils/idGenerator');
const Resource = require('../models/Resource');
const { logActivity, createNotification } = require('../services/activityService');

const OS_OPTIONS = ['Ubuntu 22.04 LTS', 'Amazon Linux 2023', 'Windows Server 2022'];
const INSTANCE_TYPES = ['t3.micro', 't3.small', 't3.medium', 't3.large'];
const STATUS_MAP = { running: 'running', stopped: 'stopped', terminated: 'terminated' };

const createInstance = async (userId, config) => {
  await simulateDelay(400, 900);

  const resourceId = generateSimId('ec2', 'i');
  const privateIp = generatePrivateIP();
  const publicIp = generatePublicIP();

  const instance = await Resource.create({
    userId,
    service: 'EC2',
    resourceType: 'Instance',
    resourceName: config.name || 'My Instance',
    resourceId,
    region: config.region || 'ap-south-1',
    status: 'running',
    configuration: {
      instanceType: config.instanceType || 't3.micro',
      os: config.os || 'Ubuntu 22.04 LTS',
      storage: config.storage || 20,
      keyPair: config.keyPair || 'sim-keypair',
      securityGroup: config.securityGroup || 'default',
      vpcId: config.vpcId || generateSimId('vpc', 'vpc'),
      subnetId: config.subnetId || generateSimId('vpc', 'subnet'),
      privateIpAddress: privateIp,
      publicIpAddress: publicIp,
      architecture: 'x86_64',
      tenancy: 'default',
      monitoring: 'disabled',
      launchTime: new Date().toISOString(),
    },
    tags: config.tags || {},
  });

  await logActivity(userId, {
    service: 'EC2',
    action: 'LAUNCH_INSTANCE',
    resourceId,
    resourceName: config.name,
    description: `Launched simulated EC2 instance: ${resourceId}`,
    metadata: { instanceType: config.instanceType, os: config.os },
  });

  await createNotification(userId, {
    type: 'success',
    title: 'EC2 Instance Launched',
    message: `${resourceId} is now running.`,
    link: `/ec2/${instance._id}`,
  });

  return instance;
};

const changeInstanceState = async (userId, instanceId, newStatus) => {
  await simulateDelay(200, 500);
  const resource = await Resource.findOne({ _id: instanceId, userId, service: 'EC2' });
  if (!resource) throw new Error('Instance not found');

  const actionMap = {
    running: 'START_INSTANCE',
    stopped: 'STOP_INSTANCE',
    terminated: 'TERMINATE_INSTANCE',
  };

  resource.status = newStatus;
  await resource.save();

  await logActivity(userId, {
    service: 'EC2',
    action: actionMap[newStatus] || 'UPDATE_INSTANCE',
    resourceId: resource.resourceId,
    resourceName: resource.resourceName,
    description: `Instance ${resource.resourceId} state changed to ${newStatus}`,
  });

  return resource;
};

module.exports = { createInstance, changeInstanceState, OS_OPTIONS, INSTANCE_TYPES };
