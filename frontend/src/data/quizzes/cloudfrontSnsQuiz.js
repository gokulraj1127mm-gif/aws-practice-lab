// CloudFront Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const cloudfrontQuiz = {
  id: 'cloudfront',
  service: 'Amazon CloudFront',
  icon: 'Globe2',
  color: 'violet',
  questions: [
    {
      id: 'cf-b1', level: 'beginner',
      question: 'What is Amazon CloudFront?',
      options: ['An AWS DNS management service for routing internet traffic', 'A content delivery network (CDN) that speeds up delivery of static and dynamic content by caching it at globally distributed edge locations close to end users', 'An application firewall protecting web servers from SQL injection attacks', 'A managed SSL/TLS certificate service for web applications'],
      correct: 1,
      explanation: 'Amazon CloudFront is a global CDN with 400+ edge locations (Points of Presence) worldwide. It caches content closer to users, reducing latency and origin server load. CloudFront also delivers dynamic content over optimized AWS backbone connections and integrates with Shield, WAF, and Lambda@Edge for security and customization.'
    },
    {
      id: 'cf-b2', level: 'beginner',
      question: 'What is an Origin in CloudFront?',
      options: ['The geographic region where CloudFront was first deployed', 'The source location where CloudFront fetches content on a cache miss — can be an S3 bucket, ALB, EC2 instance, API Gateway, or any HTTP server', 'The URL format that users use to access CloudFront content', 'The AWS account that created the CloudFront distribution'],
      correct: 1,
      explanation: 'Origins are the servers CloudFront retrieves content from when it\'s not cached. Supported origins: S3 buckets (static assets, website hosting), Application/Network Load Balancers, EC2 instances, API Gateway endpoints, and any custom HTTP/HTTPS origin. CloudFront supports multiple origins per distribution with origin groups for failover.'
    },
    {
      id: 'cf-b3', level: 'beginner',
      question: 'What is a CloudFront TTL (Time to Live) and what does it control?',
      options: ['The maximum time a user session can remain active before requiring re-authentication', 'How long CloudFront caches an object at edge locations before checking the origin for a newer version — specified via Cache-Control or Expires headers, or CloudFront cache policies', 'The expiration time of CloudFront pre-signed URLs for private content', 'The maximum duration of a Lambda@Edge function execution'],
      correct: 1,
      explanation: 'TTL determines how long cached objects remain at CloudFront edge before revalidating with the origin. Default TTL: 86,400 seconds (24 hours). Minimum TTL: 0. Maximum TTL: 31,536,000 (1 year). Objects expired before TTL via CloudFront Invalidation (all paths: /*, specific: /path/file.js). Origin\'s Cache-Control max-age header controls TTL per object.'
    },
    {
      id: 'cf-b4', level: 'beginner',
      question: 'How does CloudFront protect private S3 content from direct S3 bucket access?',
      options: ['CloudFront automatically encrypts S3 content so only CloudFront can decrypt it', 'Origin Access Control (OAC, replacing OAI) allows the CloudFront distribution to authenticate to S3 using a service principal. S3 bucket policy only allows the CloudFront OAC — blocking direct S3 URL access while allowing CloudFront distribution access', 'S3 requires a CloudFront distribution to serve content — direct access is not possible', 'CloudFront VPN tunnels prevent direct S3 URL requests from reaching S3 buckets'],
      correct: 1,
      explanation: 'Origin Access Control (OAC) creates a service identity for CloudFront. The S3 bucket policy grants GetObject only to the specific CloudFront distribution\'s OAC. Block Public Access is enabled on S3. Users can only access content via the CloudFront URL — direct S3 object URLs (https://bucket.s3.amazonaws.com/...) return 403. OAC also supports SSE-KMS encrypted S3 objects.'
    },
    {
      id: 'cf-b5', level: 'beginner',
      question: 'What is a CloudFront Cache Behavior?',
      options: ['An automatic CloudFront feature that adjusts caching strategy based on traffic patterns', 'A rule that maps URL path patterns to specific origins and cache settings — e.g., /api/* → ALB origin (no caching), /static/* → S3 origin (7-day cache)', 'A CloudFront monitoring feature showing which objects are most frequently cached', 'A billing configuration controlling CloudFront data transfer pricing tier'],
      correct: 1,
      explanation: 'Cache Behaviors route requests matching URL path patterns to specific origins with their own: cache policy (TTL, headers/cookies/querystring to include in cache key), origin request policy (what to forward to origin), and security settings (HTTPS enforcement, field-level encryption). Default cache behavior (*) matches all requests not matched by more specific patterns.'
    },
    {
      id: 'cf-b6', level: 'beginner',
      question: 'CloudFront signed URLs vs signed cookies — when do you use each?',
      options: ['Signed URLs are for video streaming; signed cookies are for image delivery only', 'Signed URLs: grant access to a single specific file (download link for one video). Signed cookies: grant access to multiple files (entire premium content library subscription) without generating individual URLs', 'Signed cookies provide stronger security than signed URLs for all use cases', 'Both signed URLs and cookies have identical use cases — the choice is purely based on client preference'],
      correct: 1,
      explanation: 'Signed URLs: one URL per protected resource. Best for: sharing individual files, RTMP streaming, when clients don\'t support cookies. Signed Cookies: one cookie grants access to multiple resources. Best for: premium subscriber areas, protecting entire sections of a website, when you can\'t change existing URLs. Both use RSA key pairs and time-based expiry. Both require CloudFront trusted key groups configuration.'
    },
    {
      id: 'cf-b7', level: 'beginner',
      question: 'What is CloudFront Price Class and how does it affect cost?',
      options: ['Price Class determines the storage tier used for cached content at edge locations', 'Price Class controls WHICH edge locations serve your content — Price Class All (all edges, best performance/highest cost), Price Class 200 (most regions excluding most expensive), Price Class 100 (only lowest cost regions: US, Canada, Europe). Restricting edge locations reduces data transfer costs at the expense of higher latency for excluded regions', 'Price Class determines the SSL/TLS version supported by the CloudFront distribution', 'Price Class is an EC2 pricing category that determines if CloudFront uses On-Demand or Reserved capacity'],
      correct: 1,
      explanation: 'CloudFront pricing varies by edge location region (highest: South America, Australia; lowest: US, Europe). Price Class 100: US/Canada/Europe only — cheapest but higher latency for Asia/Pacific users. Price Class 200: US/Canada/Europe + most other regions. Price Class All: every edge globally — best performance, highest data transfer cost. Choose based on where your users actually are.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'cf-i1', level: 'intermediate',
      question: 'What is Lambda@Edge and how does it differ from CloudFront Functions?',
      options: ['Lambda@Edge runs in AWS Regions; CloudFront Functions run at edge locations', 'Lambda@Edge: Node.js/Python functions running at CloudFront regional edge caches (13 locations), supporting 5-second execution, access to external resources (DynamoDB, S3), all 4 CloudFront events. CloudFront Functions: lightweight JS-only functions at 400+ PoPs, sub-millisecond execution, viewer request/response events only — for URL rewrites, header manipulation, A/B testing', 'Both are identical in capability but Lambda@Edge is more expensive per execution', 'CloudFront Functions run Node.js and Python; Lambda@Edge runs only JavaScript at edge'],
      correct: 1,
      explanation: 'Lambda@Edge: full Lambda at regional edge caches. 5s timeout (viewer) / 30s (origin). Access to: request body, external services (DynamoDB lookups, STS), all 4 events (viewer request/response, origin request/response). CloudFront Functions: runs at every PoP. Sub-millisecond. Viewer request/response only. No network calls. Perfect for: URL normalization, A/B header injection, auth token validation. 10× cheaper than Lambda@Edge.'
    },
    {
      id: 'cf-i2', level: 'intermediate',
      question: 'How does CloudFront cache key configuration affect cache hit ratio?',
      options: ['Smaller cache keys (fewer included headers/cookies/parameters) result in fewer unique cache entries, increasing the chance of cache hits — maximizing hit ratio but potentially serving wrong content to different users if relevant variance isn\'t included', 'Larger cache keys always improve performance by storing more content variants', 'Cache key configuration only affects CloudFront billing, not cache hit percentage', 'Cache keys are automatically optimized by CloudFront with no user configuration needed'],
      correct: 0,
      explanation: 'Cache key = unique object identity in CloudFront cache. Default cache key: URL path only. Adding headers/cookies/querystring parameters to the cache key creates more unique keys = more cache misses (each variant is a separate entry). Best practice: include ONLY values that determine content variation. Example: if you serve same content to mobile and desktop, don\'t include User-Agent in cache key. Review Cache Hit Rate metric in CloudWatch for optimization.'
    },
    {
      id: 'cf-i3', level: 'intermediate',
      question: 'What is CloudFront Origin Shield and when should you enable it?',
      options: ['A CloudFront feature that blocks malicious requests before they reach the origin', 'An additional caching layer (single regional intermediate cache) between edge locations and the origin. Benefits: reduces origin requests by increasing cache hits across all edge locations, centralizes origin load, reduces origin bandwidth costs. Enable for: S3/custom origins receiving high traffic from many global edge locations', 'A DDoS protection layer that absorbs attack traffic before it reaches the origin server', 'An origin authentication mechanism that prevents unauthorized CloudFront distributions from fetching your content'],
      correct: 1,
      explanation: 'Origin Shield adds one more caching layer between edge POPs and the origin. All edge cache misses are forwarded to the nearest Origin Shield (single regional cache) instead of going directly to origin. Origin Shield checks its cache first — if found, returns to edge without hitting origin. This significantly reduces origin requests. Cost: per HTTP request through Origin Shield. Worth it when: global distribution + origin bandwidth costs are high.'
    },
    {
      id: 'cf-i4', level: 'intermediate',
      question: 'How does CloudFront field-level encryption protect sensitive data in transit?',
      options: ['CloudFront encrypts all cached content using AES-256 at edge locations', 'Field-level encryption adds an additional layer of encryption using RSA public keys for specific form fields (e.g., credit card numbers, SSN) at the CloudFront edge — data arrives at origin still encrypted, only applications with the private key can decrypt specific fields. Prevents edge workers or compromised load balancers from seeing sensitive data', 'CloudFront field encryption is identical to standard TLS/HTTPS termination at the edge', 'Field-level encryption generates separate SSL certificates per sensitive field transmitted through CloudFront'],
      correct: 1,
      explanation: 'Field-level encryption: CloudFront encrypts specified POST request fields using customer-managed RSA public key BEFORE forwarding to origin. The data remains encrypted through origin, load balancers, and intermediate services. Only the application server with the RSA private key decrypts the specific sensitive fields. Even if your load balancer or application middleware is compromised, credit card numbers remain encrypted — defense in depth beyond TLS.'
    },
    {
      id: 'cf-i5', level: 'intermediate',
      question: 'What are the differences between CloudFront Cache Policies and Origin Request Policies?',
      options: ['Cache Policies define what headers/cookies CloudFront caches; Origin Request Policies are deprecated', 'Cache Policy: defines the cache key (what headers, cookies, querystrings make a unique cached object) and TTL settings — determines CloudFront caching behavior. Origin Request Policy: defines what CloudFront includes in requests to the origin (can include headers/cookies/querystrings NOT in the cache key) — controls what origin receives without affecting cacheability', 'Origin Request Policies control HTTPS redirect behavior; Cache Policies control static vs dynamic content determination', 'Both policies are identical; Cache Policy applies to viewer requests and Origin Request Policy to origin requests'],
      correct: 1,
      explanation: 'The key distinction: Cache Policy (cache key) is a SUBSET of what you want to send to origin. Origin Request Policy adds headers/cookies that origin needs but that would create too many cache variations if in the cache key. Example: include X-Device-Type in CACHE key (serve different HTML for mobile). Include Accept-Language in ORIGIN REQUEST Policy (origin logs language but serves same content). Decouples caching decisions from origin communication.'
    },
    {
      id: 'cf-i6', level: 'intermediate',
      question: 'What is CloudFront Realtime Logs and how does it differ from standard access logs?',
      options: ['Realtime Logs stream access data to Kinesis Data Streams within seconds for near-real-time analytics and monitoring. Standard access logs deliver compressed log files to S3 every hour. Realtime logs are useful for: live traffic analysis, fraud detection, dashboards, immediate alerting', 'Standard logs are free; Realtime Logs cost per log record and store in S3', 'Realtime Logs are the same as standard logs but with hourly aggregation removed', 'Standard logs capture all requests; Realtime Logs capture only cache misses for debugging'],
      correct: 0,
      explanation: 'CloudFront Realtime Logs: streamed to Kinesis Data Streams within seconds of the request. Configure sampling rate (1–100% of requests). Select specific fields to include. Downstream: Kinesis → Kinesis Firehose → OpenSearch/Athena for near-real-time dashboards. Standard Access Logs: hourly batches delivered to S3, 15–60 minute delay. Realtime Logs cost more but enable operational monitoring without ETL delay.'
    },
    {
      id: 'cf-i7', level: 'intermediate',
      question: 'How does CloudFront integrate with AWS WAF (Web Application Firewall)?',
      options: ['CloudFront sends all traffic to a dedicated WAF EC2 instance before caching content', 'CloudFront integrates with AWS WAF at the edge — attach a WAF Web ACL to the CloudFront distribution to inspect and filter HTTP/HTTPS requests (SQL injection, XSS, IP blocking, rate limiting, bot control) BEFORE they reach origin servers, at global scale across all edge locations', 'WAF integration only applies to CloudFront origins using EC2 — not S3 origins', 'AWS WAF is only available for ALB-fronted origins, not CloudFront distributions'],
      correct: 1,
      explanation: 'CloudFront + WAF: WAF Web ACL is applied at each CloudFront edge location before the request reaches cache or origin. WAF rules evaluate: SQL injection/XSS patterns, IP reputation lists, rate limiting (throttle abusive IPs), geographic restrictions, bot signatures (AWS Bot Control managed rule group), and custom rules. Inspecting at edge reduces latency impact vs inspecting at ALB. Only WAF in us-east-1 can be associated with CloudFront.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'cf-a1', level: 'advanced',
      question: 'Explain CloudFront Continuous Deployment (continuous deployment policy) and how it enables zero-risk production deployments.',
      options: ['CloudFront CD integrates with CodePipeline to automatically deploy application code to EC2 origins', 'CloudFront Continuous Deployment: create a staging distribution that mirrors production configuration. Route a configurable percentage (1–15%) or specific header-matched traffic to staging. Validate behavior, error rates, and performance. When satisfied, use "promote" to atomically push staging config to production with instant rollback capability — eliminates config change risk in production distributions', 'CloudFront CD automatically rolls back distributions when CloudWatch error rate alarms trigger', 'Continuous Deployment creates parallel CloudFront distributions in each region that gradually roll out config changes'],
      correct: 1,
      explanation: 'CloudFront Continuous Deployment (2022): deploy config changes to a staging distribution → gradually route traffic (weight-based: up to 15% of requests, or header-based for targeted testing with specific User-Agent or custom header) → measure: cache hit ratio, 5xx error rate, latency. If metrics look good → promote (copies staging config to production atomically). Rollback: instantly available by removing traffic from staging. No more "hope for the best" distribution updates.'
    },
    {
      id: 'cf-a2', level: 'advanced',
      question: 'A CloudFront distribution is serving a React SPA from S3. Users report that after deployment, they still see the old version for hours. What are all the mechanisms to solve this?',
      options: ['Increase CloudFront TTL to push the new version faster to edge locations', 'Multiple strategies: 1) CloudFront Invalidation (/index.html path — SPA entry point) on deploy. 2) Versioned asset filenames (chunk.a1b2c3.js) with long TTL — never need invalidation for JS/CSS. 3) Short TTL on index.html (30s), long TTL on versioned assets. 4) S3 versioning with CloudFront cache bypass header for admin validation. 5) Cache-Control: no-cache on index.html, immutable on versioned bundles', 'Disable CloudFront caching entirely for SPA deployments and rely on origin for all requests', 'Create a new CloudFront distribution for each deployment to avoid caching issues'],
      correct: 1,
      explanation: 'SPA deployment best practices: 1) index.html: Cache-Control: no-store or max-age=0 (never cache) + CloudFront Invalidation on deploy. 2) JS/CSS bundles: content-hash in filename (main.a1b2c3.js) + Cache-Control: max-age=31536000, immutable — safe to cache 1 year since filename changes with content. 3) Invalidation costs: first 1,000 paths/month free, then $0.005/path. Wildcard /* invalidates all objects in one path count. Design for fingerprinted assets to minimize invalidation.'
    },
    {
      id: 'cf-a3', level: 'advanced',
      question: 'How do you implement authentication for a CloudFront-served private application without modifying the origin application?',
      options: ['Restrict the S3 bucket to authenticated AWS users only — unauthenticated requests are denied', 'Use CloudFront Functions (viewer request event) or Lambda@Edge to validate a JWT token in request headers/cookies. If invalid: redirect to login page (302) or return 401. Valid token: forward to origin. Can also validate using Cognito JWT validation, pre-signed CloudFront cookies, or integration with external OAuth via Lambda@Edge', 'Enable CloudFront HTTPS and use client certificate mutual TLS authentication', 'AWS WAF can authenticate users via managed CAPTCHA rules before forwarding to CloudFront'],
      correct: 1,
      explanation: 'CloudFront edge authentication pattern: CloudFront Function (sub-ms, simple JWT validation) or Lambda@Edge (complex: DynamoDB session lookups, token refresh, Cognito validation). Viewer request event intercepts every request before cache check. Implementation: parse Cookie header for session token → validate JWT signature (via CloudFront KVS for public key storage) → INVALID: return 302 redirect to /login. Edge-based auth: no origin impact, all major AWS SaaS reference architectures use this pattern.'
    },
    {
      id: 'cf-a4', level: 'advanced',
      question: 'Explain the architecture for CloudFront serving a multi-tenant SaaS where different subdomains (tenant1.app.com, tenant2.app.com) must route to different backend services.',
      options: ['Create a separate CloudFront distribution per tenant — scales to 200 distributions max per account', 'Single CloudFront distribution with multiple origins: Lambda@Edge on Origin Request event reads the Host header, maps tenant subdomain to tenant-specific ALB/S3 bucket endpoint, dynamically sets the origin. Wildcard SSL certificate (*.app.com) covers all tenant subdomains. Route 53 wildcard A record → CloudFront distribution', 'Use CloudFront Geolocation routing to map subdomains to regional backends', 'CloudFront path-based routing: /tenant1/* → tenant1 backend, /tenant2/* → tenant2 backend'],
      correct: 1,
      explanation: 'Dynamic multi-tenant origin routing: 1) Route 53 wildcard record *.app.com → CloudFront distribution. 2) ACM wildcard certificate *.app.com for HTTPS. 3) Lambda@Edge (Origin Request): extract Host header (tenant1.app.com) → strip tenant ID → look up tenant config (DynamoDB or CloudFront KVS) → dynamically set CloudFront origin to tenant1-alb.internal.amazonaws.com. 4) Cache behavior uses tenant ID from Host in cache key to prevent cross-tenant cache contamination. Single distribution handles thousands of tenants.'
    },
    {
      id: 'cf-a5', level: 'advanced',
      question: 'What is the CloudFront Key-Value Store (CloudFront KVS) and how does it enhance CloudFront Functions?',
      options: ['KVS is a shared cache for CloudFront edge locations to store frequently accessed S3 objects', 'CloudFront KVS is an edge key-value data store for CloudFront Functions, enabling low-latency data lookup at the edge without external API calls. Use cases: JWT public key retrieval, A/B test configurations, URL redirect mappings, feature flags — all fetched from KVS memory in microseconds vs milliseconds for DynamoDB calls via Lambda@Edge', 'KVS is a session storage service specifically for CloudFront Signed URL validation', 'KVS stores CloudFront distribution configuration versions for rollback capabilities'],
      correct: 1,
      explanation: 'CloudFront KVS (2023): a managed key-value store for CloudFront Functions. Data is replicated to all 400+ CloudFront edge locations in near-real-time. Functions read KVS with sub-microsecond latency. Update KVS centrally → propagates to all edges within minutes. Use cases: A/B test assignments (userId → variant), JWT validation keys (keyId → public key), URL redirect rules (old-path → new-path), feature flags, allow/deny IP lists. Avoids the latency and cost of Lambda@Edge + DynamoDB for read-only data.'
    },
    {
      id: 'cf-a6', level: 'advanced',
      question: 'How do you configure CloudFront for an API Gateway origin to handle CORS correctly across multiple origins while maximizing cache hit ratio?',
      options: ['Enable CORS on CloudFront and disable CORS on API Gateway — they cannot both handle CORS simultaneously', 'Include the Origin request header in the CloudFront Cache Policy. CloudFront caches separate responses per Origin header value (each domain gets its own cached CORS preflight response). Configure API Gateway to return dynamic CORS headers (Access-Control-Allow-Origin reflects the requesting Origin). CloudFront forwards the Origin header in Origin Request Policy to API Gateway, which returns the specific CORS headers — cached per domain', 'Disable caching entirely for all API Gateway origins to avoid CORS cache contamination', 'Set Access-Control-Allow-Origin: * on API Gateway and use CloudFront to cache the same response for all origins'],
      correct: 1,
      explanation: 'CORS with CloudFront: API Gateway must receive the Origin header to return dynamic CORS headers (Access-Control-Allow-Origin: https://specific-tenant.com). Add Origin header to cache key (Cache Policy) — CloudFront caches separate response for each Origin value. This prevents serving tenant1.com\'s CORS response to tenant2.com (which would fail CORS). Add Origin header to Origin Request Policy so API Gateway receives it. For preflight OPTIONS: also cache with short TTL (86400s) to reduce preflight round-trips.'
    }
  ]
};

