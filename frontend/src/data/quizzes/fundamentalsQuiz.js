// AWS Cloud Fundamentals and Global Infrastructure Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const fundamentalsQuiz = {
  id: 'fundamentals',
  service: 'AWS Cloud Fundamentals & Global Infrastructure',
  icon: 'Globe',
  color: 'blue',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'fund-b1', level: 'beginner',
      question: 'What is the fundamental definition of cloud computing according to AWS?',
      options: [
        'Running proprietary hardware and hypervisors in a private data center',
        'The on-demand delivery of IT resources over the internet with pay-as-you-go pricing',
        'A colocation hosting facility providing physical space and power to servers',
        'A closed-source software platform exclusively for enterprise databases'
      ],
      correct: 1,
      explanation: 'Cloud computing is the on-demand delivery of compute power, database storage, applications, and other IT resources via the internet with pay-as-you-go pricing.'
    },
    {
      id: 'fund-b2', level: 'beginner',
      question: 'What is an AWS Region?',
      options: [
        'A single physical building housing rack-mounted servers and storage arrays',
        'A physical geographical location in the world with multiple isolated and physically separated Availability Zones',
        'A logical grouping of IAM users within the same geographic timezone',
        'A private fiber cable connecting on-premises data centers to AWS'
      ],
      correct: 1,
      explanation: 'An AWS Region is a separate geographic area (such as us-east-1 or eu-west-1). Each Region consists of multiple, isolated, and physically separated Availability Zones (AZs) connected with low-latency private networking.'
    },
    {
      id: 'fund-b3', level: 'beginner',
      question: 'What is an AWS Availability Zone (AZ)?',
      options: [
        'A single edge cache location used solely for CloudFront media distribution',
        'One or more discrete data centers with redundant power, networking, and connectivity in an AWS Region',
        'An IP subnet range reserved exclusively for AWS management services',
        'A global DNS endpoint operated by Amazon Route 53'
      ],
      correct: 1,
      explanation: 'An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region. AZs allow customers to operate production applications that are more highly available, fault tolerant, and scalable than from a single data center.'
    },
    {
      id: 'fund-b4', level: 'beginner',
      question: 'Under the AWS Shared Responsibility Model, which responsibility belongs exclusively to AWS?',
      options: [
        'Configuring customer Amazon EC2 operating system firewalls and patches',
        'Securing the physical data centers, hardware, host virtualization, and network facilities (Security OF the Cloud)',
        'Managing customer user accounts, passwords, and IAM role assignment',
        'Encrypting client-side application payload data before network transmission'
      ],
      correct: 1,
      explanation: 'AWS is responsible for "Security OF the Cloud" — physical security of data centers, foundational infrastructure, host hardware, hypervisors, and global network facilities. Customers are responsible for "Security IN the Cloud" (OS, apps, firewall rules, encryption).'
    },
    {
      id: 'fund-b5', level: 'beginner',
      question: 'What are the three primary cloud computing deployment models?',
      options: [
        'Linux, Windows, and macOS',
        'Public Cloud, Private Cloud, and Hybrid Cloud',
        'Compute, Storage, and Database',
        'Frontend, Backend, and Database'
      ],
      correct: 1,
      explanation: 'The three primary deployment models are Public Cloud (fully cloud-hosted, multi-tenant infrastructure like AWS), Private Cloud (dedicated infrastructure hosted internally or by a third party), and Hybrid Cloud (combining on-premises infrastructure with cloud resources).'
    },
    {
      id: 'fund-b6', level: 'beginner',
      question: 'What are AWS Points of Presence (PoPs) primarily used for?',
      options: [
        'Housing primary relational database master instances for transactional writes',
        'Delivering cached content to end users with low latency via services like CloudFront and Route 53',
        'Hosting deep archive physical magnetic tape libraries for Amazon S3 Glacier',
        'Running long-lived Amazon EMR batch processing clusters'
      ],
      correct: 1,
      explanation: 'Points of Presence (PoPs) comprise Edge Locations and Regional Edge Caches distributed worldwide, used by services like Amazon CloudFront and Route 53 to cache and route content closer to end users to reduce latency.'
    },
    {
      id: 'fund-b7', level: 'beginner',
      question: 'Which of the following is considered an Infrastructure as a Service (IaaS) offering on AWS?',
      options: [
        'AWS Lambda',
        'Amazon EC2',
        'Amazon DynamoDB',
        'Amazon Simple Email Service (SES)'
      ],
      correct: 1,
      explanation: 'Amazon EC2 provides virtual servers where users manage the operating system, network configuration, and software stack, which aligns with the Infrastructure as a Service (IaaS) model.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'fund-i1', level: 'intermediate',
      question: 'What is the main architectural benefit of deploying an application across multiple Availability Zones in the same Region?',
      options: [
        'Compliance with local in-country data sovereignty laws across national borders',
        'High availability and fault tolerance against localized data center power or equipment failures',
        'Zero network latency between compute instances located anywhere globally',
        'Eliminating the need to purchase Amazon EBS storage volumes'
      ],
      correct: 1,
      explanation: 'Deploying across multiple AZs ensures that if a fire, flood, or hardware failure affects one data center/AZ, workloads in other AZs continue running without service interruption.'
    },
    {
      id: 'fund-i2', level: 'intermediate',
      question: 'What is an AWS Local Zone?',
      options: [
        'A secure subnet reserved strictly for internal VPC NAT Gateways',
        'An infrastructure deployment that places compute, storage, and database services closer to large population and industry centers',
        'A local hard drive physically connected directly to a developer laptop',
        'A sandbox environment for running unverified community AMIs'
      ],
      correct: 1,
      explanation: 'AWS Local Zones place AWS compute, storage, database, and other select services closer to large population, industry, and IT centers where no AWS Region currently exists, enabling single-digit millisecond latency for local users.'
    },
    {
      id: 'fund-i3', level: 'intermediate',
      question: 'What does AWS Wavelength provide for cloud applications?',
      options: [
        'Satellite connectivity for remote maritime vessels',
        'AWS compute and storage services embedded directly within 5G telecommunication networks at the carrier edge',
        'Quantum computing hardware access via the cloud',
        'Automated microwave radio signal analysis for IoT devices'
      ],
      correct: 1,
      explanation: 'AWS Wavelength embeds AWS compute and storage services within telecommunications providers\' 5G networks, enabling developers to build applications that deliver single-digit millisecond latencies to mobile devices and end users.'
    },
    {
      id: 'fund-i4', level: 'intermediate',
      question: 'Which pillar of the AWS Well-Architected Framework focuses on running workloads effectively and gaining insight into operations?',
      options: [
        'Security',
        'Operational Excellence',
        'Cost Optimization',
        'Performance Efficiency'
      ],
      correct: 1,
      explanation: 'Operational Excellence focuses on running and monitoring systems to deliver business value, and continually improving supporting processes and procedures.'
    },
    {
      id: 'fund-i5', level: 'intermediate',
      question: 'How do AWS Outposts extend AWS infrastructure to customer environments?',
      options: [
        'By providing a software-only container image that emulates AWS APIs on VMware',
        'By delivering fully managed physical AWS hardware racks to customer on-premises data centers or colocation spaces',
        'By establishing an encrypted SSH tunnel to public AWS S3 endpoints',
        'By licensing the AWS Console to run on on-premise OpenStack clusters'
      ],
      correct: 1,
      explanation: 'AWS Outposts delivers physical AWS compute and storage racks to customer on-premises data centers, providing the exact same AWS infrastructure, APIs, and tools locally.'
    },
    {
      id: 'fund-i6', level: 'intermediate',
      question: 'Under the Shared Responsibility Model, which responsibility does a customer have when using a managed database service like Amazon RDS?',
      options: [
        'Installing hypervisor security patches on the underlying physical server host',
        'Managing database user access permissions, table schemas, and network firewall access via Security Groups',
        'Replacing failed physical ECC RAM sticks and power supplies in the server rack',
        'Applying operating system kernel security patches to the guest OS'
      ],
      correct: 1,
      explanation: 'With Amazon RDS (PaaS), AWS manages the OS installation, hardware maintenance, and engine patches. The customer is responsible for network access (Security Groups), database user privileges, table schemas, and data encryption settings.'
    },
    {
      id: 'fund-i7', level: 'intermediate',
      question: 'Which AWS service provides centralized compliance reporting and on-demand access to AWS security and compliance documents (such as SOC and PCI reports)?',
      options: [
        'AWS Trusted Advisor',
        'AWS Artifact',
        'AWS Systems Manager Compliance',
        'AWS Shield Advanced'
      ],
      correct: 1,
      explanation: 'AWS Artifact is the central portal for on-demand access to AWS compliance reports (SOC 1/2/3, PCI DSS, ISO certifications) and security agreements.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'fund-a1', level: 'advanced',
      question: 'A multinational financial institution must guarantee that transaction data never leaves the European Union geographical boundaries. Which architectural practice complies with this requirement?',
      options: [
        'Enable cross-region replication between eu-central-1 (Frankfurt) and us-east-1 (N. Virginia)',
        'Deploy workloads exclusively within EU AWS Regions (e.g., Frankfurt, Ireland, Paris) and disable cross-region data transfer',
        'Rely on CloudFront Edge Locations without configuring geo-restrictions',
        'Store all database credentials in a single global AWS IAM user policy'
      ],
      correct: 1,
      explanation: 'AWS ensures data stays within the Region where it is stored unless the customer explicitly configures replication or transfer out. Restricting storage and processing exclusively to EU regions adheres to EU data sovereignty mandates.'
    },
    {
      id: 'fund-a2', level: 'advanced',
      question: 'Why are AWS Availability Zones within a region independently mapped to different physical data centers for different AWS accounts?',
      options: [
        'To force customers to purchase dedicated VPC peering links across accounts',
        'To balance resource distribution across physical data centers and prevent concentration of workloads on a single physical site across all accounts',
        'Because AWS randomly shifts data centers between regions every month',
        'To prevent cross-account IAM role assumption'
      ],
      correct: 1,
      explanation: 'To distribute resources evenly across the physical data centers of a Region, AZs are mapped dynamically to physical locations for each account. For example, us-east-1a for Account A may correspond to a different physical data center than us-east-1a for Account B. To coordinate, AWS provides AZ IDs (e.g., use1-az1).'
    },
    {
      id: 'fund-a3', level: 'advanced',
      question: 'What is an AZ ID in AWS and why is it essential for multi-account architectures?',
      options: [
        'A billing account identifier used for consolidating AWS Organizations discounts',
        'A consistent, absolute physical identifier (e.g., use1-az1) across all accounts to coordinate multi-account high availability and network latency',
        'A cryptographic token required to authorize inter-VPC traffic through an Internet Gateway',
        'A serial number printed on the physical AWS server rack'
      ],
      correct: 1,
      explanation: 'Because AZ names like us-east-1a are mapped randomly to different physical locations per account, an AZ ID (e.g., use1-az1) provides a static, independent physical identifier shared across all AWS accounts for consistent resource placement.'
    },
    {
      id: 'fund-a4', level: 'advanced',
      question: 'What are the 6 Pillars of the AWS Well-Architected Framework?',
      options: [
        'Compute, Storage, Network, Database, Security, Analytics',
        'Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability',
        'Agility, Elasticity, Scalability, Redundancy, Durability, Encryption',
        'Planning, Development, Testing, Deployment, Monitoring, Auditing'
      ],
      correct: 1,
      explanation: 'The 6 Pillars are Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability (added in late 2021).'
    },
    {
      id: 'fund-a5', level: 'advanced',
      question: 'Under the Shared Responsibility Model, if an application hosted on an Amazon EC2 instance is compromised due to an unpatched vulnerability in Apache Web Server, who is accountable?',
      options: [
        'AWS, because AWS guarantees the integrity of all compute services and pre-installed packages',
        'The customer, because managing OS updates, third-party software patches, and application security configurations is the customer\'s responsibility',
        'The third-party AMI publisher exclusively, releasing both AWS and customer from liability',
        'The hypervisor manufacturer, because virtualization must isolate web server exploits'
      ],
      correct: 1,
      explanation: 'Customers are responsible for managing guest OS updates, application software patches (like Apache), and firewall settings for EC2 instances under the Shared Responsibility Model.'
    },
    {
      id: 'fund-a6', level: 'advanced',
      question: 'How does AWS global network backbone routing reduce latency and packet loss compared to the public internet?',
      options: [
        'By converting all HTTP packets into raw binary UDP datagrams without error verification',
        'By routing traffic over redundant, private AWS fiber optics instead of bouncing across multiple third-party public Internet Service Providers (ISPs)',
        'By disabling TLS handshake encryption across trans-oceanic cables',
        'By requiring all internet traffic to originate from AWS Outposts'
      ],
      correct: 1,
      explanation: 'Traffic entering the AWS global infrastructure (via CloudFront, Global Accelerator, or Direct Connect) travels over AWS\'s private, dedicated high-capacity fiber backbone rather than traversing unpredictable public internet ISP hops.'
    }
  ]
};
