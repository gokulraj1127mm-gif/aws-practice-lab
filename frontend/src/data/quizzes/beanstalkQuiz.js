// AWS Elastic Beanstalk Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const beanstalkQuiz = {
  id: 'beanstalk',
  service: 'AWS Elastic Beanstalk',
  icon: 'Layers',
  color: 'emerald',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'eb-b1', level: 'beginner',
      question: 'What is AWS Elastic Beanstalk?',
      options: [
        'A managed relational database engine designed for extreme write performance',
        'An easy-to-use Platform as a Service (PaaS) for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker',
        'A physical data transfer appliance shipped in a shipping container',
        'A content delivery network that caches media at edge locations'
      ],
      correct: 1,
      explanation: 'AWS Elastic Beanstalk is a Platform as a Service (PaaS) that handles deployment, capacity provisioning, load balancing, auto-scaling, and health monitoring while letting you retain full control over the underlying AWS resources.'
    },
    {
      id: 'eb-b2', level: 'beginner',
      question: 'How is AWS Elastic Beanstalk priced?',
      options: [
        'A mandatory monthly subscription fee of $99 per application',
        'There is no additional charge for Elastic Beanstalk itself; you pay only for the underlying AWS resources (EC2, S3, ELB) created to run your application',
        'Per line of application code deployed',
        'A flat fee per Git commit pushed'
      ],
      correct: 1,
      explanation: 'Elastic Beanstalk is free to use. You pay only for the AWS resources (such as Amazon EC2 instances, EBS volumes, and load balancers) created to store and run your application.'
    },
    {
      id: 'eb-b3', level: 'beginner',
      question: 'In Elastic Beanstalk terminology, what is an Application Version?',
      options: [
        'An IAM policy assigned to the server instance',
        'A specific, labeled iteration of deployable code (e.g., a zip file or WAR archive stored in Amazon S3)',
        'An operating system kernel version',
        'The version number of the AWS Management Console UI'
      ],
      correct: 1,
      explanation: 'An Application Version refers to a specific, labeled iteration of deployable code for a web application. It points to an Amazon S3 object containing deployable code like a Java WAR file or Node.js zip archive.'
    },
    {
      id: 'eb-b4', level: 'beginner',
      question: 'What are the two primary environment tiers supported by Elastic Beanstalk?',
      options: [
        'Web Server Environment Tier and Worker Environment Tier',
        'Frontend Tier and Database Tier',
        'Standard Tier and Enterprise Tier',
        'Public Tier and Isolated Tier'
      ],
      correct: 0,
      explanation: 'Elastic Beanstalk supports two environment tiers: Web Server Environment Tier (handles HTTP/HTTPS requests from clients via an ELB) and Worker Environment Tier (processes background tasks pulled from an Amazon SQS queue).'
    },
    {
      id: 'eb-b5', level: 'beginner',
      question: 'What configuration file directory can you include in your source code root to customize and configure Elastic Beanstalk environments automatically?',
      options: [
        '.aws/credentials',
        '.ebextensions/ containing YAML or JSON `.config` files',
        '.docker/daemon.json',
        'bin/config.sh'
      ],
      correct: 1,
      explanation: 'You can add `.ebextensions` folder to your web application source code containing `.config` files (YAML or JSON) to configure AWS resources, run shell commands, install software packages, and adjust environment variables.'
    },
    {
      id: 'eb-b6', level: 'beginner',
      question: 'What command-line tool is specifically designed for developers to create, manage, and deploy Elastic Beanstalk environments from their terminal?',
      options: [
        'git push origin master',
        'The EB CLI (`eb init`, `eb create`, `eb deploy`)',
        'docker run -d',
        'kubectl apply -f'
      ],
      correct: 1,
      explanation: 'The EB CLI is a dedicated command line interface designed specifically for Elastic Beanstalk. Common commands include `eb init`, `eb create`, `eb deploy`, `eb status`, and `eb logs`.'
    },
    {
      id: 'eb-b7', level: 'beginner',
      question: 'What happens to the underlying EC2 instances, load balancers, and security groups when an Elastic Beanstalk environment is terminated?',
      options: [
        'They continue running indefinitely and must be deleted one by one in their respective service consoles',
        'Elastic Beanstalk automatically deletes and cleans up all associated resources created for that environment',
        'All your S3 buckets are permanently purged',
        'The AWS account is placed on temporary suspension'
      ],
      correct: 1,
      explanation: 'When an environment is terminated, Elastic Beanstalk terminates and cleans up all the AWS resources that were provisioned for that environment (EC2 instances, ELB, Auto Scaling group, CloudWatch alarms).'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'eb-i1', level: 'intermediate',
      question: 'Which deployment policy in Elastic Beanstalk deploys new code to a batch of instances, but reduces overall serving capacity during the deployment process?',
      options: [
        'All at once',
        'Rolling',
        'Rolling with additional batch',
        'Immutable'
      ],
      correct: 1,
      explanation: 'With Rolling deployments, Beanstalk splits instances into batches and updates one batch at a time. Serving capacity is reduced by the batch size during deployment because the batch being updated is temporarily out of service.'
    },
    {
      id: 'eb-i2', level: 'intermediate',
      question: 'Which deployment policy in Elastic Beanstalk launches an extra batch of instances before taking any old instances out of service, guaranteeing 100% capacity throughout the deployment?',
      options: [
        'All at once',
        'Rolling with additional batch',
        'Traffic splitting',
        'In-place single instance'
      ],
      correct: 1,
      explanation: 'Rolling with additional batch deploys new code in batches, but first provisions a new batch of instances so that the application maintains 100% full capacity throughout the entire deployment phase.'
    },
    {
      id: 'eb-i3', level: 'intermediate',
      question: 'What is an Immutable deployment in Elastic Beanstalk?',
      options: [
        'A deployment that can never be updated once launched',
        'A deployment that launches an entirely new Auto Scaling group with new instances alongside the existing group, validates health, shifts traffic, and then terminates the old group',
        'A deployment that writes code directly to read-only optical disks',
        'A deployment that locks database schemas permanently'
      ],
      correct: 1,
      explanation: 'Immutable deployments perform a safe in-place update by launching a temporary Auto Scaling group with new instances, verifying their health, and then merging them into the main ASG while terminating old instances. If anything fails, rollback is as simple as terminating the temporary instances.'
    },
    {
      id: 'eb-i4', level: 'intermediate',
      question: 'How does an Elastic Beanstalk Worker Environment process background jobs?',
      options: [
        'It scrapes external web pages continuously over HTTP',
        'It runs the SQS daemon (`sqsd`), which polls an Amazon SQS queue for messages and POSTs each message payload locally to `http://localhost/` on the worker instance',
        'It monitors CloudTrail API logs for admin logins',
        'It reads incoming emails from SES'
      ],
      correct: 1,
      explanation: 'Worker environments include the AWS SQS daemon (`sqsd`). The daemon polls the SQS queue for messages and forwards them as HTTP POST requests to `http://localhost/` (or a configured endpoint) for local processing by the web app.'
    },
    {
      id: 'eb-i5', level: 'intermediate',
      question: 'Why is decoupling an Amazon RDS database from the Elastic Beanstalk environment lifecycle strongly recommended for production applications?',
      options: [
        'Beanstalk does not support RDS instances',
        'If an RDS database is created inside the Beanstalk environment, terminating or re-creating the Beanstalk environment will delete the database and all its data',
        'Databases created inside Beanstalk cannot use SSD storage',
        'RDS cannot communicate with EC2 instances in the same VPC'
      ],
      correct: 1,
      explanation: 'Creating an RDS instance as part of the Beanstalk environment couples its lifecycle to the environment: deleting the environment deletes the DB. For production, provision RDS independently and connect via environment variables.'
    },
    {
      id: 'eb-i6', level: 'intermediate',
      question: 'How does Blue/Green deployment work with Elastic Beanstalk to achieve zero-downtime updates and instant rollback?',
      options: [
        'By painting the EC2 chassis blue and green',
        'By deploying the new application version to a separate clone environment and then swapping the CNAME environment URLs in the Beanstalk console',
        'By updating the DNS nameservers at the domain registrar every hour',
        'By rebooting the Elastic Load Balancer'
      ],
      correct: 1,
      explanation: 'With Beanstalk Swap Environment CNAMEs, you deploy v2 to an independent environment. Once validated, you swap CNAMEs: Route 53 DNS seamlessly points traffic to the new environment instantly with zero downtime.'
    },
    {
      id: 'eb-i7', level: 'intermediate',
      question: 'What is the role of the `Procfile` in an Elastic Beanstalk application root (especially for Node.js, Python, or Go)?',
      options: [
        'It configures the CPU clock frequency of the EC2 instance',
        'It explicitly specifies the command or entrypoint process that Elastic Beanstalk should run to start your application (e.g., `web: node server.js`)',
        'It stores database passwords and API keys',
        'It configures the Linux firewall rules for SSH'
      ],
      correct: 1,
      explanation: 'A `Procfile` is a text file in your source bundle root that tells Beanstalk how to run your application executable (e.g. `web: npm start` or `web: gunicorn --bind :5000 --workers 3 wsgi:app`).'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'eb-a1', level: 'advanced',
      question: 'A company requires canary testing of a new application version on Elastic Beanstalk before committing 100% of user traffic. Which deployment method satisfies this natively?',
      options: [
        'All at once deployment with 5-minute cooldown',
        'Traffic Splitting deployment on an Application Load Balancer, routing a small percentage (e.g., 10%) of incoming traffic to the new version while monitoring CloudWatch health metrics',
        'Rolling deployment with batch size of 100%',
        'Manual IP address remapping in the router'
      ],
      correct: 1,
      explanation: 'Traffic Splitting allows you to conduct canary testing by routing a configurable percentage of live production traffic to the new version. If health degrades, Beanstalk automatically aborts and routes all traffic back to the original version.'
    },
    {
      id: 'eb-a2', level: 'advanced',
      question: 'What is the exact execution order of commands and hooks when Elastic Beanstalk boots and configures an Amazon Linux 2 / 2023 platform instance?',
      options: [
        'User application runs first, then OS packages are installed',
        '`.ebextensions` (packages, groups, users, sources, files, commands, services) run during instance provisioning, followed by platform hooks in `/opt/elasticbeanstalk/hooks/` and application deployment',
        'Container starts in Docker before the EC2 instance receives an IP address',
        'CloudWatch agent runs after the user logs in via SSH'
      ],
      correct: 1,
      explanation: 'Elastic Beanstalk executes `.ebextensions` configuration directives in a specific order: packages, groups, users, sources, files, commands, services, and container_commands, followed by the platform hooks scripts.'
    },
    {
      id: 'eb-a3', level: 'advanced',
      question: 'In `.ebextensions`, what is the critical difference between `commands` and `container_commands`?',
      options: [
        '`commands` run after the application code is extracted; `container_commands` run before packages are installed',
        '`commands` run early in the setup process before application and web server code are unpacked; `container_commands` run from the application staging directory after code is extracted, right before the application is deployed, and support `leader_only: true`',
        '`container_commands` are only supported on Docker platforms',
        '`commands` require root access, while `container_commands` run as guest user'
      ],
      correct: 1,
      explanation: '`container_commands` execute from the staging directory after source code is extracted, allowing database migrations (with `leader_only: true` so only one instance runs migration) and build steps.'
    },
    {
      id: 'eb-a4', level: 'advanced',
      question: 'How can you deploy a multi-container Docker application on AWS Elastic Beanstalk?',
      options: [
        'Place multiple `.war` files in the zip root',
        'Provide a `Dockerrun.aws.json` (v2 for ECS) file describing container definitions, port mappings, and links across multiple Docker containers',
        'Multi-container Docker is not supported on Elastic Beanstalk',
        'Install Kubernetes directly via an `.ebextensions` shell script'
      ],
      correct: 1,
      explanation: 'For multi-container deployments, Elastic Beanstalk uses Amazon ECS under the hood, configured via a `Dockerrun.aws.json` file specifying container images, environment variables, ports, and volume mounts.'
    },
    {
      id: 'eb-a5', level: 'advanced',
      question: 'What is Elastic Beanstalk Enhanced Health Reporting?',
      options: [
        'A medical insurance plan for cloud engineers',
        'A monitoring system that collects operating system metrics (CPU, memory, disk, network) and web server HTTP status codes (2xx, 3xx, 4xx, 5xx) and latency from instances, assigning health statuses like OK, Info, Warning, Degraded, and Severe',
        'A tool that pings the AWS data center physical temperature',
        'A metric that measures line-of-code churn per developer'
      ],
      correct: 1,
      explanation: 'Enhanced Health Reporting uses a health agent on instances to analyze web server logs, HTTP response latency, and system resource metrics to evaluate environment health across granular states (OK, Warning, Degraded, Severe).'
    },
    {
      id: 'eb-a6', level: 'advanced',
      question: 'When migrating an Elastic Beanstalk environment from a single-instance architecture (no load balancer) to a load-balanced architecture, how must this change be performed?',
      options: [
        'Toggle the "Load Balancer" checkbox in the live single-instance environment settings',
        'Single-instance environments cannot be directly changed to load-balanced in-place; you must create a new load-balanced environment and use CNAME swap or DNS redirection to migrate traffic',
        'Delete the EC2 instance and attach an ALB via AWS CLI',
        'Reboot the Beanstalk platform'
      ],
      correct: 1,
      explanation: 'Elastic Beanstalk environment type (Single Instance vs Load Balanced) cannot be changed in-place. The recommended solution is to clone or create a new environment configured with a Load Balancer and perform a CNAME swap.'
    }
  ]
};
