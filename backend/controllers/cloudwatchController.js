const { getDashboardData, getLogGroups, generateLogs, generateMetricData } = require('../simulators/cloudwatchSimulator');
const { sendSuccess } = require('../utils/responseHelper');

const getDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardData(req.user._id);
    return sendSuccess(res, data);
  } catch (err) { next(err); }
};
const getLogGroupsHandler = async (req, res, next) => {
  try {
    const groups = await getLogGroups(req.user._id);
    return sendSuccess(res, groups);
  } catch (err) { next(err); }
};
const getLogsHandler = async (req, res, next) => {
  try {
    const logs = generateLogs(req.params.id, req.query.service || 'EC2');
    return sendSuccess(res, logs);
  } catch (err) { next(err); }
};
const getMetrics = async (req, res, next) => {
  try {
    const service = req.query.service || 'EC2';
    const metrics = {
      CPUUtilization: generateMetricData(24, 45, 30),
      NetworkIn: generateMetricData(24, 500, 200),
      NetworkOut: generateMetricData(24, 300, 150),
      RequestCount: generateMetricData(24, 120, 80),
    };
    return sendSuccess(res, { service, metrics, note: 'SIMULATION — Generated data' });
  } catch (err) { next(err); }
};

module.exports = { getDashboard, getLogGroupsHandler, getLogsHandler, getMetrics };
