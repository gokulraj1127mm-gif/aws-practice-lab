// AWS Educational Pricing Reference Data
// Source: AWS Pricing Calculator & Public On-Demand Pricing Specs (calculator.aws)
// Last Verified Date: 2026-03-01
// Notice: Educational illustrative assumptions for architectural comparison. Not an official AWS bill or binding quotation.

export const pricingMetadata = {
  source: 'AWS Public Pricing Pages & AWS Pricing Calculator',
  lastVerified: '2026-03-01',
  currency: 'USD ($)',
  disclaimer: 'Estimates are illustrative educational assumptions for architecture trade-off evaluation. Excludes regional sales taxes, enterprise support plans, and custom private pricing.'
};

export const regions = [
  { id: 'us-east-1', name: 'US East (N. Virginia)', multiplier: 1.0 },
  { id: 'us-west-2', name: 'US West (Oregon)', multiplier: 1.0 },
  { id: 'eu-west-1', name: 'Europe (Ireland)', multiplier: 1.05 },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', multiplier: 1.10 }
];

export const ec2InstanceTypes = [
  { id: 't3.micro', name: 't3.micro (2 vCPU, 1 GiB RAM)', hourly: 0.0104 },
  { id: 't3.small', name: 't3.small (2 vCPU, 2 GiB RAM)', hourly: 0.0208 },
  { id: 't3.medium', name: 't3.medium (2 vCPU, 4 GiB RAM)', hourly: 0.0416 },
  { id: 'm5.large', name: 'm5.large (2 vCPU, 8 GiB RAM)', hourly: 0.0960 },
  { id: 'c5.large', name: 'c5.large (2 vCPU, 4 GiB RAM Compute Opt)', hourly: 0.0850 }
];

export const rdsInstanceTypes = [
  { id: 'db.t3.micro', name: 'db.t3.micro (2 vCPU, 1 GiB)', hourlySingle: 0.017, hourlyMultiAz: 0.034 },
  { id: 'db.t3.small', name: 'db.t3.small (2 vCPU, 2 GiB)', hourlySingle: 0.034, hourlyMultiAz: 0.068 },
  { id: 'db.m5.large', name: 'db.m5.large (2 vCPU, 8 GiB)', hourlySingle: 0.176, hourlyMultiAz: 0.352 }
];

export const storagePricing = {
  s3StandardPerGB: 0.023,
  s3InfrequentPerGB: 0.0125,
  s3GlacierPerGB: 0.0036,
  ebsgp3PerGB: 0.080
};

export const networkPricing = {
  dataTransferOutPerGB: 0.09,
  albHourly: 0.0225,
  natGatewayHourly: 0.045
};

export const serverlessPricing = {
  lambdaPerMillionRequests: 0.20,
  lambdaPerGBSecond: 0.0000166667,
  apiGatewayPerMillion: 1.00,
  dynamodbWCUPerMillion: 1.25,
  dynamodbRCUPerMillion: 0.25
};
