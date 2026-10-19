// Route 53 Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const route53Quiz = {
  id: 'route53',
  service: 'Amazon Route 53',
  icon: 'Globe',
  color: 'indigo',
  questions: [
    {
      id: 'r53-b1', level: 'beginner',
      question: 'What is Amazon Route 53?',
      options: ['An AWS CDN service for caching static content globally', 'A highly available and scalable cloud DNS (Domain Name System) web service — also providing domain registration and health checking capabilities', 'An SSL certificate management service for HTTPS endpoints', 'A load balancing service for distributing HTTP traffic across EC2 instances'],
      correct: 1,
      explanation: 'Amazon Route 53 provides three functions: 1) DNS service (resolving domain names to IP addresses). 2) Domain registration (registering new domains). 3) Health checking (monitoring endpoint health and routing traffic away from unhealthy endpoints). The name references port 53, the standard DNS port.'
    },
    {
      id: 'r53-b2', level: 'beginner',
      question: 'What is an Alias Record in Route 53 and how does it differ from a CNAME?',
      options: ['Alias records use IPv6; CNAME records use IPv4', 'A Route 53 Alias record maps a DNS name to an AWS resource (CloudFront, S3, ALB) — works at the zone apex (e.g., example.com), has no extra DNS query charge, and supports health checks. CNAME maps one domain to another domain name but CANNOT be used at the zone apex', 'Alias records expire after 24 hours; CNAMEs are permanent', 'CNAMEs support health checking; Alias records do not'],
      correct: 1,
      explanation: 'Alias records: Route 53 extension that maps domain to AWS resource IPs (automatically updated when the resource\'s IP changes). Free to query. Works at zone apex (naked domain). Can target: CloudFront, S3 website, Elastic Load Balancers, API Gateway, etc. CNAME: standard DNS type. Cannot be used at zone apex (RFC restriction). Costs for queries. Works with any domain/resource.'
    },
    {
      id: 'r53-b3', level: 'beginner',
      question: 'What does Route 53 Simple Routing policy do?',
      options: ['Routes traffic to the geographically closest endpoint for lowest latency', 'Returns one or more IP addresses for a record in random order — single resource only, no health checks. If multiple values are specified, a random one is returned to the client', 'Distributes traffic proportionally across multiple endpoints based on configured weights', 'Returns different endpoints based on the geographic location of DNS resolvers'],
      correct: 1,
      explanation: 'Simple Routing is the default policy. Configure one record with one or more IP values — Route 53 returns ALL values in random order. The client picks one. Does NOT support health checks. Use for single-resource endpoints or when you don\'t need intelligent routing. For health-check-based routing, use Failover, Multivalue, or Latency routing.'
    },
    {
      id: 'r53-b4', level: 'beginner',
      question: 'What does a Route 53 Health Check monitor?',
      options: ['AWS billing and cost anomalies for the account', 'Endpoint availability (HTTP, HTTPS, TCP) by polling from multiple Route 53 locations worldwide every 10–30 seconds, or CloudWatch Alarms, or the health of other health checks (calculated health checks)', 'IAM role validity and credential expiration for Route 53 resources', 'VPC peering connection health and latency between regions'],
      correct: 1,
      explanation: 'Route 53 Health Checks monitor: 1) Endpoint health (HTTP 2xx/3xx response, specific string in response body, TCP connection). 2) CloudWatch Alarm state (useful for monitoring resources not accessible over internet). 3) Calculated health checks (AND/OR of other health checks). Unhealthy endpoints are excluded from DNS responses. Health checkers operate from 15 global AWS regions.'
    },
    {
      id: 'r53-b5', level: 'beginner',
      question: 'Route 53 Weighted Routing is used for:',
      options: ['Routing traffic based on CloudWatch metric weights', 'Sending a configurable percentage (weight) of traffic to different endpoints — useful for A/B testing, blue/green deployments, or gradually shifting traffic between application versions', 'Routing requests to the endpoint with the lowest network weight (latency)', 'Distributing traffic evenly across all endpoints regardless of their health'],
      correct: 1,
      explanation: 'Weighted Routing assigns relative weights (0–255) to DNS records. Traffic proportion = weight / sum of all weights. Example: Record A (weight=70) gets 70% of traffic, Record B (weight=30) gets 30%. Use cases: A/B testing new app versions, blue/green deployment with gradual traffic shift, testing new regions. Works with health checks — unhealthy endpoints get zero traffic.'
    },
    {
      id: 'r53-b6', level: 'beginner',
      question: 'What is a Private Hosted Zone in Route 53?',
      options: ['A hosted zone only accessible from within the AWS console without internet exposure', 'A DNS namespace that routes traffic within one or more Amazon VPCs — not accessible from the public internet. Use for internal service discovery (database.internal, api.internal)', 'A Route 53 zone with enhanced DNSSEC protection preventing DNS poisoning', 'A hosted zone that encrypts DNS records at rest using AWS KMS'],
      correct: 1,
      explanation: 'Private Hosted Zones resolve DNS queries from within associated VPCs only. Traffic never leaves AWS. Perfect for: internal service discovery (microservices resolving each other by DNS name), database endpoints (db.internal.company.com), management tools (jenkins.internal). VPCs must enable DNS resolution and DNS hostnames settings to use Private Hosted Zones.'
    },
    {
      id: 'r53-b7', level: 'beginner',
      question: 'Route 53 Latency Routing sends traffic to the region with:',
      options: ['The most available capacity based on current load metrics', 'The lowest network latency as measured from the user\'s network to AWS regions — Route 53 uses continuously updated latency data to route to the fastest region for each user', 'The most recently deployed application version for testing', 'The geographically closest physical distance from the user'],
      correct: 1,
      explanation: 'Latency Routing measures actual network latency from the user\'s ISP to each AWS region (not geographic distance). A user in Mumbai might have lower latency to Singapore than to geographic neighbor India-Central if AWS has better network paths. Route 53 continuously updates latency measurements and routes to the lowest-latency endpoint that passes health checks.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'r53-i1', level: 'intermediate',
      question: 'What is Route 53 Geolocation Routing and how does it differ from Geoproximity Routing?',
      options: ['Geolocation routes based on physical GPS coordinates of clients; Geoproximity routes based on ISP location', 'Geolocation routes traffic based on the geographic LOCATION of the DNS resolver (country, continent, or US state) — for localized content (language, compliance). Geoproximity routes based on location with BIAS adjustments — shift more/less traffic to a region by expanding or shrinking its geographic coverage area', 'Geolocation only works for US regions; Geoproximity is the international equivalent', 'They are identical except Geoproximity also monitors endpoint latency'],
      correct: 1,
      explanation: 'Geolocation: route users by country/continent/US state to specific endpoints — serve German users German content, enforce data residency. Must configure a Default record (catch-all). Geoproximity: route by AWS region or lat/long with bias adjustment (positive bias expands the region\'s routing coverage, negative bias shrinks it). Used in Traffic Flow only. Powerful for gradual regional traffic migration.'
    },
    {
      id: 'r53-i2', level: 'intermediate',
      question: 'Route 53 Failover Routing requires what configuration to work correctly?',
      options: ['Weighted records with weight 100 for primary and weight 0 for secondary', 'An Active-Passive setup: one PRIMARY record and one SECONDARY record (failover target), both linked to Route 53 Health Checks. If the primary health check fails, Route 53 automatically serves the secondary endpoint', 'Two Alias records pointing to different CloudFront distributions', 'Multi-value routing with all endpoints configured as failover targets'],
      correct: 1,
      explanation: 'Failover Routing: configure two records for the same domain — Primary (main endpoint) and Secondary (DR/failover endpoint). Both must have associated health checks. When primary health check fails, Route 53 serves the secondary record. The failover happens within the DNS TTL window (typically 60–300 seconds). Secondary can be a static S3 website for minimal cost DR.'
    },
    {
      id: 'r53-i3', level: 'intermediate',
      question: 'What is Route 53 Resolver (formerly conditional forwarding) and what problem does it solve?',
      options: ['Route 53 Resolver provides DNSSEC validation for public hosted zones', 'Route 53 Resolver enables bidirectional DNS query resolution between AWS VPCs and on-premises networks: Inbound Endpoints (on-premises → VPC resolution), Outbound Endpoints + Forwarding Rules (VPC → on-premises DNS resolution). Solves hybrid DNS in connected environments', 'Route 53 Resolver caches DNS responses at the VPC level to improve query performance', 'Route 53 Resolver provides GeoDNS capabilities for VPC-internal service discovery'],
      correct: 1,
      explanation: 'Hybrid DNS challenge: VPC resources resolve AWS Route 53 domains. On-premises resources can\'t resolve AWS Private Hosted Zone names. Solution: Route 53 Resolver Inbound Endpoints — create DNS endpoints in VPC that on-premises DNS servers forward queries to for resolution. Outbound Endpoints + rules — VPC instances forward specific domain queries (e.g., corp.internal) to on-premises DNS servers.'
    },
    {
      id: 'r53-i4', level: 'intermediate',
      question: 'What is DNSSEC in Route 53 and what does it protect against?',
      options: ['DNSSEC encrypts DNS traffic between Route 53 and clients using TLS/SSL', 'DNSSEC (DNS Security Extensions) adds cryptographic signatures to DNS records, allowing resolvers to verify response authenticity. Protects against DNS cache poisoning/spoofing attacks where attackers inject false DNS records to redirect traffic to malicious sites', 'DNSSEC rate-limits DNS queries to prevent DDoS attacks against Route 53 name servers', 'DNSSEC enables private hosted zones to use custom encryption keys from AWS KMS'],
      correct: 1,
      explanation: 'DNSSEC signs DNS records with a KSK (Key Signing Key) managed in AWS KMS. Resolvers validate the cryptographic signature chain from root → TLD → domain. This prevents DNS spoofing: even if an attacker intercepts a DNS response and modifies it, the signature verification fails. Route 53 DNSSEC requires: hosted zone signing + registrar DS record publication + DNSSEC-aware resolvers.'
    },
    {
      id: 'r53-i5', level: 'intermediate',
      question: 'Route 53 Traffic Flow and Traffic Policies enable what capabilities?',
      options: ['Automated DNS record creation when new EC2 instances are launched', 'Visually creating complex multi-policy routing configurations (combine latency + failover + weighted + geoproximity) using a policy editor with version control. Apply the same Traffic Policy to multiple DNS records using Policy Records — enabling reusable routing logic across domains', 'Real-time DNS traffic analytics dashboards showing query volumes by region', 'Automated SSL certificate provisioning for all domains managed in Route 53'],
      correct: 1,
      explanation: 'Traffic Flow lets you combine routing policies: e.g., Route to nearest region (Latency), within each region failover between primary/secondary (Failover), split traffic by user geography (Geolocation). Visualize as a flowchart. Save as versioned Traffic Policies — reuse across multiple domains. Policy Records apply a Traffic Policy to a specific domain/subdomain. Complex routing without writing JSON.'
    },
    {
      id: 'r53-i6', level: 'intermediate',
      question: 'What is the Route 53 Multivalue Answer Routing policy and when should it be used instead of Simple Routing?',
      options: ['Multivalue routing returns all records simultaneously for load distribution at DNS level, while Simple routing returns only one record', 'Multivalue routing returns up to 8 healthy endpoint IP addresses per query (filtering out unhealthy ones via health checks), enabling basic client-side load balancing. Unlike Simple, it supports health checks. Use when you want a lightweight alternative to load balancers for simple services', 'Multivalue routing is identical to Simple routing with health check integration at additional cost', 'Multivalue routing distributes DNS queries across Route 53 name servers for performance'],
      correct: 1,
      explanation: 'Multivalue Routing returns up to 8 randomly selected values from up to 8 healthy records. Health checks are supported — unhealthy endpoints are excluded from responses. DNS clients pick from the returned values for basic load distribution. NOT a substitute for a load balancer (no session affinity, not application-aware), but useful for simple horizontally scaled services without a load balancer cost requirement.'
    },
    {
      id: 'r53-i7', level: 'intermediate',
      question: 'What does Route 53 Application Recovery Controller (ARC) provide beyond standard failover routing?',
      options: ['Enhanced latency monitoring with millisecond precision for global endpoints', 'ARC provides readiness checks (continuous verification that DR failover targets are ready to accept traffic), routing control (manual and automated circuit breakers for controlling traffic across regions), and safety rules (preventing simultaneous failover of multiple cells that could cause a worse outage)', 'ARC is the routing engine powering Transit Gateway inter-region connectivity', 'ARC provides automated database failover coordination integrated with Route 53 DNS failover'],
      correct: 1,
      explanation: 'Route 53 ARC solves the challenge of ensuring DR readiness: Readiness Checks continuously monitor cross-stack readiness (are DR region resources, capacity, and data ready to accept traffic?). Routing Controls are DNS-level circuit breakers — manually turn traffic on/off to specific cells. Safety Rules prevent operators from accidentally disabling too many cells simultaneously (e.g., minimum cells = 1 must always be ON).'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'r53-a1', level: 'advanced',
      question: 'Design a multi-region active-active routing strategy for a global SaaS application with these requirements: route users to nearest region, detect and route around regional failures within 30 seconds, handle gradual traffic shifting for deployments.',
      options: ['Use Route 53 Simple routing with two A records pointing to both regions — client picks randomly', 'Latency Routing + Health Checks on regional ALBs (evaluated every 10s, failure threshold=3) + Route 53 ARC Routing Controls for manual override. Traffic Policy combining Latency → Failover in each region. Deployment: use Weighted routing to gradually shift traffic (10% → 50% → 100%) with ARC safety rules preventing simultaneous region failover', 'CloudFront with multiple origins and origin failover groups for automatic regional rerouting', 'AWS Global Accelerator with endpoint groups and traffic dials for traffic shifting'],
      correct: 1,
      explanation: 'Multi-region strategy: 1) Latency Routing points users to nearest healthy region. 2) Health Checks every 10 seconds (3 failures = ~30 second detection) on regional ALBs. 3) Route 53 ARC Routing Controls provide emergency manual override circuit breakers. 4) Traffic Flow Policy: Latency → Failover layering. 5) Deployments: Weighted records gradually shift traffic with health check guard rails. 6) ARC safety rules: minimum 1 region always ON.'
    },
    {
      id: 'r53-a2', level: 'advanced',
      question: 'Explain the DNS propagation delay problem in Route 53 failover and how to minimize recovery time.',
      options: ['DNS propagation is instant in Route 53 because all AWS resolvers receive updates in real time', 'DNS TTL causes clients to cache old records. To minimize failover RTO: 1) Set low TTL (60s) on records before an expected failure event. 2) Health check evaluation period: 10s interval × 3 failures = 30s detection. 3) Total RTO = 30s detection + 60s TTL cache drain ≈ 90 seconds. Use Route 53 ARC for 10-20 second failover via health check routing controls, bypassing DNS cache', 'Set TTL to 0 to disable caching, making failover instantaneous for all clients', 'Use Route 53 Resolver Endpoints to flush DNS caches on failover events automatically'],
      correct: 1,
      explanation: 'DNS failover RTO analysis: Health check: 30 seconds (10s interval × 3 failures) to detect failure. DNS propagation: Route 53 serves new record immediately after detection. Client cache: clients with old records cached at their ISP resolver TTL must wait for TTL expiry. With TTL=300s, RTO = 30s + 300s = ~5.5 minutes. With TTL=60s: ~90 seconds. For near-instant failover: Route 53 ARC routing controls combined with low TTL achieve 10-30s RTO.'
    },
    {
      id: 'r53-a3', level: 'advanced',
      question: 'How does Route 53 Private Hosted Zone associating with multiple VPCs across accounts enable centralized DNS without VPC peering?',
      options: ['Private Hosted Zones automatically resolve across accounts when VPCs have overlapping CIDR blocks', 'A Private Hosted Zone can be associated with VPCs in other AWS accounts using Route53:AssociateVPCWithHostedZone API + RAM (Resource Access Manager) authorization. This enables a central networking account to own DNS records (db.internal.company.com) and share them with workload accounts without requiring VPC peering or Transit Gateway', 'Private Hosted Zones are account-scoped and cannot be shared across AWS accounts under any configuration', 'Use Route 53 Resolver Query Logging to forward queries across accounts for cross-account resolution'],
      correct: 1,
      explanation: 'Cross-account Private Hosted Zone sharing: 1) Central account creates PHZ. 2) Workload account authorizes the association using CreateVPCAssociationAuthorization. 3) Central account calls AssociateVPCWithHostedZone. 4) Workload VPC now resolves PHZ records. This is the AWS Landing Zone pattern for centralized DNS: hub networking account owns internal DNS, spoke workload accounts resolve it without needing full VPC peering.'
    },
    {
      id: 'r53-a4', level: 'advanced',
      question: 'A global e-commerce platform needs to enforce that EU customers\' data never leaves the EU region for GDPR compliance, while other customers get the lowest-latency region. What Route 53 routing combination achieves this?',
      options: ['Geolocation routing EU → EU region, Weighted routing with 0 weight for non-EU traffic', 'Two-tier routing: Geolocation policy for EU countries (routes exclusively to eu-west-1 ALB). For non-EU traffic, nested Latency routing policy routes to the nearest AWS region. Data residency enforced at DNS before the request reaches any non-EU server — combined with CloudFront Origin restriction and IAM SCPs preventing cross-region data replication', 'Implement GDPR compliance purely at the application layer regardless of Route 53 routing policy', 'Use Geoproximity routing with bias shrunk to zero for non-EU regions to concentrate traffic in EU'],
      correct: 1,
      explanation: 'GDPR data residency via Route 53: Geolocation records for EU countries (DE, FR, IT, NL, etc.) → always route to eu-west-1 (Ireland) or eu-central-1 (Frankfurt). Default record → Latency routing to nearest region for non-EU. Geolocation takes precedence over Latency. Pair with: CloudFront origin restrictions (EU origins only for EU users), IAM SCPs denying S3 cross-region replication outside EU, Aurora Global Table region restrictions.'
    },
    {
      id: 'r53-a5', level: 'advanced',
      question: 'Explain split-horizon DNS using Route 53 and when it is used in enterprise architectures.',
      options: ['Split-horizon DNS creates two versions of the same DNS name that resolve differently based on whether the query comes from within a VPC (Private Hosted Zone → internal endpoint) or from the internet (Public Hosted Zone → public endpoint) — same domain name, different IP address resolution based on resolver location', 'Split-horizon DNS uses Route 53 Traffic Flow to split traffic 50/50 between two identical endpoints for A/B testing', 'Split-horizon is a Route 53 feature that returns different TTLs to internal vs external resolvers', 'Split-horizon DNS routes queries across the horizon of AWS regions using Latency Routing'],
      correct: 0,
      explanation: 'Split-horizon DNS: configure BOTH a Public Hosted Zone (PHZ) and Private Hosted Zone for the same domain name (e.g., api.company.com). Public zone → returns ALB public DNS or CloudFront. Private zone → returns internal load balancer private IP or VPC endpoint address. Queries from within associated VPCs resolve the Private zone. External clients resolve the Public zone. Use case: internal services use optimized private paths; external APIs use public endpoints. Avoids hairpin routing through internet.'
    },
    {
      id: 'r53-a6', level: 'advanced',
      question: 'What is Route 53 Resolver DNS Firewall and how does it enhance VPC security?',
      options: ['DNS Firewall encrypts all DNS queries between VPC instances and Route 53 resolvers', 'Route 53 Resolver DNS Firewall intercepts outbound DNS queries from VPC instances and applies block/allow rules against domain name lists (AWS managed threat intel lists + custom lists). Blocks: malware C&C domains, data exfiltration via DNS tunneling, access to unapproved external services — preventing DNS-based attacks without inspecting packet contents', 'DNS Firewall limits the DNS query rate from VPC instances to prevent Route 53 abuse', 'DNS Firewall provides application-layer inspection of DNS record contents for SQL injection prevention'],
      correct: 1,
      explanation: 'Route 53 Resolver DNS Firewall filters outbound DNS queries from VPCs: 1) AWS-managed domain lists (botnet C&C, malware distribution, phishing). 2) Custom allow/block lists. 3) Actions: BLOCK (return NXDOMAIN or custom response), ALLOW, ALERT (log without blocking). Prevents DNS-based data exfiltration (DNS tunneling tools like dnscat2) and beaconing to C2 servers. Integrated with AWS Firewall Manager for organization-wide rule deployment.'
    }
  ]
};
