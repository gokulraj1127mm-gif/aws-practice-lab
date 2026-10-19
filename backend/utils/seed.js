require('dotenv').config();
const mongoose = require('mongoose');
const Lab = require('../models/Lab');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected for seeding...');
    
    await Lab.deleteMany(); // Clear existing labs
    console.log('Cleared existing labs');
    
    const fullLabs = generateFullLabs();
    await Lab.insertMany(fullLabs);
    
    console.log(`Successfully seeded ${fullLabs.length} labs!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

const generateFullLabs = () => {
  const labs = [];
  let order = 1;

  // 5 EC2 Labs
  for(let i=1; i<=5; i++) {
    labs.push({
      title: `EC2 Lab ${i}`,
      slug: `ec2-lab-${i}`,
      service: 'EC2',
      description: `EC2 Practice Lab number ${i}`,
      requirements: [{ field: 'instanceType', operator: 'eq', value: 't2.micro', label: 'Must be t2.micro' }],
      published: true,
      order: order++
    });
  }

  // 5 S3 Labs
  for(let i=1; i<=5; i++) {
    labs.push({
      title: `S3 Lab ${i}`,
      slug: `s3-lab-${i}`,
      service: 'S3',
      description: `S3 Practice Lab number ${i}`,
      requirements: [{ field: 'versioning', operator: 'eq', value: 'Enabled', label: 'Versioning must be Enabled' }],
      published: true,
      order: order++
    });
  }

  // 3 IAM Labs
  for(let i=1; i<=3; i++) {
    labs.push({
      title: `IAM Lab ${i}`,
      slug: `iam-lab-${i}`,
      service: 'IAM',
      description: `IAM Practice Lab number ${i}`,
      requirements: [], // simple completion
      published: true,
      order: order++
    });
  }

  // 3 VPC Labs
  for(let i=1; i<=3; i++) {
    labs.push({
      title: `VPC Lab ${i}`,
      slug: `vpc-lab-${i}`,
      service: 'VPC',
      description: `VPC Practice Lab number ${i}`,
      requirements: [],
      published: true,
      order: order++
    });
  }

  // 3 RDS Labs
  for(let i=1; i<=3; i++) {
    labs.push({
      title: `RDS Lab ${i}`,
      slug: `rds-lab-${i}`,
      service: 'RDS',
      description: `RDS Practice Lab number ${i}`,
      requirements: [],
      published: true,
      order: order++
    });
  }

  // 3 Lambda Labs
  for(let i=1; i<=3; i++) {
    labs.push({
      title: `Lambda Lab ${i}`,
      slug: `lambda-lab-${i}`,
      service: 'Lambda',
      description: `Lambda Practice Lab number ${i}`,
      requirements: [],
      published: true,
      order: order++
    });
  }

  return labs;
};

seedData();
