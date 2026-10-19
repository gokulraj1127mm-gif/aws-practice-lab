// AWS Budgets & Cost Management Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const budgetsQuiz = {
  id: 'budgets',
  service: 'AWS Budgets & Cost Management',
  icon: 'DollarSign',
  color: 'emerald',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'bud-b1', level: 'beginner',
      question: 'What is AWS Budgets?',
      options: [
        'A banking loan application service run by Amazon',
        'A cost management tool that allows you to set custom cost and usage budgets and receive proactive alerts when costs exceed (or are forecasted to exceed) your budget thresholds',
        'A cryptocurrency wallet for AWS billing payments',
        'A tool that automatically cancels all running EC2 instances at the end of the month'
      ],
      correct: 1,
      explanation: 'AWS Budgets gives you the ability to set custom budgets that alert you when your costs or usage exceed (or are forecasted to exceed) your budgeted amount.'
    },
    {
      id: 'bud-b2', level: 'beginner',
      question: 'Which tool in the AWS Billing and Cost Management console provides visual graphs, charts, and filtering to analyze historical and current AWS spending patterns over time?',
      options: [
        'AWS Cost Explorer',
        'AWS CloudTrail Event History',
        'AWS Systems Manager Inventory',
        'Amazon CloudWatch Logs Insights'
      ],
      correct: 0,
      explanation: 'AWS Cost Explorer is a tool that enables you to visualize, understand, and manage your AWS costs and usage over time, providing up to 12 months of historical data and forecasting for up to 12 months.'
    },
    {
      id: 'bud-b3', level: 'beginner',
      question: 'What are the two alert threshold triggers supported by AWS Budgets?',
      options: [
        'Weekly and Monthly alerts',
        'Actual threshold (when current month-to-date spending exceeds X%) and Forecasted threshold (when predicted month-end spending will exceed X%)',
        'Email alerts and SMS alerts only',
        'Credit card approval and bank wire confirmation'
      ],
      correct: 1,
      explanation: 'AWS Budgets lets you trigger alerts on both Actual spending (e.g., alert when actual cost reaches 85% of budget) and Forecasted spending (e.g., alert if forecasted cost is predicted to exceed 100% before month end).'
    },
    {
      id: 'bud-b4', level: 'beginner',
      question: 'What is the AWS Free Tier, and what are its three primary offer types?',
      options: [
        'An illegal software cracking technique',
        'Free access to select AWS services, categorized into: Always Free, 12 Months Free (for new accounts), and Short-term Trials',
        'A 50% discount for non-profit organizations',
        'Unlimited free compute on GPU instances'
      ],
      correct: 1,
      explanation: 'AWS Free Tier offers three types of free services: Always Free (e.g., 1M Lambda requests/month, 25 GB DynamoDB), 12 Months Free (750 hrs t2/t3.micro, 5 GB S3), and Trials (short-term service trials).'
    },
    {
      id: 'bud-b5', level: 'beginner',
      question: 'What is a Cost Allocation Tag in AWS?',
      options: [
        'A physical barcode glued to an on-premises rack',
        'A key-value pair metadata tag (such as `Environment: Production` or `Department: Finance`) assigned to AWS resources that appears on your billing reports to track and categorize costs by department or project',
        'A discount coupon code applied at checkout',
        'An encryption key used to protect credit card data'
      ],
      correct: 1,
      explanation: 'Cost Allocation Tags are key-value pairs you apply to resources. Once activated in the Billing console, they appear in AWS Cost Explorer and Cost and Usage Reports to organize spending by project, owner, or environment.'
    },
    {
      id: 'bud-b6', level: 'beginner',
      question: 'What is the purpose of the AWS Pricing Calculator?',
      options: [
        'To file annual corporate tax returns',
        'A web-based planning tool that allows architects and developers to model proposed architectures and estimate their expected monthly AWS costs before provisioning any resources',
        'To calculate Bitcoin mining profitability',
        'To verify the mathematical accuracy of AWS invoices'
      ],
      correct: 1,
      explanation: 'AWS Pricing Calculator (calculator.aws) is a free web-based modeling tool that lets you explore AWS services and create detailed cost estimates based on your architecture requirements.'
    },
    {
      id: 'bud-b7', level: 'beginner',
      question: 'Which service can alert you when your AWS Free Tier limits are close to being exceeded?',
      options: [
        'AWS Trusted Advisor Free Tier check & AWS Free Tier usage alerts (enabled in Billing Preferences)',
        'Amazon Route 53 Health Checks',
        'AWS Shield Advanced alerts',
        'Amazon Inspector assessment reports'
      ],
      correct: 0,
      explanation: 'AWS Free Tier usage alerts automatically notify you via email when your account usage approaches or exceeds AWS Free Tier service limits.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'bud-i1', level: 'intermediate',
      question: 'What is Consolidated Billing in AWS Organizations?',
      options: [
        'Combining your AWS bill with your home electric bill',
        'A billing feature that combines spending across all member accounts into a single bill paid by the management account, pooling usage to qualify for higher-tier volume discounts across accounts',
        'Splitting an invoice evenly among all IAM users',
        'Requiring all payments to be made in gold bullion'
      ],
      correct: 1,
      explanation: 'Consolidated Billing combines usage across all member accounts in an AWS Organization, allowing tiered services (like S3 and EC2 volume tiers) to share pricing thresholds and qualify for steeper volume discounts.'
    },
    {
      id: 'bud-i2', level: 'intermediate',
      question: 'What is the AWS Cost and Usage Report (AWS CUR)?',
      options: [
        'A one-page summary mailed to company headquarters',
        'The most comprehensive, granular billing dataset provided by AWS, delivering hourly or daily line-item records of every resource, tag, rate, and operation to an Amazon S3 bucket for analysis (often queried with Athena and QuickSight)',
        'A real-time ticker tape of AWS stock prices',
        'A list of employee expense reports'
      ],
      correct: 1,
      explanation: 'AWS CUR is the single most detailed source of raw billing data available. It writes comprehensive CSV/Parquet files to an S3 bucket with hourly line-item breakdowns of every resource and cost allocation tag.'
    },
    {
      id: 'bud-i3', level: 'intermediate',
      question: 'What are AWS Savings Plans, and how do they differ from Reserved Instances (RIs)?',
      options: [
        'Savings Plans offer cash rebates mailed at the end of the year',
        'Savings Plans offer significant discounts (up to 72%) in exchange for a commitment to a consistent amount of usage (measured in $/hour, e.g., $10/hr) for a 1- or 3-year term, offering greater flexibility across instance families, OS, and services (Compute Savings Plans apply to EC2, Fargate, and Lambda)',
        'Savings Plans are only available to Fortune 500 companies',
        'Savings Plans require upfront cash payments only'
      ],
      correct: 1,
      explanation: 'Savings Plans provide flexible pricing based on a commitment to a steady hourly spend ($/hr). Compute Savings Plans apply automatically across EC2 instances regardless of family, OS, or Region, and extend to AWS Fargate and Lambda.'
    },
    {
      id: 'bud-i4', level: 'intermediate',
      question: 'What is AWS Compute Optimizer?',
      options: [
        'A tool that overclocks server processors in data centers',
        'A machine learning service that analyzes historical CloudWatch utilization metrics to recommend optimal AWS compute resources (EC2 rightsizing, EBS volumes, Lambda memory, Auto Scaling groups) to reduce costs and improve performance',
        'A compiler that minifies JavaScript files',
        'A network compression algorithm for VPCs'
      ],
      correct: 1,
      explanation: 'AWS Compute Optimizer uses machine learning to analyze historical resource utilization (CPU, memory, storage, network) and identifies over-provisioned or under-provisioned resources with specific rightsizing recommendations.'
    },
    {
      id: 'bud-i5', level: 'intermediate',
      question: 'What is an AWS Budgets Action?',
      options: [
        'A lawsuit filed against AWS for unexpected charges',
        'An automated response configured in AWS Budgets that executes when a budget threshold is breached (such as applying an IAM policy, moving instances into a target group, or stopping EC2/RDS instances) via an IAM role',
        'An automated refund granted by AWS customer service',
        'A manual email sent to the AWS account manager'
      ],
      correct: 1,
      explanation: 'AWS Budgets Actions allow you to define actions that automatically execute when a budget threshold is exceeded, such as applying a Service Control Policy (SCP) to deny new resource launches or stopping EC2/RDS instances.'
    },
    {
      id: 'bud-i6', level: 'intermediate',
      question: 'What is AWS Cost Anomaly Detection?',
      options: [
        'A tool that flags stolen credit cards',
        'An advanced machine learning feature that continuously monitors spending patterns, identifies unexpected billing spikes or atypical cost anomalies, and provides root cause analysis directly to Slack, email, or SNS',
        'A firewall rule blocking international traffic',
        'A manual audit conducted by Ernst & Young'
      ],
      correct: 1,
      explanation: 'AWS Cost Anomaly Detection uses machine learning to identify anomalous spending and determine root causes (such as which service, account, or region caused the spike), alerting teams before costs spiral.'
    },
    {
      id: 'bud-i7', level: 'intermediate',
      question: 'Which AWS service provides automated checks across 5 categories: Cost Optimization, Security, Fault Tolerance, Performance, and Service Quotas?',
      options: [
        'AWS Trusted Advisor',
        'AWS Systems Manager Parameter Store',
        'AWS Shield Advanced',
        'Amazon GuardDuty'
      ],
      correct: 0,
      explanation: 'AWS Trusted Advisor is an online tool that acts as your customized cloud advisor, providing recommendations across Cost Optimization, Performance, Security, Fault Tolerance, and Service Quotas.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'bud-a1', level: 'advanced',
      question: 'An enterprise wants to enforce a hard cap to stop all non-production EC2 instances if monthly dev account spend reaches 120% of budget. How can this be accomplished securely with AWS Budgets?',
      options: [
        'By deleting the AWS root account',
        'Configure an AWS Budgets Action with an IAM role that executes an automated target action: "Stop EC2 or RDS instances" or attaches an SCP/IAM policy denying `ec2:RunInstances` when the actual threshold reaches 120%',
        'Hard caps are not supported and cannot be automated under any circumstances',
        'By setting credit card spending limits to zero'
      ],
      correct: 1,
      explanation: 'AWS Budgets Actions supports automated remediation: when an alert threshold is breached, it can execute an action using an assumed IAM role to automatically stop specific EC2/RDS instances or attach an IAM/SCP policy that blocks new provisioning.'
    },
    {
      id: 'bud-a2', level: 'advanced',
      question: 'What is the primary difference between EC2 Instance Savings Plans and Compute Savings Plans?',
      options: [
        'EC2 Instance Savings Plans apply to AWS Lambda, while Compute Savings Plans do not',
        'EC2 Instance Savings Plans offer higher discounts (up to 72%) but require committing to a specific instance family within a single Region (e.g., m5 in us-east-1); Compute Savings Plans offer up to 66% discount but apply flexibly across any instance family, Region, OS, tenancy, and include Fargate and Lambda',
        'Compute Savings Plans only work on Spot instances',
        'There is no difference in flexibility or discounts'
      ],
      correct: 1,
      explanation: 'Compute Savings Plans are the most flexible (any instance family, Region, OS, and covers Fargate/Lambda with up to 66% discount). EC2 Instance Savings Plans give higher savings (up to 72%) but lock you to a specific instance family in a specific Region.'
    },
    {
      id: 'bud-a3', level: 'advanced',
      question: 'How does Reserved Instance (RI) and Savings Plan discount sharing work across multiple accounts in an AWS Organization with Consolidated Billing?',
      options: [
        'Discounts can never be shared across accounts',
        'Discounts are applied first to the account that purchased the RI/Savings Plan; any unused capacity is automatically shared across other member accounts running matching workloads (unless discount sharing is explicitly disabled in billing preferences)',
        'Discounts are auctioned off to the highest bidder in the organization',
        'AWS charges a 25% fee to share discounts across accounts'
      ],
      correct: 1,
      explanation: 'By default, AWS Organizations shares RI and Savings Plan discounts across all accounts in the consolidated billing family. The purchasing account receives the benefit first, and any leftover discount is applied to other accounts running matching instances.'
    },
    {
      id: 'bud-a4', level: 'advanced',
      question: 'How do you build a serverless automated dashboard for FinOps that queries raw AWS Cost and Usage Reports (CUR) using SQL?',
      options: [
        'Export CUR to an Amazon S3 bucket in Apache Parquet format with AWS Glue Crawler enabled, which populates an AWS Glue Data Catalog table that is queried via Amazon Athena and visualized in Amazon QuickSight',
        'Print CSV files to physical paper and scan them with OCR',
        'Insert billing lines into an unindexed SQLite database inside a single Lambda function',
        'CUR cannot be queried with standard SQL'
      ],
      correct: 0,
      explanation: 'The industry-standard AWS FinOps pipeline writes CUR data to S3 in Parquet format, crawls it with AWS Glue to create a schema in the Data Catalog, queries it serverlessly with Amazon Athena, and builds dashboards in Amazon QuickSight.'
    },
    {
      id: 'bud-a5', level: 'advanced',
      question: 'What is the difference between Unblended, Blended, and Amortized costs in AWS Cost Explorer for an organization using Savings Plans or RIs?',
      options: [
        'They are different international currencies (USD, EUR, GBP)',
        'Unblended is the cash rate charged on the specific day; Blended is the averaged rate across the organization; Amortized spreads the upfront and recurring commitment fee evenly across the usage period to show the true effective economic cost of running resources',
        'Amortized cost includes estimated future taxes and inflation',
        'Blended cost excludes network data transfer fees'
      ],
      correct: 1,
      explanation: 'Amortized cost distributes upfront and monthly commitment fees evenly across the billing cycle, providing the most accurate metric to understand the true unit cost of running workloads under RIs or Savings Plans.'
    },
    {
      id: 'bud-a6', level: 'advanced',
      question: 'When configuring S3 Lifecycle policies for cost optimization, why is migrating small files (< 128 KB) to S3 Glacier Flexible Retrieval or Deep Archive counterproductive?',
      options: [
        'Glacier cannot store files smaller than 1 GB',
        'S3 Glacier storage classes add 32 KB of metadata per object (charged at Standard rates) and enforce a minimum 128 KB billable object size and minimum 90/180-day retention period, causing small files to cost MORE in Glacier than in S3 Standard',
        'AWS deletes small files automatically in Glacier',
        'Glacier charges $1 per byte for small objects'
      ],
      correct: 1,
      explanation: 'Glacier classes have a minimum billable size of 128 KB plus 32 KB metadata overhead. Archiving millions of tiny files (< 128 KB) can drastically increase costs. Best practice is to bundle/tar small objects before transitioning to Glacier.'
    }
  ]
};
