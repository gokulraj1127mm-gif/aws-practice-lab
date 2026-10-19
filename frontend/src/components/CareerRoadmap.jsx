import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Briefcase,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Check,
  Terminal,
  Server,
  Lock,
  Cpu,
  Layers
} from 'lucide-react';

export const CareerRoadmap = ({ onExploreLab, onExploreQuiz }) => {
  // Roadmaps for the 5 mandated tracks
  const roadmaps = [
    {
      id: 'cloudEngineer',
      role: 'AWS Cloud Engineer',
      badge: 'Foundational & Operations',
      icon: Server,
      color: 'amber',
      certLink: 'https://aws.amazon.com/certification/certified-sysops-admin-associate/',
      certName: 'AWS Certified SysOps Administrator / Solutions Architect Associate',
      summary: 'Focuses on provisioning, configuring, monitoring, and maintaining scalable and resilient infrastructure on AWS.',
      prerequisites: ['Linux fundamentals & bash scripting', 'Basic TCP/IP networking (IP addressing, DNS, CIDR blocks)', 'Git version control basics'],
      stages: [
        {
          stage: 'Phase 1: Foundational AWS & Networking',
          duration: '4-6 Weeks',
          services: ['Amazon EC2', 'Amazon VPC', 'AWS IAM', 'Amazon S3', 'Route 53'],
          labPractice: 'Build a custom VPC with public and private subnets, NAT Gateway, and security group rules.',
          deliverable: 'GitHub Repository with Terraform / CloudFormation template for a standardized multi-AZ VPC.'
        },
        {
          stage: 'Phase 2: High Availability & Scaling',
          duration: '4-6 Weeks',
          services: ['Elastic Load Balancing (ALB/NLB)', 'EC2 Auto Scaling', 'Amazon RDS Multi-AZ', 'Amazon CloudWatch'],
          labPractice: 'Configure an ALB with Auto Scaling Group spanning 2 AZs and CloudWatch CPU alarms.',
          deliverable: 'Automated zero-downtime rolling update deployment script for a web fleet.'
        },
        {
          stage: 'Phase 3: Operations, Patching & Automation',
          duration: '4 Weeks',
          services: ['AWS Systems Manager (SSM)', 'AWS CloudTrail', 'AWS Config', 'AWS Budgets'],
          labPractice: 'Implement passwordless instance access via SSM Session Manager and configure automated OS patch baselines.',
          deliverable: 'Automated FinOps cost anomaly alerting pipeline using CloudWatch and SNS.'
        }
      ],
      interviewQuestions: [
        {
          q: 'Scenario: An EC2 instance in a private subnet cannot connect to the internet to download security patches. How do you troubleshoot?',
          a: '1) Verify the private subnet route table has a `0.0.0.0/0` route pointing to a NAT Gateway (`nat-xxxx`); 2) Verify the NAT Gateway is in a public subnet with a route to an Internet Gateway (`igw-xxxx`); 3) Confirm Security Group and NACL rules allow outbound HTTP/HTTPS and return ephemeral traffic.'
        },
        {
          q: 'What is the operational difference between an EC2 instance reboot and an EC2 instance stop/start?',
          a: 'A reboot keeps the instance on the same physical host hardware and preserves private/public IP addresses. A stop/start migrates the instance to a new physical host, releasing its public IPv4 address (unless an Elastic IP is associated) while keeping EBS root volume data intact.'
        }
      ]
    },
    {
      id: 'devopsEngineer',
      role: 'AWS DevOps Engineer',
      badge: 'CI/CD & Infrastructure as Code',
      icon: Terminal,
      color: 'blue',
      certLink: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
      certName: 'AWS Certified DevOps Engineer — Professional',
      summary: 'Focuses on Infrastructure as Code (IaC), continuous delivery pipelines, automated testing, and container orchestration.',
      prerequisites: ['Proficiency with Docker containers', 'Experience writing CI/CD workflows (GitHub Actions / GitLab CI)', 'Infrastructure as Code principles (Terraform or CloudFormation)'],
      stages: [
        {
          stage: 'Phase 1: Infrastructure as Code & Templating',
          duration: '4 Weeks',
          services: ['AWS CloudFormation', 'AWS CDK (Cloud Development Kit)', 'AWS CLI', 'Systems Manager Parameter Store'],
          labPractice: 'Write modular CloudFormation nested stacks with parameters, outputs, and deletion policies.',
          deliverable: 'Fully synthesized AWS CDK TypeScript repository provisioning a complete serverless backend.'
        },
        {
          stage: 'Phase 2: CI/CD Pipelines & Artifacts',
          duration: '6 Weeks',
          services: ['AWS CodePipeline', 'AWS CodeBuild', 'Amazon ECR', 'AWS Elastic Beanstalk'],
          labPractice: 'Create a multi-stage deployment pipeline with automated unit tests and manual approval gates.',
          deliverable: 'End-to-end blue/green deployment pipeline for a Dockerized microservice.'
        },
        {
          stage: 'Phase 3: Container Orchestration & GitOps',
          duration: '6 Weeks',
          services: ['Amazon ECS (Fargate)', 'Amazon EKS (Kubernetes)', 'Amazon CloudWatch Logs Insights'],
          labPractice: 'Deploy an ECS service using awsvpc networking mode and Application Load Balancer dynamic port mapping.',
          deliverable: 'Production Kubernetes Helm chart deployed to Amazon EKS with Karpenter autoscaling.'
        }
      ],
      interviewQuestions: [
        {
          q: 'How do you perform zero-downtime deployments using AWS Elastic Beanstalk or ECS?',
          a: 'In Beanstalk, use Immutable deployments or Traffic Splitting (canary). In ECS, set `minimumHealthyPercent: 100` and `maximumPercent: 200` so new task versions launch and pass ALB health checks before old tasks are drained.'
        },
        {
          q: 'What is CloudFormation Drift Detection, and how do you resolve it?',
          a: 'Drift detection identifies manual out-of-band modifications made to cloud resources outside of CloudFormation templates. To resolve drift, either update the template to reflect the desired changes or manually revert the resource back to matching the template specification.'
        }
      ]
    },
    {
      id: 'cloudSecurityEngineer',
      role: 'AWS Cloud Security Engineer',
      badge: 'Zero Trust & Compliance',
      icon: Lock,
      color: 'rose',
      certLink: 'https://aws.amazon.com/certification/certified-security-specialty/',
      certName: 'AWS Certified Security — Specialty',
      summary: 'Focuses on Zero-Trust access control, cryptographic key management, data governance, and automated incident response.',
      prerequisites: ['Symmetric/Asymmetric encryption concepts', 'Identity federation (SAML 2.0 / OIDC)', 'Network security fundamentals (firewalls, TLS 1.3)'],
      stages: [
        {
          stage: 'Phase 1: Identity & Access Management Governance',
          duration: '4 Weeks',
          services: ['AWS IAM', 'AWS Organizations (SCPs)', 'AWS IAM Identity Center (SSO)', 'AWS KMS'],
          labPractice: 'Configure Service Control Policies (SCPs) preventing member accounts from leaving the organization or disabling CloudTrail.',
          deliverable: 'Multi-account IAM Permission Boundary policy enforcing least-privilege role creation.'
        },
        {
          stage: 'Phase 2: Detection & Audit Logging',
          duration: '5 Weeks',
          services: ['AWS CloudTrail', 'Amazon GuardDuty', 'AWS Security Hub', 'Amazon Macie'],
          labPractice: 'Deploy an Organization Trail delivering encrypted logs to a centralized, locked-down Log Archive account.',
          deliverable: 'Automated EventBridge rule that detects root account login and sends an emergency PagerDuty/SNS alert.'
        },
        {
          stage: 'Phase 3: Edge & Infrastructure Defense',
          duration: '5 Weeks',
          services: ['AWS WAF', 'AWS Shield Advanced', 'VPC Network Firewall', 'AWS Secrets Manager'],
          labPractice: 'Attach AWS WAF rules to an ALB to block SQL Injection, Cross-Site Scripting (XSS), and rate-limit scrapers.',
          deliverable: 'Automated database credential rotation script running on AWS Lambda with AWS Secrets Manager.'
        }
      ],
      interviewQuestions: [
        {
          q: 'Explain the difference between an S3 Bucket Policy, an IAM Policy, and an S3 Access Point.',
          a: 'An IAM policy is attached to identities (users/roles) defining what they can do. An S3 bucket policy is a resource-based policy attached directly to the bucket, evaluated for both internal and cross-account principals. S3 Access Points provide distinct hostnames with dedicated access policies for specific data partitions or workloads.'
        },
        {
          q: 'How does envelope encryption work in AWS KMS?',
          a: 'KMS uses a root Customer Managed Key (CMK) to generate a unique plaintext Data Encryption Key (DEK) and an encrypted DEK. The application encrypts large data using the plaintext DEK locally, wipes the plaintext key from memory, and stores the encrypted DEK alongside the ciphertext.'
        }
      ]
    },
    {
      id: 'solutionsArchitect',
      role: 'AWS Solutions Architect',
      badge: 'Systems Design & Strategy',
      icon: Layers,
      color: 'purple',
      certLink: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      certName: 'AWS Certified Solutions Architect (Associate & Professional)',
      summary: 'Focuses on designing cost-effective, fault-tolerant, scalable distributed systems aligned with the Well-Architected Framework.',
      prerequisites: ['System design fundamentals', 'Relational vs NoSQL database trade-offs', 'High availability and disaster recovery patterns'],
      stages: [
        {
          stage: 'Phase 1: Resilient Multi-AZ Compute & Storage',
          duration: '6 Weeks',
          services: ['Amazon EC2', 'Amazon S3', 'Amazon EBS', 'Amazon EFS', 'Amazon Route 53'],
          labPractice: 'Design a cross-region disaster recovery architecture with Route 53 DNS failover routing policy.',
          deliverable: 'Comprehensive disaster recovery architecture document with RTO and RPO benchmarks.'
        },
        {
          stage: 'Phase 2: Data Architecture & Persistence',
          duration: '6 Weeks',
          services: ['Amazon RDS (Aurora)', 'Amazon DynamoDB', 'Amazon ElastiCache', 'Amazon Redshift'],
          labPractice: 'Configure an Aurora Global Database with sub-second replication latency across multiple AWS regions.',
          deliverable: 'Comparative evaluation document assessing relational versus document store trade-offs for transaction processing.'
        },
        {
          stage: 'Phase 3: Well-Architected Optimization & FinOps',
          duration: '4 Weeks',
          services: ['AWS Well-Architected Tool', 'AWS Cost Explorer', 'AWS Trusted Advisor', 'AWS Compute Optimizer'],
          labPractice: 'Conduct an official Well-Architected Review identifying high-risk issues (HRIs) in a legacy monolithic system.',
          deliverable: 'Enterprise migration roadmap moving an on-premises datacenter to AWS with FinOps cost forecasts.'
        }
      ],
      interviewQuestions: [
        {
          q: 'How do you design a system with an RTO of 5 minutes and an RPO of 0 for transactional database workloads?',
          a: 'Use Amazon Aurora Multi-AZ with automated synchronous 6-way storage replication across 3 AZs for zero RPO within a region. For cross-region disaster recovery, combine Aurora Global Database (sub-second physical storage replication) with automated Route 53 health-check failover to meet the 5-minute RTO.'
        },
        {
          q: 'What is the trade-off between vertical scaling and horizontal scaling in AWS?',
          a: 'Vertical scaling (increasing instance size, e.g., t3.micro to m5.large) has hard hardware limits, requires downtime during resize, and introduces a single point of failure. Horizontal scaling (adding instances behind an ALB via Auto Scaling) offers limitless elasticity, fault tolerance, and zero-downtime scaling, but requires stateless application architecture.'
        }
      ]
    },
    {
      id: 'serverlessDeveloper',
      role: 'AWS Serverless Developer',
      badge: 'Event-Driven & Microservices',
      icon: Cpu,
      color: 'emerald',
      certLink: 'https://aws.amazon.com/certification/certified-developer-associate/',
      certName: 'AWS Certified Developer — Associate',
      summary: 'Focuses on writing cloud-native, event-driven applications using serverless building blocks with zero idle compute costs.',
      prerequisites: ['JavaScript/TypeScript or Python proficiency', 'RESTful and asynchronous messaging concepts', 'Experience with asynchronous event loops'],
      stages: [
        {
          stage: 'Phase 1: Serverless Core Compute & APIs',
          duration: '4 Weeks',
          services: ['AWS Lambda', 'Amazon API Gateway', 'Amazon DynamoDB', 'AWS SAM'],
          labPractice: 'Build a serverless REST CRUD API using AWS SAM with environment variables and local debugging.',
          deliverable: 'Deployed serverless e-commerce cart microservice hosted on API Gateway and Lambda.'
        },
        {
          stage: 'Phase 2: Event-Driven Orchestration & Messaging',
          duration: '5 Weeks',
          services: ['Amazon EventBridge', 'Amazon SQS', 'Amazon SNS', 'AWS Step Functions'],
          labPractice: 'Implement a distributed saga pattern using AWS Step Functions to coordinate order payment, inventory, and shipping.',
          deliverable: 'EventBridge-driven asynchronous notification system handling webhooks and dead-letter queues (DLQ).'
        },
        {
          stage: 'Phase 3: Serverless Observability & Security',
          duration: '4 Weeks',
          services: ['AWS X-Ray', 'Amazon CloudWatch Embedded Metric Format', 'Amazon Cognito', 'AWS AppSync'],
          labPractice: 'Instrument distributed request tracing across Lambda, API Gateway, and DynamoDB using AWS X-Ray SDK.',
          deliverable: 'Secure GraphQL API built on AWS AppSync with Amazon Cognito User Pools authentication.'
        }
      ],
      interviewQuestions: [
        {
          q: 'What is the SQS Dead-Letter Queue (DLQ) pattern, and why is it essential for serverless event processing?',
          a: 'When an SQS consumer (like Lambda) repeatedly fails to process a message due to application errors, the message exceeds `maxReceiveCount` and is automatically moved to a DLQ. This prevents poison-pill messages from blocking the queue and provides an isolated buffer for debugging and manual reprocessing.'
        },
        {
          q: 'How does DynamoDB achieve single-digit millisecond latency at any scale?',
          a: 'DynamoDB uses the Partition Key through an internal hash function to distribute items evenly across physical SSD storage partitions. Direct primary key lookups bypass scan operations and route directly to the partition storing the item.'
        }
      ]
    }
  ];

  const [activeRoadmapId, setActiveRoadmapId] = useState('cloudEngineer');
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('aws_lab_roadmap_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [openInterviewIdx, setOpenInterviewIdx] = useState(null);

  const activeRoadmap = roadmaps.find(r => r.id === activeRoadmapId) || roadmaps[0];

  const toggleMilestone = (milestoneKey) => {
    setCompletedMilestones(prev => {
      const updated = { ...prev, [milestoneKey]: !prev[milestoneKey] };
      try {
        localStorage.setItem('aws_lab_roadmap_milestones', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Career Navigation & Practical Preparation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AWS Cloud Engineering Career Roadmaps
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Structured learning stages, hands-on lab milestones, portfolio deliverables, and technical scenario-based interview preparation.
            </p>
          </div>

          <div className="text-xs text-gray-400 p-3 bg-slate-950 rounded-lg border border-slate-800 max-w-xs space-y-1">
            <span className="font-semibold text-gray-300 block">Notice:</span>
            <span>Roadmaps represent educational curriculum guidance, not guarantees of employment or official certification passing.</span>
          </div>
        </div>
      </div>

      {/* TRACK SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {roadmaps.map((r) => {
          const Icon = r.icon;
          const isActive = activeRoadmapId === r.id;

          return (
            <button
              key={r.id}
              onClick={() => { setActiveRoadmapId(r.id); setOpenInterviewIdx(null); }}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 shadow-md ${
                isActive
                  ? 'bg-amber-500/15 border-amber-500/50 ring-1 ring-amber-500/30 text-white'
                  : 'bg-slate-900 border-slate-800 text-gray-400 hover:text-gray-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-gray-400">
                  {r.stages.length} Phases
                </span>
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{r.role}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 truncate">{r.badge}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE TRACK DETAIL VIEW */}
      <div className="space-y-6">
        
        {/* Track Overview Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{activeRoadmap.role}</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 font-normal">
                  {activeRoadmap.badge}
                </span>
              </h2>
              <p className="text-xs text-gray-300 mt-1">{activeRoadmap.summary}</p>
            </div>

            <a
              href={activeRoadmap.certLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-amber-400 font-semibold transition-colors shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>{activeRoadmap.certName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Recommended Prerequisites:</span>
            <div className="flex flex-wrap gap-2">
              {activeRoadmap.prerequisites.map((p, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs text-gray-300 font-mono">
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ORDERED LEARNING STAGES */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Ordered Curriculum Stages & Milestone Checklist</span>
          </h3>

          <div className="space-y-4">
            {activeRoadmap.stages.map((stage, idx) => {
              const milestoneKey = `${activeRoadmap.id}_stage_${idx}`;
              const isCompleted = completedMilestones[milestoneKey];

              return (
                <div
                  key={idx}
                  className={`bg-slate-900 border rounded-xl p-5 shadow-lg transition-all space-y-4 ${
                    isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMilestone(milestoneKey)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-700 bg-slate-950 text-transparent hover:border-amber-400'
                        }`}
                        title="Mark stage completed"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                      <h4 className={`text-sm font-bold ${isCompleted ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        {stage.stage}
                      </h4>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-gray-400 border border-slate-800 self-start sm:self-auto">
                      Timeline: {stage.duration}
                    </span>
                  </div>

                  {/* Core Services to Learn */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-gray-400">AWS Services to Master:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.services.map((svc, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-800 text-gray-200 border border-slate-700 text-[11px]">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Practical Lab & Deliverable */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800/80">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                      <span className="font-bold text-amber-400 block">Hands-on Lab Exercise:</span>
                      <p className="text-gray-300">{stage.labPractice}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                      <span className="font-bold text-blue-400 block">Suggested Portfolio Deliverable:</span>
                      <p className="text-gray-300">{stage.deliverable}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SCENARIO-BASED TECHNICAL INTERVIEW PREPARATION */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Scenario-Based Technical Interview Questions & Model Answers</span>
          </h3>
          <p className="text-xs text-gray-400">
            Real-world troubleshooting and design dilemmas asked by AWS hiring teams.
          </p>

          <div className="space-y-3">
            {activeRoadmap.interviewQuestions.map((item, idx) => {
              const isOpen = openInterviewIdx === idx;

              return (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs">
                  <div
                    onClick={() => setOpenInterviewIdx(isOpen ? null : idx)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="font-semibold text-gray-200 flex items-center gap-2">
                      <span className="text-amber-400 font-mono font-bold">Q{idx + 1}:</span>
                      <span>{item.q}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>

                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-slate-800/80 bg-slate-900/40 space-y-2">
                      <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wider">
                        Architectural Model Answer & Explanation:
                      </span>
                      <p className="text-gray-300 leading-relaxed text-xs whitespace-pre-line">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
