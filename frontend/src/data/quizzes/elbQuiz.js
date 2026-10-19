// Elastic Load Balancing (ELB) Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const elbQuiz = {
  id: 'elb',
  service: 'Elastic Load Balancing (ELB)',
  icon: 'Network',
  color: 'cyan',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'elb-b1', level: 'beginner',
      question: 'What is the primary role of Elastic Load Balancing (ELB) in AWS?',
      options: [
        'To compress database tables before writing to disk',
        'To automatically distribute incoming application traffic across multiple targets (such as EC2 instances, containers, and IP addresses) in one or more Availability Zones',
        'To assign permanent static public IPv4 addresses to lambda functions',
        'To compile backend source code into deployable binary files'
      ],
      correct: 1,
      explanation: 'Elastic Load Balancing automatically distributes incoming traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and Lambda functions. It ensures fault tolerance and high availability across AZs.'
    },
    {
      id: 'elb-b2', level: 'beginner',
      question: 'Which type of Elastic Load Balancer operates at Layer 7 (Application layer) of the OSI model and supports path-based and host-based routing?',
      options: [
        'Network Load Balancer (NLB)',
        'Application Load Balancer (ALB)',
        'Gateway Load Balancer (GWLB)',
        'Classic Load Balancer (CLB)'
      ],
      correct: 1,
      explanation: 'Application Load Balancer (ALB) operates at Layer 7 (HTTP/HTTPS) and routes traffic based on application-level data such as URL paths (/api, /images), host headers, query parameters, and HTTP headers.'
    },
    {
      id: 'elb-b3', level: 'beginner',
      question: 'Which type of Elastic Load Balancer operates at Layer 4 (Transport layer) and can handle millions of requests per second with ultra-low latency?',
      options: [
        'Application Load Balancer (ALB)',
        'Network Load Balancer (NLB)',
        'Gateway Load Balancer (GWLB)',
        'Amazon Route 53 Traffic Flow'
      ],
      correct: 1,
      explanation: 'Network Load Balancer (NLB) operates at Layer 4 (TCP, UDP, TLS) and is optimized for ultra-high throughput, millions of requests per second, and ultra-low latencies while preserving source IP addresses.'
    },
    {
      id: 'elb-b4', level: 'beginner',
      question: 'What is a Target Group in the context of an Application or Network Load Balancer?',
      options: [
        'A list of IAM users allowed to modify load balancer settings',
        'A logical grouping of targets (EC2 instances, microservices, IP addresses, or Lambdas) that routes traffic and conducts health checks',
        'A billing quota group configured in AWS Organizations',
        'An S3 bucket partition for storing load balancer access logs'
      ],
      correct: 1,
      explanation: 'Target Groups route requests to registered targets using the protocol and port number specified, and perform health checks to ensure traffic is only directed to healthy instances.'
    },
    {
      id: 'elb-b5', level: 'beginner',
      question: 'How does an ELB determine if an EC2 target is healthy enough to receive traffic?',
      options: [
        'By pinging the instance physical power supply',
        'By sending periodic health checks (HTTP, HTTPS, or TCP requests) to the target and monitoring response codes',
        'By checking the instance CPU utilization via AWS CloudWatch Alarms',
        'By requiring manual administrator approval every 24 hours'
      ],
      correct: 1,
      explanation: 'ELB periodically sends ping requests or HTTP requests to a configured health check path (e.g., HTTP 200 on /health). If consecutive checks pass or fail, the load balancer marks the target as healthy or unhealthy.'
    },
    {
      id: 'elb-b6', level: 'beginner',
      question: 'What happens to traffic directed to an instance that fails its ELB health check?',
      options: [
        'The instance is immediately terminated and its EBS volume wiped',
        'The load balancer stops sending new traffic to that unhealthy instance and redirects requests to remaining healthy instances',
        'The load balancer returns HTTP 500 to all incoming users worldwide',
        'The load balancer reboots the AWS Region'
      ],
      correct: 1,
      explanation: 'When a target becomes unhealthy, the load balancer immediately stops sending new requests to it and redistributes traffic across remaining healthy targets in the target group.'
    },
    {
      id: 'elb-b7', level: 'beginner',
      question: 'What is an Internet-facing Load Balancer?',
      options: [
        'A load balancer that routes traffic only between internal private VPC subnets',
        'A load balancer that has publicly routable IP addresses / public DNS name to receive requests from clients over the internet',
        'A load balancer deployed exclusively in an on-premises data center',
        'A DNS record pointing directly to an S3 website endpoint'
      ],
      correct: 1,
      explanation: 'An Internet-facing load balancer has public DNS names and public IP addresses mapped to its nodes, allowing clients on the public internet to reach the application.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'elb-i1', level: 'intermediate',
      question: 'What is Cross-Zone Load Balancing on an Elastic Load Balancer?',
      options: [
        'Replicating database tables between different AWS regions',
        'Distributing incoming traffic evenly across all registered targets in all enabled Availability Zones, regardless of how many targets are in each AZ',
        'Migrating EC2 instances from us-east-1 to eu-west-1 automatically',
        'Pairing two distinct VPCs with a peering connection'
      ],
      correct: 1,
      explanation: 'Cross-zone load balancing distributes traffic evenly across all registered targets in all enabled AZs. If one AZ has 7 targets and another has 3 targets, each target receives an equal 10% share of traffic when enabled.'
    },
    {
      id: 'elb-i2', level: 'intermediate',
      question: 'What is Connection Draining (also known as Deregistration Delay) on an ELB?',
      options: [
        'Forcefully severing active TCP connections the moment an instance stops',
        'Allowing in-flight requests to complete before deregistering or terminating a target when an instance is removed or de-scaled',
        'Emptying the memory cache of an unhealthy instance before rebooting',
        'Throttling requests that exceed 100 requests per second'
      ],
      correct: 1,
      explanation: 'Deregistration delay (connection draining) ensures that when a target is deregistered, in-flight requests have a configurable time buffer (default 300s) to complete before existing connections are closed.'
    },
    {
      id: 'elb-i3', level: 'intermediate',
      question: 'Which ELB feature enables sticky sessions (session affinity) on an Application Load Balancer?',
      options: [
        'EBS Volume Attachment Sticky Bit',
        'Duration-based or Application-based HTTP Cookies that bind a client\'s session to a specific target instance for the cookie duration',
        'Static IP reservation in Amazon Route 53',
        'VPC Security Group stateful connection tracking'
      ],
      correct: 1,
      explanation: 'Session stickiness uses cookies (either AWS-generated or application-generated) to route subsequent requests from the same user to the same target instance in the target group.'
    },
    {
      id: 'elb-i4', level: 'intermediate',
      question: 'What is Gateway Load Balancer (GWLB) specifically designed for?',
      options: [
        'Hosting static single-page web applications with React',
        'Deploying, scaling, and managing third-party virtual network appliances such as firewalls, intrusion detection (IDS/IPS), and deep packet inspection systems',
        'Replacing Amazon API Gateway for RESTful APIs',
        'Connecting EC2 instances to Amazon S3 buckets via Gateway Endpoints'
      ],
      correct: 1,
      explanation: 'Gateway Load Balancer combines a transparent network gateway (single entry and exit point for all traffic) and a load balancer to scale third-party virtual security appliances using the GENEVE protocol on port 6081.'
    },
    {
      id: 'elb-i5', level: 'intermediate',
      question: 'What is Server Name Indication (SNI) support on an Application Load Balancer?',
      options: [
        'A method to encrypt instance EBS volumes during boot',
        'The ability to bind multiple SSL/TLS certificates to a single listener on an ALB, allowing one load balancer to securely host multiple domains (e.g., domainA.com, domainB.com)',
        'An automated DNS record generator for EC2 instances',
        'A protocol to convert IPv4 packets to IPv6'
      ],
      correct: 1,
      explanation: 'SNI solves the multi-certificate problem on a single IP address by allowing the client during the TLS handshake to specify the hostname it wants to connect to, so the ALB can present the matching SSL/TLS certificate.'
    },
    {
      id: 'elb-i6', level: 'intermediate',
      question: 'How do you obtain the original client IP address when an Application Load Balancer terminates the TLS connection and forwards requests to backend EC2 instances?',
      options: [
        'Inspect the `X-Forwarded-For` HTTP request header',
        'Inspect the local `eth0` network interface IP of the EC2 instance',
        'Read the CloudFront distribution configuration file',
        'ALBs do not allow backend instances to see client IPs under any circumstances'
      ],
      correct: 0,
      explanation: 'Because the ALB opens a new TCP connection to backend targets, the source IP of the packet received by the target is the ALB\'s private IP. The ALB inserts the client\'s real IP into the `X-Forwarded-For` HTTP header.'
    },
    {
      id: 'elb-i7', level: 'intermediate',
      question: 'Which of the following targets CANNOT be registered directly into an Application Load Balancer Target Group?',
      options: [
        'Amazon EC2 Instances (by Instance ID)',
        'Private IPv4 / IPv6 addresses',
        'AWS Lambda functions',
        'Amazon S3 Buckets'
      ],
      correct: 3,
      explanation: 'ALB Target Groups support EC2 instance IDs, IP addresses (within VPC or peered networks/Direct Connect), and Lambda functions. Amazon S3 buckets cannot be registered as an ALB target directly (use CloudFront or reverse proxy EC2/Lambda).'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'elb-a1', level: 'advanced',
      question: 'A critical financial application requires client-side whitelisting of exact, unchanging static public IP addresses for firewall compliance. Which load balancer configuration meets this requirement?',
      options: [
        'Application Load Balancer with dynamic DNS CNAME record',
        'Network Load Balancer with Elastic IP addresses assigned to each enabled Availability Zone subnet',
        'Classic Load Balancer with multi-AZ DNS round robin',
        'Internal ALB routed through an Internet Gateway'
      ],
      correct: 1,
      explanation: 'Network Load Balancers support assigning a static Elastic IP (EIP) per Availability Zone. ALBs have dynamically scaling IPs and only provide a DNS name, not static IP addresses (unless fronted by AWS Global Accelerator).'
    },
    {
      id: 'elb-a2', level: 'advanced',
      question: 'How does Gateway Load Balancer maintain transparent packet inspection without modifying the original client IP or destination IP headers?',
      options: [
        'By encapsulating the original IP packets using the GENEVE protocol on UDP port 6081 before forwarding to appliance targets',
        'By executing Network Address Translation (NAT) at each hop',
        'By decrypting the TLS payload at Layer 7 and re-encrypting with RSA keys',
        'By assigning public Elastic IPs directly to each firewall appliance'
      ],
      correct: 0,
      explanation: 'GWLB encapsulates original customer IP traffic inside GENEVE packets (port 6081) with metadata, sending them transparently to security appliances without modifying source/destination IPs or TCP ports.'
    },
    {
      id: 'elb-a3', level: 'advanced',
      question: 'When configuring an Application Load Balancer listener rule for zero-downtime blue/green deployment, which routing action can distribute traffic proportionally between two different target groups (e.g., 90% blue, 10% green)?',
      options: [
        'Redirect action with HTTP 302 code',
        'Forward action with Weighted Target Groups',
        'Fixed-response action with JSON body',
        'Authenticate-OIDC action with Cognito user pool'
      ],
      correct: 1,
      explanation: 'ALB supports Weighted Target Groups in its forward action, allowing engineers to specify weights (e.g., 90 to TG-v1, 10 to TG-v2) for canary and gradual blue/green release verification.'
    },
    {
      id: 'elb-a4', level: 'advanced',
      question: 'What is the root cause of an HTTP 504 (Gateway Timeout) error returned by an Application Load Balancer?',
      options: [
        'The ALB SSL certificate expired',
        'The target EC2 instance failed to respond within the configured idle timeout period (default 60 seconds) or the application crashed during processing',
        'The ALB security group blocks inbound client traffic on port 443',
        'The client browser does not support TLS 1.3 encryption'
      ],
      correct: 1,
      explanation: 'An HTTP 504 error means the load balancer established a connection to the target, but the target failed to respond before the idle timeout period elapsed (e.g. backend query hung or script took longer than 60s).'
    },
    {
      id: 'elb-a5', level: 'advanced',
      question: 'How should Security Groups be configured between an Application Load Balancer and backend EC2 web servers to enforce strict least-privilege security?',
      options: [
        'Allow 0.0.0.0/0 on port 80/443 on the EC2 instances',
        'Configure the EC2 Security Group to allow inbound traffic on application ports ONLY from the Security Group ID of the ALB',
        'Attach the same Security Group to both the ALB and the Internet Gateway',
        'Disable Security Groups on the ALB and rely solely on subnet NACLs'
      ],
      correct: 1,
      explanation: 'Best practice is to configure the backend EC2 Security Group to allow traffic only from the source Security Group of the ALB (e.g., `sg-alb`), preventing direct bypass access to web servers from the internet.'
    },
    {
      id: 'elb-a6', level: 'advanced',
      question: 'A WebSocket application deployed behind an Application Load Balancer experiences dropped connections after exactly 60 seconds of client inactivity. How do you resolve this?',
      options: [
        'Switch the load balancer immediately to Classic Load Balancer',
        'Increase the ALB connection idle timeout attribute (up to 4000 seconds) or send periodic client/server ping-pong heartbeat frames to keep the TCP connection active',
        'Enable Cross-Zone load balancing on all subnets',
        'Enable WAF inspection on WebSocket handshake requests'
      ],
      correct: 1,
      explanation: 'ALB natively supports WebSockets. When the connection is idle (no data transmitted in either direction) for longer than the idle timeout attribute (default 60s), the ALB terminates the connection. Increasing idle timeout or implementing heartbeat keep-alive frames solves this.'
    }
  ]
};
