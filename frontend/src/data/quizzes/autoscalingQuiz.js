// EC2 Auto Scaling Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const autoscalingQuiz = {
  id: 'autoscaling',
  service: 'EC2 Auto Scaling',
  icon: 'TrendingUp',
  color: 'emerald',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'as-b1', level: 'beginner',
      question: 'What is the primary purpose of an EC2 Auto Scaling Group (ASG)?',
      options: [
        'To automatically migrate on-premises databases to Amazon Redshift',
        'To maintain application availability by automatically adding or removing EC2 instances according to demand and health checks',
        'To automatically upgrade all instance operating systems to the latest Linux kernel',
        'To balance network traffic across AWS accounts'
      ],
      correct: 1,
      explanation: 'Amazon EC2 Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost.'
    },
    {
      id: 'as-b2', level: 'beginner',
      question: 'What are the three core capacity parameters defined on an Auto Scaling Group?',
      options: [
        'Storage, Memory, and Network Bandwidth',
        'Minimum Capacity, Desired Capacity, and Maximum Capacity',
        'Standard, Express, and Premium instances',
        'Cold, Warm, and Hot pools'
      ],
      correct: 1,
      explanation: 'An Auto Scaling group uses Minimum capacity (never scales below), Desired capacity (default operational size), and Maximum capacity (never scales above).'
    },
    {
      id: 'as-b3', level: 'beginner',
      question: 'What modern template format does AWS recommend using instead of deprecated Launch Configurations for launching EC2 instances in an ASG?',
      options: [
        'CloudFormation Parameters',
        'Launch Templates',
        'Docker Compose files',
        'IAM Instance Profiles'
      ],
      correct: 1,
      explanation: 'AWS recommends Launch Templates because they support versioning, T2/T3 unlimited mode, mixed instance types, Spot and On-Demand allocation strategies, and newer EC2 features that Launch Configurations do not support.'
    },
    {
      id: 'as-b4', level: 'beginner',
      question: 'What does EC2 Auto Scaling do when an instance in the group fails an EC2 status check or ELB health check?',
      options: [
        'Suspends all Auto Scaling activities indefinitely',
        'Terminates the unhealthy instance and launches a new replacement instance to maintain the desired capacity',
        'Sends an invoice to the root account owner',
        'Downgrades the instance type from m5 to t2.micro'
      ],
      correct: 1,
      explanation: 'When an instance becomes unhealthy, Auto Scaling automatically terminates the unhealthy instance and provisions a new one from the Launch Template to restore desired capacity.'
    },
    {
      id: 'as-b5', level: 'beginner',
      question: 'Which scaling policy type adjusts capacity automatically to keep a specific metric (like average CPU utilization) at a target value (e.g., 50%)?',
      options: [
        'Manual scaling',
        'Target Tracking Scaling policy',
        'Scheduled scaling policy',
        'Predictive scaling policy only'
      ],
      correct: 1,
      explanation: 'Target Tracking scaling policies operate like a home thermostat: you set a target value (such as 50% CPU or ALB RequestCountPerTarget), and Auto Scaling adds or removes capacity automatically to maintain that metric.'
    },
    {
      id: 'as-b6', level: 'beginner',
      question: 'What is a Scheduled Scaling policy in EC2 Auto Scaling?',
      options: [
        'Scaling that occurs randomly during quiet night hours',
        'Scaling based on predictable recurring calendar dates and times (e.g., scale up at 8:00 AM every Monday morning for work hours)',
        'Scaling triggered by unexpected traffic surges from DDoS attacks',
        'Scaling based on S3 bucket upload frequencies'
      ],
      correct: 1,
      explanation: 'Scheduled scaling allows you to scale your application automatically in anticipation of known demand spikes, such as business opening hours or annual holiday sales events.'
    },
    {
      id: 'as-b7', level: 'beginner',
      question: 'Where can an Auto Scaling Group deploy EC2 instances to achieve high availability?',
      options: [
        'Only in a single private subnet',
        'Across multiple subnets residing in different Availability Zones within the same Region',
        'Across multiple distinct AWS Regions simultaneously in a single ASG',
        'Exclusively in AWS Local Zones'
      ],
      correct: 1,
      explanation: 'An Auto Scaling group can span multiple Availability Zones (subnets) within the same AWS Region, automatically distributing instances evenly across AZs for resilience.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'as-i1', level: 'intermediate',
      question: 'What is the purpose of the Auto Scaling Cooldown Period in a Simple Scaling policy?',
      options: [
        'Allowing EC2 CPU hardware temperatures to cool down before launching software',
        'Preventing the ASG from initiating additional scaling actions before the effects of previous scaling activities take effect and metrics stabilize',
        'Delaying user HTTP responses during peak traffic',
        'Pausing CloudWatch alarms for 24 hours'
      ],
      correct: 1,
      explanation: 'The cooldown period (default 300 seconds) gives newly launched instances time to boot, warm up, and handle load before Auto Scaling checks metrics again, preventing aggressive over-scaling.'
    },
    {
      id: 'as-i2', level: 'intermediate',
      question: 'What are Auto Scaling Lifecycle Hooks used for?',
      options: [
        'Triggering automated git commits when code compiles',
        'Pausing an instance in a wait state during launch or termination so custom actions (like log extraction, software setup, or cache warming) can complete before it enters service or is destroyed',
        'Binding SSL certificates to an Application Load Balancer',
        'Encrypting EBS root volumes during shutdown'
      ],
      correct: 1,
      explanation: 'Lifecycle hooks pause instance launch (`autoscaling:EC2_INSTANCE_LAUNCHING`) or termination (`autoscaling:EC2_INSTANCE_TERMINATING`) to let you run custom scripts, download files, or drain connections before transitioning state.'
    },
    {
      id: 'as-i3', level: 'intermediate',
      question: 'What is Predictive Scaling in EC2 Auto Scaling?',
      options: [
        'A heuristic guessing game played by AWS support engineers',
        'A machine learning feature that analyzes historical traffic patterns and schedules future capacity changes in advance of recurring daily or weekly traffic cycles',
        'Terminating instances before their 1-year Reserved Instance expires',
        'A tool that estimates monthly billing changes'
      ],
      correct: 1,
      explanation: 'Predictive Scaling uses machine learning to forecast future demand patterns based on historical usage data from CloudWatch and scales out instances proactively before surges happen.'
    },
    {
      id: 'as-i4', level: 'intermediate',
      question: 'What is a Warm Pool in EC2 Auto Scaling?',
      options: [
        'A pool of instances kept in a running, stopped, or hibernated state with pre-installed software to decrease boot and initialization latency during sudden scale-out events',
        'A heated physical server enclosure in an Arctic AWS data center',
        'A collection of cached database queries stored in Redis',
        'A pool of active Elastic IP addresses waiting for assignment'
      ],
      correct: 0,
      explanation: 'A Warm Pool maintains a pool of pre-initialized EC2 instances (usually stopped to save compute costs) ready to quickly transition to the active InService state, reducing application boot time from minutes to seconds.'
    },
    {
      id: 'as-i5', level: 'intermediate',
      question: 'Which health check types can an Auto Scaling Group evaluate to determine instance health?',
      options: [
        'EC2 status checks only',
        'EC2 status checks and Elastic Load Balancing (ELB) health checks',
        'CloudTrail API logs and Route 53 DNS records',
        'S3 bucket access logs'
      ],
      correct: 1,
      explanation: 'By default, ASG uses EC2 status checks. If attached to a load balancer target group, enabling ELB health checks allows the ASG to consider an instance unhealthy if the web server fails application-level health checks.'
    },
    {
      id: 'as-i6', level: 'intermediate',
      question: 'How does Auto Scaling Default Termination Policy select which instance to terminate when scaling in across multiple Availability Zones?',
      options: [
        'It selects the newest instance launched in the fastest AZ',
        'It identifies the AZ with the most instances, then selects the instance launched from the oldest launch configuration/template (or closest to next billing hour)',
        'It terminates instances randomly using an unseeded random number generator',
        'It terminates all instances simultaneously and launches fresh ones'
      ],
      correct: 1,
      explanation: 'The default termination policy first balances instances across AZs (picks AZ with highest count), then looks for instances with the oldest launch template/configuration, and finally picks the one closest to the next billing hour.'
    },
    {
      id: 'as-i7', level: 'intermediate',
      question: 'What is Instance Scale-In Protection in an Auto Scaling Group?',
      options: [
        'A lock that prevents the physical server from being uninstalled from the rack',
        'A setting applied to specific instances that prevents the ASG from terminating them during automated scale-in events (e.g. while processing a critical batch job)',
        'A firewall rule blocking inbound port 22 SSH connections',
        'An IAM permission preventing AWS support from accessing instances'
      ],
      correct: 1,
      explanation: 'Instance scale-in protection prevents specific EC2 instances from being terminated by Auto Scaling during scale-in events, ensuring ongoing long-running operations complete safely.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'as-a1', level: 'advanced',
      question: 'A company needs to minimize compute costs for a stateless worker fleet by using Spot Instances while guaranteeing base baseline capacity. How should the Auto Scaling Group be configured?',
      options: [
        'Create two separate ASGs in different regions',
        'Use an ASG with Launch Template specifying a Mixed Instances Policy: define a base number of On-Demand Instances, and satisfy remaining capacity with a diversified Spot allocation strategy (e.g., capacity-optimized)',
        'Purchase 100% On-Demand instances with 3-year all-upfront Reserved Instances',
        'Run the workers on Dedicated Hosts'
      ],
      correct: 1,
      explanation: 'A Mixed Instances Policy in an ASG allows blending On-Demand and Spot instances across multiple instance types, setting a base On-Demand capacity and filling additional scale with Spot instances using the capacity-optimized strategy to minimize interruptions.'
    },
    {
      id: 'as-a2', level: 'advanced',
      question: 'What is the Step Scaling policy, and how does it differ from a Simple Scaling policy?',
      options: [
        'Step scaling only scales down, never up',
        'Step scaling applies proportional scaling adjustments based on the size of the metric alarm breach (e.g., +1 instance if CPU 50-70%, +3 instances if CPU > 70%) and does not enforce a rigid cooldown period during subsequent alarms',
        'Step scaling requires human confirmation via an SNS email link for each step',
        'Step scaling relies entirely on AWS Lambda execution counters'
      ],
      correct: 1,
      explanation: 'Step scaling responds with graduated adjustments based on step adjustments (magnitude of the metric breach) and continues responding to additional alarm breaches without being blocked by cooldown timers.'
    },
    {
      id: 'as-a3', level: 'advanced',
      question: 'When an Auto Scaling Lifecycle Hook is active, how does the instance or custom automation notify Auto Scaling that processing is finished so the lifecycle action can conclude?',
      options: [
        'By calling the `CompleteLifecycleAction` API with result `CONTINUE` or `ABANDON`',
        'By rebooting the EC2 instance three times consecutively',
        'By deleting the Launch Template version',
        'By executing `sudo shutdown -h now`'
      ],
      correct: 0,
      explanation: 'The instance or automated script (such as an SSM Run Command or Lambda function) invokes `CompleteLifecycleAction` with `LifecycleActionResult=CONTINUE`, allowing the ASG to proceed immediately without waiting for the timeout.'
    },
    {
      id: 'as-a4', level: 'advanced',
      question: 'What is the Auto Scaling Instance Refresh feature used for?',
      options: [
        'Rebooting instances every night at midnight to clear temporary OS memory leaks',
        'Orchestrating rolling updates of instances in an ASG to a new Launch Template version (AMI or user data update) while respecting minimum healthy percentage thresholds',
        'Upgrading instances from EBS to NVMe physical storage',
        'Converting EC2 instances into AWS Lambda serverless functions'
      ],
      correct: 1,
      explanation: 'Instance Refresh automates phased rolling updates of instances when you update an AMI or launch template. It replaces instances in batches while maintaining minimum healthy capacity and checking health before continuing.'
    },
    {
      id: 'as-a5', level: 'advanced',
      question: 'An Auto Scaling group is processing messages from an Amazon SQS queue. Why is scaling directly on SQS `ApproximateNumberOfMessagesVisible` alone problematic, and what is the recommended metric?',
      options: [
        'SQS queues do not report metrics to CloudWatch',
        'The raw message count does not account for the number of active instances. The recommended custom metric is `Backlog Per Instance` (ApproximateNumberOfMessagesVisible / InService instances) to scale proportionally',
        'SQS messages cannot be consumed by EC2 instances in an ASG',
        'CloudWatch charges $10 per SQS metric reading'
      ],
      correct: 1,
      explanation: 'If message count is 100 with 1 instance, you need to scale up; if it is 100 with 50 instances, each instance only has 2 messages. Scaling on "Backlog per Instance" ensures scaling is proportional to actual processing capacity.'
    },
    {
      id: 'as-a6', level: 'advanced',
      question: 'Which Auto Scaling termination policy option should be selected if you want to ensure that instances running in older Launch Template versions are replaced first before any newer versions?',
      options: [
        'OldestInstance',
        'OldestLaunchConfiguration / OldestLaunchTemplate',
        'ClosestToNextInstanceHour',
        'NewestInstance'
      ],
      correct: 1,
      explanation: '`OldestLaunchTemplate` (or `OldestLaunchConfiguration`) ensures that when scaling in, the ASG terminates instances that are running older configuration versions first, speeding up fleet migration to new AMIs.'
    }
  ]
};
