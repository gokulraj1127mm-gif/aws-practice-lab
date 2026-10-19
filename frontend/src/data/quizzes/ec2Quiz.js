// EC2 Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const ec2Quiz = {
  id: 'ec2',
  service: 'Amazon EC2',
  icon: 'Server',
  color: 'orange',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'ec2-b1', level: 'beginner',
      question: 'What does EC2 stand for?',
      options: ['Elastic Container Cloud', 'Elastic Compute Cloud', 'Extended Cloud Compute', 'Enterprise Compute Cluster'],
      correct: 1,
      explanation: 'EC2 stands for Elastic Compute Cloud — AWS\'s flagship virtual server (instance) service providing resizable compute capacity.'
    },
    {
      id: 'ec2-b2', level: 'beginner',
      question: 'Which EC2 instance type is FREE TIER eligible for new AWS accounts?',
      options: ['m5.large', 't3.medium', 't2.micro', 'c5.xlarge'],
      correct: 2,
      explanation: 'The t2.micro instance (1 vCPU, 1 GB RAM) is free tier eligible — up to 750 hours/month for the first 12 months on a new account.'
    },
    {
      id: 'ec2-b3', level: 'beginner',
      question: 'What is an Amazon Machine Image (AMI)?',
      options: ['A monitoring tool for EC2', 'A template with OS, application server, and application configuration used to launch instances', 'An encryption service for EC2 data', 'A network policy file'],
      correct: 1,
      explanation: 'An AMI provides the information required to launch an instance. It includes an operating system, application server, and applications, acting as a bootable snapshot template.'
    },
    {
      id: 'ec2-b4', level: 'beginner',
      question: 'Which EC2 storage type is temporary and is lost when an instance stops or terminates?',
      options: ['Amazon EBS Volume', 'Amazon S3 Bucket', 'Instance Store (Ephemeral Storage)', 'Amazon EFS'],
      correct: 2,
      explanation: 'Instance store volumes are physically attached to the host computer. Data is lost if the instance is stopped, hibernated, or terminated — ideal only for temp cache/buffer data.'
    },
    {
      id: 'ec2-b5', level: 'beginner',
      question: 'What is a Security Group in EC2?',
      options: ['A VPN connection between on-premises and AWS', 'A stateful virtual firewall that controls inbound and outbound traffic for instances', 'An IAM permission boundary', 'A load balancer configuration policy'],
      correct: 1,
      explanation: 'A Security Group acts as a stateful virtual firewall for instances, controlling both inbound and outbound traffic. Rules are stateful, so allowed inbound traffic automatically allows the return outbound response.'
    },
    {
      id: 'ec2-b6', level: 'beginner',
      question: 'Which purchasing option provides the biggest discount (up to 90%) but can be interrupted by AWS at any time?',
      options: ['On-Demand Instances', 'Reserved Instances', 'Spot Instances', 'Dedicated Hosts'],
      correct: 2,
      explanation: 'Spot Instances let you use spare EC2 capacity at up to 90% off On-Demand prices. AWS can reclaim them with a 2-minute warning when capacity is needed, making them ideal for fault-tolerant batch workloads.'
    },
    {
      id: 'ec2-b7', level: 'beginner',
      question: 'What does "stopping" an EC2 instance do (with EBS-backed storage)?',
      options: ['Permanently deletes the instance and all data', 'Shuts down the instance OS while retaining EBS volumes and IP association via Elastic IP', 'Terminates the instance and releases all resource IDs', 'Pauses billing for both compute and storage'],
      correct: 1,
      explanation: 'Stopping an EBS-backed instance shuts it down gracefully. EBS root volumes persist, Elastic IPs remain associated, but the public IPv4 address is released (unless using Elastic IP). You\'re billed only for EBS storage while stopped.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'ec2-i1', level: 'intermediate',
      question: 'Which EC2 feature allows you to run initialization scripts (e.g., install packages, configure software) when an instance first launches?',
      options: ['EC2 Instance Connect', 'AWS Systems Manager Run Command', 'User Data scripts', 'EC2 Launch Templates'],
      correct: 2,
      explanation: 'User Data scripts are shell scripts or cloud-init directives that run automatically on instance launch. They are used to bootstrap instances — installing packages, running updates, or starting services before the instance serves traffic.'
    },
    {
      id: 'ec2-i2', level: 'intermediate',
      question: 'Your application needs consistent network performance. Which EC2 feature should you enable?',
      options: ['Enhanced Networking (SR-IOV / ENA)', 'Placement Groups', 'Dedicated Tenancy', 'EC2 Hibernate'],
      correct: 0,
      explanation: 'Enhanced Networking uses SR-IOV (Single Root I/O Virtualization) and the Elastic Network Adapter (ENA) to provide higher packet-per-second performance, lower latency, and lower jitter compared to traditional virtualized networking.'
    },
    {
      id: 'ec2-i3', level: 'intermediate',
      question: 'A Cluster Placement Group is BEST suited for which use case?',
      options: ['Highly available production web servers across Availability Zones', 'High Performance Computing (HPC) requiring low-latency, high-throughput node communication', 'Cost-effective batch processing spread across hardware', 'Multi-region redundancy for a relational database'],
      correct: 1,
      explanation: 'Cluster Placement Groups pack instances close together on the same underlying hardware within a single AZ. This minimizes network latency between nodes and maximizes inter-instance throughput — ideal for HPC, ML training, and big data analytics.'
    },
    {
      id: 'ec2-i4', level: 'intermediate',
      question: 'What is the purpose of an EC2 Launch Template?',
      options: ['To create IAM roles for EC2 instances', 'To store instance configuration (AMI, instance type, key pair, SG) for re-use in Auto Scaling Groups and consistent deployments', 'To monitor EC2 network traffic', 'To configure EBS encryption policies'],
      correct: 1,
      explanation: 'An EC2 Launch Template saves a configuration blueprint for launching instances, including the AMI ID, instance type, security groups, key pair, user data, and more. They are required by Auto Scaling Groups and simplify fleet management.'
    },
    {
      id: 'ec2-i5', level: 'intermediate',
      question: 'Reserved Instances offer up to 75% discount. Which term and payment option provides the MAXIMUM discount?',
      options: ['1-year, No Upfront', '3-year, All Upfront', '1-year, All Upfront', '3-year, No Upfront'],
      correct: 1,
      explanation: 'A 3-year All Upfront Reserved Instance provides the maximum available discount — up to 75% compared to On-Demand pricing. The 1-year term and No Upfront options offer lower discounts.'
    },
    {
      id: 'ec2-i6', level: 'intermediate',
      question: 'Which EC2 storage type provides the HIGHEST IOPS performance for transactional databases?',
      options: ['gp2 (General Purpose SSD)', 'st1 (Throughput Optimized HDD)', 'sc1 (Cold HDD)', 'io2 Block Express (Provisioned IOPS SSD)'],
      correct: 3,
      explanation: 'io2 Block Express EBS volumes support up to 256,000 IOPS and 4,000 MB/s throughput with sub-millisecond latency. They are purpose-built for I/O-intensive database workloads like SAP HANA, Oracle, and Microsoft SQL Server.'
    },
    {
      id: 'ec2-i7', level: 'intermediate',
      question: 'What does EC2 Auto Scaling use to know WHEN to add or remove instances?',
      options: ['CloudTrail audit logs', 'CloudWatch Alarms based on scaling policies (target tracking, step, simple)', 'S3 event notifications', 'Route 53 health checks'],
      correct: 1,
      explanation: 'Auto Scaling Groups integrate with CloudWatch Alarms. When an alarm breaches a metric threshold (e.g., CPUUtilization > 70% for 5 minutes), scaling policies trigger to launch or terminate instances to maintain desired capacity and performance.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'ec2-a1', level: 'advanced',
      question: 'When using EC2 Instance Metadata Service v2 (IMDSv2), how does a process on the instance retrieve its IAM role credentials securely?',
      options: ['Directly querying the IAM API endpoint with an access key', 'Calling http://169.254.169.254 with a session-oriented token obtained via PUT request', 'Using AWS STS AssumeRole from the CLI with hardcoded credentials', 'Fetching credentials from AWS Secrets Manager with a Lambda function'],
      correct: 1,
      explanation: 'IMDSv2 requires a two-step process: first, a PUT request to http://169.254.169.254/latest/api/token with a TTL header creates a session token. Subsequent GET requests must include this token. This prevents SSRF attacks that could steal IAM credentials from misconfigured web apps.'
    },
    {
      id: 'ec2-a2', level: 'advanced',
      question: 'You need to migrate a running EC2 instance to a different host while keeping it running (no downtime). Which feature enables this?',
      options: ['Create an AMI and launch a new instance in the same AZ', 'EC2 Instance Hibernation', 'EC2 Live Migration (Nitro System rebalancing)', 'AWS DataSync transfer to new instance'],
      correct: 2,
      explanation: 'AWS\'s Nitro System enables EC2 live migrations, where instances are transparently moved to different underlying hardware for maintenance or rebalancing with zero customer-visible downtime. This is distinct from manually creating AMIs.'
    },
    {
      id: 'ec2-a3', level: 'advanced',
      question: 'A stateful web application uses an Application Load Balancer. After a user logs in, subsequent requests must reach the SAME EC2 instance. What feature accomplishes this?',
      options: ['Connection Draining (Deregistration Delay)', 'ALB Target Group Sticky Sessions (Session Affinity using duration-based or application cookies)', 'Cross-Zone Load Balancing', 'ALB Path-Based Routing Rules'],
      correct: 1,
      explanation: 'ALB Sticky Sessions use cookies to bind a user\'s session to a specific target instance. Duration-based stickiness uses an ALB-generated AWSALB cookie, while application-based stickiness uses a custom cookie — both ensuring stateful requests consistently route to the same backend.'
    },
    {
      id: 'ec2-a4', level: 'advanced',
      question: 'Which EC2 pricing model is MOST cost-effective for a predictable, steady-state production database that must never be interrupted and runs 24/7 for 3 years?',
      options: ['On-Demand (pay per hour)', 'Spot with Spot Fleet for rebalancing', 'Savings Plans (Compute or EC2 Instance Savings Plan)', '3-year All Upfront Convertible Reserved Instances for the DB instance family'],
      correct: 3,
      explanation: 'For a long-running, non-interruptible, predictable production workload with a known instance family, 3-year All Upfront Reserved Instances (Standard) offer the maximum savings. Convertible RIs offer slightly less discount but allow instance family changes. Savings Plans provide flexibility but slightly less DB-specific optimization.'
    },
    {
      id: 'ec2-a5', level: 'advanced',
      question: 'Your EC2 application processes sensitive financial data. You need dedicated physical hardware without sharing with other AWS customers. What should you use?',
      options: ['EC2 Dedicated Instances — single-tenant hardware, same account isolation', 'EC2 Dedicated Hosts — full physical server with per-socket/core licensing visibility', 'EC2 Placement Groups — Spread strategy across distinct racks', 'AWS Outposts — AWS-managed on-premises hardware'],
      correct: 1,
      explanation: 'Dedicated Hosts provide physical servers with full visibility of sockets and physical cores — essential for per-socket or per-core BYOL (Bring Your Own License) software like Windows Server or SQL Server. They also meet compliance requirements for single-tenant physical isolation. Dedicated Instances use single-tenant hardware but don\'t expose the physical host.'
    },
    {
      id: 'ec2-a6', level: 'advanced',
      question: 'An Auto Scaling Group has a minimum of 2, desired of 4, maximum of 10 instances. A scale-in event occurs. What default Termination Policy does AWS follow?',
      options: ['Terminate the newest instances first to protect mature stable instances', 'Terminate the instance in the AZ with the most instances, then the one closest to the next billing hour, then the oldest Launch Template version', 'Terminate all instances and relaunch from scratch based on AMI', 'Terminate the instance with the lowest CPU utilization regardless of AZ'],
      correct: 1,
      explanation: 'The default ASG termination policy: 1) Identify the AZ with the most instances. 2) If multiple launch configs/templates exist, find the oldest. 3) Among remaining, select the instance closest to the next billing hour (to minimize partial-hour charges). 4) If still tied, terminate at random.'
    }
  ]
};
