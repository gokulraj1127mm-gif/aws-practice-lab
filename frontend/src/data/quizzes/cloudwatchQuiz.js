// CloudWatch Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const cloudwatchQuiz = {
  id: 'cloudwatch',
  service: 'Amazon CloudWatch',
  icon: 'Activity',
  color: 'purple',
  questions: [
    {
      id: 'cw-b1', level: 'beginner',
      question: 'What is Amazon CloudWatch?',
      options: ['A code deployment pipeline service', 'An observability and monitoring service for AWS resources and applications — collecting metrics, logs, and events to provide visibility and alerting', 'A content delivery network for static assets', 'A managed container orchestration service'],
      correct: 1,
      explanation: 'Amazon CloudWatch is the AWS observability platform. It collects metrics (numerical data about AWS resources), logs (application and system event records), and events (operational changes), providing dashboards, alarms, and automated actions to maintain system health.'
    },
    {
      id: 'cw-b2', level: 'beginner',
      question: 'What is a CloudWatch Metric?',
      options: ['A log entry recording a specific application event', 'A numerical time-series data point representing resource performance (CPU utilization, network bytes, request count) at a specific time, identified by namespace, metric name, and dimensions', 'An alert notification sent when a threshold is breached', 'A configuration parameter for an AWS service'],
      correct: 1,
      explanation: 'CloudWatch Metrics are time-ordered sets of data points. Each metric has a Namespace (e.g., AWS/EC2), MetricName (e.g., CPUUtilization), Dimensions (e.g., InstanceId=i-xxx), and timestamp+value data points. Metrics are retained for: 3 hours (1-second period), 15 days (1-minute), 63 days (5-minute), 455 days (1-hour).'
    },
    {
      id: 'cw-b3', level: 'beginner',
      question: 'What is a CloudWatch Alarm?',
      options: ['A real-time dashboard widget showing live metric graphs', 'A resource that monitors a metric over time and takes an action (SNS notification, EC2 Auto Scaling, EC2 stop/reboot) when the metric crosses a defined threshold for a specified number of evaluation periods', 'A log filter pattern that highlights critical error messages', 'An IAM policy that restricts CloudWatch access to authorized users'],
      correct: 1,
      explanation: 'A CloudWatch Alarm watches a single metric (or math expression). It has three states: OK (metric is within threshold), ALARM (threshold breached for N consecutive periods), INSUFFICIENT_DATA (not enough data). Actions include: SNS email/SMS notifications, EC2 auto scaling, EC2 instance actions (stop, terminate, reboot).'
    },
    {
      id: 'cw-b4', level: 'beginner',
      question: 'What is the default CloudWatch metric resolution (collection interval) for most AWS services?',
      options: ['1 second (high resolution)', '5 minutes (standard resolution)', '1 minute (basic monitoring)', '15 minutes (standard monitoring)'],
      correct: 1,
      explanation: 'By default, most AWS services publish metrics to CloudWatch at 5-minute intervals (basic monitoring). EC2 detailed monitoring reduces this to 1 minute at additional cost. Custom metrics can be published at 1-minute (standard) or 1-second (high resolution) intervals.'
    },
    {
      id: 'cw-b5', level: 'beginner',
      question: 'CloudWatch Logs is used for:',
      options: ['Storing EC2 EBS snapshot backups', 'Centrally collecting, monitoring, and storing log files from EC2 instances, Lambda functions, and other AWS services for querying, filtering, and archiving', 'Tracking IAM user API activity', 'Monitoring network packet flows between VPC subnets'],
      correct: 1,
      explanation: 'CloudWatch Logs enables centralized log management from any AWS service or custom application using the CloudWatch Logs agent or Lambda log delivery. Features: Log Groups (per application), Log Streams (per source), metric filters, retention policies (1 day to 10 years), and Logs Insights for interactive queries.'
    },
    {
      id: 'cw-b6', level: 'beginner',
      question: 'What is a CloudWatch Dashboard?',
      options: ['A cost reporting interface showing monthly AWS spending', 'A customizable visual display of CloudWatch metrics and alarms across resources and regions using widgets (graphs, numbers, text)', 'An automated remediation workflow triggered by metric alarms', 'A compliance report generated from CloudWatch logs'],
      correct: 1,
      explanation: 'CloudWatch Dashboards are customizable web pages displaying metrics and alarms using widgets: line/bar/stacked area graphs, number displays, alarm status widgets, and custom text. Cross-region and cross-account metrics can be displayed on a single dashboard. Dashboards are free (3 per month), additional dashboards cost $3/month each.'
    },
    {
      id: 'cw-b7', level: 'beginner',
      question: 'What must you do to enable CloudWatch metric collection from within an EC2 instance (e.g., memory utilization, disk usage)?',
      options: ['Enable detailed monitoring in the EC2 console — it automatically collects all OS metrics', 'Install and configure the CloudWatch Agent on the EC2 instance — default EC2 metrics are hypervisor-level only, memory and disk require in-instance agent collection', 'Create a CloudWatch metric filter on EC2 system logs', 'Enable VPC Flow Logs which automatically includes OS-level metrics'],
      correct: 1,
      explanation: 'Default EC2 CloudWatch metrics come from the hypervisor: CPU, Network, Disk I/O (not filesystem usage). The CloudWatch Agent must be installed on the OS to collect: memory utilization, disk space usage, swap, per-process metrics, and custom application metrics. The agent is configured via SSM Parameter Store for fleet-wide deployment.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'cw-i1', level: 'intermediate',
      question: 'CloudWatch Logs Insights supports which query syntax and what can it analyze?',
      options: ['Standard SQL SELECT statements querying log data stored in RDS', 'A proprietary query language with commands like fields, filter, stats, sort, limit — analyzes structured and unstructured CloudWatch log data in place without requiring ETL or index creation', 'Elasticsearch DSL queries for full-text log search', 'AWS Athena SQL queries against log files in S3'],
      correct: 1,
      explanation: 'CloudWatch Logs Insights uses its own query language: fields (project log fields), filter (filter records by pattern/value), stats (aggregate — count, avg, sum, min, max), sort (order results), limit (cap results), parse (extract custom fields from log strings). Automatically indexes all log fields. Pay per query (GB of data scanned).'
    },
    {
      id: 'cw-i2', level: 'intermediate',
      question: 'What is CloudWatch Contributor Insights and what problem does it solve?',
      options: ['A cost anomaly detection service that identifies unusual spending patterns', 'A rule-based feature that analyzes CloudWatch Logs data to identify the top contributors (highest contributors to observed performance issues) — e.g., top 10 IPs generating 404 errors, top latency-contributing customers or API paths', 'A ML-powered forecasting tool that predicts future metric values based on historical trends', 'A dashboard widget comparing multiple AWS account metrics side by side'],
      correct: 1,
      explanation: 'CloudWatch Contributor Insights analyzes high-cardinality log data to find top N contributors to a metric or event. Use cases: identify top IP addresses generating the most errors (DDoS detection), highest-latency API customers, most active Lambda functions. It continuously processes streaming log data and updates top-N rankings in real time.'
    },
    {
      id: 'cw-i3', level: 'intermediate',
      question: 'How does CloudWatch Anomaly Detection work?',
      options: ['It applies predefined threshold rules to detect when metrics exceed static limits', 'It uses machine learning to analyze metric history and create a dynamic expected band. Alarms trigger when the metric falls outside this adaptive band, accounting for seasonality (daily/weekly patterns) without requiring manual threshold configuration', 'It monitors CloudTrail events to detect suspicious API activity patterns', 'It compares metrics to AWS industry benchmarks for the same instance type'],
      correct: 1,
      explanation: 'CloudWatch Anomaly Detection trains a ML model on at least 2 weeks of metric history, learning time-of-day and day-of-week patterns. It creates an upper/lower band of expected values. Alarms can be set to trigger when metrics deviate from this band by a configurable standard deviation number — much more adaptive than static thresholds for dynamic workloads.'
    },
    {
      id: 'cw-i4', level: 'intermediate',
      question: 'What is a CloudWatch Metric Filter?',
      options: ['A filter that reduces the number of metrics stored to control costs', 'A pattern applied to a CloudWatch Log Group that searches for specific text (e.g., ERROR, "HTTP 500") and publishes a custom metric based on match count — enabling alarms on log data', 'A CloudWatch alarm condition that filters out false-positive breaches during maintenance windows', 'A CloudWatch dashboard filter restricting which time periods are displayed'],
      correct: 1,
      explanation: 'Metric Filters search log streams for specific patterns (literal strings, JSON fields, space-delimited log formats, or regex). When a pattern matches, it increments a custom CloudWatch metric. Example: filter for "ERROR" in application logs → metric ErrorCount → alarm when ErrorCount > 10 per minute → SNS notification. This bridges unstructured logs and CloudWatch alarms.'
    },
    {
      id: 'cw-i5', level: 'intermediate',
      question: 'CloudWatch EventBridge (formerly CloudWatch Events) serves what function?',
      options: ['Real-time log streaming from CloudWatch Logs to external SIEM systems', 'A serverless event bus that receives events from AWS services, custom applications, and SaaS partners, routing them to targets (Lambda, SQS, Step Functions, Kinesis) based on rules — enabling event-driven automation', 'A feature for aggregating metrics across multiple accounts into a single pane of glass', 'A DLQ-like service for failed CloudWatch alarm notifications'],
      correct: 1,
      explanation: 'Amazon EventBridge routes events from 200+ AWS services (EC2 state changes, S3 events, CodePipeline stages) and custom application events to Lambda, Step Functions, SQS, SNS, and more. Use cases: auto-remediation (EC2 instance terminated → trigger Lambda to launch replacement), scheduled cron jobs, and cross-account event sharing via event buses.'
    },
    {
      id: 'cw-i6', level: 'intermediate',
      question: 'What is CloudWatch Application Insights?',
      options: ['A manual monitoring setup guide for common AWS application stacks', 'An automated observability feature that discovers and configures monitoring for .NET, Java, SQL, and other application stacks — automatically creating CloudWatch dashboards and alarms based on detected resource dependencies and problem patterns', 'A performance profiling tool embedded in the CloudWatch Agent for in-process code analysis', 'A log analytics service that visualizes application error trends in real time'],
      correct: 1,
      explanation: 'CloudWatch Application Insights discovers resources in your application (EC2, ELB, RDS, Lambda) and automatically configures monitoring using preconfigured anomaly detectors, metric alarms, and log patterns specific to your stack (ASP.NET, Java EE, SQL Server, etc.). It correlates related alarms into "problems" and provides intelligent insights for faster debugging.'
    },
    {
      id: 'cw-i7', level: 'intermediate',
      question: 'What is the difference between CloudWatch and AWS X-Ray?',
      options: ['CloudWatch is for infrastructure metrics; X-Ray is exclusively for Lambda functions', 'CloudWatch monitors infrastructure-level metrics, logs, and alarms. X-Ray provides distributed tracing — tracking requests as they flow through microservices, identifying latency bottlenecks, error rates per service, and dependency maps for complex distributed applications', 'X-Ray is cheaper than CloudWatch for log storage; they have identical metric functionality', 'CloudWatch collects data within one region; X-Ray is a multi-region observability service'],
      correct: 1,
      explanation: 'CloudWatch: infrastructure metrics (CPU, memory, network), logs, alarms. X-Ray: application-level distributed tracing, request segments and subsegments, service map visualization, response time percentile analysis. Together they form a complete observability solution: CloudWatch for infrastructure health, X-Ray for request-level application behavior and latency analysis across microservices.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'cw-a1', level: 'advanced',
      question: 'How do you architect a CloudWatch cross-account observability solution for 50 AWS accounts in an AWS Organization?',
      options: ['Create CloudWatch dashboards in each account independently and bookmark all URLs', 'Use CloudWatch cross-account cross-region dashboards with sharing enabled via IAM role delegation to a central monitoring account', 'Use CloudWatch Observability Access Manager (OAM) to create a monitoring account as a sink, link all 50 source accounts to it, then use unified CloudWatch dashboards/alarms/Logs Insights in the monitoring account to query data from all accounts without data egress costs', 'Export all CloudWatch metrics to S3 via Firehose and use Athena from a central account'],
      correct: 2,
      explanation: 'CloudWatch OAM (Observability Access Manager): 1) Designate a central monitoring account as a "sink." 2) Create links from each of 50 source accounts to the sink. 3) The monitoring account\'s CloudWatch can now query metrics, logs, and traces from all linked accounts natively. Costs are charged in source accounts. No S3 export or cross-account IAM delegation chains needed — the cleanest enterprise observability architecture.'
    },
    {
      id: 'cw-a2', level: 'advanced',
      question: 'What is the architecture for near-real-time log analysis and automated threat detection using CloudWatch?',
      options: ['CloudWatch Logs → S3 → Athena queries every 15 minutes → Lambda remediation', 'CloudWatch Logs → Metric Filters (count failed logins) → CloudWatch Alarms → SNS → Lambda (blocks offending IP via WAF/Security Group API call) — completed in under 60 seconds from log event to remediation', 'CloudWatch Logs → CloudTrail Lake → EventBridge → Step Functions state machine', 'GuardDuty findings → CloudWatch Events → SNS topic → email notification only'],
      correct: 1,
      explanation: 'Near-real-time automated threat response: Application writes failed login logs to CloudWatch. A Metric Filter counts failed_login occurrences in 1-minute windows. CloudWatch Alarm triggers when count > 10 (brute force threshold). SNS topic notifies Lambda. Lambda calls WAF API to block the offending IP or updates Security Group ingress rules. Total pipeline latency: ~30–60 seconds from log event to IP block.'
    },
    {
      id: 'cw-a3', level: 'advanced',
      question: 'Describe the CloudWatch Synthetics Canary and how it differs from CloudWatch Alarms on EC2 metrics.',
      options: ['Synthetics monitors infrastructure metrics with ML-based thresholds; Alarms use static thresholds on EC2 metrics', 'CloudWatch Synthetics runs scripted synthetic monitoring — programmatically testing API endpoints and web application flows (login, checkout) from outside your application. Unlike infrastructure alarms (which alert when EC2 CPU is high), Synthetics detects user-facing availability and functional issues that may not surface in infrastructure metrics', 'Canaries are sampling-based monitors for Lambda performance; Alarms are for RDS monitoring', 'Synthetics alarms are triggered by user traffic; CloudWatch Alarms trigger only on infrastructure events'],
      correct: 1,
      explanation: 'CloudWatch Synthetics Canaries are Puppeteer/Selenium-like scripts that run on a schedule, simulating user interactions: GET requests, form submissions, or full browser page flows. They detect: API availability (200 vs 500 responses), SSL certificate expiry (within 14 days), page load performance regression, broken business flows (checkout returning 404). Infrastructure alarms miss these user-experience-level failures — a server can be running fine while the application is broken.'
    },
    {
      id: 'cw-a4', level: 'advanced',
      question: 'For a high-traffic API serving 100,000 requests/sec, designing CloudWatch to monitor at high resolution and act within 10 seconds of a breach — what configuration is required?',
      options: ['Standard 5-minute metrics and alarm period of 1 evaluation period', 'High-resolution custom metrics published every 1 second + High-resolution alarm with a 10-second period — requires PutMetricData API calls at 1-second granularity from the application and High-Resolution Alarm configuration', 'Standard EC2 detailed monitoring (1-minute) with composite alarms combining 3 conditions', 'CloudWatch Logs Insights scheduled queries every 30 seconds feeding SNS'],
      correct: 1,
      explanation: 'Standard resolution = 5-minute minimum alarm period. For 10-second response: 1) Publish custom metrics with StorageResolution=1 (1-second resolution). 2) Create High-Resolution Alarm with Period=10 seconds. 3) Alarm evaluates every 10 seconds and can transition to ALARM state within 10 seconds of threshold breach. Cost: High-resolution metrics cost extra. Use this only for critical real-time scaling or fraud detection scenarios.'
    },
    {
      id: 'cw-a5', level: 'advanced',
      question: 'How do you implement a composite CloudWatch Alarm to reduce alert fatigue in a complex microservices architecture?',
      options: ['Create one master alarm that monitors all metrics simultaneously with OR logic', 'Use CloudWatch Composite Alarms — combine multiple child alarms using Boolean logic (AND/OR/NOT). Example: trigger "ProductionOutage" composite only when (ALB-5xx-Alarm AND RDS-HighCPU-Alarm) are simultaneously ALARM. This prevents noise from individual component hiccups alerting without a true system-wide impact', 'Use SNS filter policies to suppress alarm notifications during business hours', 'Create alarm hierarchies by nesting CloudWatch dashboards that escalate notifications'],
      correct: 1,
      explanation: 'Composite Alarms aggregate multiple child alarms using Boolean expressions: ALARM("ALB-5xx") AND (ALARM("Lambda-Error-Rate") OR ALARM("RDS-Connections-Full")). This reduces alert fatigue: individual transient spikes don\'t wake on-call engineers. Only correlated multi-component failures trigger the composite alarm. Composite Alarms support SNS actions but not EC2 or Auto Scaling actions directly.'
    },
    {
      id: 'cw-a6', level: 'advanced',
      question: 'What is the CloudWatch Embedded Metric Format (EMF) and what advantage does it provide over PutMetricData API calls?',
      options: ['EMF is a dashboard export format for sharing CloudWatch dashboards as PDF reports', 'EMF is a JSON specification embedded in structured log events that CloudWatch automatically extracts as custom metrics. Advantages: 1) Lower cost (logs are cheaper than PutMetricData). 2) High cardinality metrics (many unique dimensions). 3) Metrics AND logs in one write operation. 4) Zero PutMetricData API call limits', 'EMF is the protocol used by the CloudWatch Agent to compress metrics before transmission', 'EMF allows exporting CloudWatch metrics to external monitoring systems like Prometheus or Datadog'],
      correct: 1,
      explanation: 'EMF (Embedded Metric Format): embed structured metric data in CloudWatch Logs JSON using the _aws.CloudWatchMetrics metadata key. Lambda and ECS ship logs to CloudWatch anyway — EMF makes those logs also generate custom metrics at no extra API call cost. EMF bypasses PutMetricData\'s 150 TPS limit and supports very high cardinality dimensions (e.g., per-user-ID metrics) impossible with standard PutMetricData due to cost and API limits.'
    }
  ]
};
