const Resource = require('../models/Resource');

/**
 * Validate a student's resources against lab requirements
 * 
 * @param {string} userId - ID of the authenticated student
 * @param {Object} lab - The Lab document
 * @returns {Object} - { completed, score, feedback }
 */
const validateLab = async (userId, lab) => {
  try {
    // 1. Fetch all relevant simulated resources for the user based on the lab service
    const resources = await Resource.find({
      userId,
      type: lab.service,
    });

    if (!resources || resources.length === 0) {
      return {
        completed: false,
        score: 0,
        feedback: `No ${lab.service} resources found. Please create the required resources.`,
      };
    }

    // 2. We need to check if ANY of the user's resources match ALL requirements of the lab.
    // If the lab has no requirements, we assume just creating the resource is enough.
    if (!lab.requirements || lab.requirements.length === 0) {
      return {
        completed: true,
        score: 100,
        feedback: `All requirements completed successfully.`,
        resourceId: resources[0]._id
      };
    }

    let bestScore = 0;
    let bestFeedback = [];
    let bestResourceId = null;

    for (const resource of resources) {
      const config = resource.configuration;
      let passedCount = 0;
      let currentFeedback = [];

      for (const req of lab.requirements) {
        let actualValue = config[req.field];
        
        // Handle nested fields (e.g., 'tags.environment')
        if (req.field.includes('.')) {
          const parts = req.field.split('.');
          actualValue = config;
          for (const part of parts) {
            if (actualValue === undefined) break;
            actualValue = actualValue[part];
          }
        }

        let passed = false;
        
        switch (req.operator) {
          case 'eq':
            passed = actualValue === req.value;
            break;
          case 'gte':
            passed = actualValue >= req.value;
            break;
          case 'lte':
            passed = actualValue <= req.value;
            break;
          case 'contains':
            passed = Array.isArray(actualValue) && actualValue.includes(req.value);
            break;
          case 'in':
            passed = Array.isArray(req.value) && req.value.includes(actualValue);
            break;
          default:
            passed = actualValue === req.value;
        }

        currentFeedback.push({
          field: req.field,
          message: req.label || `${req.field} should be ${req.value}`,
          passed,
        });

        if (passed) passedCount++;
      }

      const score = Math.round((passedCount / lab.requirements.length) * 100);

      if (score > bestScore) {
        bestScore = score;
        bestFeedback = currentFeedback;
        bestResourceId = resource._id;
      }

      if (score === 100) {
        return {
          completed: true,
          score: 100,
          feedback: "All requirements completed successfully.",
          resourceId: resource._id,
          details: currentFeedback
        };
      }
    }

    // If no resource passed 100%, return the best effort
    const failedMessages = bestFeedback.filter(f => !f.passed).map(f => f.message);
    const feedbackStr = failedMessages.length > 0 
      ? failedMessages.join(', ') 
      : 'Requirements not met.';

    return {
      completed: false,
      score: bestScore,
      feedback: feedbackStr,
      details: bestFeedback
    };

  } catch (error) {
    console.error('Lab Validation Error:', error);
    return {
      completed: false,
      score: 0,
      feedback: 'An error occurred during lab validation.',
    };
  }
};

module.exports = { validateLab };
