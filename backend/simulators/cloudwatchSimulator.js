const Resource = require('../models/Resource');
const Activity = require('../models/Activity');

const generateMetricData = (hours = 24, base = 50, variance = 30) => {
  return Array.from({ length: hours }, (_, i) => ({
    time: new Date(Date.now() - (hours - i) * 3600000).toISOString(),
    value: Math.max(0, base + (Math.random() - 0.5) * variance * 2),
  }));
};

const getDashboardData = async (userId) => {
  const ec2Count = await Resource.countDocuments({ userId, service: 'EC2', status: { $ne: 'terminated' } });
  const lambdaCount = await Resource.countDocuments({ userId, service: 'Lambda' });

  return {
    overview: {
      requests: { data: generateMetricData(24, 120, 80), unit: 'Count/min' },
      errors: { data: generateMetricData(24, 5, 4), unit: 'Count/min' },
      latency: { data: generateMetricData(24, 45, 25), unit: 'ms' },
      invocations: { data: generateMetricData(24, lambdaCount * 15, 10), unit: 'Count' },
    },
    alarms: [
      { id: 'sim-alarm-001', name: 'High CPU Utilization', state: 'OK', metric: 'CPUUtilization', threshold: 80, operator: '>' },
      { id: 'sim-alarm-002', name: 'Memory Usage', state: 'INSUFFICIENT_DATA', metric: 'MemoryUtilization', threshold: 85, operator: '>' },
      { id: 'sim-alarm-003', name: 'Error Rate', state: 'OK', metric: 'Errors', threshold: 10, operator: '>' },
    ],
    note: 'SIMULATION MODE — All metrics are generated data.',
  };
};

const getLogGroups = async (userId) => {
  const resources = await Resource.find({ userId, service: { $in: ['EC2', 'Lambda', 'RDS'] } });

  return resources.slice(0, 10).map((r) => ({
    logGroupName: `/aws/${r.service.toLowerCase()}/${r.resourceId}`,
    retentionDays: 30,
    storedBytes: Math.floor(Math.random() * 1024 * 1024),
    resourceId: r.resourceId,
    resourceName: r.resourceName,
    service: r.service,
    createdAt: r.createdAt,
  }));
};

const generateLogs = (resourceId, service) => {
  const entries = [
    { level: 'INFO', message: 'Service initialization complete' },
    { level: 'INFO', message: 'Health check passed' },
    { level: 'INFO', message: 'Processing incoming request' },
    { level: 'INFO', message: 'Request completed successfully' },
    { level: 'WARN', message: 'Response time exceeded 200ms threshold' },
    { level: 'INFO', message: 'Auto-scaling event triggered' },
    { level: 'INFO', message: 'Metrics reported to CloudWatch' },
    { level: 'ERROR', message: 'Connection timeout — retrying (1/3)' },
    { level: 'INFO', message: 'Connection retry successful' },
    { level: 'INFO', message: 'Backup snapshot initiated' },
  ];

  return entries.map((e, i) => ({
    timestamp: new Date(Date.now() - i * 60000 * (Math.random() * 5 + 1)).toISOString(),
    level: e.level,
    message: `[${e.level}] [${resourceId}] ${e.message}`,
    logStream: `${service.toLowerCase()}-stream-${resourceId}`,
  }));
};

module.exports = { getDashboardData, getLogGroups, generateLogs, generateMetricData };
