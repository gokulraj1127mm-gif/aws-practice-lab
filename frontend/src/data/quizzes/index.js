import { fundamentalsQuiz } from './fundamentalsQuiz.js';
import { iamQuiz } from './iamQuiz.js';
import { ec2Quiz } from './ec2Quiz.js';
import { s3Quiz } from './s3Quiz.js';
import { vpcQuiz } from './vpcQuiz.js';
import { lambdaQuiz } from './lambdaQuiz.js';
import { rdsQuiz } from './rdsQuiz.js';
import { dynamodbQuiz } from './dynamodbQuiz.js';
import { cloudwatchQuiz } from './cloudwatchQuiz.js';
import { cloudtrailQuiz } from './cloudtrailQuiz.js';
import { elbQuiz } from './elbQuiz.js';
import { autoscalingQuiz } from './autoscalingQuiz.js';
import { route53Quiz } from './route53Quiz.js';
import { cloudfrontQuiz, snsQuiz } from './cloudfrontSnsQuiz.js';
import { ecsQuiz } from './ecsQuiz.js';
import { beanstalkQuiz } from './beanstalkQuiz.js';
import { cloudformationQuiz } from './cloudformationQuiz.js';
import { cliQuiz } from './cliQuiz.js';
import { ssmQuiz } from './ssmQuiz.js';
import { budgetsQuiz } from './budgetsQuiz.js';

// 20 Canonical AWS Service Question Banks specified in Master Specification
// 20 services × 20 questions = exactly 400 validated questions
// Each bank: 7 beginner, 7 intermediate, 6 advanced
export const allQuizzes = [
  fundamentalsQuiz,
  iamQuiz,
  ec2Quiz,
  s3Quiz,
  vpcQuiz,
  lambdaQuiz,
  rdsQuiz,
  dynamodbQuiz,
  cloudwatchQuiz,
  cloudtrailQuiz,
  elbQuiz,
  autoscalingQuiz,
  route53Quiz,
  cloudfrontQuiz,
  ecsQuiz,
  beanstalkQuiz,
  cloudformationQuiz,
  cliQuiz,
  ssmQuiz,
  budgetsQuiz
];

// Helper functions for quiz access
export const getQuizById = (id) => {
  return allQuizzes.find(q => q.id === id) || null;
};

export const getAllQuestions = () => {
  return allQuizzes.flatMap(q => q.questions.map(item => ({
    ...item,
    serviceId: q.id,
    serviceName: q.service
  })));
};

export const getQuestionsByLevel = (level) => {
  return getAllQuestions().filter(q => q.level.toLowerCase() === level.toLowerCase());
};

export {
  fundamentalsQuiz,
  iamQuiz,
  ec2Quiz,
  s3Quiz,
  vpcQuiz,
  lambdaQuiz,
  rdsQuiz,
  dynamodbQuiz,
  cloudwatchQuiz,
  cloudtrailQuiz,
  elbQuiz,
  autoscalingQuiz,
  route53Quiz,
  cloudfrontQuiz,
  snsQuiz,
  ecsQuiz,
  beanstalkQuiz,
  cloudformationQuiz,
  cliQuiz,
  ssmQuiz,
  budgetsQuiz
};
