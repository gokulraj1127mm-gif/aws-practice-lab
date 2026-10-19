const { generateSimId, simulateDelay } = require('../utils/idGenerator');
const Resource = require('../models/Resource');
const { logActivity, createNotification } = require('../services/activityService');

const RUNTIMES = ['nodejs20.x', 'python3.12', 'java21', 'go1.x', 'ruby3.3'];
const ARCHITECTURES = ['x86_64', 'arm64'];

const MOCK_RESPONSES = {
  default: { message: 'Hello from simulated Lambda!', statusCode: 200 },
  nodejs20x: { message: 'Hello from Node.js Lambda!', runtime: 'nodejs20.x', statusCode: 200 },
  python312: { message: 'Hello from Python Lambda!', runtime: 'python3.12', statusCode: 200 },
  java21: { message: 'Hello from Java Lambda!', runtime: 'java21', statusCode: 200 },
};

const createFunction = async (userId, config) => {
  await simulateDelay(400, 800);

  const resourceId = generateSimId('lambda', 'fn');
  const functionName = config.functionName || `sim-function-${Date.now()}`;

  const fn = await Resource.create({
    userId,
    service: 'Lambda',
    resourceType: 'Function',
    resourceName: functionName,
    resourceId,
    region: config.region || 'ap-south-1',
    status: 'active',
    configuration: {
      functionName,
      runtime: config.runtime || 'nodejs20.x',
      architecture: config.architecture || 'x86_64',
      handler: config.handler || 'index.handler',
      memorySize: config.memorySize || 128,
      timeout: config.timeout || 3,
      description: config.description || 'Simulated Lambda function',
      environment: config.environment || {},
      code: config.code || getDefaultCode(config.runtime),
      layers: [],
      invocationCount: 0,
      lastInvoked: null,
      arn: `arn:aws:lambda:${config.region || 'ap-south-1'}:simulated:function:${functionName}`,
    },
  });

  await logActivity(userId, {
    service: 'Lambda',
    action: 'CREATE_FUNCTION',
    resourceId,
    resourceName: functionName,
    description: `Created simulated Lambda function: ${functionName}`,
    metadata: { runtime: config.runtime, architecture: config.architecture },
  });

  await createNotification(userId, {
    type: 'success',
    title: 'Lambda Function Created',
    message: `Function "${functionName}" is deployed.`,
    link: `/lambda/${fn._id}`,
  });

  return fn;
};

const invokeFunction = async (userId, functionId, payload) => {
  await simulateDelay(100, 500);

  const fn = await Resource.findOne({ _id: functionId, userId, service: 'Lambda' });
  if (!fn) throw new Error('Function not found');

  const executionTime = Math.floor(Math.random() * 200) + 12;
  const runtimeKey = fn.configuration.runtime?.replace('.', '').replace('-', '') || 'default';
  const response = MOCK_RESPONSES[runtimeKey] || MOCK_RESPONSES.default;

  // Increment invocation count
  fn.configuration.invocationCount = (fn.configuration.invocationCount || 0) + 1;
  fn.configuration.lastInvoked = new Date().toISOString();
  fn.markModified('configuration');
  await fn.save();

  await logActivity(userId, {
    service: 'Lambda',
    action: 'INVOKE_FUNCTION',
    resourceId: fn.resourceId,
    resourceName: fn.resourceName,
    description: `Invoked Lambda function: ${fn.resourceName}`,
    metadata: { executionTime },
  });

  return {
    statusCode: 200,
    executedVersion: '$LATEST',
    logResult: [
      `[INFO] ${new Date().toISOString()} Function execution started`,
      `[INFO] ${new Date().toISOString()} Processing event payload`,
      `[INFO] ${new Date().toISOString()} Function execution completed successfully`,
    ].join('\n'),
    payload: JSON.stringify(response, null, 2),
    executionTime,
    billedDuration: executionTime + 1,
    memoryUsed: Math.floor(Math.random() * 64) + 32,
    note: 'SIMULATED EXECUTION — No real Lambda was invoked.',
  };
};

const getDefaultCode = (runtime) => {
  if (!runtime) return `exports.handler = async (event) => { return { statusCode: 200, body: 'Hello from Lambda!' }; };`;
  if (runtime.startsWith('python')) return `def lambda_handler(event, context):\n    return {'statusCode': 200, 'body': 'Hello from Python Lambda!'}`;
  if (runtime.startsWith('java')) return `public class Handler {\n    public String handleRequest(Object event) {\n        return "Hello from Java Lambda!";\n    }\n}`;
  return `exports.handler = async (event) => {\n  console.log('Event:', JSON.stringify(event));\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ message: 'Hello from Lambda!' })\n  };\n};`;
};

module.exports = { createFunction, invokeFunction, RUNTIMES, ARCHITECTURES };
