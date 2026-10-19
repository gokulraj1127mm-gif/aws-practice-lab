export const quizzesData = [
  {
    id: 'quiz-1',
    category: 'Compute',
    question: 'A company wants to run a containerized microservice without provisioning or managing virtual machine instances. Which AWS service should they choose?',
    options: [
      'Amazon EC2 with custom AMI',
      'AWS Fargate with Amazon ECS / EKS',
      'Amazon EBS Multi-Attach',
      'AWS Storage Gateway'
    ],
    correctAnswer: 1,
    explanation: 'AWS Fargate is a serverless, pay-as-you-go compute engine for containers. It works with both Amazon ECS and Amazon EKS, eliminating the need to provision, configure, and scale virtual machine clusters yourself.'
  },
  {
    id: 'quiz-2',
    category: 'Storage',
    question: 'Which Amazon S3 storage class provides the lowest storage cost for archival data that will rarely be accessed and allows a retrieval time of 12 hours?',
    options: [
      'Amazon S3 Standard',
      'Amazon S3 Standard-Infrequent Access (S3 Standard-IA)',
      'Amazon S3 Glacier Flexible Retrieval',
      'Amazon S3 Glacier Deep Archive'
    ],
    correctAnswer: 3,
    explanation: 'Amazon S3 Glacier Deep Archive is Amazon S3\'s lowest-cost storage tier. It is designed for long-term retention of data that is accessed once or twice a year, with default retrieval times of 12 hours for standard retrieval.'
  },
  {
    id: 'quiz-3',
    category: 'Security',
    question: 'According to the AWS Shared Responsibility Model, which security task is the sole responsibility of the customer when running an Amazon EC2 instance?',
    options: [
      'Physical data center facility security and hardware maintenance',
      'Decommissioning old storage disk drives in compliance with DoD standards',
      'Patching the guest operating system and configuring instance firewall rules',
      'Virtualization layer hypervisor updates'
    ],
    correctAnswer: 2,
    explanation: 'Under the Shared Responsibility Model, AWS manages security "OF" the cloud (hardware, hypervisor, facilities), while the customer is responsible for security "IN" the cloud (guest OS patches, security group firewalls, IAM permissions, and user data).'
  },
  {
    id: 'quiz-4',
    category: 'Networking',
    question: 'What is the primary difference between an AWS Security Group and a Network Access Control List (NACL)?',
    options: [
      'Security Groups operate at the subnet level; NACLs operate at the instance level',
      'Security Groups are stateful (return traffic is automatically allowed); NACLs are stateless (rules must be defined for inbound and outbound)',
      'Security Groups can only block traffic; NACLs can only allow traffic',
      'Security Groups require an Elastic IP; NACLs work with private IPs only'
    ],
    correctAnswer: 1,
    explanation: 'Security Groups are stateful firewalls attached at the network interface (instance) level: if inbound traffic is allowed, outbound response traffic is automatically allowed regardless of outbound rules. In contrast, NACLs are stateless and operate at the subnet boundary, requiring explicit inbound and outbound rules.'
  },
  {
    id: 'quiz-5',
    category: 'Database',
    question: 'A company needs a fully managed relational database that provides automated synchronous replication to a standby instance in a different Availability Zone for high availability. What should they configure?',
    options: [
      'Amazon RDS Multi-AZ Deployment',
      'Amazon RDS Read Replica in the same AZ',
      'Amazon DynamoDB Global Tables',
      'Amazon ElastiCache Redis Cluster'
    ],
    correctAnswer: 0,
    explanation: 'Amazon RDS Multi-AZ deployments provision and maintain a synchronous standby replica in a different Availability Zone. In the event of planned maintenance or unplanned outages, RDS automatically fails over to the standby instance with minimal disruption.'
  },
  {
    id: 'quiz-6',
    category: 'Compute',
    question: 'Which AWS service executes code strictly in response to events, automatically scales from zero to thousands of concurrent requests, and bills only for runtime consumed?',
    options: [
      'AWS Elastic Beanstalk',
      'Amazon EC2 Reserved Instances',
      'AWS Lambda',
      'AWS CloudFormation'
    ],
    correctAnswer: 2,
    explanation: 'AWS Lambda is a serverless event-driven compute platform that executes code in response to events (HTTP requests, S3 uploads, DynamoDB events) without managing servers. Billing is calculated in millisecond intervals of actual execution duration.'
  },
  {
    id: 'quiz-7',
    category: 'Management',
    question: 'Which AWS tool continuously monitors and audits your AWS account for compliance with governance, operational auditing, and risk assessment standards by recording API calls?',
    options: [
      'Amazon CloudWatch',
      'AWS CloudTrail',
      'AWS Trusted Advisor',
      'AWS X-Ray'
    ],
    correctAnswer: 1,
    explanation: 'AWS CloudTrail records AWS API activity, tracking who made which API call, from which IP address, and at what time. Amazon CloudWatch focuses on metrics, logs, and alarms for performance and health monitoring.'
  },
  {
    id: 'quiz-8',
    category: 'Architecture',
    question: 'Which architectural pillar of the AWS Well-Architected Framework focuses on designing systems that can recover from infrastructure disruptions and dynamically acquire computing resources to meet demand?',
    options: [
      'Operational Excellence',
      'Cost Optimization',
      'Reliability',
      'Performance Efficiency'
    ],
    correctAnswer: 2,
    explanation: 'The Reliability pillar encompasses the ability of a workload to perform its intended function correctly and consistently when it’s expected to. This includes the ability to operate and test the workload through its total lifecycle and dynamically recover from failures.'
  }
];
