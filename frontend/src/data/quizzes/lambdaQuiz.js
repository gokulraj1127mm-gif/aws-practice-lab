// Lambda Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const lambdaQuiz = {
  id: 'lambda',
  service: 'AWS Lambda',
  icon: 'Cpu',
  color: 'amber',
  questions: [
    {
      id: 'lambda-b1', level: 'beginner',
      question: 'What is AWS Lambda?',
      options: ['A managed EC2 container orchestration service', 'A serverless compute service that runs code in response to events without provisioning or managing servers', 'A NoSQL database with serverless scaling', 'A messaging queue service for asynchronous processing'],
      correct: 1,
      explanation: 'AWS Lambda is a serverless compute service that executes your code in response to events (HTTP requests, S3 file uploads, database changes, etc.). You pay only for compute time consumed — billed in milliseconds. No servers to provision, patch, or manage.'
    },
    {
      id: 'lambda-b2', level: 'beginner',
      question: 'What is the maximum execution timeout for a Lambda function?',
      options: ['30 seconds', '5 minutes', '15 minutes', '1 hour'],
      correct: 2,
      explanation: 'Lambda functions can run for a maximum of 15 minutes (900 seconds). For longer-running workloads, use AWS Step Functions, AWS Batch, or EC2. The default timeout is 3 seconds — always configure an appropriate timeout to avoid runaway executions.'
    },
    {
      id: 'lambda-b3', level: 'beginner',
      question: 'Which Lambda memory configuration range is available?',
      options: ['64 MB to 3 GB', '128 MB to 10,240 MB (10 GB)', '256 MB to 8 GB', '512 MB to 16 GB'],
      correct: 1,
      explanation: 'Lambda memory can be configured from 128 MB to 10,240 MB (10 GB) in 1 MB increments. CPU is allocated proportionally to memory — more memory means more CPU. This also affects pricing since charges are based on memory allocation × execution duration in GB-seconds.'
    },
    {
      id: 'lambda-b4', level: 'beginner',
      question: 'What triggers Lambda functions? Select the BEST description.',
      options: ['Only HTTP API Gateway requests', 'Only scheduled cron jobs via CloudWatch Events', 'Events from AWS services (S3, SQS, SNS, DynamoDB Streams, API Gateway, EventBridge, Kinesis, etc.) or direct SDK invocations', 'Only messages from Amazon SQS queues'],
      correct: 2,
      explanation: 'Lambda integrates with many AWS services as event sources: S3 (object uploads), API Gateway (HTTP requests), SQS/SNS (messages), DynamoDB Streams (table changes), Kinesis (data streams), EventBridge (scheduled/custom events), IoT Rules, and more. You can also invoke Lambda directly via the AWS SDK or CLI.'
    },
    {
      id: 'lambda-b5', level: 'beginner',
      question: 'What programming languages does Lambda natively support?',
      options: ['Only Python and Node.js', 'Node.js, Python, Java, Go, .NET (C#), Ruby, and custom runtimes via Lambda Layers and Runtime API', 'Only compiled languages (Java, Go, C#)', 'Only scripting languages (Python, Ruby, JavaScript)'],
      correct: 1,
      explanation: 'Lambda provides managed runtimes for: Node.js (18, 20), Python (3.11, 3.12), Java (11, 17, 21), Go (1.x), .NET (8), Ruby (3.3). Custom runtimes allow any language via the Lambda Runtime API. Container images up to 10 GB are also supported for full environment control.'
    },
    {
      id: 'lambda-b6', level: 'beginner',
      question: 'How is Lambda pricing calculated?',
      options: ['Per request only, regardless of execution duration', 'Per GB of code package size', 'Per request count + duration (GB-seconds of compute time consumed)', 'Fixed monthly fee per function'],
      correct: 2,
      explanation: 'Lambda charges on two dimensions: 1) Number of requests ($0.20 per 1M requests). 2) Duration in GB-seconds (memory in GB × execution time in seconds). The free tier includes 1M requests and 400,000 GB-seconds per month — making Lambda extremely cost-effective for infrequent workloads.'
    },
    {
      id: 'lambda-b7', level: 'beginner',
      question: 'What are Lambda Environment Variables used for?',
      options: ['Storing execution logs for CloudWatch', 'Passing configuration values (API keys, database URLs, feature flags) to function code without hardcoding them in source', 'Defining the memory and timeout for each Lambda invocation', 'Setting network access rules for the function'],
      correct: 1,
      explanation: 'Environment Variables allow you to adjust function behavior without changing code. Common uses: database connection strings, API endpoint URLs, feature toggle flags. They can be encrypted at rest using AWS KMS. Never store production secrets in plaintext environment variables — use AWS Secrets Manager or Parameter Store instead.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'lambda-i1', level: 'intermediate',
      question: 'What is a Lambda Cold Start and how can you mitigate it?',
      options: ['A cold start occurs when Lambda downloads the function code from S3 on every invocation — mitigate by using smaller code packages', 'A cold start is the latency of initializing a new Lambda execution environment (downloading code, starting runtime, running init code) when no warm container exists — mitigate with Provisioned Concurrency, smaller packages, and optimizing init code', 'A cold start occurs only for Lambda functions using VPC networking and is unavoidable', 'A cold start is when Lambda scales down to zero instances after 5 minutes of inactivity and only affects Java runtimes'],
      correct: 1,
      explanation: 'Cold starts occur when Lambda creates a new execution environment: downloading the code package, starting the runtime, and running initialization code. Solutions: 1) Provisioned Concurrency (pre-warms environments, eliminates cold starts). 2) Smaller deployment packages. 3) Move heavy initialization outside the handler. 4) Use Lambda SnapStart (Java). 5) Keep functions warm with scheduled pings (less reliable).'
    },
    {
      id: 'lambda-i2', level: 'intermediate',
      question: 'Lambda Destinations vs Dead Letter Queues (DLQ) — what is the key difference?',
      options: ['DLQs support more AWS services than Destinations', 'Destinations support both success AND failure routing with result metadata (response payload included); DLQs only handle failed asynchronous invocations without the response payload', 'Destinations require SQS while DLQs support both SQS and SNS', 'They are identical in functionality, Destinations are just a newer UI alias for DLQs'],
      correct: 1,
      explanation: 'Lambda Destinations (for async invocations) route events on Success or Failure to SQS, SNS, Lambda, or EventBridge — including the function response payload for rich post-processing. DLQs only capture failed async invocations (after retries) to SQS or SNS, without the response payload. Destinations are more flexible and the recommended approach.'
    },
    {
      id: 'lambda-i3', level: 'intermediate',
      question: 'What is Provisioned Concurrency in Lambda?',
      options: ['Setting the maximum number of concurrent Lambda executions to prevent throttling', 'Pre-initializing a specified number of execution environments that are always ready to respond immediately — eliminating cold start latency at the cost of additional charges', 'Reserving Lambda instances for exclusive use by a single VPC', 'Provisioning dedicated compute hardware for Lambda functions in a specific AZ'],
      correct: 1,
      explanation: 'Provisioned Concurrency pre-warms a specific number of Lambda execution environments so they are initialized and ready to serve requests instantly. Cold starts are eliminated for those environments. This is ideal for latency-sensitive APIs. Cost: charged per GB-second of provisioned concurrency — even when not executing requests.'
    },
    {
      id: 'lambda-i4', level: 'intermediate',
      question: 'Lambda Layers serve what purpose?',
      options: ['They separate the Lambda handler code from environment variable configuration', 'They provide reusable code or dependencies (libraries, runtimes, configuration) that can be shared across multiple Lambda functions, reducing deployment package size', 'They enable Lambda functions to access private VPC resources', 'They define the order of event processing when multiple triggers invoke the same function'],
      correct: 1,
      explanation: 'Lambda Layers are ZIP archives containing libraries, custom runtimes, or other dependencies that can be referenced by multiple Lambda functions. Instead of packaging dependencies in every deployment ZIP, share layers across functions. Limits: up to 5 layers per function, combined unzipped size ≤ 250 MB.'
    },
    {
      id: 'lambda-i5', level: 'intermediate',
      question: 'When Lambda processes messages from an SQS queue (event source mapping), what happens to messages that fail processing?',
      options: ['Failed messages are immediately deleted from the queue', 'Failed messages are retried up to the queue\'s maxReceiveCount, then moved to a configured SQS Dead Letter Queue (DLQ) if configured', 'Lambda sends failed messages to CloudWatch Logs automatically', 'Failed messages are returned to the queue and retried indefinitely until successful'],
      correct: 1,
      explanation: 'When Lambda fails to process an SQS message (function error or timeout), the message becomes visible again in the SQS queue after the visibility timeout expires. After maxReceiveCount retries (configured on the SQS queue\'s redrive policy), unprocessed messages are moved to a Dead Letter Queue for investigation and manual reprocessing.'
    },
    {
      id: 'lambda-i6', level: 'intermediate',
      question: 'Lambda Concurrency — what is the difference between Reserved Concurrency and Unreserved Concurrency?',
      options: ['Reserved Concurrency enables Provisioned Concurrency; Unreserved Concurrency is for test functions only', 'Reserved Concurrency sets the maximum concurrent executions for a specific function (guaranteeing and capping it); Unreserved Concurrency is the remaining account-level concurrency pool shared by all other functions', 'Unreserved Concurrency is billed at a higher rate than Reserved Concurrency', 'Reserved Concurrency only applies to synchronous invocations; Unreserved applies to async'],
      correct: 1,
      explanation: 'Reserved Concurrency does two things: 1) Guarantees the function always has that many concurrent executions available (other functions can\'t steal it). 2) Throttles the function if it tries to exceed the reserved limit. Setting Reserved Concurrency to 0 effectively disables the function. The account starts with 1,000 concurrent executions by default (can be increased).'
    },
    {
      id: 'lambda-i7', level: 'intermediate',
      question: 'What is Lambda SnapStart and which runtime does it currently support?',
      options: ['SnapStart is a deployment acceleration feature for all runtimes that caches code packages in S3', 'SnapStart improves cold start performance for Java functions by taking a Firecracker microVM snapshot after initialization and restoring from it on subsequent invocations', 'SnapStart is available for Python and Node.js functions to cache the runtime interpreter state', 'SnapStart eliminates the need for Provisioned Concurrency for all Lambda functions'],
      correct: 1,
      explanation: 'Lambda SnapStart (currently Java 11+ corretto managed runtime) takes a snapshot of the initialized execution environment using Firecracker microVM technology. Cold starts are reduced from seconds to sub-100ms by restoring from the cached snapshot. The function init code runs once at publish, not on each cold start. It\'s free — no extra charges beyond standard Lambda pricing.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'lambda-a1', level: 'advanced',
      question: 'A Lambda function processes Kinesis Data Stream records. Processing is falling behind (GetRecords.IteratorAgeMilliseconds is high). What are the architectural solutions?',
      options: ['Increase Lambda memory to reduce processing time per record', 'Increase Kinesis shard count (enables parallel Lambda invocations per shard), use Lambda Enhanced Fan-Out for parallel processing, optimize function code efficiency, enable Kinesis bisect-on-error, or use larger batch sizes with parallelization factor', 'Enable Lambda Provisioned Concurrency to pre-warm instances', 'Move from Kinesis to SQS for higher throughput'],
      correct: 1,
      explanation: 'Kinesis + Lambda scaling: Lambda runs one concurrent invocation per shard. To scale: 1) Increase shard count (each shard enables 1 parallel Lambda). 2) Enable Parallelization Factor (1–10 concurrent batches per shard). 3) Increase batch size (up to 10,000 records). 4) Use Enhanced Fan-Out for dedicated 2 MB/s per consumer throughput. 5) Optimize processing code or use parallel within the Lambda handler.'
    },
    {
      id: 'lambda-a2', level: 'advanced',
      question: 'How does Lambda handle VPC-attached functions and what networking components are required?',
      options: ['VPC-attached Lambda uses standard public subnet routing to access VPC resources', 'Lambda creates Hyperplane ENIs in specified subnets to enable VPC access. Private subnets need a NAT Gateway for internet access. For AWS service APIs, VPC Endpoints eliminate the need for NAT. VPC attachment adds cold start overhead due to ENI provisioning (significantly reduced with Hyperplane in 2022)', 'Lambda functions cannot access VPC resources directly — use API Gateway as a proxy', 'Lambda in a VPC automatically has access to all AWS services without additional configuration'],
      correct: 1,
      explanation: 'VPC-attached Lambda creates Hyperplane ENIs (Elastic Network Interfaces) shared across multiple execution environments (post-2022 improvement). Lambda in a VPC has no default internet access — you need a NAT Gateway in a public subnet for outbound internet. For AWS API calls (S3, DynamoDB, STS), use VPC Interface Endpoints to keep traffic private and avoid NAT costs.'
    },
    {
      id: 'lambda-a3', level: 'advanced',
      question: 'Describe Lambda Power Tuning and when you should use it to optimize cost vs performance.',
      options: ['Lambda Power Tuning is AWS\'s pricing model for Lambda — optimized automatically by AWS', 'Lambda Power Tuning is an open-source Step Functions state machine that tests a Lambda function across multiple memory configurations, measures duration and cost, and generates an optimization graph to identify the ideal memory setting that balances performance and cost', 'Lambda Power Tuning requires AWS Trusted Advisor Business tier subscription', 'Power tuning only applies to Lambda functions with Provisioned Concurrency enabled'],
      correct: 1,
      explanation: 'Lambda Power Tuning (github.com/alexcasalboni/aws-lambda-power-tuning) runs a Step Functions workflow that invokes your Lambda function multiple times at different memory settings (128MB to 10GB). It returns a visualization showing cost vs. speed tradeoffs. Often a function runs significantly faster (and cheaper in total cost) at higher memory — higher memory can execute in 1/4 the time at 2× the memory rate, net saving.'
    },
    {
      id: 'lambda-a4', level: 'advanced',
      question: 'For a financial trading Lambda function, you need deterministic execution order, exactly-once processing semantics, and no duplicate processing. Which event source and configuration achieves this?',
      options: ['Amazon SQS Standard Queue with deduplication ID header in Lambda handler', 'Amazon SQS FIFO Queue with content-based deduplication enabled, Lambda event source mapping with batch size 1 and report batch item failures enabled', 'Kinesis Data Streams with bisect-on-error enabled', 'Amazon SNS FIFO Topic with Lambda subscription filter policy'],
      correct: 1,
      explanation: 'SQS FIFO guarantees ordering (message group ID) and exactly-once delivery (deduplication ID). Lambda event source mapping with batch size 1 ensures one-at-a-time processing in order. "Report Batch Item Failures" response lets Lambda report specific failed message IDs to prevent re-processing successful messages in a batch. This combination delivers ordered, exactly-once processing semantics.'
    },
    {
      id: 'lambda-a5', level: 'advanced',
      question: 'What is the Lambda Extension API and what use cases does it enable?',
      options: ['Extensions allow Lambda functions to call external HTTP APIs with built-in retry logic', 'Lambda Extensions run alongside the Lambda function in the same execution environment. They enable lightweight agents for monitoring (Datadog, Dynatrace), security (GuardDuty runtime monitoring), secrets caching (cache Parameter Store values), and log shipping without modifying function code', 'Extensions are pre-built Lambda functions that handle common authentication patterns', 'Extensions replace Lambda Layers for sharing code between functions'],
      correct: 1,
      explanation: 'Lambda Extensions integrate with the Lambda execution lifecycle (Init, Invoke, Shutdown phases). External extensions run in a separate process from the function handler. Use cases: APM agents (instrument without code changes), log streamers (ship logs before environment shutdown), secret pre-fetching (warm cache before handler invocation), security scanners. Extensions incur duration charges against the function billing.'
    },
    {
      id: 'lambda-a6', level: 'advanced',
      question: 'A Lambda function reads from a DynamoDB table on every invocation. DynamoDB read costs are increasing. What caching pattern within Lambda significantly reduces DynamoDB calls?',
      options: ['Enable Lambda Provisioned Concurrency to cache DynamoDB connections', 'Use DAX (DynamoDB Accelerator) as an in-memory cache in front of DynamoDB', 'Leverage Lambda\'s execution environment reuse: initialize the DynamoDB client and cache frequently-read data in module-level global variables outside the handler. Warm environments reuse the cached data without re-fetching from DynamoDB', 'Enable DynamoDB Streams and cache events in S3 for Lambda to read'],
      correct: 2,
      explanation: 'Lambda execution environments are reused for subsequent invocations (warm starts). Variables and objects initialized outside the handler function persist between warm invocations. This allows: 1) Reusing DB connections (avoid reconnection overhead). 2) Caching infrequently-changing data in memory (e.g., config tables, reference data). 3) Caching SDK clients. Combine with a TTL check to refresh stale data periodically.'
    }
  ]
};
