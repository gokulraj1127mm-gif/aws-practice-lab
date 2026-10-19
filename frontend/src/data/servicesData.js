export const servicesData = [
  {
    id: 'fundamentals',
    name: 'Cloud Fundamentals',
    fullName: 'AWS Cloud Fundamentals & Global Infrastructure',
    category: 'Architecture',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    iconName: 'Globe',
    summary: 'The underlying physical infrastructure of AWS including Regions, Availability Zones, Edge Locations, and Shared Responsibility.',
    description: 'AWS Global Infrastructure is the foundation of cloud computing, consisting of geographic Regions with multiple isolated, physically separated Availability Zones (AZs) connected with low-latency private networking, plus Points of Presence worldwide.',
    features: [
      '30+ Geographic Regions worldwide',
      '100+ Availability Zones with redundant power and networking',
      '400+ Edge Locations for CloudFront caching',
      'Shared Responsibility Model (Security OF vs IN the Cloud)',
      'Well-Architected Framework: 6 Pillars of architectural excellence'
    ],
    useCases: [
      'Multi-AZ high availability deployments',
      'Global low-latency content delivery',
      'Data residency and compliance enforcement'
    ],
    beginnerTip: 'Deploy across at least two Availability Zones in a Region to achieve fault tolerance against data center failures.',
    cliSample: 'aws ec2 describe-regions --output table\naws ec2 describe-availability-zones --output table',
    labCount: 3
  },
  {
    id: 'ec2',
    name: 'Amazon EC2',
    fullName: 'Elastic Compute Cloud',
    category: 'Compute',
    badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-500/10',
    iconName: 'Server',
    summary: 'Secure and resizable compute capacity in the cloud. Launch virtual server instances on-demand.',
    description: 'Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the AWS Cloud. Using Amazon EC2 eliminates your need to invest in hardware up front, so you can develop and deploy applications faster.',
    features: [
      'Configurable instance types (t2.micro, t3.small, m5.large)',
      'Custom Amazon Machine Images (Amazon Linux, Ubuntu, Windows)',
      'Security Groups for stateful instance-level firewall rules',
      'Elastic IP addresses for static public IPv4 allocations',
      'EBS (Elastic Block Store) persistent block volume attachments'
    ],
    useCases: [
      'Web and application hosting',
      'Batch processing and scientific compute',
      'Enterprise backend services and APIs'
    ],
    beginnerTip: 'Always choose the Free Tier eligible t2.micro or t3.micro when starting out, and set up a budget alert.',
    cliSample: 'aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --count 1',
    labCount: 5
  },
  {
    id: 's3',
    name: 'Amazon S3',
    fullName: 'Simple Storage Service',
    category: 'Storage',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    iconName: 'Database',
    summary: 'Industry-leading object storage built to retrieve any amount of data from anywhere with 99.999999999% durability.',
    description: 'Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. Store static assets, data lakes, and backup archives effortlessly.',
    features: [
      'Globally unique bucket namespace with regional storage',
      'Object versioning for recovery from accidental overwrites/deletes',
      'Bucket Policies and Access Control Lists (ACLs) for granular permissions',
      'S3 Static Website Hosting for HTML, CSS, and SPA apps',
      'Lifecycle policies for automatic transition to Glacier storage'
    ],
    useCases: [
      'Static website hosting & media CDN origins',
      'Data backup, disaster recovery, and compliance archiving',
      'Big Data analytics lakes'
    ],
    beginnerTip: 'Bucket names must be globally unique across all AWS accounts worldwide. Use all-lowercase letters and hyphens.',
    cliSample: 'aws s3 mb s3://my-unique-practice-bucket-2026\naws s3 cp index.html s3://my-unique-practice-bucket-2026/',
    labCount: 5
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    fullName: 'Identity and Access Management',
    category: 'Security',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    iconName: 'Shield',
    summary: 'Securely manage identities, users, groups, and permissions to access your AWS resources with least privilege.',
    description: 'AWS Identity and Access Management (IAM) helps you securely control access to AWS services and resources. With IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.',
    features: [
      'IAM Roles for service delegation (EC2, Lambda) without static keys',
      'Granular JSON policy documents (Effect, Action, Resource, Condition)',
      'Multi-Factor Authentication (MFA) enforcement for root and users',
      'Permission boundaries and attribute-based access control (ABAC)',
      'Access Analyzer to mathematically identify unintended public access'
    ],
    useCases: [
      'Enforcing least-privilege administrative boundaries',
      'Granting EC2 instances access to S3 without embedding credentials',
      'Federating Single Sign-On (SSO) with enterprise identity providers'
    ],
    beginnerTip: 'Never generate access keys for the root user. Create a dedicated admin IAM user and lock root away with hardware MFA.',
    cliSample: 'aws iam create-user --user-name cloud-trainee\naws iam attach-user-policy --user-name cloud-trainee --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess',
    labCount: 4
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    fullName: 'Virtual Private Cloud',
    category: 'Networking',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    iconName: 'Globe',
    summary: 'Isolated cloud network partitions with custom subnets, route tables, network ACLs, and Internet Gateways.',
    description: 'Amazon Virtual Private Cloud (Amazon VPC) gives you complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.',
    features: [
      'IPv4 CIDR block allocation (e.g., 10.0.0.0/16)',
      'Public subnets (Internet Gateway) and Private subnets (NAT Gateway)',
      'Stateless Network Access Control Lists (NACLs) at the subnet boundary',
      'VPC Peering and Transit Gateway for inter-VPC routing',
      'VPC Flow Logs for network traffic auditing and threat detection'
    ],
    useCases: [
      'Multi-tier web application isolation (DMZ vs private database)',
      'Hybrid on-premises connectivity via AWS Direct Connect and VPN',
      'Enterprise regulatory perimeter controls'
    ],
    beginnerTip: 'AWS reserves 5 IP addresses in every subnet (first 4 and last 1). Plan your CIDR blocks accordingly.',
    cliSample: 'aws ec2 create-vpc --cidr-block 10.0.0.0/16\naws ec2 create-subnet --vpc-id vpc-xxxx --cidr-block 10.0.1.0/24',
    labCount: 4
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    fullName: 'Serverless Compute Service',
    category: 'Serverless',
    badgeColor: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
    iconName: 'Cpu',
    summary: 'Run code without provisioning or managing servers. Pay strictly for compute time consumed per millisecond.',
    description: 'AWS Lambda is an event-driven serverless compute platform. Run code for virtually any type of application or backend service with zero administration, automatic scaling from zero to thousands of concurrent requests.',
    features: [
      'Native runtimes: Node.js, Python, Java, Go, .NET, Ruby, and custom OCI container images',
      'Automatic scaling based on incoming request velocity',
      'Built-in integration with S3 events, DynamoDB streams, SQS, API Gateway, and EventBridge',
      'Configurable memory allocation from 128 MB to 10,240 MB',
      'Provisioned Concurrency for consistent double-digit millisecond latency'
    ],
    useCases: [
      'Real-time image thumbnail generation on S3 upload',
      'Serverless microservice REST APIs with API Gateway',
      'Event-driven asynchronous message stream processing'
    ],
    beginnerTip: 'Initialize heavy database connections outside the handler function so they are reused across invocations (execution context reuse).',
    cliSample: 'aws lambda create-function --function-name imageProcessor --runtime nodejs20.x --role arn:aws:iam::xxxx:role/service-role --handler index.handler --zip-file fileb://function.zip',
    labCount: 4
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    fullName: 'Relational Database Service',
    category: 'Database',
    badgeColor: 'border-blue-600/30 text-blue-400 bg-blue-600/10',
    iconName: 'Database',
    summary: 'Managed relational databases with automated backups, Multi-AZ high availability, and read replicas.',
    description: 'Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administrative tasks.',
    features: [
      'Six engines: Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle, SQL Server',
      'Multi-AZ synchronous replication for automated disaster failover in < 60s',
      'Asynchronous Read Replicas for scaling read-heavy query performance',
      'Automated daily snapshots and point-in-time recovery (PITR) up to 35 days',
      'Storage auto-scaling and encryption at rest with AWS KMS'
    ],
    useCases: [
      'Enterprise transactional ERP, CRM, and e-commerce platforms',
      'Relational data models requiring strict ACID compliance',
      'Migrating existing on-premise MySQL/PostgreSQL workloads to cloud'
    ],
    beginnerTip: 'Keep your RDS database in private subnets with no public IP address. Connect through an application server or bastion host.',
    cliSample: 'aws rds create-db-instance --db-instance-identifier my-mysql-db --db-instance-class db.t3.micro --engine mysql --master-username admin --allocated-storage 20',
    labCount: 3
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    fullName: 'Fully Managed NoSQL Database',
    category: 'Database',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    iconName: 'Layers',
    summary: 'Fast, flexible NoSQL database service for single-digit millisecond performance at any scale.',
    description: 'Amazon DynamoDB is a fully managed, serverless, key-value and document database that delivers single-digit millisecond performance at any scale with built-in security, backup, and in-memory caching.',
    features: [
      'Key-value and document data models',
      'On-Demand and Provisioned capacity modes',
      'Global Tables for multi-Region active-active replication',
      'DynamoDB Accelerator (DAX) for microsecond in-memory caching',
      'Time to Live (TTL) for automated item expiration'
    ],
    useCases: [
      'Mobile apps, gaming leaderboards, and session stores',
      'High-velocity IoT sensor data ingestion',
      'E-commerce shopping carts and user profiles'
    ],
    beginnerTip: 'Carefully design your Partition Key to distribute read/write traffic evenly across physical storage partitions.',
    cliSample: 'aws dynamodb create-table --table-name UserSessions --attribute-definitions AttributeName=UserId,AttributeType=S --key-schema AttributeName=UserId,KeyType=HASH --billing-mode PAY_PER_REQUEST',
    labCount: 3
  },
  {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    fullName: 'Observability & Monitoring Service',
    category: 'Management',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    iconName: 'Activity',
    summary: 'Monitor AWS resources, capture logs, visualize system metrics, and automate alarm notifications.',
    description: 'Amazon CloudWatch collects monitoring and operational data in the form of logs, metrics, and events. Gain a unified view of AWS resources, applications, and services running on AWS and on-premises servers.',
    features: [
      'CloudWatch Metrics for CPU, Disk I/O, Network, and custom business data',
      'CloudWatch Alarms triggering SNS email notifications or EC2 Auto Scaling',
      'CloudWatch Logs Insights for interactive SQL-like log analysis',
      'Custom dashboards with customizable graph widgets',
      'EventBridge integration for automated remediation actions'
    ],
    useCases: [
      'EC2 CPU utilization alarms triggering auto-healing or scaling',
      'Aggregated application error logging and real-time alerts',
      'Billing & cost alarm notifications when monthly threshold is reached'
    ],
    beginnerTip: 'Enable billing alerts in CloudWatch so you receive an email before accidental usage costs escalate.',
    cliSample: 'aws cloudwatch put-metric-alarm --alarm-name "HighCPU" --metric-name CPUUtilization --namespace AWS/EC2 --threshold 80',
    labCount: 3
  },
  {
    id: 'cloudtrail',
    name: 'AWS CloudTrail',
    fullName: 'Governance, Compliance & Operational Auditing',
    category: 'Auditing',
    badgeColor: 'border-amber-600/30 text-amber-500 bg-amber-600/10',
    iconName: 'Shield',
    summary: 'Track user activity and API usage across your entire AWS infrastructure for compliance and forensic auditing.',
    description: 'AWS CloudTrail monitors and records account activity across your AWS infrastructure, giving you control over storage, analysis, and remediation actions.',
    features: [
      'Event History recording all management API actions for 90 days free',
      'Multi-Region Trails delivering gzip logs to encrypted S3 buckets',
      'Log File Integrity Validation with SHA-256 digital digest chains',
      'CloudTrail Insights detecting anomalous operational API spikes',
      'CloudTrail Lake for serverless SQL querying of audit logs'
    ],
    useCases: [
      'Security incident forensics and root cause analysis',
      'Regulatory compliance auditing (SOC 2, PCI DSS, HIPAA)',
      'Automated detection of unauthorized configuration alterations'
    ],
    beginnerTip: 'Always enable a multi-region trail that sends logs to an S3 bucket with Object Lock enabled to prevent log deletion.',
    cliSample: 'aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=RunInstances',
    labCount: 2
  },
  {
    id: 'elb',
    name: 'Elastic Load Balancing',
    fullName: 'High Availability Traffic Distribution (ALB / NLB)',
    category: 'Networking',
    badgeColor: 'border-cyan-600/30 text-cyan-400 bg-cyan-600/10',
    iconName: 'Globe',
    summary: 'Automatically distribute incoming application traffic across multiple targets in multiple Availability Zones.',
    description: 'Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and Lambda functions.',
    features: [
      'Application Load Balancer (ALB) operating at Layer 7 (HTTP/HTTPS)',
      'Network Load Balancer (NLB) operating at Layer 4 (ultra-low latency TCP/UDP)',
      'Gateway Load Balancer (GWLB) for scaling third-party virtual security appliances',
      'Target Groups with automated health checks',
      'SSL/TLS termination and Server Name Indication (SNI) support'
    ],
    useCases: [
      'Distributing web traffic across Auto Scaling instance fleets',
      'Microservices path-based routing (/api vs /static)',
      'Canary releases with weighted target groups'
    ],
    beginnerTip: 'Ensure your load balancer subnets span at least two Availability Zones to enable high availability.',
    cliSample: 'aws elbv2 describe-load-balancers --output table',
    labCount: 3
  },
  {
    id: 'autoscaling',
    name: 'EC2 Auto Scaling',
    fullName: 'Automated Compute Elasticity & Fleet Management',
    category: 'Compute',
    badgeColor: 'border-emerald-600/30 text-emerald-400 bg-emerald-600/10',
    iconName: 'RefreshCw',
    summary: 'Maintain application availability and automatically add or remove EC2 instances according to conditions.',
    description: 'Amazon EC2 Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost.',
    features: [
      'Launch Templates with versioning and mixed instance types',
      'Target Tracking, Step Scaling, and Scheduled Scaling policies',
      'Predictive Scaling powered by machine learning algorithms',
      'Lifecycle Hooks for custom startup/teardown automation',
      'Warm Pools for sub-minute rapid scale-out events'
    ],
    useCases: [
      'Handling unpredictable web traffic spikes seamlessly',
      'Spot instance cost optimization with On-Demand base capacity',
      'Automated health replacement of crashed servers'
    ],
    beginnerTip: 'Use Target Tracking scaling policies tied to ALB RequestCountPerTarget for responsive web scaling.',
    cliSample: 'aws autoscaling describe-auto-scaling-groups --output table',
    labCount: 3
  },
  {
    id: 'route53',
    name: 'Amazon Route 53',
    fullName: 'Scalable Cloud Domain Name System (DNS)',
    category: 'Networking',
    badgeColor: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
    iconName: 'Globe',
    summary: 'Highly available and scalable cloud DNS web service designed for 100% SLA availability.',
    description: 'Amazon Route 53 effectively connects user requests to infrastructure running in AWS—such as Amazon EC2 instances, Elastic Load Balancing load balancers, or Amazon S3 buckets—and can also be used to route users to infrastructure outside of AWS.',
    features: [
      'Public and Private Hosted Zones',
      'Routing policies: Simple, Weighted, Latency, Failover, Geolocation, and Geoproximity',
      'DNS Health Checks with automated failover routing',
      'Alias records pointing directly to AWS resources with zero query fees',
      'Domain registration and DNSSEC support'
    ],
    useCases: [
      'Global multi-region disaster recovery DNS failover',
      'Internal split-view DNS for private corporate VPCs',
      'Geo-targeted content delivery'
    ],
    beginnerTip: 'Always use Route 53 Alias records instead of standard CNAMEs when pointing your root apex domain (example.com) to an ALB or CloudFront distribution.',
    cliSample: 'aws route53 list-hosted-zones --output table',
    labCount: 2
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    fullName: 'Fast, Highly Secure Global Content Delivery Network (CDN)',
    category: 'Content Delivery',
    badgeColor: 'border-purple-600/30 text-purple-400 bg-purple-600/10',
    iconName: 'Globe',
    summary: 'Securely deliver content, video, applications, and APIs to users globally with low latency and high transfer speeds.',
    description: 'Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment.',
    features: [
      '400+ globally distributed Points of Presence (PoPs)',
      'Origin Access Control (OAC) securing S3 origins',
      'Field-level encryption and automated AWS Shield Standard DDoS defense',
      'Edge compute with CloudFront Functions and Lambda@Edge',
      'Cache Policies and Origin Request Policies for fine-grained TTLs'
    ],
    useCases: [
      'Accelerating static and dynamic website delivery worldwide',
      'Secure video on-demand (VOD) and live media streaming',
      'API acceleration and edge authentication'
    ],
    beginnerTip: 'Use CloudFront Invalidation with `/*` only when necessary, as the first 1,000 paths per month are free, with per-path charges thereafter.',
    cliSample: 'aws cloudfront list-distributions --output table',
    labCount: 2
  },
  {
    id: 'containers',
    name: 'Amazon ECS & EKS',
    fullName: 'Managed Container Orchestration (Docker & Kubernetes)',
    category: 'Containers',
    badgeColor: 'border-indigo-600/30 text-indigo-400 bg-indigo-600/10',
    iconName: 'Box',
    summary: 'Deploy, manage, and scale containerized applications using AWS Fargate, ECS, or managed Kubernetes (EKS).',
    description: 'Amazon Elastic Container Service (Amazon ECS) and Amazon Elastic Kubernetes Service (Amazon EKS) make it easy to deploy, manage, and scale containerized applications on AWS using serverless AWS Fargate or EC2 instances.',
    features: [
      'AWS Fargate serverless compute engine for containers',
      'Amazon ECR managed container image registry with vulnerability scans',
      'IAM Roles for Service Accounts (IRSA) for pod-level security',
      'awsvpc networking mode granting native VPC IP addresses to containers',
      'Automated Kubernetes control plane multi-AZ management'
    ],
    useCases: [
      'Modern microservices architecture deployment',
      'Batch data processing pipelines with containerized tasks',
      'Enterprise Kubernetes standardization on cloud infrastructure'
    ],
    beginnerTip: 'Start with AWS Fargate launch type to avoid provisioning, patching, and scaling underlying EC2 virtual machine clusters.',
    cliSample: 'aws ecs list-clusters --output table',
    labCount: 3
  },
  {
    id: 'beanstalk',
    name: 'AWS Elastic Beanstalk',
    fullName: 'Platform as a Service (PaaS) for Rapid Web Deployment',
    category: 'PaaS',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    iconName: 'Layers',
    summary: 'Deploy and scale web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker.',
    description: 'AWS Elastic Beanstalk is an easy-to-use Platform as a Service (PaaS) for deploying and scaling web applications. You simply upload your code and Elastic Beanstalk automatically handles deployment, capacity provisioning, load balancing, and health monitoring.',
    features: [
      'Web Server and Worker environment tiers',
      'Deployment policies: All at Once, Rolling, Rolling with additional batch, Immutable, and Traffic Splitting',
      'Custom configuration via `.ebextensions` config files',
      'Zero-downtime Blue/Green deployments via CNAME swapping',
      'Enhanced Health Reporting with granular HTTP latency tracking'
    ],
    useCases: [
      'Fast developer prototyping and web app production launch',
      'Background worker jobs powered by SQS queues and `sqsd` daemon',
      'Zero-downtime canary software updates'
    ],
    beginnerTip: 'Always provision your production RDS database outside of Elastic Beanstalk so it is not deleted when the environment terminates.',
    cliSample: 'eb init\neb create my-env --instance_type t3.micro',
    labCount: 2
  },
  {
    id: 'cloudformation',
    name: 'AWS CloudFormation',
    fullName: 'Infrastructure as Code (IaC) Automation',
    category: 'IaC',
    badgeColor: 'border-orange-600/30 text-orange-400 bg-orange-600/10',
    iconName: 'FileCode',
    summary: 'Model, provision, and manage AWS and third-party resources using declarative JSON or YAML templates.',
    description: 'AWS CloudFormation allows you to model your entire infrastructure and application stack in a text file. A CloudFormation template describes your desired resources and their dependencies so you can launch and configure them together as a stack.',
    features: [
      'Declarative templates in JSON and YAML syntax',
      'Change Sets for previewing proposed infrastructure alterations before execution',
      'Drift Detection to identify out-of-band manual configuration changes',
      'StackSets for cross-account and cross-region stack deployments',
      'Custom Resources powered by AWS Lambda'
    ],
    useCases: [
      'Automated standardized multi-tier VPC environment deployment',
      'CI/CD pipeline infrastructure deployment and teardown',
      'Disaster recovery rapid replication of production environments'
    ],
    beginnerTip: 'Use `DeletionPolicy: Retain` on critical resources like production databases and S3 buckets to prevent accidental deletion during stack teardowns.',
    cliSample: 'aws cloudformation create-stack --stack-name my-vpc-stack --template-body file://vpc.yaml',
    labCount: 3
  },
  {
    id: 'cli',
    name: 'AWS CLI',
    fullName: 'Command Line Interface',
    category: 'Developer Tools',
    badgeColor: 'border-slate-400/30 text-slate-300 bg-slate-500/10',
    iconName: 'Terminal',
    summary: 'Unified command line tool to manage and automate your AWS services through scripts and shell commands.',
    description: 'The AWS Command Line Interface (AWS CLI) is an open-source tool that enables you to interact with AWS services using commands in your command-line shell.',
    features: [
      'Named configuration profiles for managing multiple environments (dev/prod)',
      'Cross-platform support (Windows PowerShell, macOS Terminal, Linux Bash)',
      'JMESPath JSON query filtering with --query and --output table/json',
      'Automated pagination and batch operations',
      'Seamless shell script integration for CI/CD pipelines'
    ],
    useCases: [
      'Automating daily server snapshots and backups',
      'Bulk uploading assets to S3 in CI/CD build scripts',
      'Querying resource inventory across multiple AWS regions'
    ],
    beginnerTip: 'Use --dry-run on EC2 CLI commands to verify permission policies without actually launching or altering resources.',
    cliSample: 'aws configure --profile practice-user\naws sts get-caller-identity --output table',
    labCount: 2
  },
  {
    id: 'ssm',
    name: 'AWS Systems Manager',
    fullName: 'Centralized Operations Hub & Fleet Management',
    category: 'Operations',
    badgeColor: 'border-violet-600/30 text-violet-400 bg-violet-600/10',
    iconName: 'Sliders',
    summary: 'Gain operational insights and take action on AWS and on-premises resources safely at scale.',
    description: 'AWS Systems Manager is an operations hub for your AWS applications and resources and a secure end-to-end management solution for hybrid and multicloud environments.',
    features: [
      'Session Manager for secure browser terminal login without SSH port 22',
      'Parameter Store for hierarchical configuration and KMS-encrypted secrets',
      'Patch Manager for automated OS security update baselines',
      'Run Command for remote fleet script execution at scale without SSH',
      'State Manager for enforcing desired configuration compliance'
    ],
    useCases: [
      'Passwordless, bastion-free SSH/RDP server administration',
      'Zero-downtime fleet patching during maintenance windows',
      'Centralized secrets management for microservices'
    ],
    beginnerTip: 'Attach the `AmazonSSMManagedInstanceCore` IAM policy to EC2 instance profiles to automatically enable Session Manager.',
    cliSample: 'aws ssm start-session --target i-0123456789abcdef0',
    labCount: 3
  },
  {
    id: 'budgets',
    name: 'AWS Budgets',
    fullName: 'Cost Planning, Spending Limits & Anomaly Alerts',
    category: 'FinOps',
    badgeColor: 'border-emerald-600/30 text-emerald-400 bg-emerald-600/10',
    iconName: 'DollarSign',
    summary: 'Plan, monitor, and enforce cloud spending limits with automated actual and forecasted threshold alerts.',
    description: 'AWS Budgets enables you to set custom budgets that alert you when your costs or usage exceed (or are forecasted to exceed) your budgeted amount.',
    features: [
      'Actual and Forecasted cost threshold notifications via SNS and email',
      'AWS Budgets Actions for automated remediation (stopping EC2/RDS instances)',
      'Usage budgets tracking hours, GBs, and API requests against Free Tier',
      'Savings Plans and Reserved Instance utilization/coverage tracking',
      'Tag-based cost allocation filtering by team, environment, or project'
    ],
    useCases: [
      'Preventing unexpected cloud bill shocks during learning and prototyping',
      'Departmental chargeback tracking using Cost Allocation Tags',
      'Enforcing hard spending caps on non-production development accounts'
    ],
    beginnerTip: 'Always create a $10.00 actual and forecasted monthly budget alert on day one of opening a new AWS account.',
    cliSample: 'aws budgets describe-budgets --account-id 123456789012 --output table',
    labCount: 2
  }
];
