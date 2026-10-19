const { generateSimId, simulateDelay } = require('../utils/idGenerator');
const Resource = require('../models/Resource');
const { logActivity, createNotification } = require('../services/activityService');

const createVPC = async (userId, config) => {
  await simulateDelay(400, 800);

  const resourceId = generateSimId('vpc', 'vpc');

  const vpc = await Resource.create({
    userId,
    service: 'VPC',
    resourceType: 'VPC',
    resourceName: config.vpcName || 'Practice-VPC',
    resourceId,
    region: config.region || 'ap-south-1',
    status: 'available',
    configuration: {
      vpcName: config.vpcName || 'Practice-VPC',
      cidrBlock: config.cidrBlock || '10.0.0.0/16',
      tenancy: 'default',
      dnsHostnames: true,
      dnsResolution: true,
      internetGateway: null,
      subnets: [],
      routeTables: [],
      securityGroups: [],
    },
  });

  await logActivity(userId, {
    service: 'VPC',
    action: 'CREATE_VPC',
    resourceId,
    resourceName: config.vpcName,
    description: `Created simulated VPC: ${resourceId} (${config.cidrBlock || '10.0.0.0/16'})`,
  });

  await createNotification(userId, {
    type: 'success',
    title: 'VPC Created',
    message: `${config.vpcName || 'VPC'} (${config.cidrBlock || '10.0.0.0/16'}) is available.`,
  });

  return vpc;
};

const createSubnet = async (userId, vpcId, config) => {
  await simulateDelay(200, 500);

  const vpc = await Resource.findOne({ _id: vpcId, userId, service: 'VPC' });
  if (!vpc) throw new Error('VPC not found');

  const subnetId = generateSimId('vpc', 'subnet');
  const subnet = {
    subnetId,
    subnetName: config.subnetName || 'Practice-Subnet',
    cidrBlock: config.cidrBlock || '10.0.1.0/24',
    availabilityZone: config.availabilityZone || `${vpc.region}a`,
    type: config.type || 'public',
    mapPublicIpOnLaunch: config.type !== 'private',
    availableIPs: 251,
    createdAt: new Date().toISOString(),
  };

  vpc.configuration.subnets = [...(vpc.configuration.subnets || []), subnet];
  vpc.markModified('configuration');
  await vpc.save();

  await logActivity(userId, {
    service: 'VPC',
    action: 'CREATE_SUBNET',
    resourceId: subnetId,
    resourceName: config.subnetName,
    description: `Created subnet ${subnetId} in VPC ${vpc.resourceId}`,
  });

  return { vpc, subnet };
};

const createSecurityGroup = async (userId, vpcId, config) => {
  await simulateDelay(200, 400);

  const vpc = await Resource.findOne({ _id: vpcId, userId, service: 'VPC' });
  if (!vpc) throw new Error('VPC not found');

  const sgId = generateSimId('vpc', 'sg');
  const sg = {
    sgId,
    groupName: config.groupName || 'default',
    description: config.description || 'Simulated Security Group',
    inboundRules: config.inboundRules || [{ protocol: 'tcp', port: 22, source: '0.0.0.0/0', description: 'SSH' }],
    outboundRules: config.outboundRules || [{ protocol: '-1', port: 'All', destination: '0.0.0.0/0', description: 'All traffic' }],
    createdAt: new Date().toISOString(),
  };

  vpc.configuration.securityGroups = [...(vpc.configuration.securityGroups || []), sg];
  vpc.markModified('configuration');
  await vpc.save();

  return { vpc, securityGroup: sg };
};

module.exports = { createVPC, createSubnet, createSecurityGroup };