// SNS Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const snsQuiz = {
  id: 'sns',
  service: 'Amazon SNS',
  icon: 'Bell',
  color: 'rose',
  questions: [
    {
      id: 'sns-b1', level: 'beginner',
      question: 'What is Amazon SNS?',
      options: ['A managed SQL database service', 'A fully managed pub/sub messaging service that enables decoupled communication by publishing messages to topics that fan out to multiple subscribers (SQS, Lambda, email, SMS, HTTP endpoints)', 'A streaming data service for real-time analytics', 'A service for managing DNS records'],
      correct: 1,
      explanation: 'Amazon Simple Notification Service (SNS) is a managed pub/sub service. Publishers send messages to Topics. SNS fans messages out to all subscribed endpoints simultaneously. Subscribers can be: SQS queues, Lambda functions, HTTP/HTTPS endpoints, email addresses, SMS (phone numbers), and mobile push notification platforms.'
    },
    {
      id: 'sns-b2', level: 'beginner',
      question: 'What is the SNS "fan-out" pattern?',
      options: ['Routing messages from multiple publishers to a single subscriber for aggregation', 'Publishing a message once to an SNS topic that delivers a copy to all subscribed endpoints simultaneously — enabling one-to-many message distribution without the publisher knowing about individual subscribers', 'Distributing messages across multiple AWS accounts for cross-account processing', 'Sending messages from SNS to a single queue that multiple consumers share'],
      correct: 1,
      explanation: 'Fan-out: publisher sends one message → SNS topic distributes to N subscribers simultaneously. Classic pattern: S3 event → SNS topic → [SQS queue for processing + SQS queue for audit + Lambda for real-time notification]. Decouples producers from consumers — publisher doesn\'t know how many or which subscribers exist. Enables parallel processing pipelines from a single event.'
    },
    {
      id: 'sns-b3', level: 'beginner',
      question: 'What is the maximum message size for Amazon SNS?',
      options: ['64 KB', '256 KB', '1 MB', '10 MB'],
      correct: 1,
      explanation: 'SNS message size limit is 256 KB. For larger payloads, use the SNS Extended Client Library (Java/Python) which stores the message body in S3 and publishes only a reference in SNS. The subscriber retrieves the payload from S3. Alternatively, publish only metadata in SNS and store the large payload in S3 with subscribers fetching as needed.'
    },
    {
      id: 'sns-b4', level: 'beginner',
      question: 'What are the message delivery protocols supported by SNS?',
      options: ['Only email and SMS', 'SQS, Lambda, HTTP/HTTPS, Email, Email-JSON, SMS, Mobile Push (APNS, GCM, ADM, Baidu), Kinesis Data Firehose', 'Only SQS and Lambda for AWS service integration', 'SMTP, FTP, and AWS-native services only'],
      correct: 1,
      explanation: 'SNS delivery protocols: SQS (most reliable, persistent), Lambda (event-driven processing), HTTP/HTTPS (webhooks), Email (text format), Email-JSON (machine-readable), SMS (international mobile), Mobile Push (Apple APNS, Google FCM, Amazon ADM, Baidu Cloud Push), Kinesis Data Firehose (for streaming to S3/OpenSearch/Splunk). Multiple subscription protocols per topic are supported simultaneously.'
    },
    {
      id: 'sns-b5', level: 'beginner',
      question: 'What is an SNS Topic?',
      options: ['A priority queue for ordering messages by importance level', 'A logical access point and communication channel for publishing messages — publishers send to the topic, subscribers receive from it. Topics are the central coordination entity in SNS messaging', 'A message archive storing all published messages for replay', 'A billing unit grouping related SNS messages for cost attribution'],
      correct: 1,
      explanation: 'An SNS Topic is the communication endpoint. Publishers call Publish() on a topic ARN. SNS distributes to all confirmed subscribers. Standard topics: high throughput, best-effort ordering. FIFO topics: strict ordering, exactly-once processing, up to 300 messages/second. Topics support IAM policies for access control.'
    },
    {
      id: 'sns-b6', level: 'beginner',
      question: 'What does SNS Message Filtering allow?',
      options: ['Filtering duplicate messages to prevent re-processing', 'Filtering messages at the subscription level based on message attributes — subscribers only receive messages matching their filter policy, reducing unnecessary processing and cost', 'Filtering messages by size to route large payloads to SQS and small ones to Lambda', 'Filtering based on geographic location of message origin for compliance'],
      correct: 1,
      explanation: 'SNS Filter Policies use JSON policies on subscriptions to match message attributes. Example: SQS subscription filters on {order_status: ["COMPLETED"]} only receives completed order messages; Lambda subscription filters on {priority: ["HIGH"]} only triggers for urgent events. This prevents downstream subscribers from processing irrelevant messages — saves costs on Lambda invocations and SQS receive calls.'
    },
    {
      id: 'sns-b7', level: 'beginner',
      question: 'What is the difference between SNS and SQS?',
      options: ['SNS is for file storage, SQS is for database transactions', 'SNS is a push-based pub/sub service (messages are actively pushed to multiple subscribers simultaneously). SQS is a pull-based queue (consumers poll for messages, one message processed by one consumer). Often combined: SNS fan-out → SQS queues for durable, buffered processing', 'SNS stores messages for 14 days; SQS delivers messages in real-time and doesn\'t store them', 'SNS is used for large files; SQS is used for small event notifications'],
      correct: 1,
      explanation: 'SNS vs SQS: SNS (pub/sub): push model, multiple subscribers, no persistence after delivery, fan-out. SQS (queue): pull model, one consumer per message (in standard queues), up to 14-day retention, decoupling and buffering. Combined pattern (SNS → SQS): fan-out to multiple queues, each with independent consumers, different processing rates, and persistent buffering if consumers are down.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'sns-i1', level: 'intermediate',
      question: 'What is SNS FIFO (First-In-First-Out) topic and when should you use it?',
      options: ['FIFO topics store all messages in S3 for replay before delivery to subscribers', 'SNS FIFO topics guarantee strict message ordering using Message Group ID and exactly-once delivery using Message Deduplication ID. Use for: financial transaction ordering, inventory state management where event sequence matters. Limitation: only SQS FIFO queues can subscribe to SNS FIFO topics', 'FIFO topics automatically retry failed messages in the order they were originally published', 'FIFO topics are identical to standard topics but with higher throughput and lower cost per message'],
      correct: 1,
      explanation: 'SNS FIFO: messages published with same MessageGroupId are delivered in order to SQS FIFO queue subscribers. MessageDeduplicationId (or content-based dedup) prevents duplicates within 5-minute window. Use for: stock trade confirmations (sequence-sensitive), bank transfers, distributed saga patterns requiring ordered events. Throughput: 300 TPS per topic (vs standard: effectively unlimited). Only SQS FIFO queues can subscribe — not Lambda, HTTP, or email.'
    },
    {
      id: 'sns-i2', level: 'intermediate',
      question: 'How does SNS Message Encryption at rest work and when is it required?',
      options: ['SNS encrypts all messages by default using AWS-managed keys', 'SNS supports SSE (Server-Side Encryption) using AWS KMS CMKs. Messages are encrypted in SNS storage and decrypted before delivery to subscribers. Subscribers need KMS decrypt permission. Required for: PII data compliance (HIPAA, PCI-DSS), sensitive financial messages, regulatory environments requiring encryption at rest', 'SNS encryption is automatic for HTTPS subscribers but not for SQS subscribers', 'SNS uses AES-128 encryption for messages stored in transit at edge locations'],
      correct: 1,
      explanation: 'SNS SSE encrypts messages using AWS KMS. Encryption happens at topic level. Any message published to an encrypted topic is encrypted. Subscribers receive decrypted messages (SNS decrypts before delivery). Subscribers must have kms:GenerateDataKey and kms:Decrypt permissions on the CMK. SSE protects data in SNS storage between publish and delivery — not in transit (TLS handles that). Free with AWS-managed key; charged per API call with customer-managed CMK.'
    },
    {
      id: 'sns-i3', level: 'intermediate',
      question: 'What is SNS Dead Letter Queue (DLQ) and what happens when delivery fails?',
      options: ['A DLQ stores messages that were never published to the SNS topic due to IAM permission errors', 'An SQS queue configured at the SNS subscription level to receive messages that SNS fails to deliver after all retry attempts. For HTTP/HTTPS endpoints: configurable retry policy (immediate, pre-backoff, backoff, post-backoff phases). For Lambda/SQS: AWS manages retries. After exhaustion → DLQ', 'A special SNS topic variant that retains all failed messages for manual reprocessing', 'A CloudWatch alarm that triggers when SNS message delivery failure rate exceeds a threshold'],
      correct: 1,
      explanation: 'SNS DLQs are configured per subscription (not at topic level). For HTTP/HTTPS subscriptions: SNS retries with exponential backoff up to 23 times over 23 days. After all retries fail, message goes to SQS DLQ. For Lambda: if Lambda returns error, SNS retries twice, then sends to DLQ. DLQ contents: original message + delivery attempt metadata. Essential for debugging and reprocessing failed deliveries in production.'
    },
    {
      id: 'sns-i4', level: 'intermediate',
      question: 'How does SNS support mobile push notifications and what are the main push platforms?',
      options: ['SNS delivers mobile notifications via email-to-SMS gateways', 'SNS integrates with major mobile push platforms: Apple APNs (iOS), Google FCM (Android), Amazon ADM (Kindle), Baidu Cloud Push (China). You register device tokens via SNS platform applications, creating platform endpoints. SNS translates the SNS message into the platform-specific format (JSON) and delivers via each platform\'s push infrastructure', 'Mobile push in SNS requires installing the SNS SDK inside the mobile application', 'SNS can only send mobile push to AWS mobile apps using Amplify'],
      correct: 1,
      explanation: 'SNS Mobile Push: 1) Create SNS Platform Application with platform credentials (APNS certificate, FCM server key). 2) Register device token → creates Platform Endpoint. 3) Publish to endpoint ARN → SNS delivers to mobile device via platform. 4) For fan-out: publish to SNS topic with mobile endpoints subscribed, or use Cognito Sync for cross-device sync. SNS handles credential rotation when you update certificates in the platform application.'
    },
    {
      id: 'sns-i5', level: 'intermediate',
      question: 'What is SNS Message Archiving and Analytics (via Kinesis Data Firehose subscription)?',
      options: ['SNS stores messages in an internal archive for 30 days after delivery', 'SNS Kinesis Data Firehose subscription delivers SNS messages to Firehose delivery streams in real time, enabling archival to S3 (with optional Parquet conversion and Glue catalog), streaming to Amazon OpenSearch, or forwarding to Splunk. Enables analytics on SNS message volumes and content', 'SNS message archiving requires enabling CloudTrail S3 data events for SNS topics', 'Message archiving in SNS uses DynamoDB to store message metadata for later retrieval'],
      correct: 1,
      explanation: 'SNS → Kinesis Firehose subscription: every message published to an SNS topic is streamed to Firehose. Firehose buffers and delivers to: S3 (Parquet/ORC for cost-effective analytics via Athena), OpenSearch (for dashboard visualization), Splunk (for SIEM). Use cases: audit log of all notifications, analytics on notification volumes, compliance archiving of sensitive notifications (financial events, medical alerts). Fan-out: same message simultaneously delivered to SQS, Lambda, AND Firehose subscription.'
    },
    {
      id: 'sns-i6', level: 'intermediate',
      question: 'What is SNS cross-account publishing and how is it configured securely?',
      options: ['Cross-account publishing requires AWS Support to manually whitelist account IDs', 'Configure an SNS topic policy (resource-based policy) allowing a specific external account\'s Principal to sns:Publish. The external account\'s IAM role must also have sns:Publish permission in its identity policy. Both the resource policy (on the topic) and identity policy (on the caller) must allow the action', 'SNS does not support cross-account publishing — use EventBridge event buses for cross-account events', 'Cross-account SNS publishing uses VPC Peering to connect source and destination accounts'],
      correct: 1,
      explanation: 'Cross-account SNS publishing: SNS topic policy (in Account A) grants sns:Publish to Account B\'s principal (arn:aws:iam::ACCOUNT-B:root or specific role ARN). Account B\'s IAM role must also grant sns:Publish in its identity policy. Both must explicitly allow — SNS cannot be published across accounts with only one-side permission. Common pattern: central event bus in a networking account fans out events to spoke account SQS queues.'
    },
    {
      id: 'sns-i7', level: 'intermediate',
      question: 'How does SNS subscription confirmation work for HTTP/HTTPS endpoints?',
      options: ['HTTP endpoints are subscribed immediately without confirmation — messages start arriving instantly', 'When an HTTP/HTTPS subscription is created, SNS sends a confirmation request with a SubscribeURL. The endpoint must make a GET request to SubscribeURL (or call ConfirmSubscription API with the token). SNS only delivers messages after confirmation — preventing unauthorized endpoints from receiving data', 'HTTP endpoints must be pre-registered in the AWS console before being added as SNS subscribers', 'SNS skips confirmation for HTTPS endpoints with valid SSL certificates — only HTTP requires confirmation'],
      correct: 1,
      explanation: 'SNS subscription confirmation prevents spam: 1) Subscribe HTTP endpoint to topic. 2) SNS POSTs a confirmation message to the endpoint (Type: SubscriptionConfirmation, Token: xxxxx, SubscribeURL: https://...). 3) Endpoint must GET the SubscribeURL or call sns:ConfirmSubscription with the token within 3 days. 4) Only then does the subscription become CONFIRMED and messages are delivered. Prevents someone subscribing your endpoint to receive unwanted notifications.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'sns-a1', level: 'advanced',
      question: 'Design an event-driven architecture using SNS for a multi-service e-commerce platform where an order placement event must trigger: inventory check, payment processing, email notification, and analytics — each with different SLAs and failure isolation.',
      options: ['Create one Lambda function that handles all four processes sequentially to ensure order', 'SNS topic (OrderPlaced) fans out to: SQS FIFO queue (Inventory — ordered, idempotent), SQS queue (Payment — persistent, retryable), SNS subscription to Lambda (Email — low-latency), Kinesis Firehose subscription (Analytics — batch). Each subscriber has independent retry policies and DLQs. Inventory/Payment have SQS visibility timeout for processing time. Lambda email is immediate. Analytics is eventually consistent', 'SQS queue → Lambda → call each service sequentially with Step Functions error handling', 'EventBridge rule matches OrderPlaced events and routes to individual Lambda targets per service'],
      correct: 1,
      explanation: 'SNS fan-out to specialized subscribers: 1) SQS FIFO → Inventory Lambda (ensures inventory checked once per order, FIFO for same-product ordering conflicts). 2) SQS Standard → Payment Lambda (persistent, manual DLQ for failed payments requiring human review). 3) Lambda directly (Email — fast, no persistence needed). 4) Firehose (Analytics — buffered S3 delivery). Each subscriber fails independently — payment failure doesn\'t affect email delivery. DLQs per subscription for failure isolation.'
    },
    {
      id: 'sns-a2', level: 'advanced',
      question: 'How does SNS Message Deduplication work in FIFO topics and what edge cases can still cause duplicates?',
      options: ['SNS FIFO deduplication is guaranteed for all message types with no edge cases', 'FIFO topics deduplicate using MessageDeduplicationId (explicit) or SHA-256 hash of message body (content-based). Deduplication window: 5 minutes. Edge cases that can still cause duplicates: 1) Same message body but different attributes with content-based dedup enabled (attributes not hashed). 2) Messages published outside the 5-minute window with same ID are not deduplicated. 3) Downstream SQS FIFO must also enable dedup to prevent duplicates during SQS processing', 'Deduplication in SNS FIFO only applies to SQS FIFO subscribers — Lambda subscribers can still receive duplicates', 'SNS FIFO deduplication IDs expire after 24 hours, unlike the 5-minute window for SQS FIFO'],
      correct: 1,
      explanation: 'SNS FIFO dedup: MessageDeduplicationId (SHA-256 hash of body for content-based, or explicit ID) checked against 5-minute window. Duplicates with same ID within window are silently discarded. Edge cases: 1) Content-based dedup hashes body only — same body + different attributes = deduplicated (may be wrong). 2) Network timeout causes publisher to retry with same ID within 5 min → correctly deduplicated. 3) After 5 minutes: same ID republished → NOT deduplicated (treated as new message). Design idempotent consumers as defense-in-depth.'
    },
    {
      id: 'sns-a3', level: 'advanced',
      question: 'What is the SNS extended client library pattern and when does it apply vs. using EventBridge for large-payload event routing?',
      options: ['Extended client library sends large payloads via S3 presigned URLs in emails', 'SNS Extended Client Library: messages >256KB store payload in S3, SNS publishes S3 reference. Subscriber retrieves from S3. Best for: SQS/Lambda consumers, structured large payloads (ML model outputs, batch results). EventBridge: better for complex routing rules across 200+ sources/targets, schema registry, schema evolution, cross-account event buses. Use SNS for simple fan-out at high throughput; EventBridge for complex event routing with schema management', 'The extended library is deprecated — all large payloads should use EventBridge Pipes instead', 'SNS handles any payload size automatically by chunking messages into 256KB segments'],
      correct: 1,
      explanation: 'SNS Extended Client Library stores payload in S3 with configurable threshold (default 256KB). Message contains S3 pointer. Consumer downloads from S3 transparently. When to use vs EventBridge: SNS → simpler, cheaper per-message, unlimited throughput, SQS/Lambda fan-out. EventBridge → schema registry + validation, complex filtering (content-based routing), API destinations (external webhooks), Pipes (SQS→transform→Lambda without glue code), archive/replay. Many architectures combine both: SNS fan-out for async workers + EventBridge for orchestration.'
    },
    {
      id: 'sns-a4', level: 'advanced',
      question: 'How do you implement idempotent message processing when SNS delivers to Lambda, accounting for the at-least-once delivery guarantee?',
      options: ['Enable exactly-once delivery setting in SNS standard topic to prevent duplicates', 'SNS async invocation of Lambda retries on failure — Lambda may be invoked multiple times with same message. Implement idempotency: 1) Use SNS MessageId as idempotency key. 2) Store processed IDs in DynamoDB with conditional write (attribute_not_exists). 3) If ConditionalCheckFailedException: message already processed, return success. 4) Lambda Destinations: on success record to idempotency table, on failure send to SQS DLQ', 'Configure Lambda Reserved Concurrency = 1 to prevent parallel duplicate processing', 'Enable SNS message signature verification to detect and discard duplicate messages'],
      correct: 1,
      explanation: 'SNS to Lambda at-least-once delivery: Lambda may execute same message multiple times (retry on timeout, error, or infra issue). Idempotent consumer pattern: DynamoDB conditional write with SNS MessageId as PK (PutItem with condition: attribute_not_exists(messageId)). First processing: write succeeds, process. Subsequent duplicates: ConditionalCheckFailedException, skip. DynamoDB TTL on idempotency records to limit storage. Idempotency libraries: aws-lambda-powertools Python/Java provide this pattern out of the box.'
    },
    {
      id: 'sns-a5', level: 'advanced',
      question: 'Design a global SNS architecture for a financial system that must comply with data residency requirements (no EU financial data leaving EU-WEST-1) while also needing global event distribution.',
      options: ['One global SNS topic with IAM policies restricting EU subscriber access to non-EU events', 'Regional SNS topics: separate topics per region (eu-west-1, us-east-1, ap-southeast-1). An event-routing Lambda (in the originating region) publishes to the correct regional SNS topic based on data classification metadata. EU financial events: only eu-west-1 SNS topic, subscribers only in EU regions. Cross-region SCP prevents eu-west-1 SNS from publishing to non-EU subscribers. EventBridge cross-account/cross-region event buses for non-PII global notifications', 'Enable SNS Geolocation Routing to restrict message delivery by subscriber region', 'Use SNS FIFO topics which automatically enforce data residency at the FIFO ordering level'],
      correct: 1,
      explanation: 'Data residency in SNS: SNS topics are regional — data doesn\'t leave the region unless explicitly replicated. Pattern: 1) Classify data at publish time (EU_FINANCIAL flag in message attribute). 2) Publisher Lambda in eu-west-1 publishes EU financial events to eu-west-1 SNS topic ONLY. 3) SCP denies sns:Publish from eu-west-1 to cross-region endpoints. 4) Non-PII global events use EventBridge Global Event Bus. 5) Audit via CloudTrail SNS data events to verify no cross-region publication of classified data.'
    },
    {
      id: 'sns-a6', level: 'advanced',
      question: 'What are the security implications of SNS topic policies vs IAM policies for cross-account access and how do you apply defense-in-depth?',
      options: ['Topic policies cannot grant cross-account access — only IAM policies determine SNS access', 'SNS access evaluation: both topic policy AND identity policy must allow action for cross-account. Defense-in-depth: 1) Topic resource policy: allow specific account ARNs only (not *)). 2) IAM: least-privilege sns:Publish on specific topic ARN. 3) Condition keys: aws:SourceAccount, aws:SourceArn to prevent confused deputy attacks (S3/EventBridge as source). 4) VPC endpoint policy for private topics. 5) SSE-KMS with CMK key policy authorizing only specific principals', 'IAM policies always override topic policies — topic policies are optional documentation only', 'SNS topics with public topic policies (Principal: *) are automatically blocked by AWS Shield'],
      correct: 1,
      explanation: 'SNS defense-in-depth: 1) Topic policy: explicitly list authorized publisher account ARNs/principals — never use Principal: *. 2) Condition: aws:SourceArn for AWS service publishers (e.g., allow only specific S3 bucket\'s events, not any S3 bucket in the account). 3) Identity policies: least-privilege with specific topic ARN. 4) KMS CMK policy: authorize only the publishing Lambda role, not entire account. 5) VPC endpoint + endpoint policy: restrict to VPC-originating publish calls only. 6) CloudTrail + SNS API event monitoring for anomalous publish calls from unexpected principals.'
    }
  ]
};
