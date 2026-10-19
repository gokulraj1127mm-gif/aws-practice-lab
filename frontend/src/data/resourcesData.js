export const resourcesData = {
  documentationLinks: [
    {
      title: 'AWS Documentation Central',
      description: 'Find user guides, developer references, tutorials, API documentation, and SDK manuals.',
      url: 'https://docs.aws.amazon.com/',
      category: 'Official Docs',
      badge: 'Official'
    },
    {
      title: 'AWS Well-Architected Framework',
      description: 'Architectural best practices across the 6 pillars: Operational Excellence, Security, Reliability, Performance, Cost Optimization, and Sustainability.',
      url: 'https://aws.amazon.com/architecture/well-architected/',
      category: 'Architecture',
      badge: 'Best Practice'
    },
    {
      title: 'AWS Free Tier Usage Details',
      description: 'Explore 12 months free, always free, and short-term trial tiers to build cloud projects without incurring unwanted expenses.',
      url: 'https://aws.amazon.com/free/',
      category: 'Pricing',
      badge: 'Free Tier'
    },
    {
      title: 'AWS CLI Command Reference v2',
      description: 'Complete alphabetical command syntax dictionary for every AWS service CLI command.',
      url: 'https://awscli.amazonaws.com/v2/documentation/api/latest/index.html',
      category: 'CLI & Tools',
      badge: 'Reference'
    },
    {
      title: 'AWS Certified Cloud Practitioner (CLF-C02) Guide',
      description: 'Official exam guide, domain weighting breakdown, sample questions, and practice resources.',
      url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
      category: 'Certification',
      badge: 'Study Guide'
    },
    {
      title: 'AWS Solutions Library & Reference Architectures',
      description: 'Vetted reference architectures and CloudFormation/CDK blueprints created by AWS solutions architects.',
      url: 'https://aws.amazon.com/solutions/',
      category: 'Architecture',
      badge: 'Blueprints'
    }
  ],
  learningGuides: [
    {
      title: 'The Beginner Cloud Practitioner Roadmap (30 Days)',
      readTime: '8 min read',
      level: 'Beginner',
      summary: 'A structured 4-week roadmap to go from complete cloud novice to certified AWS Cloud Practitioner.',
      keyTakeaways: [
        'Week 1: Cloud Concepts & Shared Responsibility Model',
        'Week 2: Core Compute (EC2, Lambda) & Storage (S3, EBS, EFS)',
        'Week 3: Networking (VPC, Subnets, Security Groups) & Databases (RDS, DynamoDB)',
        'Week 4: Cloud Security (IAM, KMS), Pricing, Support Plans & Mock Exams'
      ]
    },
    {
      title: 'EC2 vs AWS Lambda: The Architectural Decision Matrix',
      readTime: '6 min read',
      level: 'Intermediate',
      summary: 'When to provision virtual instances with EC2 versus running event-driven functions on AWS Lambda.',
      keyTakeaways: [
        'Choose EC2: Predictable steady-state 24/7 traffic, legacy custom binaries, long-running processes > 15 minutes, stateful WebSocket connections.',
        'Choose Lambda: Spiky or intermittent event traffic, tasks completing in under 15 minutes, rapid prototyping, zero server maintenance requirements.'
      ]
    },
    {
      title: 'VPC Subnet Math & IP CIDR Allocation Cheat Sheet',
      readTime: '5 min read',
      level: 'Intermediate',
      summary: 'Demystifying subnet sizing and understanding the 5 reserved IP addresses in AWS subnets.',
      keyTakeaways: [
        '/16 = 65,536 IPs (Ideal for entire VPC)',
        '/24 = 256 IPs - 5 AWS reserved = 251 usable IPs per subnet',
        'Reserved IPs: .0 (Network), .1 (VPC Router), .2 (AWS DNS), .3 (Future use), .255 (Broadcast)'
      ]
    }
  ],
  securityBestPractices: [
    {
      title: 'Enforce MFA on AWS Root & IAM Administrative Users',
      category: 'Identity',
      priority: 'Critical',
      description: 'Hardware security keys (FIDO) or virtual authenticator apps (TOTP) must be enforced on all privileged accounts. Never generate long-term access keys for the root account.'
    },
    {
      title: 'Apply the Principle of Least Privilege (PoLP)',
      category: 'Permissions',
      priority: 'Critical',
      description: 'Grant users and roles only the minimum permissions required to perform their daily duties. Avoid assigning broad policies like AdministratorAccess or PowerUserAccess.'
    },
    {
      title: 'Use IAM Roles for EC2 & Lambda Instead of Hardcoded API Keys',
      category: 'Compute Security',
      priority: 'High',
      description: 'Attach IAM Instance Profiles and Execution Roles so AWS automatically provides rotating temporary credentials through the instance metadata service (IMDSv2).'
    },
    {
      title: 'Keep S3 Block Public Access Enabled Globally',
      category: 'Storage Security',
      priority: 'Critical',
      description: 'Activate S3 Block Public Access at the account level. Only override specific bucket policies when intentionally serving static public web content.'
    },
    {
      title: 'Encrypt All Data at Rest and in Transit',
      category: 'Data Protection',
      priority: 'High',
      description: 'Enable default encryption on S3 buckets (SSE-S3 or SSE-KMS), encrypt EBS volumes during launch, and enforce TLS 1.3 for all web application endpoints.'
    }
  ],
  troubleshootingTips: [
    {
      problem: 'Cannot Connect to EC2 Instance via SSH (Connection Timed Out)',
      causes: [
        'Security Group does not have port 22 open from your current public IP address.',
        'EC2 instance is in a private subnet with no Internet Gateway or route table entry.',
        'No public IPv4 address was assigned to the instance at launch time.'
      ],
      solution: 'Check your current public IP at checkip.amazonaws.com and update your Security Group inbound rule for port 22. Verify that the subnet route table points 0.0.0.0/0 to an attached Internet Gateway.'
    },
    {
      problem: 'Amazon S3 Returns 403 Forbidden on Uploaded Website Files',
      causes: [
        'S3 Block Public Access is blocking public bucket policies.',
        'The bucket policy has a syntax error or is missing the /* wildcard on the resource ARN.',
        'User is accessing the REST API endpoint URL rather than the S3 Website Hosting endpoint.'
      ],
      solution: 'Ensure "Block public access (bucket settings)" has BlockPublicPolicy disabled. Ensure the policy Resource is "arn:aws:s3:::your-bucket-name/*", and use the http://<bucket>.s3-website.<region>.amazonaws.com URL.'
    },
    {
      problem: 'Application Cannot Connect to Amazon RDS Database (Connection Timeout)',
      causes: [
        'RDS Security Group does not allow inbound database port (3306 for MySQL, 5432 for Postgres) from the application security group.',
        'RDS DB Subnet Group contains public subnets while database is private, or VPC peering/routing is missing.'
      ],
      solution: 'Authorize inbound database traffic in the RDS Security Group with the Web Server Security Group ID as the source. Confirm the application and database reside in the same VPC or have appropriate peering routes.'
    },
    {
      problem: 'AWS Lambda Throws "Task Timed Out After 3.00 Seconds"',
      causes: [
        'Default Lambda timeout is 3 seconds, which is insufficient for network requests or cold database connections.',
        'Database connections are left hanging or DNS resolution is blocked inside a VPC.'
      ],
      solution: 'Increase the Lambda timeout in Configuration > General configuration to 10-30 seconds. If Lambda is inside a VPC, ensure private subnets have NAT Gateway access to reach external internet endpoints.'
    }
  ],
  cliCheatSheet: [
    { command: 'aws configure', description: 'Interactive prompt to set Access Key, Secret Key, Region, and Output format' },
    { command: 'aws sts get-caller-identity', description: 'Verify current logged-in AWS account ID, IAM User, and ARN' },
    { command: 'aws ec2 describe-instances --query "Reservations[*].Instances[*].[InstanceId,State.Name]" --output table', description: 'List all EC2 instance IDs and current states in tabular format' },
    { command: 'aws s3 ls', description: 'List all S3 buckets in your AWS account' },
    { command: 'aws s3 sync ./dist s3://my-bucket --delete', description: 'Synchronize a local build directory with an S3 bucket and delete removed files' },
    { command: 'aws iam list-users --output table', description: 'List all IAM users in your AWS account' },
    { command: 'aws lambda list-functions --query "Functions[*].[FunctionName,Runtime]"', description: 'Display all deployed Lambda functions and their runtime versions' }
  ]
};
