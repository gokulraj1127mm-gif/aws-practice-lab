const { generateSimId, generateEndpoint, simulateDelay } = require('../utils/idGenerator');
const Resource = require('../models/Resource');
const { logActivity, createNotification } = require('../services/activityService');

const ENGINES = ['MySQL', 'PostgreSQL', 'MariaDB'];
const ENGINE_VERSIONS = { MySQL: '8.0.35', PostgreSQL: '15.4', MariaDB: '10.11.6' };
const INSTANCE_CLASSES = ['db.t3.micro', 'db.t3.small', 'db.t3.medium'];
const PORTS = { MySQL: 3306, PostgreSQL: 5432, MariaDB: 3306 };

const createDatabase = async (userId, config) => {
  await simulateDelay(600, 1200);

  const resourceId = generateSimId('rds', 'db');
  const engine = config.engine || 'MySQL';
  const dbIdentifier = config.dbIdentifier || `sim-db-${Date.now()}`;
  const endpoint = generateEndpoint(dbIdentifier, 'rds.simulated');

  const db = await Resource.create({
    userId,
    service: 'RDS',
    resourceType: 'Database',
    resourceName: dbIdentifier,
    resourceId,
    region: config.region || 'ap-south-1',
    status: 'available',
    configuration: {
      dbIdentifier,
      engine,
      engineVersion: ENGINE_VERSIONS[engine] || '8.0',
      instanceClass: config.instanceClass || 'db.t3.micro',
      storage: config.storage || 20,
      maxStorage: config.storage ? config.storage * 2 : 40,
      storageType: 'gp2',
      endpoint,
      port: PORTS[engine] || 3306,
      masterUsername: config.masterUsername || 'admin',
      databaseName: config.databaseName || 'mydb',
      multiAz: false,
      publiclyAccessible: false,
      autoBackup: true,
      backupRetentionPeriod: 7,
      deletionProtection: false,
      note: 'SIMULATED ENDPOINT — This is not a real database. No data is stored.',
    },
  });

  await logActivity(userId, {
    service: 'RDS',
    action: 'CREATE_DATABASE',
    resourceId,
    resourceName: dbIdentifier,
    description: `Created simulated ${engine} database: ${dbIdentifier}`,
    metadata: { engine, instanceClass: config.instanceClass },
  });

  await createNotification(userId, {
    type: 'success',
    title: 'RDS Database Available',
    message: `${engine} database "${dbIdentifier}" is now available.`,
    link: `/rds/${db._id}`,
  });

  return db;
};

module.exports = { createDatabase, ENGINES, INSTANCE_CLASSES };
