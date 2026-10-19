// Amazon ECS & EKS Fundamentals Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const ecsQuiz = {
  id: 'containers',
  service: 'Amazon ECS & EKS Fundamentals',
  icon: 'Box',
  color: 'indigo',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'cont-b1', level: 'beginner',
      question: 'What is Amazon Elastic Container Service (Amazon ECS)?',
      options: [
        'A managed relational database engine compatible with MySQL',
        'A fully managed container orchestration service that makes it easy to deploy, manage, and scale containerized applications on AWS',
        'A physical hardware appliance for encrypting network packets',
        'An object storage system designed for storing Docker container logs'
      ],
      correct: 1,
      explanation: 'Amazon ECS is a highly scalable, fast container management service that makes it easy to run, stop, and manage Docker containers on a cluster of EC2 instances or using AWS Fargate.'
    },
    {
      id: 'cont-b2', level: 'beginner',
      question: 'What is AWS Fargate?',
      options: [
        'A physical router installed in AWS Direct Connect locations',
        'A serverless compute engine for containers that works with both Amazon ECS and Amazon EKS, removing the need to provision or manage EC2 servers',
        'A caching layer for DynamoDB tables',
        'A code repository similar to GitHub'
      ],
      correct: 1,
      explanation: 'AWS Fargate is a serverless compute engine for containers. With Fargate, you don\'t have to provision, configure, or scale virtual machines; you only pay for the vCPU and memory resources your containers consume.'
    },
    {
      id: 'cont-b3', level: 'beginner',
      question: 'What is an Amazon ECS Task Definition?',
      options: [
        'A JSON-formatted text blueprint that describes one or more containers (image, CPU, memory, ports, environment variables) that form your application',
        'An hourly cron schedule for rebooting container nodes',
        'An IAM policy granting permissions to delete S3 buckets',
        'A billing invoice line item for container workloads'
      ],
      correct: 0,
      explanation: 'An ECS Task Definition is a blueprint (JSON template) that specifies container images, CPU/RAM limits, port mappings, volumes, IAM roles, and logging configuration for container instances.'
    },
    {
      id: 'cont-b4', level: 'beginner',
      question: 'What is Amazon Elastic Kubernetes Service (Amazon EKS)?',
      options: [
        'A managed service that makes it easy to run open-source Kubernetes on AWS without needing to install and operate your own Kubernetes control plane',
        'A managed Elasticsearch cluster service',
        'A serverless message queuing service',
        'A DNS routing provider for Docker containers'
      ],
      correct: 0,
      explanation: 'Amazon EKS is a managed Kubernetes service that runs the open-source Kubernetes control plane across multiple Availability Zones, automatically managing upgrades and patching.'
    },
    {
      id: 'cont-b5', level: 'beginner',
      question: 'What is Amazon Elastic Container Registry (Amazon ECR)?',
      options: [
        'A managed Git repository for source code version control',
        'A fully managed container image registry that makes it easy to store, manage, share, and deploy container images securely',
        'A load balancer for container pods',
        'A database for tracking container container IDs'
      ],
      correct: 1,
      explanation: 'Amazon ECR is an AWS-managed container registry service that is secure, scalable, and reliable. It hosts private and public Docker container images with integrated IAM permissions and vulnerability scanning.'
    },
    {
      id: 'cont-b6', level: 'beginner',
      question: 'In Amazon ECS, what is the difference between a Task and a Service?',
      options: [
        'A Task is an IAM policy, while a Service is a VPC subnet',
        'A Task is a single running instantiation of a Task Definition; an ECS Service ensures that a specified number of Tasks remain running and replaces failed ones',
        'A Task runs only on Windows, while a Service runs only on Linux',
        'There is no difference; they are interchangeable synonyms'
      ],
      correct: 1,
      explanation: 'An ECS Task is an individual running instance of a Task Definition. An ECS Service maintains a specified desired count of tasks across the cluster, registering them with load balancers and replacing unhealthy tasks.'
    },
    {
      id: 'cont-b7', level: 'beginner',
      question: 'Which launch type allows you to run containers on Amazon ECS while retaining full root control and visibility over the underlying EC2 host virtual machines?',
      options: [
        'AWS Fargate launch type',
        'Amazon EC2 launch type',
        'AWS Lambda container images',
        'Amazon Lightsail Containers'
      ],
      correct: 1,
      explanation: 'The EC2 launch type allows you to run your containerized applications on an Amazon EC2 cluster that you manage, giving you direct SSH access and control over the host OS and instance families.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'cont-i1', level: 'intermediate',
      question: 'In Amazon ECS, what is the difference between the Task Execution Role and the Task Role?',
      options: [
        'They are identical roles with duplicate names',
        'The Task Execution Role grants permissions to the ECS agent (to pull images from ECR and write logs to CloudWatch); the Task Role grants permissions to the application code running inside the container (e.g. S3 or DynamoDB access)',
        'The Task Role manages Docker daemon restarts; the Execution Role manages Linux cgroups',
        'The Task Execution Role is only used on Windows containers'
      ],
      correct: 1,
      explanation: 'The Task Execution Role is assumed by the ECS container agent (to pull private ECR images and send logs to CloudWatch Logs). The Task Role (`taskRoleArn`) is assumed by your container application itself to call AWS APIs (like S3, DynamoDB, SQS).'
    },
    {
      id: 'cont-i2', level: 'intermediate',
      question: 'Which network mode in an ECS Task Definition assigns each container task its own dedicated Elastic Network Interface (ENI) and private IPv4 address from the VPC subnet?',
      options: [
        'bridge mode',
        'host mode',
        'awsvpc mode',
        'none mode'
      ],
      correct: 2,
      explanation: 'The `awsvpc` network mode gives each task its own dedicated Elastic Network Interface (ENI) and private IP address from your VPC subnet. It is required for AWS Fargate and enables task-level Security Groups.'
    },
    {
      id: 'cont-i3', level: 'intermediate',
      question: 'What is an ECS Capacity Provider?',
      options: [
        'A physical diesel generator for AWS data centers',
        'An abstraction that manages the scaling of infrastructure (Auto Scaling Groups or Fargate) for tasks in your ECS cluster',
        'A monthly spending credit given to AWS startups',
        'A tool that reserves CPU clock cycles on physical hypervisors'
      ],
      correct: 1,
      explanation: 'Capacity Providers define how tasks consume infrastructure. For EC2, an ECS Capacity Provider automatically scales the underlying Auto Scaling Group up and down based on task resource demands (Cluster Auto Scaling).'
    },
    {
      id: 'cont-i4', level: 'intermediate',
      question: 'In Amazon EKS, how do Kubernetes Pods obtain IAM permissions to access AWS services (like S3 or SQS) without embedding static credentials?',
      options: [
        'Store AWS access keys in a Kubernetes ConfigMap in plaintext',
        'IAM Roles for Service Accounts (IRSA), which associates an IAM role with a Kubernetes ServiceAccount using an OIDC identity provider',
        'Assign administrative IAM roles directly to all physical worker nodes',
        'Pass AWS credentials via environment variables in the Dockerfile'
      ],
      correct: 1,
      explanation: 'IAM Roles for Service Accounts (IRSA) uses OpenID Connect (OIDC) to map Kubernetes ServiceAccounts to IAM roles, providing fine-grained, least-privilege AWS credentials directly to specific pods.'
    },
    {
      id: 'cont-i5', level: 'intermediate',
      question: 'What is AWS App Runner?',
      options: [
        'A fully managed container service that makes it easy for developers to deploy containerized web applications and APIs directly from source code or container images without orchestrating clusters',
        'A mobile fitness tracker app provided by AWS',
        'A command line benchmark tool for network throughput',
        'A database migration agent for Redis'
      ],
      correct: 0,
      explanation: 'AWS App Runner is a fully managed service that lets developers deploy containerized web applications and APIs quickly from source code or container images, handling load balancing, SSL, scaling, and build pipelines automatically.'
    },
    {
      id: 'cont-i6', level: 'intermediate',
      question: 'What happens when an Amazon EKS cluster control plane spans multiple Availability Zones?',
      options: [
        'AWS charges extra cross-region transfer fees for Kubernetes API queries',
        'The Kubernetes API server and etcd key-value store are automatically replicated across at least three Availability Zones for high availability',
        'Worker nodes cannot communicate with the API server',
        'Kubernetes pods are restricted to running in only one AZ'
      ],
      correct: 1,
      explanation: 'EKS automatically runs and scales the Kubernetes control plane across at least three Availability Zones in a Region, ensuring high availability of the API server and etcd storage.'
    },
    {
      id: 'cont-i7', level: 'intermediate',
      question: 'Which Amazon ECR feature automatically identifies software vulnerabilities in container images pushed to your repository?',
      options: [
        'Amazon Macie Scan',
        'Amazon ECR Image Scanning (Basic using Clair or Enhanced using Amazon Inspector)',
        'AWS Shield Standard',
        'AWS WAF Web ACL rules'
      ],
      correct: 1,
      explanation: 'Amazon ECR image scanning checks container images for known Common Vulnerabilities and Exposures (CVEs) using basic scanning or enhanced scanning powered by Amazon Inspector.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'cont-a1', level: 'advanced',
      question: 'When running Amazon ECS tasks on EC2 instances with multiple containers mapped to port 80 using an Application Load Balancer, how does ECS avoid host port collisions?',
      options: [
        'By launching a dedicated EC2 instance for every single container',
        'Dynamic Port Mapping: set `hostPort: 0` in the container definition, allowing Docker to allocate a random ephemeral port (32768-65535) which the ECS agent automatically registers with the ALB target group',
        'By switching all containers to UDP protocol',
        'By rewriting the Linux kernel routing table on each packet'
      ],
      correct: 1,
      explanation: 'With dynamic port mapping (setting `hostPort: 0` with bridge network mode), Docker assigns a random ephemeral port on the host. The ECS agent automatically informs the ALB Target Group of the dynamic port, allowing multiple instances of the same container on one host.'
    },
    {
      id: 'cont-a2', level: 'advanced',
      question: 'In Kubernetes on Amazon EKS, how does the AWS VPC CNI (Container Network Interface) plugin allocate IP addresses to pods?',
      options: [
        'It routes traffic through a user-space NAT proxy on port 8080',
        'It allocates secondary private IPv4 addresses directly from the host node\'s VPC subnet to each pod, making pods first-class VPC citizens',
        'It generates non-routable 10.244.0.0/16 overlay IP addresses that require flannel routing tables',
        'It requires an Elastic IP address for every pod'
      ],
      correct: 1,
      explanation: 'The Amazon VPC CNI plugin allocates real, routable VPC IP addresses from the VPC subnet to pods via Elastic Network Interfaces (ENIs) attached to the EC2 worker nodes, offering native VPC routing and security group support.'
    },
    {
      id: 'cont-a3', level: 'advanced',
      question: 'What is Karpenter in the context of Amazon EKS?',
      options: [
        'A Kubernetes monitoring dashboard UI',
        'An open-source, flexible, high-performance node auto-scaler that provisions the right compute instances based directly on pending pod requirements without relying on EC2 Auto Scaling Groups',
        'A tool that compiles Java byte-code into native Docker images',
        'A managed encryption key provider for Kubernetes secrets'
      ],
      correct: 1,
      explanation: 'Karpenter is a high-performance Kubernetes node autoscaler that observes unscheduled pods, evaluates their resource requests, and directly provisions optimized EC2 instances in seconds without the constraints of ASGs.'
    },
    {
      id: 'cont-a4', level: 'advanced',
      question: 'An enterprise application running on AWS Fargate requires persistent shared storage accessible by multiple tasks concurrently across multiple Availability Zones. Which storage service should be mounted?',
      options: [
        'Amazon EBS gp3 volume with multi-attach enabled',
        'Amazon Elastic File System (Amazon EFS) mounted natively via ECS task definition volume configuration',
        'Instance Store NVMe ephemeral storage',
        'Amazon S3 mounted via s3fs-fuse container privilege escalation'
      ],
      correct: 1,
      explanation: 'Amazon ECS on Fargate natively supports mounting Amazon EFS file systems. EFS provides multi-AZ, POSIX-compliant shared file storage accessible concurrently by tasks across multiple AZs.'
    },
    {
      id: 'cont-a5', level: 'advanced',
      question: 'What is the function of the ECS task definition parameters `minimumHealthyPercent` and `maximumPercent` during a rolling service deployment?',
      options: [
        'They specify the minimum and maximum CPU utilization alarms for CloudWatch',
        '`minimumHealthyPercent` defines the lower boundary of tasks that must remain InService during a deployment (e.g., 50% or 100%), while `maximumPercent` defines the upper limit of tasks running during deployment (e.g., 200% for batch launch)',
        'They control the percentage of Spot vs On-Demand instances in the cluster',
        'They set the maximum network throughput limit in megabits per second'
      ],
      correct: 1,
      explanation: 'These parameters govern rolling deployments: with desired count 4, `minimumHealthyPercent: 100` and `maximumPercent: 200` means ECS launches 4 new tasks (reaching 8 tasks) before stopping any old tasks.'
    },
    {
      id: 'cont-a6', level: 'advanced',
      question: 'In Amazon EKS, what happens when Kubernetes Secrets are encrypted at rest using AWS KMS envelope encryption?',
      options: [
        'Kubernetes pod start times increase by 30 minutes',
        'The Kubernetes API server encrypts secret data using a local Data Encryption Key (DEK) protected by a Customer Managed KMS Key (CMK) before storing in etcd',
        'Secrets can only be accessed by the AWS root account holder',
        'etcd database files are deleted after 24 hours'
      ],
      correct: 1,
      explanation: 'EKS KMS envelope encryption uses a KMS Customer Managed Key to encrypt Kubernetes secrets before they are stored in etcd, protecting sensitive tokens and credentials against unauthorized direct disk/etcd inspection.'
    }
  ]
};
