// AWS CloudTrail Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const cloudtrailQuiz = {
  id: 'cloudtrail',
  service: 'AWS CloudTrail',
  icon: 'Footprints',
  color: 'amber',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'ct-b1', level: 'beginner',
      question: 'What is the primary function of AWS CloudTrail?',
      options: [
        'Real-time application performance and compute metric alerting',
        'Auditing, governance, compliance, and recording of account API activity and actions taken across an AWS account',
        'Automated database backup generation and point-in-time recovery',
        'Managing DNS routing policies for registered public domain names'
      ],
      correct: 1,
      explanation: 'AWS CloudTrail records actions taken by a user, role, or AWS service. Events include actions taken in the AWS Management Console, AWS CLI, and AWS SDKs and APIs.'
    },
    {
      id: 'ct-b2', level: 'beginner',
      question: 'How long does CloudTrail Event History keep management event records free of charge in the AWS Console without creating a custom trail?',
      options: [
        '7 days',
        '30 days',
        '90 days',
        '365 days'
      ],
      correct: 2,
      explanation: 'CloudTrail Event History retains records of management events for 90 days at no additional charge. For longer retention, you must configure a trail to send logs to an S3 bucket.'
    },
    {
      id: 'ct-b3', level: 'beginner',
      question: 'Where can AWS CloudTrail deliver logs for long-term storage and analytical retention beyond 90 days?',
      options: [
        'Amazon S3 bucket and Amazon CloudWatch Logs',
        'AWS Secrets Manager vault',
        'AWS Systems Manager Parameter Store',
        'Amazon Route 53 hosted zones'
      ],
      correct: 0,
      explanation: 'CloudTrail can deliver log files to an Amazon S3 bucket for durable, encrypted, long-term storage, and optionally stream to Amazon CloudWatch Logs log groups for real-time metric filtering.'
    },
    {
      id: 'ct-b4', level: 'beginner',
      question: 'What are Management Events in AWS CloudTrail?',
      options: [
        'Granular operations performed on or within a resource, such as GetObject on an S3 bucket',
        'Control plane operations executed on resources in an AWS account, such as creating a VPC or terminating an EC2 instance',
        'Operating system process logs collected inside an EC2 instance',
        'HTTP request traces between microservices captured by AWS X-Ray'
      ],
      correct: 1,
      explanation: 'Management events (also known as control plane operations) provide insight into management operations that are performed on resources in your AWS account (e.g., RunInstances, CreateBucket, AttachRolePolicy).'
    },
    {
      id: 'ct-b5', level: 'beginner',
      question: 'What are Data Events in AWS CloudTrail?',
      options: [
        'High-volume resource operations (data plane operations) such as S3 object-level APIs (GetObject, PutObject) or Lambda function invocations',
        'Administrative changes to IAM user passwords and account contact details',
        'Automated AWS bill generation events sent to the root email address',
        'Periodic snapshots created by Amazon EBS lifecycle manager'
      ],
      correct: 0,
      explanation: 'Data events provide visibility into the resource operations performed on or within a resource itself (e.g., S3 GetObject/PutObject, Lambda Invoke). Data events are not logged by default due to high volume.'
    },
    {
      id: 'ct-b6', level: 'beginner',
      question: 'What feature of CloudTrail allows a security team to determine if a log file was modified, deleted, or remained untouched after delivery?',
      options: [
        'CloudWatch Metric Filters',
        'CloudTrail Log File Integrity Validation',
        'IAM Credential Report',
        'Amazon Macie PII scanner'
      ],
      correct: 1,
      explanation: 'Log File Integrity Validation uses SHA-256 hashing and digital signatures (RSA) with digest files to verify that log files were not modified, deleted, or tampered with after delivery by CloudTrail.'
    },
    {
      id: 'ct-b7', level: 'beginner',
      question: 'When creating a new Trail in CloudTrail, what is the best practice recommendation for regional coverage?',
      options: [
        'Enable the trail in us-east-1 only to reduce S3 storage costs',
        'Apply the trail to all AWS Regions to record events across the global infrastructure consistently',
        'Create separate individual trails manually in every single region pointing to different S3 buckets',
        'Disable CloudTrail in regions where no EC2 instances are currently launched'
      ],
      correct: 1,
      explanation: 'Creating a trail that applies to all Regions ensures complete visibility, logging global services (IAM, STS, CloudFront) and detecting any unauthorized activity occurring in unexpected or unused regions.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'ct-i1', level: 'intermediate',
      question: 'What is a Multi-Region CloudTrail trail?',
      options: [
        'A trail that records events from all AWS Regions into a single target Amazon S3 bucket',
        'A trail that requires cross-account replication to another cloud provider',
        'A trail that only logs VPC flow logs across peer networks',
        'A trail that copies EC2 AMIs across geographic boundaries'
      ],
      correct: 0,
      explanation: 'A multi-Region trail logs events from all Regions in your AWS account and delivers those log files to a single S3 bucket, simplifying centralized auditing and compliance analysis.'
    },
    {
      id: 'ct-i2', level: 'intermediate',
      question: 'What is an Organization Trail in AWS Organizations?',
      options: [
        'A trail that records management events for all member accounts within an AWS Organization from the management account',
        'A trail that forces all employee laptops to log terminal keystrokes to AWS',
        'A billing report sent exclusively to the Chief Financial Officer',
        'A trail configured to manage GitHub repository push events'
      ],
      correct: 0,
      explanation: 'An Organization trail records events for all AWS accounts in an organization created in AWS Organizations. Member accounts cannot modify or delete the Organization trail.'
    },
    {
      id: 'ct-i3', level: 'intermediate',
      question: 'What are CloudTrail Insights events designed to detect?',
      options: [
        'Underutilized EC2 instances that should be rightsized to save money',
        'Unusual operational API call volume or spikes (e.g., sudden burst of IAM errors or EC2 launch spikes) compared to historical baseline activity',
        'Expiring SSL/TLS certificates registered in AWS Certificate Manager',
        'VPC CIDR block IP exhaustion warnings'
      ],
      correct: 1,
      explanation: 'CloudTrail Insights analyzes CloudTrail management events to establish baseline patterns and alert on anomalous spikes or atypical volumes of write management API calls or error codes.'
    },
    {
      id: 'ct-i4', level: 'intermediate',
      question: 'Which service can be integrated with CloudTrail to trigger automated remediation (like revoking an IAM policy) in response to a specific security API event?',
      options: [
        'Amazon EventBridge (formerly CloudWatch Events) triggering an AWS Lambda function',
        'AWS Systems Manager Patch Manager',
        'Amazon Aurora Global Database',
        'Amazon Route 53 Health Checks'
      ],
      correct: 0,
      explanation: 'CloudTrail routes events to Amazon EventBridge in near real-time, allowing EventBridge rules to match specific API actions (e.g., PutBucketPolicy with public permissions) and trigger Lambda functions for automated remediation.'
    },
    {
      id: 'ct-i5', level: 'intermediate',
      question: 'How does CloudTrail handle logging for global services like IAM and AWS STS?',
      options: [
        'IAM events are never recorded by CloudTrail for privacy reasons',
        'Events for global services are delivered with events for the us-east-1 (N. Virginia) region by default',
        'They are duplicated equally across all active regions simultaneously',
        'They require an on-premises Syslog collector configured via VPN'
      ],
      correct: 1,
      explanation: 'Events for global services (such as IAM, AWS STS, and Amazon CloudFront) are generally recorded as occurring in the US East (N. Virginia) region us-east-1.'
    },
    {
      id: 'ct-i6', level: 'intermediate',
      question: 'What is AWS CloudTrail Lake?',
      options: [
        'A managed data lake service that lets you aggregate, immutably store, and query audit and activity logs using SQL syntax without maintaining S3 and Athena infrastructure',
        'A water cooling system designed for modular edge data centers',
        'An S3 bucket lifecycle rule that archives logs to Deep Archive after 1 day',
        'A visualization tool for VPC routing table topologies'
      ],
      correct: 0,
      explanation: 'CloudTrail Lake is a managed data lake for auditing and compliance that allows security teams to aggregate, immutably store, and run SQL queries against CloudTrail events without managing external data pipelines or Athena tables.'
    },
    {
      id: 'ct-i7', level: 'intermediate',
      question: 'In a CloudTrail log record, which field indicates the exact identity and role that initiated the API request?',
      options: [
        'requestParameters',
        'userIdentity',
        'recipientAccountId',
        'responseElements'
      ],
      correct: 1,
      explanation: 'The userIdentity element contains details about who or what made the request, including the type (IAMUser, AssumedRole, Root, FederatedUser), ARN, principalId, and accountId.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'ct-a1', level: 'advanced',
      question: 'To protect an enterprise CloudTrail S3 bucket from being deleted or modified even by a rogue root user or compromised administrator account, which combination of controls should be implemented?',
      options: [
        'IAM policy granting FullS3Access with MFA delete disabled',
        'S3 Object Lock in Compliance Mode, S3 Bucket Policy denying deletion except with dedicated conditions, and MFA Delete enabled',
        'Store the S3 bucket in a public subnet with an open ACL',
        'Set an S3 Lifecycle transition to Glacier Flexible Retrieval with a 1-day delay'
      ],
      correct: 1,
      explanation: 'S3 Object Lock in Compliance Mode ensures that records cannot be deleted or overwritten by ANY user (including the root user) for the retention period. Combined with strict bucket policies and MFA Delete, this provides robust immutability.'
    },
    {
      id: 'ct-a2', level: 'advanced',
      question: 'How do CloudTrail Digest files work to verify log file integrity mathematically?',
      options: [
        'They store full plaintext copies of all log files in an unencrypted DynamoDB table',
        'Every hour, CloudTrail generates a signed digest file containing the SHA-256 hashes of all delivered log files and the hash of the previous digest file, forming a verifiable hash chain',
        'They send an SMS message containing the byte length of each gzip archive to the security lead',
        'They require an RSA private key upload to AWS Key Management Service (KMS) before each API call'
      ],
      correct: 1,
      explanation: 'CloudTrail digest files contain the names and SHA-256 hashes of the log files delivered during the past hour, plus the digital signature and hash of the preceding digest file, creating a cryptographically verifiable chain of custody.'
    },
    {
      id: 'ct-a3', level: 'advanced',
      question: 'A company with 100 AWS accounts in AWS Organizations wants centralized security auditing. What is the recommended least-privilege pattern for CloudTrail?',
      options: [
        'Create a separate Trail and individual S3 bucket in each member account with cross-account public read permissions',
        'Create an Organization Trail in the Management Account (or Delegated Administrator account) configured to deliver logs to an encrypted S3 bucket in a dedicated Centralized Security/Log Archive Account',
        'Configure a cron job running on an EC2 instance in us-west-2 that curls the AWS Management Console API every 5 minutes',
        'Stream all CloudTrail events to an on-premises physical NFS file share over an unencrypted IPsec tunnel'
      ],
      correct: 1,
      explanation: 'An Organization Trail created in the management account or a delegated administrator account delivers audit logs from all member accounts into a centralized, locked-down S3 bucket in a dedicated Log Archive account, preventing member account admins from tampering with logs.'
    },
    {
      id: 'ct-a4', level: 'advanced',
      question: 'Why should Server-Side Encryption with AWS KMS Customer Managed Keys (SSE-KMS) be preferred over SSE-S3 for sensitive CloudTrail log buckets?',
      options: [
        'SSE-KMS eliminates the need for an S3 bucket policy completely',
        'SSE-KMS provides dual-layer access control: users require both S3 permissions AND KMS decrypt permissions, plus KMS generates an independent audit log for every key access',
        'SSE-KMS reduces the compressed gzip log file size by 50%',
        'SSE-KMS is required to view logs inside the AWS Management Console Event History'
      ],
      correct: 1,
      explanation: 'SSE-KMS gives granular control over encryption key policies, separates S3 bucket permissions from cryptographic decrypt rights (preventing unauthorized read even if S3 access is granted), and logs every key decryption event in KMS audit logs.'
    },
    {
      id: 'ct-a5', level: 'advanced',
      question: 'When investigating an unauthorized EC2 instance termination, an engineer finds the event in CloudTrail with `eventName: "TerminateInstances"`. The `userIdentity.type` is `AssumedRole`. Which field reveals the original human federated identity who assumed that role via SAML/OIDC?',
      options: [
        'userIdentity.sessionContext.sessionIssuer.userName and sessionContext.sessionIssuer.arn',
        'requestParameters.instanceIdSet',
        'userIdentity.arn containing the role session name, which matches the user ID passed during AssumeRoleWithSAML',
        'Both A and C provide the exact identity chain'
      ],
      correct: 3,
      explanation: 'In assumed role events, `userIdentity.arn` includes the role name and the specific RoleSessionName (typically the federated user\'s corporate email or ID passed during authentication), while `sessionContext.sessionIssuer` identifies the underlying IAM role.'
    },
    {
      id: 'ct-a6', level: 'advanced',
      question: 'How do you prevent AWS CloudTrail log delivery failure when encrypting CloudTrail S3 buckets with a Customer Managed KMS Key (CMK)?',
      options: [
        'Disable all KMS Key Policies and assign the key an open wildcard grant',
        'Add a KMS Key Policy statement granting `kms:GenerateDataKey*` and `kms:DescribeKey` permissions to the CloudTrail service principal (`cloudtrail.amazonaws.com`) with appropriate aws:SourceArn conditions',
        'Convert the KMS key from symmetric to asymmetric RSA 4096-bit',
        'CloudTrail cannot encrypt logs with KMS Customer Managed Keys'
      ],
      correct: 1,
      explanation: 'The KMS key policy must grant permissions to `cloudtrail.amazonaws.com` to use `kms:GenerateDataKey*` and `kms:DescribeKey`, scoped with conditions such as `StringEquals: aws:SourceArn` matching the trail ARN to prevent confused deputy vulnerability.'
    }
  ]
};
