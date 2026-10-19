// RDS Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const rdsQuiz = {
  id: 'rds',
  service: 'Amazon RDS',
  icon: 'Layers',
  color: 'cyan',
  questions: [
    {
      id: 'rds-b1', level: 'beginner',
      question: 'What is Amazon RDS?',
      options: ['A NoSQL database service for document storage', 'A managed relational database service supporting MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server — automating provisioning, patching, backups, and scaling', 'A key-value in-memory caching service', 'A serverless SQL query service for S3 data'],
      correct: 1,
      explanation: 'Amazon RDS (Relational Database Service) is a managed service that simplifies setting up, operating, and scaling relational databases. AWS handles hardware provisioning, software patching, automatic backups, and monitoring — freeing you to focus on schema design and query optimization.'
    },
    {
      id: 'rds-b2', level: 'beginner',
      question: 'What does RDS Multi-AZ deployment provide?',
      options: ['Horizontal read scaling by creating read-only replicas in other AZs', 'Synchronous replication to a standby instance in a different AZ for automatic failover and high availability', 'Geographic distribution of the database across multiple AWS regions', 'Parallel query processing across multiple Availability Zones'],
      correct: 1,
      explanation: 'RDS Multi-AZ creates a synchronous standby replica in a different AZ. If the primary fails (hardware failure, OS patch, AZ outage), RDS automatically fails over to the standby — typically within 1–2 minutes — with no manual intervention. The CNAME DNS endpoint automatically updates to point to the standby. The standby is NOT accessible for reads.'
    },
    {
      id: 'rds-b3', level: 'beginner',
      question: 'What does an RDS Read Replica provide?',
      options: ['A hot standby that automatically takes over if the primary fails', 'An asynchronously replicated copy of the primary database that offloads read-heavy traffic and improves read scalability — it is readable but cannot be written to', 'A synchronous backup that ensures zero data loss during failover', 'A cross-region database that serves as the primary for geographically distributed write traffic'],
      correct: 1,
      explanation: 'RDS Read Replicas use the database engine\'s native asynchronous replication to create read-only copies of the primary. You point read-heavy application traffic (reporting, analytics, read APIs) to Read Replicas, reducing primary DB load. Note: there is replication lag — reads may return slightly stale data.'
    },
    {
      id: 'rds-b4', level: 'beginner',
      question: 'Where should RDS instances be placed in a VPC for production security?',
      options: ['In a public subnet with restrictive Security Groups', 'In a private subnet only accessible from the application tier via Security Group rules', 'In a public subnet to allow direct developer access for debugging', 'Outside the VPC using RDS Classic network isolation'],
      correct: 1,
      explanation: 'Production databases should always be placed in private subnets with no internet route. Access is controlled via Security Groups — only the application tier\'s Security Group ID is permitted as an inbound source. This prevents direct internet exposure of database endpoints.'
    },
    {
      id: 'rds-b5', level: 'beginner',
      question: 'RDS automated backups retain data for how long (configurable range)?',
      options: ['1 to 7 days', '1 to 35 days', '30 to 90 days', '7 to 365 days'],
      correct: 1,
      explanation: 'RDS automated backups can be retained from 1 to 35 days. During this window, you can perform point-in-time recovery (PITR) — restoring to any 5-minute increment within the retention period. Setting retention to 0 disables automated backups.'
    },
    {
      id: 'rds-b6', level: 'beginner',
      question: 'What is Amazon Aurora and how does it differ from standard RDS MySQL?',
      options: ['Aurora is a NoSQL alternative to MySQL RDS', 'Aurora is a fully managed MySQL/PostgreSQL-compatible database built for the cloud, offering up to 5× MySQL performance, automatic storage scaling (up to 128 TB), and 6-way replication across 3 AZs', 'Aurora is a serverless analytics engine on top of existing RDS instances', 'Aurora is identical to standard MySQL RDS but with a different billing model'],
      correct: 1,
      explanation: 'Amazon Aurora is AWS\'s cloud-native relational database, compatible with MySQL and PostgreSQL. It separates compute from storage — storage scales automatically in 10 GB increments up to 128 TB. Data is replicated 6 times across 3 AZs (2 copies per AZ), providing extraordinary durability. Aurora is up to 5× faster than MySQL and 3× faster than PostgreSQL.'
    },
    {
      id: 'rds-b7', level: 'beginner',
      question: 'What is a DB Parameter Group in RDS?',
      options: ['A configuration profile specifying database engine parameters (cache size, connection limits, character sets) applied to one or more DB instances', 'A billing group for tracking RDS costs across multiple instances', 'A security group specifically for database-to-database traffic', 'A snapshot group for organizing DB backups by application'],
      correct: 0,
      explanation: 'DB Parameter Groups contain engine-specific configuration settings applied to RDS instances. Examples: max_connections (MySQL), shared_buffers (PostgreSQL), character_set_database, query_cache_size. You can modify parameters and apply them dynamically (immediately) or at the next maintenance window depending on the parameter type.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'rds-i1', level: 'intermediate',
      question: 'Aurora Serverless v2 is BEST suited for which type of workload?',
      options: ['Constant, predictable OLTP workloads with steady high traffic', 'Infrequently accessed or highly variable workloads (dev/test, SaaS multi-tenant, traffic spikes) that scale capacity instantly in ACU increments and pause when idle to reduce cost', 'Large data warehouse analytics requiring consistent 10,000+ IOPS', 'Long-running batch ETL processing that requires sustained peak performance'],
      correct: 1,
      explanation: 'Aurora Serverless v2 scales database capacity in fine-grained Aurora Capacity Units (ACUs) within seconds — from 0.5 ACUs to 128 ACUs. Ideal for unpredictable workloads: SaaS applications with per-tenant variability, development environments, variable traffic APIs. It eliminates capacity planning and reduces cost for idle periods.'
    },
    {
      id: 'rds-i2', level: 'intermediate',
      question: 'What is RDS Encryption at Rest and what does it protect?',
      options: ['Encrypts only database backups stored in S3, not the primary data volume', 'Encrypts the DB instance storage (EBS volumes), automated backups, Read Replicas, and snapshots using AES-256 via AWS KMS. Encryption must be enabled at DB creation time — it cannot be added to an existing unencrypted instance directly', 'Encrypts only data in transit between the application and RDS endpoint using TLS', 'Encrypts user passwords stored in the database using bcrypt hashing'],
      correct: 1,
      explanation: 'RDS encryption at rest encrypts underlying EBS storage, automated backups, snapshots, and Read Replicas using AWS KMS CMKs. To encrypt an existing unencrypted DB: take a snapshot → copy the snapshot with encryption enabled → restore from the encrypted snapshot. Encryption cannot be disabled once enabled.'
    },
    {
      id: 'rds-i3', level: 'intermediate',
      question: 'What is Aurora Global Database and when should you use it?',
      options: ['An Aurora feature that splits a single database across multiple tables for horizontal sharding', 'A managed feature allowing a single Aurora database to span multiple AWS regions, with one primary region for reads/writes and up to 5 secondary regions for local read access and disaster recovery with ~1 second replication lag', 'A multi-master Aurora cluster where all nodes accept writes simultaneously', 'An Aurora database replicated to on-premises servers via AWS Direct Connect'],
      correct: 1,
      explanation: 'Aurora Global Database replicates data from the primary region to up to 5 secondary read-only regions with typical replication lag under 1 second. Secondary regions can serve local read traffic with low latency. In a disaster, a secondary region can be promoted to primary in under 1 minute (RPO ~1 second, RTO < 1 minute) — purpose-built for global applications.'
    },
    {
      id: 'rds-i4', level: 'intermediate',
      question: 'What does RDS Proxy do and why is it useful for serverless applications?',
      options: ['RDS Proxy encrypts all SQL queries before they reach the database', 'RDS Proxy is a managed connection pooler that sits between applications and RDS/Aurora. It pools and shares database connections reducing connection churn — critical for Lambda functions that each open a new connection on invocation, which can exhaust DB connection limits', 'RDS Proxy replicates queries to multiple read replicas for load balancing', 'RDS Proxy caches query results in memory to reduce database load'],
      correct: 1,
      explanation: 'Lambda functions are stateless and may open thousands of concurrent DB connections (one per invocation). RDS Proxy maintains a warm pool of connections to the database, multiplexing many Lambda connections onto fewer actual DB connections. This prevents connection exhaustion (MySQL has ~150-4,000 connection limits), improves failover speed (RDS Proxy handles failover transparently), and adds IAM authentication support.'
    },
    {
      id: 'rds-i5', level: 'intermediate',
      question: 'How do you perform a zero-downtime major version upgrade on an RDS MySQL production instance with minimal risk?',
      options: ['Enable automatic minor version upgrades in the RDS console and allow AWS to handle major upgrades', 'Create a Read Replica with the new major version, test the replica, then promote it to standalone and update the application connection string — zero downtime for reads during the process', 'Use RDS Blue/Green Deployment: create a staged green environment, make and test changes, then switch with automatic DNS update', 'Take a snapshot, restore it with the new version, and update DNS — accepting brief downtime during the DNS cutover'],
      correct: 2,
      explanation: 'RDS Blue/Green Deployments create a staging (green) copy synced to production (blue) via replication. Make and validate schema/version changes on green, then perform a switchover. RDS handles the DNS update in seconds. If issues arise, switch back to blue. This is the safest major version upgrade path for production RDS MySQL and Aurora instances.'
    },
    {
      id: 'rds-i6', level: 'intermediate',
      question: 'What are RDS IAM Database Authentication and its advantages?',
      options: ['Authenticating to RDS using IAM access keys stored in DB parameter groups', 'Authenticating to RDS using IAM-generated short-lived tokens (15-minute expiry) instead of database passwords, eliminating long-term credential management. Supported for MySQL and PostgreSQL. Ideal when apps already use IAM roles', 'Restricting RDS access using IAM boundary policies on the DB subnet group', 'Using IAM groups to define database user privileges for schema management'],
      correct: 1,
      explanation: 'RDS IAM authentication allows EC2 instances, Lambda functions, or ECS tasks with an IAM role to generate an authentication token (valid 15 minutes) using the rds-db:connect IAM action. No database passwords to rotate or manage — credentials auto-expire. Supported for MySQL and PostgreSQL. Requires SSL/TLS for the connection.'
    },
    {
      id: 'rds-i7', level: 'intermediate',
      question: 'What is the purpose of RDS Enhanced Monitoring?',
      options: ['Provides application-level query profiling and slow query identification', 'Provides OS-level metrics (CPU, memory, disk I/O, processes, file system) at granularities as fine as 1 second, using an agent on the DB host — beyond what standard CloudWatch RDS metrics provide', 'Enables network packet inspection for database traffic security', 'Monitors the performance of SQL queries using RDS Performance Insights'],
      correct: 1,
      explanation: 'RDS Enhanced Monitoring installs an agent on the DB instance that collects OS-level metrics (hypervisor vs. OS CPU, per-process memory usage, file system stats, network throughput) at 1–60 second intervals. Standard CloudWatch RDS metrics are collected from the hypervisor level and don\'t show process-level resource consumption. Enhanced Monitoring metrics appear in CloudWatch Logs.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'rds-a1', level: 'advanced',
      question: 'Aurora Multi-Master allows multiple write nodes. What is the primary use case and a key operational challenge?',
      options: ['Multi-Master is for read scaling across regions, challenge is data consistency across regions', 'Multi-Master enables continuous write availability (any writer node can accept writes during another\'s failure), but requires application-level conflict detection/resolution since concurrent writes to the same data across masters can cause conflicts. Best for active-active failover, not horizontal write scaling', 'Multi-Master creates multiple independent databases that eventually sync — suitable for multi-tenant SaaS write scaling', 'Multi-Master automatically shards the database across writer nodes based on partition key ranges'],
      correct: 1,
      explanation: 'Aurora Multi-Master allows multiple DB instances to accept reads and writes simultaneously. If one write node fails, the other continues serving writes — near-zero RTO for write continuity. Challenge: write conflicts occur when two masters update the same row concurrently. The first writer wins, the second gets a conflict error. Applications must handle conflict detection and retry logic.'
    },
    {
      id: 'rds-a2', level: 'advanced',
      question: 'You need to migrate a 10 TB Oracle database to Aurora PostgreSQL with minimal downtime. Which AWS service handles continuous replication during migration?',
      options: ['AWS DataSync with Oracle JDBC connector for change data capture', 'AWS Database Migration Service (DMS) with ongoing replication — combined with AWS Schema Conversion Tool (SCT) for Oracle-to-PostgreSQL schema/code conversion, enabling parallel operation during cutover window', 'AWS Snowball Edge for offline database transfer', 'AWS Glue ETL with Oracle JDBC driver and S3 staging'],
      correct: 1,
      explanation: 'The large-scale database migration pattern: 1) AWS SCT converts Oracle schema, stored procedures, and code to PostgreSQL-compatible syntax. 2) DMS performs full load (bulk initial migration). 3) DMS ongoing replication captures CDC (Change Data Capture) from Oracle redo logs, keeping Aurora in sync during cutover. 4) Application switchover window reduces to minutes. 5) Validate with DMS data validation feature.'
    },
    {
      id: 'rds-a3', level: 'advanced',
      question: 'What is RDS Performance Insights and how do you use it to diagnose a slow query?',
      options: ['Performance Insights is a cost analysis tool comparing RDS instance pricing options', 'Performance Insights visualizes DB load measured in Average Active Sessions (AAS) grouped by SQL queries, hosts, users, and wait events. To diagnose slow queries: identify queries with highest DB load contribution, examine wait events (I/O wait, lock wait, CPU), then optimize indexes or queries based on findings', 'Performance Insights monitors network latency between application servers and RDS instances', 'Performance Insights captures full packet data for security forensic analysis of DB access patterns'],
      correct: 1,
      explanation: 'Performance Insights uses Average Active Sessions (AAS) as the primary metric — number of sessions actively working. The dashboard shows top SQL queries by load, broken down by wait events (io/file_read, lock/row_lock, etc.). Process: identify the top DB load query → examine wait events → if io/file_read → missing index → EXPLAIN plan → add appropriate index. Free 7-day history, longer retention costs extra.'
    },
    {
      id: 'rds-a4', level: 'advanced',
      question: 'Aurora uses a quorum-based distributed storage system. What happens when an AZ fails during a write operation?',
      options: ['All writes fail immediately when any AZ is unavailable — requiring failover to complete before writes resume', 'Aurora writes to 6 storage nodes across 3 AZs (2 per AZ). A write is committed when 4/6 nodes acknowledge (write quorum). A single AZ failure means 2/6 nodes unavailable — the 4-of-6 quorum still succeeds, so writes continue uninterrupted without any failover needed', 'Aurora pauses writes for 30 seconds while redistributing data to the remaining 2 AZs', 'Aurora Multi-AZ switches to the Read Replica in an unaffected AZ and promotes it to primary within 60 seconds'],
      correct: 1,
      explanation: 'Aurora\'s distributed storage: 6 copies across 3 AZs. Write quorum = 4/6 nodes. Read quorum = 3/6 nodes. If 1 AZ fails (2 nodes lost), writes still have 4 nodes — quorum satisfied, writes continue. Aurora can tolerate: up to 2 node failures for writes, up to 3 failures for reads. Aurora self-heals by continuously scanning and repairing storage segments, replacing failed nodes without DB downtime.'
    },
    {
      id: 'rds-a5', level: 'advanced',
      question: 'For a multi-tenant SaaS application, you need complete data isolation where one tenant\'s queries cannot affect another tenant\'s performance. What RDS/Aurora strategy achieves this?',
      options: ['Single Aurora cluster with row-level security policies using PostgreSQL RLS enforced at the application layer', 'Database-per-tenant using Aurora Serverless v2 clusters (auto-scales to near-zero when idle) with RDS Proxy for connection pooling, combined with tenant-specific DB credentials via IAM authentication and AWS Secrets Manager rotation', 'Schema-per-tenant in a shared cluster with database user-level permissions restricting access', 'Table-prefix-per-tenant strategy in a shared database instance with application-enforced data access patterns'],
      correct: 1,
      explanation: 'Database-per-tenant (most isolation): separate Aurora Serverless v2 clusters per tenant scale independently — one noisy tenant cannot affect others. Aurora Serverless v2 scales to 0.5 ACU when idle, cost-effective for many small tenants. RDS Proxy manages connection pools per tenant. Secrets Manager stores/rotates per-tenant credentials. Trade-off: operational complexity at thousands of tenants (consider Aurora clusters per tier instead).'
    },
    {
      id: 'rds-a6', level: 'advanced',
      question: 'Explain the Aurora machine learning integration with SageMaker and Comprehend — what does it enable?',
      options: ['Aurora can export training data directly to SageMaker training jobs via S3', 'Aurora ML integration allows SQL queries to directly invoke SageMaker endpoint predictions or Amazon Comprehend sentiment/entity analysis on query results using native SQL functions — no ETL or data export needed', 'Aurora replicates its data to SageMaker Feature Store for ML model training pipelines', 'Aurora ML automatically optimizes query execution plans using machine learning algorithms'],
      correct: 1,
      explanation: 'Aurora ML integration embeds ML inference directly in SQL. Examples: SELECT aws_sagemaker.invoke_endpoint(\'my-endpoint\', ...) to run fraud detection on transaction rows, or SELECT aws_comprehend.detect_sentiment(review_text) to add sentiment analysis to customer review queries. ML inference happens within the database query execution — no application-side ETL or API calls needed. Supported for Aurora MySQL and PostgreSQL.'
    }
  ]
};
