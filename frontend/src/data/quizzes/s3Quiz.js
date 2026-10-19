// S3 Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const s3Quiz = {
  id: 's3',
  service: 'Amazon S3',
  icon: 'Database',
  color: 'emerald',
  questions: [
    // ─── Beginner ──────────────────────────────────────────────────────────
    {
      id: 's3-b1', level: 'beginner',
      question: 'What type of storage does Amazon S3 provide?',
      options: ['Block storage', 'File storage', 'Object storage', 'In-memory storage'],
      correct: 2,
      explanation: 'Amazon S3 is an object storage service. Data is stored as objects containing the data itself, metadata, and a unique key identifier — not as files in a hierarchy (file storage) or blocks on a disk (block storage).'
    },
    {
      id: 's3-b2', level: 'beginner',
      question: 'What is the maximum size of a single object you can store in Amazon S3?',
      options: ['5 GB', '5 TB', '1 TB', '100 GB'],
      correct: 1,
      explanation: 'The maximum size of a single object in Amazon S3 is 5 TB. For objects larger than 100 MB, AWS recommends using the multipart upload API for reliability and performance.'
    },
    {
      id: 's3-b3', level: 'beginner',
      question: 'Which S3 feature allows you to host a static website directly from a bucket?',
      options: ['S3 Transfer Acceleration', 'S3 Static Website Hosting', 'S3 Replication', 'S3 Intelligent-Tiering'],
      correct: 1,
      explanation: 'S3 Static Website Hosting allows you to configure a bucket to host HTML, CSS, and JavaScript files accessible via an HTTP endpoint. It does not support HTTPS directly — pair with CloudFront for HTTPS.'
    },
    {
      id: 's3-b4', level: 'beginner',
      question: 'What is an S3 bucket name requirement?',
      options: ['Must be globally unique across ALL AWS accounts and regions', 'Must be unique only within your own AWS account', 'Can contain uppercase letters and special characters', 'Is unique only within an AWS region'],
      correct: 0,
      explanation: 'S3 bucket names must be globally unique across all AWS accounts and all regions. They must be 3–63 characters long, contain only lowercase letters, numbers, and hyphens, and not be formatted as IP addresses.'
    },
    {
      id: 's3-b5', level: 'beginner',
      question: 'What is the cheapest S3 storage class for archiving data that is RARELY accessed and can tolerate retrieval times of minutes to hours?',
      options: ['S3 Standard', 'S3 Standard-IA', 'S3 Glacier Flexible Retrieval (formerly Glacier)', 'S3 Intelligent-Tiering'],
      correct: 2,
      explanation: 'S3 Glacier Flexible Retrieval (formerly S3 Glacier) offers very low storage cost designed for long-term archiving. Retrieval options range from Expedited (1–5 min), Standard (3–5 hours), and Bulk (5–12 hours). S3 Glacier Deep Archive is even cheaper for data accessed less than once per year.'
    },
    {
      id: 's3-b6', level: 'beginner',
      question: 'By default, what is the access setting for a newly created S3 bucket?',
      options: ['Publicly accessible to everyone on the internet', 'Private — only the bucket owner has access', 'Shared with all accounts in the same AWS Organization', 'Accessible to all authenticated AWS users'],
      correct: 1,
      explanation: 'All S3 buckets are private by default. Block Public Access settings are enabled by default, and no explicit bucket policy or ACL grants external access. Access is granted only to the AWS account owner who created the bucket.'
    },
    {
      id: 's3-b7', level: 'beginner',
      question: 'Which S3 feature provides 99.999999999% (11 nines) durability for stored objects?',
      options: ['S3 Cross-Region Replication', 'S3 Standard Storage Class (built-in multi-AZ redundancy)', 'S3 Versioning', 'S3 Object Lock'],
      correct: 1,
      explanation: 'All S3 Standard storage classes provide 99.999999999% (11 nines) of object durability by automatically replicating data across a minimum of 3 Availability Zones. This is built into the service — no extra configuration needed.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 's3-i1', level: 'intermediate',
      question: 'What does enabling S3 Versioning allow you to do?',
      options: ['Automatically compress objects for cheaper storage', 'Preserve, retrieve, and restore every version of every object including deleted objects', 'Enable multi-region access for objects', 'Encrypt all objects using SSE-KMS'],
      correct: 1,
      explanation: 'S3 Versioning keeps multiple variants of an object in the same bucket. When you delete a versioned object, S3 inserts a delete marker instead of permanently removing it — enabling recovery. You can restore any previous version at any time.'
    },
    {
      id: 's3-i2', level: 'intermediate',
      question: 'S3 Transfer Acceleration uses which AWS service to speed up long-distance uploads to S3?',
      options: ['AWS Direct Connect dedicated fiber links', 'Amazon CloudFront\'s globally distributed edge locations (AWS backbone network)', 'AWS Global Accelerator anycast routing', 'Amazon ElastiCache in-memory caching'],
      correct: 1,
      explanation: 'S3 Transfer Acceleration routes uploads through Amazon CloudFront\'s edge network. Data enters AWS at the nearest edge location and travels over AWS\'s high-speed backbone to the target S3 bucket region — significantly faster than routing across the public internet for long distances.'
    },
    {
      id: 's3-i3', level: 'intermediate',
      question: 'An S3 Lifecycle Rule can automatically do which of the following?',
      options: ['Encrypt unencrypted objects', 'Transition objects to cheaper storage classes or expire/delete them after defined time periods', 'Replicate objects across accounts for disaster recovery', 'Compress objects using GZIP before storing them'],
      correct: 1,
      explanation: 'S3 Lifecycle Rules automate cost management by transitioning objects to cheaper tiers (Standard → Standard-IA → Glacier) based on age, or permanently deleting expired objects and old object versions — all without manual intervention.'
    },
    {
      id: 's3-i4', level: 'intermediate',
      question: 'What is the difference between S3 Server-Side Encryption (SSE-S3) and SSE-KMS?',
      options: ['SSE-S3 encrypts in transit, SSE-KMS encrypts at rest', 'SSE-S3 uses AWS-managed keys (AES-256), SSE-KMS uses customer-managed CMKs in AWS KMS with audit logging via CloudTrail', 'SSE-KMS is free, SSE-S3 charges per key operation', 'They are functionally identical with different key lengths'],
      correct: 1,
      explanation: 'SSE-S3 encrypts objects using AES-256 with AWS-managed keys — simple and free. SSE-KMS uses AWS Key Management Service, allowing customer-managed CMKs, key rotation policies, and per-operation auditing via CloudTrail. SSE-KMS incurs API call charges against KMS.'
    },
    {
      id: 's3-i5', level: 'intermediate',
      question: 'What is S3 Cross-Region Replication (CRR) used for?',
      options: ['Backing up S3 bucket metadata only', 'Automatically replicating objects from a source bucket in one region to a destination bucket in a different region for DR or latency reduction', 'Synchronizing objects between AWS accounts in the same region', 'Compressing objects during transfer between regions'],
      correct: 1,
      explanation: 'CRR asynchronously replicates objects from a source bucket to a destination bucket in a different AWS region. It requires versioning enabled on both buckets and is used for disaster recovery, compliance requirements, or reducing access latency for geographically distributed users.'
    },
    {
      id: 's3-i6', level: 'intermediate',
      question: 'An application needs to generate pre-signed URLs allowing temporary public access to private S3 objects without changing bucket permissions. What is the MAXIMUM URL expiration time?',
      options: ['1 hour', '24 hours', '7 days', '30 days'],
      correct: 2,
      explanation: 'Pre-signed URLs grant temporary access to private S3 objects. When generated using IAM role credentials via AWS SDK or CLI, the maximum expiration is 7 days (604,800 seconds). When generated using IAM user credentials, it can also be up to 7 days. This allows secure, time-limited sharing.'
    },
    {
      id: 's3-i7', level: 'intermediate',
      question: 'What is the S3 Intelligent-Tiering storage class designed for?',
      options: ['Objects always archived for long-term compliance', 'Objects with unpredictable or changing access patterns, automatically moving between frequent/infrequent/archive tiers based on usage to optimize cost', 'High-frequency access objects requiring millisecond retrieval', 'Objects that are always transitioning between regions'],
      correct: 1,
      explanation: 'S3 Intelligent-Tiering monitors access patterns and automatically moves objects between tiers: Frequent Access, Infrequent Access (30 days no access), Archive Instant Access (90 days), and optional Archive Access tiers. It eliminates the need to manually set lifecycle policies for unpredictable workloads.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 's3-a1', level: 'advanced',
      question: 'S3 Object Lock in GOVERNANCE mode vs COMPLIANCE mode — what is the key operational difference?',
      options: ['Governance mode allows root account to delete objects, Compliance mode cannot be overridden by any user', 'Compliance mode allows bucket policy overrides, Governance mode does not', 'Both modes are identical in behavior but differ in pricing', 'Governance mode uses longer retention periods than Compliance mode'],
      correct: 0,
      explanation: 'In GOVERNANCE mode, users with the s3:BypassGovernanceRetention IAM permission (or root) can delete objects before retention expires. In COMPLIANCE mode, NO user — not even root — can delete or shorten the retention period. Compliance mode satisfies strict regulatory requirements like SEC Rule 17a-4.'
    },
    {
      id: 's3-a2', level: 'advanced',
      question: 'You need to serve S3 objects with HTTPS and a custom domain (e.g., cdn.example.com). S3 Static Website Hosting alone does NOT support HTTPS. What is the correct architecture?',
      options: ['Enable S3 bucket HTTPS encryption setting and point Route 53 to the website endpoint', 'Place an Application Load Balancer in front of S3 with an ACM certificate', 'Create an Amazon CloudFront distribution with the S3 bucket as origin, attach an ACM certificate, and configure Route 53 alias records to CloudFront', 'Use S3 Transfer Acceleration which automatically provides HTTPS on a custom endpoint'],
      correct: 2,
      explanation: 'The canonical HTTPS static website pattern: S3 bucket (origin, block public access enabled) → CloudFront distribution (OAC or OAI) → ACM certificate for the custom domain → Route 53 Alias record pointing to the CloudFront distribution domain. CloudFront serves objects over HTTPS and caches at edge.'
    },
    {
      id: 's3-a3', level: 'advanced',
      question: 'Which S3 feature guarantees strong read-after-write consistency for all object operations (GET, PUT, DELETE, LIST) as of December 2020?',
      options: ['S3 Versioning must be enabled for consistency guarantees', 'S3 Replication must be configured across regions', 'All S3 operations are strongly consistent by default — no additional configuration required', 'Strong consistency requires S3 Object Lock to be enabled'],
      correct: 2,
      explanation: 'Since December 2020, Amazon S3 provides strong read-after-write consistency automatically for all object operations — including PUT, DELETE, GET, and LIST — in all regions at no additional cost. Previously, S3 had eventual consistency for some operations. No extra configuration is needed.'
    },
    {
      id: 's3-a4', level: 'advanced',
      question: 'For a data lake with PB-scale analytics, you need to query CSV and Parquet data directly in S3 without ETL. Which AWS service enables this?',
      options: ['AWS Glue ETL with job bookmarks', 'Amazon Athena (serverless SQL query engine over S3)', 'Amazon Redshift with COPY command', 'Amazon EMR Hadoop cluster with S3DistCp'],
      correct: 1,
      explanation: 'Amazon Athena is a serverless interactive query service that runs SQL queries directly on data stored in S3 without loading it into a database. It supports CSV, JSON, Parquet, ORC, and Avro formats. You pay only per TB of data scanned — compressed Parquet reduces costs significantly.'
    },
    {
      id: 's3-a5', level: 'advanced',
      question: 'A financial institution must ensure S3 bucket policies across all accounts in their AWS Organization NEVER allow public access. What is the most operationally scalable enforcement mechanism?',
      options: ['Lambda function triggered by CloudTrail events to remediate public ACLs', 'Manual auditing of bucket policies quarterly', 'AWS Organizations Service Control Policy (SCP) denying s3:PutBucketPublicAccessBlock with specific conditions', 'AWS Config Rule with auto-remediation via Systems Manager Automation to enforce S3 Block Public Access'],
      correct: 3,
      explanation: 'AWS Config\'s s3-bucket-public-access-prohibited managed rule continuously evaluates all S3 buckets. Coupled with an auto-remediation action (AWS-EnableS3BlockPublicAccess SSM Automation document), any non-compliant bucket is automatically remediated at scale. SCPs prevent policy changes but don\'t detect existing violations. AWS Config + auto-remediation is the most scalable operational approach.'
    },
    {
      id: 's3-a6', level: 'advanced',
      question: 'What is the purpose of S3 Access Points and how do they improve security for shared datasets?',
      options: ['They create separate HTTPS endpoints per team or application with their own access policies, simplifying permission management for shared S3 buckets compared to a single complex bucket policy', 'They enable cross-account replication without bucket policies', 'They provide lower latency access by routing through edge locations', 'They are required to enable S3 Multi-Region Access Points for global applications'],
      correct: 0,
      explanation: 'S3 Access Points create unique named endpoints attached to a bucket, each with its own IAM access policy. Each team (e.g., analytics team, data science team) gets a dedicated access point with their specific permissions, rather than maintaining one massive, complex bucket policy. This dramatically simplifies permission management for shared data lakes.'
    }
  ]
};
