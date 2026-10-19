// VPC Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const vpcQuiz = {
  id: 'vpc',
  service: 'Amazon VPC',
  icon: 'Network',
  color: 'blue',
  questions: [
    {
      id: 'vpc-b1', level: 'beginner',
      question: 'What does VPC stand for?',
      options: ['Virtual Public Cloud', 'Virtual Private Cloud', 'Verified Private Cluster', 'Virtual Proxy Connection'],
      correct: 1,
      explanation: 'VPC stands for Virtual Private Cloud — a logically isolated virtual network within AWS where you can launch and manage resources with full control over IP addressing, subnets, routing, and security.'
    },
    {
      id: 'vpc-b2', level: 'beginner',
      question: 'What does an Internet Gateway (IGW) do in a VPC?',
      options: ['Provides NAT for private subnet instances', 'Connects your VPC to on-premises networks via VPN', 'Enables communication between your VPC and the internet — allowing public subnet resources to be reachable from and reach the internet', 'Encrypts all traffic leaving the VPC'],
      correct: 2,
      explanation: 'An Internet Gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. It performs NAT for instances with public IP addresses. Without an IGW attached, a VPC is completely isolated from the internet.'
    },
    {
      id: 'vpc-b3', level: 'beginner',
      question: 'What is the difference between a Public Subnet and a Private Subnet?',
      options: ['Public subnets use IPv6, private subnets use IPv4', 'Public subnets have a route to an Internet Gateway; private subnets do not have a direct route to the internet', 'Public subnets can only contain web servers; private subnets can only contain databases', 'Public subnets are in one AZ; private subnets span multiple AZs'],
      correct: 1,
      explanation: 'A public subnet has a route in its Route Table to an Internet Gateway (0.0.0.0/0 → igw-xxx), allowing resources to communicate with the internet. A private subnet lacks this route — instances can only communicate within the VPC or via a NAT Gateway/VPN for outbound-only internet access.'
    },
    {
      id: 'vpc-b4', level: 'beginner',
      question: 'What is the default CIDR block for a new VPC if you use the AWS console wizard?',
      options: ['192.168.1.0/24', '10.0.0.0/16', '172.16.0.0/12', '172.31.0.0/16'],
      correct: 3,
      explanation: 'The default VPC created by AWS uses 172.31.0.0/16 as its CIDR block. When creating a custom VPC, you choose your own CIDR from the RFC 1918 private address ranges: 10.0.0.0/8, 172.16.0.0/12, or 192.168.0.0/16.'
    },
    {
      id: 'vpc-b5', level: 'beginner',
      question: 'A Security Group vs. a Network ACL (NACL) — which is stateful?',
      options: ['Both are stateless', 'Security Groups are stateful; Network ACLs are stateless', 'Network ACLs are stateful; Security Groups are stateless', 'Both are stateful'],
      correct: 1,
      explanation: 'Security Groups are STATEFUL: if you allow inbound traffic, the response outbound traffic is automatically allowed regardless of outbound rules. Network ACLs are STATELESS: you must explicitly allow both inbound AND outbound traffic for bidirectional communication.'
    },
    {
      id: 'vpc-b6', level: 'beginner',
      question: 'What is a NAT Gateway used for?',
      options: ['Providing public IP addresses to private instances', 'Allowing private subnet instances to initiate outbound internet connections (e.g., package downloads) while preventing unsolicited inbound connections from the internet', 'Connecting two VPCs together within the same region', 'Encrypting traffic between subnets in different Availability Zones'],
      correct: 1,
      explanation: 'A NAT Gateway (Network Address Translation) allows instances in private subnets to initiate outbound internet connections (for software updates, external APIs) while remaining unreachable from the internet. It must reside in a public subnet and requires an Elastic IP.'
    },
    {
      id: 'vpc-b7', level: 'beginner',
      question: 'How many Availability Zones can a single VPC span?',
      options: ['Only 1 AZ — VPCs are AZ-specific', '2 AZs maximum per VPC', 'All AZs in the AWS Region where the VPC is created', 'AZs across multiple AWS Regions'],
      correct: 2,
      explanation: 'A VPC spans all Availability Zones in the AWS Region where it\'s created. You then create subnets — each subnet resides in exactly one AZ. Resources in different AZs within the same VPC communicate using private IP addresses via the VPC\'s internal routing.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'vpc-i1', level: 'intermediate',
      question: 'What is VPC Peering and what is its key limitation?',
      options: ['VPC Peering connects VPCs via a hardware VPN tunnel; limitation is bandwidth cap of 1 Gbps', 'VPC Peering creates a private network link between two VPCs for traffic routing using private IPs; it does NOT support transitive peering (A↔B and B↔C does not allow A↔C)', 'VPC Peering is only available within the same AWS account; cannot peer cross-account', 'VPC Peering requires overlapping CIDR blocks to function correctly'],
      correct: 1,
      explanation: 'VPC Peering enables private IP routing between two VPCs (same/different account, same/different region). Key limitation: it is non-transitive. If VPC A peers with VPC B, and VPC B peers with VPC C, VPC A cannot communicate with VPC C via VPC B. Each peering relationship is direct and one-to-one.'
    },
    {
      id: 'vpc-i2', level: 'intermediate',
      question: 'AWS Transit Gateway (TGW) solves which VPC connectivity challenge?',
      options: ['Provides dedicated hardware VPN connections with guaranteed bandwidth', 'Acts as a regional network hub connecting multiple VPCs and on-premises networks via a single central gateway, eliminating the need for complex peering meshes', 'Enables VPCs to span multiple AWS regions automatically', 'Provides higher bandwidth than Direct Connect'],
      correct: 1,
      explanation: 'Without Transit Gateway, connecting N VPCs requires N*(N-1)/2 peering connections. Transit Gateway acts as a central hub (star topology) where VPCs and VPN connections attach as spokes. Route tables on TGW control inter-VPC routing, and it supports transitive routing unlike VPC peering.'
    },
    {
      id: 'vpc-i3', level: 'intermediate',
      question: 'What is the purpose of VPC Flow Logs?',
      options: ['Provide real-time packet captures of all traffic for forensic analysis', 'Capture metadata about IP traffic (source, destination, port, protocol, packets, bytes, action) flowing to/from network interfaces for security analysis and troubleshooting', 'Monitor application-level metrics and latency of VPC-hosted services', 'Encrypt all data flowing through VPC for compliance requirements'],
      correct: 1,
      explanation: 'VPC Flow Logs capture IP traffic metadata (not packet contents) at VPC, subnet, or ENI level. Records include: source/destination IP, ports, protocol, packet count, byte count, and ACCEPT/REJECT action. Logs publish to CloudWatch Logs or S3 — essential for security auditing, anomaly detection, and network troubleshooting.'
    },
    {
      id: 'vpc-i4', level: 'intermediate',
      question: 'An EC2 instance in a private subnet needs to reach an S3 bucket without traffic leaving the AWS network. What should you create?',
      options: ['A NAT Gateway and configure outbound rules', 'A VPC Endpoint (Gateway type for S3) — adds a route to the S3 service in the route table and keeps traffic on AWS\'s private network', 'An Internet Gateway in the private subnet', 'A Site-to-Site VPN to AWS S3 service endpoints'],
      correct: 1,
      explanation: 'A Gateway VPC Endpoint for S3 adds an S3 prefix list as a route in the route table, routing S3-bound traffic through AWS\'s private backbone rather than the internet. This avoids NAT Gateway data processing charges, eliminates internet exposure, and is free to use. Interface endpoints (PrivateLink) are used for other services.'
    },
    {
      id: 'vpc-i5', level: 'intermediate',
      question: 'Network ACL rules are evaluated in what order?',
      options: ['All rules are evaluated simultaneously and the most permissive wins', 'Rules are evaluated in ascending rule number order (lowest first); the first matching rule applies and evaluation stops — the default * DENY rule applies only if no other rule matches', 'Rules are evaluated from the highest number to the lowest', 'Deny rules are always evaluated before Allow rules regardless of rule number'],
      correct: 1,
      explanation: 'NACLs evaluate rules by rule number from lowest to highest (e.g., rule 100 before rule 200). The first rule that matches the traffic is applied and evaluation stops — similar to firewall ACLs. The default NACL allows all traffic. Custom NACLs deny all traffic by default with rule number 32767 (*).'
    },
    {
      id: 'vpc-i6', level: 'intermediate',
      question: 'What is an Elastic IP Address (EIP) in the context of VPC?',
      options: ['A dynamic IP that changes every time an instance restarts', 'A static public IPv4 address allocated to your AWS account that can be quickly remapped to any instance or network interface in a VPC for rapid failover', 'An IPv6 address allocated automatically for VPC resources', 'A private IP address that persists through instance stop/start cycles'],
      correct: 1,
      explanation: 'An Elastic IP is a static, public IPv4 address in your AWS account. Unlike standard public IPs (which change on stop/start), EIPs persist. They can be quickly remapped from a failed instance to a healthy standby — useful for failover patterns. Note: EIPs incur charges when not associated with a running instance.'
    },
    {
      id: 'vpc-i7', level: 'intermediate',
      question: 'AWS Direct Connect differs from Site-to-Site VPN because:',
      options: ['Direct Connect uses internet-based IPSec encryption, VPN uses dedicated fiber', 'Direct Connect provides a dedicated private network connection to AWS (bypassing the internet) with consistent bandwidth and lower latency; VPN uses encrypted IPSec tunnels over the public internet', 'VPN provides higher bandwidth than Direct Connect', 'Direct Connect can only be used with S3, while VPN works with all AWS services'],
      correct: 1,
      explanation: 'AWS Direct Connect establishes a dedicated physical fiber connection from your data center to an AWS Direct Connect location, providing consistent sub-10ms latency, up to 100 Gbps bandwidth, and no internet exposure. Site-to-Site VPN creates IPSec encrypted tunnels over the public internet — faster to set up but subject to internet variability.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'vpc-a1', level: 'advanced',
      question: 'You have 3 VPCs (A, B, C) and need full mesh connectivity where each can communicate with the others. Using Transit Gateway instead of VPC Peering, what are the architectural advantages?',
      options: ['TGW is cheaper than VPC peering for any number of VPCs', 'TGW provides centralized routing management, supports transitive routing (A↔B↔C), scales to thousands of VPCs/VPNs from a single gateway, and enables route table-based traffic segmentation between VPCs', 'TGW automatically encrypts all inter-VPC traffic unlike VPC peering', 'TGW eliminates data transfer charges between VPCs'],
      correct: 1,
      explanation: 'Transit Gateway advantages over peering mesh: 1) Single attachment per VPC (not N-1 peering connections). 2) Transitive routing supported. 3) Route tables on TGW enable traffic segmentation (e.g., prod VPCs can\'t reach dev VPCs). 4) Scales to 5,000 VPCs and 50 Gbps bandwidth. 5) Supports VPN and Direct Connect attachments centrally.'
    },
    {
      id: 'vpc-a2', level: 'advanced',
      question: 'An application in VPC A (10.0.0.0/16) needs to connect to a partner\'s service in VPC B (10.0.0.0/16). VPC Peering fails because of overlapping CIDRs. What solution resolves this?',
      options: ['Re-IP all instances in one VPC to remove the overlap before peering', 'Use AWS PrivateLink (Interface Endpoints) — expose the partner service behind a Network Load Balancer and create an Interface Endpoint in VPC A; PrivateLink works regardless of overlapping CIDRs', 'Use Transit Gateway which supports overlapping CIDRs between attached VPCs', 'Use a NAT Gateway to translate addresses before routing between VPCs'],
      correct: 1,
      explanation: 'AWS PrivateLink is the solution for overlapping CIDRs. The partner exposes their service behind a Network Load Balancer and creates a VPC Endpoint Service. VPC A creates an Interface Endpoint connecting to this service. PrivateLink does not route at IP level — it creates a private ENI in VPC A, bypassing CIDR conflicts.'
    },
    {
      id: 'vpc-a3', level: 'advanced',
      question: 'Describe the purpose and components of a VPC Egress-Only Internet Gateway (EIGW).',
      options: ['An EIGW provides outbound IPv4 access for private subnet instances without NAT', 'An EIGW is an IPv6-only component that allows outbound internet traffic from IPv6-enabled instances while blocking unsolicited inbound IPv6 connections — analogous to a NAT Gateway for IPv4', 'An EIGW restricts all traffic leaving a VPC for compliance purposes', 'An EIGW is an alias for a NAT Gateway that supports both IPv4 and IPv6'],
      correct: 1,
      explanation: 'Egress-Only Internet Gateway serves IPv6 traffic exclusively (IPv6 addresses are globally routable — there\'s no NAT for IPv6). It allows outbound IPv6 connections while preventing unsolicited inbound IPv6 connections, analogous to what a NAT Gateway does for IPv4. Route table entries: ::/0 → eigw-xxx for private IPv6 subnets.'
    },
    {
      id: 'vpc-a4', level: 'advanced',
      question: 'What is a Security Group\'s behavior regarding ALLOW vs DENY rules and why can\'t you create a Security Group DENY rule?',
      options: ['Security Groups support Deny rules starting from 2023 as part of AWS Network Firewall integration', 'Security Groups are allowlist-only (whitelist) — you can only add Allow rules. They have no explicit Deny rule capability; all traffic not matching an Allow rule is implicitly denied. This design prevents accidental lockouts from conflicting deny rules', 'Security Groups support both Allow and Deny but Deny rules cost extra', 'You can create Deny rules in Security Groups only for IPv6 traffic'],
      correct: 1,
      explanation: 'Security Groups operate as a positive allowlist. All inbound traffic is implicitly denied unless explicitly allowed. You cannot create explicit Deny rules. This simplifies management — you only declare what IS allowed, never what isn\'t. For explicit Deny capabilities (e.g., blocking specific IPs), use Network ACLs instead.'
    },
    {
      id: 'vpc-a5', level: 'advanced',
      question: 'For a multi-region active-active architecture, traffic must intelligently route users to the nearest healthy region. What combination of AWS services achieves sub-second regional failover with lowest latency?',
      options: ['Route 53 latency routing + ALB + Auto Scaling in each region', 'AWS Global Accelerator with endpoint groups in multiple regions (anycast static IPs) + ALB in each region for health check-based instant failover + Route 53 for DNS management', 'CloudFront with multiple origins pointing to regional ALBs with origin failover configured', 'Network Load Balancer with cross-region load balancing enabled'],
      correct: 1,
      explanation: 'AWS Global Accelerator uses anycast static IPs — users connect to the nearest AWS edge location, then traffic routes over AWS backbone to the closest healthy endpoint. Health checks are performed at 10-second intervals with 30-second failover. This is faster than DNS-based routing (DNS propagation can take minutes) and provides consistent static IP addresses for IP whitelisting.'
    },
    {
      id: 'vpc-a6', level: 'advanced',
      question: 'Your security team requires all VPC traffic between private subnets and AWS services (S3, DynamoDB, KMS, SSM) to stay entirely within the AWS network. What must be configured?',
      options: ['Enable VPC Enhanced Networking and disable all public route table entries', 'Create Gateway Endpoints (S3, DynamoDB) and Interface Endpoints/PrivateLink (KMS, SSM, ECR, etc.) for each service, remove NAT Gateway from route tables, and enforce via endpoint policies and SCPs', 'Create a Direct Connect link to AWS service endpoints', 'Enable AWS PrivateLink automatically by enabling VPC endpoint DNS'],
      correct: 1,
      explanation: 'For private-only VPC traffic: Gateway Endpoints route S3 and DynamoDB traffic within AWS backbone. Interface Endpoints (PrivateLink) create private ENIs for services like KMS, SSM, EC2 API, ECR, Secrets Manager. Endpoint policies control access. Remove the NAT Gateway/IGW routes and enforce via SCP denying internet gateway creation. VPC endpoint DNS must be enabled for proper name resolution.'
    }
  ]
};
