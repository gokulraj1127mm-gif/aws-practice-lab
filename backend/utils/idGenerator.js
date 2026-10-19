const crypto = require('crypto');

/**
 * Generate a simulated AWS-style resource ID
 * @param {string} service - e.g. 'ec2', 's3', 'vpc'
 * @param {string} resourceType - e.g. 'i', 'bucket', 'subnet'
 */
const generateSimId = (service, resourceType = '') => {
  const hex = crypto.randomBytes(4).toString('hex').toUpperCase();
  const prefix = resourceType ? `${service}-${resourceType}` : service;
  return `sim-${prefix}-${hex}`;
};

/**
 * Generate a simulated IP address
 */
const generatePrivateIP = () => {
  const octets = [
    10,
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 255) + 1,
  ];
  return octets.join('.');
};

/**
 * Generate a simulated public IP (169.x.x.x range for simulation)
 */
const generatePublicIP = () => {
  return `54.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 255) + 1}`;
};

/**
 * Generate a fake MAC address
 */
const generateMAC = () => {
  return Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':');
};

/**
 * Generate a simulated endpoint for RDS/services
 */
const generateEndpoint = (name, service = 'simulated') => {
  const safe = name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return `${safe}.${service}.local`;
};

/**
 * Simulate a short processing delay (200-800ms)
 */
const simulateDelay = (min = 200, max = 800) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  generateSimId,
  generatePrivateIP,
  generatePublicIP,
  generateMAC,
  generateEndpoint,
  simulateDelay,
};
