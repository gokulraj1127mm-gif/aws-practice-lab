// AWS Systems Manager (SSM) Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const ssmQuiz = {
  id: 'ssm',
  service: 'AWS Systems Manager',
  icon: 'Sliders',
  color: 'violet',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'ssm-b1', level: 'beginner',
      question: 'What is AWS Systems Manager (SSM)?',
      options: [
        'A managed payroll and human resources application',
        'An operations hub that enables centralized management, visibility, and automation of your cloud and on-premises infrastructure and compute nodes',
        'A physical hard drive recovery tool',
        'An email marketing campaign management service'
      ],
      correct: 1,
      explanation: 'AWS Systems Manager is an operations hub that allows you to track and resolve operational issues across your AWS applications and resources from a central place.'
    },
    {
      id: 'ssm-b2', level: 'beginner',
      question: 'What software component must be installed and running on an Amazon EC2 instance or on-premises server for it to be managed by AWS Systems Manager?',
      options: [
        'The SSM Agent (Amazon SSM Agent)',
        'The Kubernetes Kubelet',
        'Apache Web Server',
        'Docker Desktop'
      ],
      correct: 0,
      explanation: 'The SSM Agent is the open-source software that processes Systems Manager requests and runs commands on EC2 instances or on-premises servers. It is pre-installed on most modern Amazon Linux and Windows AMIs.'
    },
    {
      id: 'ssm-b3', level: 'beginner',
      question: 'Which Systems Manager capability allows administrators to securely log in to EC2 instances through an interactive terminal session in a web browser without opening inbound SSH port 22 or managing bastion hosts?',
      options: [
        'SSM Session Manager',
        'SSM Run Command',
        'SSM Patch Manager',
        'AWS Cloud9'
      ],
      correct: 0,
      explanation: 'Session Manager provides secure, auditable instance management without needing to open inbound firewall ports (like SSH port 22 or RDP 3389), maintain bastion hosts, or manage SSH key pairs.'
    },
    {
      id: 'ssm-b4', level: 'beginner',
      question: 'What is AWS Systems Manager Parameter Store used for?',
      options: [
        'Storing customer credit card numbers without PCI compliance',
        'Secure, hierarchical storage for configuration data (plain text) and secrets management (passwords, database connection strings, API keys) encrypted with AWS KMS',
        'Managing DNS domain names',
        'Generating SSL certificates'
      ],
      correct: 1,
      explanation: 'Parameter Store provides secure, hierarchical storage for configuration data management and secrets management. It stores values as plain text (String, StringList) or encrypted data (SecureString) backed by AWS KMS.'
    },
    {
      id: 'ssm-b5', level: 'beginner',
      question: 'What is AWS Systems Manager Run Command?',
      options: [
        'A voice-activated command on Amazon Alexa',
        'A feature that lets you safely and securely remotely execute shell scripts or commands on fleets of managed instances at scale without needing SSH access',
        'A tool that accelerates CPU clock speeds',
        'A cron service for Lambda functions only'
      ],
      correct: 1,
      explanation: 'Run Command lets you remotely manage the configuration of your managed nodes at scale without having to log in directly, tracking command execution and console outputs in CloudWatch and S3.'
    },
    {
      id: 'ssm-b6', level: 'beginner',
      question: 'What IAM policy must be attached via an IAM Instance Profile to an EC2 instance so that it can register as a managed node with AWS Systems Manager?',
      options: [
        'AdministratorAccess',
        'AmazonSSMManagedInstanceCore',
        'AmazonS3FullAccess',
        'AWSKeyManagementServicePowerUser'
      ],
      correct: 1,
      explanation: 'The AWS-managed policy `AmazonSSMManagedInstanceCore` contains the required least-privilege permissions for the SSM Agent to communicate with the Systems Manager service endpoints.'
    },
    {
      id: 'ssm-b7', level: 'beginner',
      question: 'What is AWS Systems Manager Patch Manager?',
      options: [
        'A software tool that repairs physical optical cables',
        'An automated tool that selects and deploys operating system and software security patches across fleets of Windows and Linux managed instances according to defined Patch Baselines',
        'A service that modifies Git repository source code automatically',
        'A billing rebate manager for EC2'
      ],
      correct: 1,
      explanation: 'Patch Manager automates the process of patching managed nodes with both security updates and other types of updates using rules defined in Patch Baselines.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'ssm-i1', level: 'intermediate',
      question: 'What is an SSM Document (Systems Manager Document)?',
      options: [
        'A PDF manual describing AWS service limits',
        'A JSON or YAML file that defines the actions that Systems Manager performs on your managed nodes (such as Command, Automation, Policy, or Session documents)',
        'An NDA signed by AWS enterprise customers',
        'A receipt for reserved instances'
      ],
      correct: 1,
      explanation: 'An SSM document defines the actions that Systems Manager executes. It can be a Command document (for Run Command), Automation document (workflows), Policy document (State Manager), or Session document.'
    },
    {
      id: 'ssm-i2', level: 'intermediate',
      question: 'What is AWS Systems Manager State Manager?',
      options: [
        'A US state government compliance portal',
        'A secure configuration management service that automates the process of keeping your managed nodes in a defined state (e.g., ensuring specific antivirus software is running or firewall ports are closed)',
        'A database state checkpoint in DynamoDB',
        'A session persistence cookie on Application Load Balancers'
      ],
      correct: 1,
      explanation: 'State Manager automates the process of keeping your managed instances in a defined state (desired configuration state management), preventing configuration drift.'
    },
    {
      id: 'ssm-i3', level: 'intermediate',
      question: 'What is a Patch Baseline in SSM Patch Manager?',
      options: [
        'The minimum CPU benchmark an instance must achieve',
        'A set of rules that defines which patches are approved for installation (e.g. approve Critical and High security patches after 7 days of release) and optional lists of explicitly approved or rejected patches',
        'A baseline network throughput test across VPC subnets',
        'A standard operating system disk size'
      ],
      correct: 1,
      explanation: 'A Patch Baseline specifies rules for auto-approving patches within days of their release, patch severity filters, and lists of explicitly approved or rejected CVEs and packages.'
    },
    {
      id: 'ssm-i4', level: 'intermediate',
      question: 'What is the key advantage of Systems Manager Session Manager regarding security auditing and session logging?',
      options: [
        'It disables all logging to protect user privacy',
        'Every keystroke and command output from the session can be automatically streamed, encrypted, and immutably archived to Amazon S3 buckets and Amazon CloudWatch Logs',
        'It requires sessions to be stored on local USB flash drives',
        'It generates a paper receipt sent via postal mail'
      ],
      correct: 1,
      explanation: 'Session Manager provides comprehensive auditing: all session command history and interactive terminal I/O can be logged directly to Amazon S3 and CloudWatch Logs with KMS encryption.'
    },
    {
      id: 'ssm-i5', level: 'intermediate',
      question: 'What is AWS Systems Manager Automation?',
      options: [
        'A physical robotics system in AWS shipping centers',
        'A feature that lets you safely automate common maintenance and deployment tasks (such as building golden AMIs, stopping/starting EC2 fleets, or recovering unreachable instances) across AWS accounts using workflows',
        'A compiler for Python scripts',
        'An automated billing payment setup'
      ],
      correct: 1,
      explanation: 'Systems Manager Automation simplifies common maintenance, deployment, and remediation tasks. You can run multi-step workflows across AWS resources and accounts using Automation runbooks.'
    },
    {
      id: 'ssm-i6', level: 'intermediate',
      question: 'What is an SSM Maintenance Window?',
      options: [
        'A physical glass observation deck in an AWS server building',
        'A defined schedule and duration during which potentially disruptive administrative tasks (patching, OS updates, reboots) are permitted to run on your instances',
        'A downtime period during which all AWS APIs are suspended globally',
        'An annual holiday break for AWS support engineers'
      ],
      correct: 1,
      explanation: 'A Maintenance Window lets you schedule a recurring time window (e.g., every Saturday at 2:00 AM UTC for 4 hours) during which disruptive tasks like OS patching, reboots, and updates may execute.'
    },
    {
      id: 'ssm-i7', level: 'intermediate',
      question: 'What is the parameter type `SecureString` in SSM Parameter Store, and how is it protected?',
      options: [
        'Plaintext ASCII text stored in an unencrypted file',
        'Sensitive plaintext that is automatically encrypted at rest using an AWS Key Management Service (AWS KMS) key before storage and decrypted only for authorized principals',
        'A hash that can never be decrypted by anyone',
        'A password that expires after 10 minutes'
      ],
      correct: 1,
      explanation: 'A `SecureString` parameter is any sensitive data that needs to be stored and retrieved securely. SSM uses AWS KMS (either default KMS key or custom CMK) to encrypt parameter data at rest.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'ssm-a1', level: 'advanced',
      question: 'How do you enable EC2 instances located in completely private VPC subnets (with no Internet Gateway, no NAT Gateway, and no public IPs) to communicate with AWS Systems Manager endpoints?',
      options: [
        'Private instances can never use Systems Manager',
        'Provision VPC Interface Endpoints (AWS PrivateLink) for `ssm`, `ec2messages`, `ssmmessages`, and an S3 Gateway Endpoint in the private subnets',
        'Attach a public Elastic IP directly to the instance',
        'Disable SSL encryption in the SSM Agent config'
      ],
      correct: 1,
      explanation: 'Private instances without internet access can communicate with SSM by configuring VPC Interface Endpoints (powered by AWS PrivateLink) for `com.amazonaws.[region].ssm`, `ssmmessages`, and `ec2messages`, plus S3 gateway endpoint for patch downloads.'
    },
    {
      id: 'ssm-a2', level: 'advanced',
      question: 'What is Systems Manager Inventory, and how does it integrate with AWS Config or Athena?',
      options: [
        'A physical barcode scanner app for tracking server racks',
        'A feature that collects OS, application, patch, network configuration, and file metadata from instances and exports it to S3, enabling complex multi-account fleet queries via Amazon Athena',
        'A stock inventory management tool for e-commerce stores',
        'A real-time memory dump analyzer'
      ],
      correct: 1,
      explanation: 'SSM Inventory gathers metadata about applications, files, network configs, Windows updates, and services installed on managed nodes. Resource Data Sync can centralize this metadata into Amazon S3 for SQL analysis in Amazon Athena.'
    },
    {
      id: 'ssm-a3', level: 'advanced',
      question: 'How can you restrict an IAM user so they can only start an SSM Session Manager session with EC2 instances tagged with `Environment: Development`?',
      options: [
        'By creating two separate AWS accounts',
        'Use an IAM policy condition block checking `ssm:resourceTag/Environment: "Development"` on the `ssm:StartSession` action targeting the instance ARN',
        'Disable Session Manager on all instances in production',
        'Tags cannot be evaluated in IAM condition policies'
      ],
      correct: 1,
      explanation: 'IAM policies support attribute-based access control (ABAC). By specifying `Condition: {"StringEquals": {"ssm:resourceTag/Environment": "Development"}}`, you restrict `ssm:StartSession` strictly to dev instances.'
    },
    {
      id: 'ssm-a4', level: 'advanced',
      question: 'What is AWS Systems Manager Quick Setup?',
      options: [
        'A wizard that instantly launches 100 EC2 instances with default root passwords',
        'A deployment tool that quickly configures foundational Systems Manager best practices across an entire AWS Organization (patch baselines, inventory collection, host management, CloudWatch agent) with a few clicks',
        'A script that skips all security compliance checks',
        'A speed test tool for EC2 network interfaces'
      ],
      correct: 1,
      explanation: 'Quick Setup automates the configuration of commonly used Systems Manager capabilities (including automated patching, host management, inventory collection, and Explorer) across accounts and regions in AWS Organizations.'
    },
    {
      id: 'ssm-a5', level: 'advanced',
      question: 'What is the purpose of Parameter Store Parameter Tiers: Standard vs Advanced parameters?',
      options: [
        'Standard parameters are free and limited to 4 KB value size (up to 10,000 parameters); Advanced parameters support up to 8 KB value size, parameter policies (expiration/notifications), and higher capacity up to 100,000 parameters with a small storage fee',
        'Advanced parameters can only be read on Sundays',
        'Standard parameters are unencrypted, while Advanced parameters are encrypted',
        'Advanced parameters are reserved for government accounts'
      ],
      correct: 0,
      explanation: 'Standard parameters support up to 4 KB values and up to 10,000 parameters free of charge. Advanced parameters support up to 8 KB values, up to 100,000 parameters, and parameter policies like TTL expiration.'
    },
    {
      id: 'ssm-a6', level: 'advanced',
      question: 'How does Systems Manager Session Manager Port Forwarding work, and what security use case does it solve?',
      options: [
        'It routes all corporate web browsing through an open HTTP proxy',
        'It securely tunnels arbitrary TCP traffic (e.g., local port 8080 forwarded to remote private RDS MySQL port 3306 or remote web server port 80) through the encrypted SSM connection without exposing the private database to the internet',
        'It permanently opens ports on the VPC Internet Gateway',
        'It bypasses VPC Network Access Control Lists (NACLs)'
      ],
      correct: 1,
      explanation: 'Port forwarding using Session Manager allows you to securely tunnel local workstation traffic (like connecting a database GUI tool on localhost) to a private port on an EC2 instance or RDS host without opening public inbound ports or managing SSH keys.'
    }
  ]
};
