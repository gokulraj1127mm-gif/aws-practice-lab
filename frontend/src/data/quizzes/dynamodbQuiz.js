// DynamoDB Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const dynamodbQuiz = {
  id: 'dynamodb',
  service: 'Amazon DynamoDB',
  icon: 'Zap',
  color: 'blue',
  questions: [
    {
      id: 'ddb-b1', level: 'beginner',
      question: 'What type of database is Amazon DynamoDB?',
      options: ['Relational SQL database', 'Fully managed NoSQL key-value and document database with single-digit millisecond performance at any scale', 'Column-oriented analytics database', 'Graph database for relationship data'],
      correct: 1,
      explanation: 'DynamoDB is a fully managed NoSQL database supporting both key-value (partition key access) and document (nested JSON attributes) data models. It delivers single-digit millisecond read/write performance and automatically scales throughput and storage.'
    },
    {
      id: 'ddb-b2', level: 'beginner',
      question: 'In DynamoDB, what is a Primary Key?',
      options: ['Any attribute with a unique constraint defined in the table schema', 'A uniquely identifying key that can be either a Partition Key alone (simple key) or a Partition Key + Sort Key combination (composite key)', 'A sequential auto-increment integer identifier', 'An IAM-enforced access key for DynamoDB table operations'],
      correct: 1,
      explanation: 'DynamoDB primary keys: Simple primary key = Partition Key only (each item uniquely identified by partition key). Composite primary key = Partition Key + Sort Key (items sharing the same partition key are sorted by sort key, allowing range queries). Both key attributes must be defined at table creation.'
    },
    {
      id: 'ddb-b3', level: 'beginner',
      question: 'What is the difference between DynamoDB Provisioned capacity mode and On-Demand capacity mode?',
      options: ['Provisioned mode uses S3 as storage backend; On-Demand uses local SSDs', 'Provisioned mode requires you to specify Read/Write Capacity Units (RCUs/WCUs) in advance and is cheaper for predictable traffic; On-Demand automatically adjusts capacity for any traffic level at higher per-request cost, ideal for unpredictable workloads', 'On-Demand mode stores data on a single server; Provisioned distributes across AZs', 'Provisioned mode is for test environments; On-Demand is required for production'],
      correct: 1,
      explanation: 'Provisioned Capacity: you specify RCUs (1 RCU = 1 strongly consistent 4KB read/sec) and WCUs (1 WCU = 1 1KB write/sec). Auto-scaling adjusts within limits. Best for predictable, steady workloads. On-Demand: no capacity planning, DynamoDB handles any traffic spike instantly. Cost is ~6× per RCU/WCU vs provisioned at peak. Best for new applications with unknown traffic patterns.'
    },
    {
      id: 'ddb-b4', level: 'beginner',
      question: 'What is the maximum item size in DynamoDB?',
      options: ['1 MB', '400 KB', '16 MB', '10 MB'],
      correct: 1,
      explanation: 'DynamoDB items are limited to 400 KB including attribute names and values. For larger objects (images, documents), store the data in S3 and store only the S3 reference in DynamoDB. This is a fundamental DynamoDB design constraint that influences data modeling decisions.'
    },
    {
      id: 'ddb-b5', level: 'beginner',
      question: 'What is a DynamoDB Global Secondary Index (GSI)?',
      options: ['An index that allows DynamoDB to automatically replicate tables across global regions', 'A secondary index with a different partition key (and optional sort key) from the base table, enabling efficient queries on non-primary-key attributes', 'A read replica of the DynamoDB table for read scaling', 'An index that spans all tables in an AWS account for cross-table queries'],
      correct: 1,
      explanation: 'GSIs allow querying DynamoDB using attributes other than the primary key. Example: users table with partition key UserID — add a GSI on Email to look up users by email address. GSIs have their own RCU/WCU provisioning, are eventually consistent, and can be created or deleted after table creation.'
    },
    {
      id: 'ddb-b6', level: 'beginner',
      question: 'DynamoDB Streams capture what type of data?',
      options: ['CloudTrail audit logs for all DynamoDB API calls', 'A time-ordered sequence of item-level modification events (INSERT, MODIFY, REMOVE) in a DynamoDB table — enabling change data capture for Lambda triggers, replication, and analytics', 'Real-time network traffic metrics for DynamoDB endpoint connections', 'IAM access audit events for DynamoDB table access control'],
      correct: 1,
      explanation: 'DynamoDB Streams records every item-level change (insert, update, delete) in order. Stream records are available for 24 hours. Each record can contain: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, or NEW_AND_OLD_IMAGES. Lambda event source mappings poll the stream — enabling real-time data pipelines, cross-table replication, and event-driven architectures.'
    },
    {
      id: 'ddb-b7', level: 'beginner',
      question: 'What does DynamoDB Time to Live (TTL) do?',
      options: ['Sets the maximum query execution time before DynamoDB auto-cancels slow operations', 'Automatically deletes items from a table when a defined epoch timestamp attribute value is in the past — useful for session tokens, temporary data, and compliance retention policies', 'Controls how long DynamoDB caches recently read items in memory', 'Sets the expiration duration for DynamoDB Streams records'],
      correct: 1,
      explanation: 'TTL enables automatic item expiration without consuming Write Capacity Units. You designate a Number attribute to hold the epoch timestamp (seconds since 1970-01-01) when the item should expire. DynamoDB scans and deletes expired items within 48 hours (not real-time). Deleted items appear in DynamoDB Streams with a "USER" identity.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'ddb-i1', level: 'intermediate',
      question: 'What is a DynamoDB Partition Key "hot partition" and how do you avoid it?',
      options: ['A hot partition occurs when too many GSIs reference the same partition key, causing index bloat', 'A hot partition occurs when too many requests target the same partition key value, concentrating load on one storage partition and causing throttling. Avoid by choosing high-cardinality partition keys (e.g., UserID vs. Country), using write sharding (append random suffix to key), or distributing writes across multiple partitions', 'A hot partition is a DynamoDB table stored in a single AZ instead of being distributed across three AZs', 'Hot partitions occur automatically when On-Demand capacity mode is not enabled'],
      correct: 1,
      explanation: 'DynamoDB distributes data across partitions by partition key hash. If many requests target one partition key (e.g., all writes use partition key "STATUS=active"), that partition becomes "hot" and throttles. Solutions: 1) Choose high-cardinality partition keys. 2) Write sharding — append a random number (1–10) suffix to the partition key, distribute writes, then scatter-gather reads across all suffixes. 3) Use DynamoDB Accelerator (DAX) for read-heavy hot keys.'
    },
    {
      id: 'ddb-i2', level: 'intermediate',
      question: 'What is DynamoDB Accelerator (DAX) and when should you use it?',
      options: ['A DynamoDB table encryption acceleration service using hardware security modules', 'An in-memory caching cluster purpose-built for DynamoDB that provides microsecond read latency. Use when your application requires: sub-millisecond reads, read-heavy workloads with repetitive queries, or when DynamoDB read costs are too high', 'A write acceleration service that batches and optimizes write operations to DynamoDB', 'A cross-region replication accelerator for DynamoDB Global Tables'],
      correct: 1,
      explanation: 'DAX is a DynamoDB-compatible in-memory cache delivering up to 10× read performance improvement (milliseconds → microseconds). It is API-compatible with DynamoDB (just update the endpoint). DAX handles: item-level cache (GetItem), query-level cache (Query/Scan results). Write-through ensures cache stays consistent with DynamoDB. Best for read-heavy, latency-sensitive apps. Do NOT use for strongly consistent reads (DAX is eventually consistent).'
    },
    {
      id: 'ddb-i3', level: 'intermediate',
      question: 'What is the difference between a DynamoDB Local Secondary Index (LSI) and Global Secondary Index (GSI)?',
      options: ['LSIs are multi-region; GSIs are single-region within the same AZ', 'LSI uses the SAME partition key as the base table but a DIFFERENT sort key — must be created at table creation time and shares RCU/WCU with the base table. GSI has a COMPLETELY DIFFERENT partition key (and optional sort key) — can be added to existing tables with separate RCU/WCU provisioning', 'LSIs support strongly consistent reads; GSIs only support eventual consistency — both have identical partition key requirements', 'GSIs must be created at table creation; LSIs can be added to existing tables at any time'],
      correct: 1,
      explanation: 'LSI: Same partition key, different sort key. Created ONLY at table creation. Shares table RCU/WCU. Supports strongly consistent reads. Limited to 10 GB per partition key value. Max 5 LSIs per table. GSI: Any partition key + any sort key. Can be created/deleted AFTER table creation. Separate RCU/WCU. Eventually consistent reads only. No size limit per partition. Max 20 GSIs per table.'
    },
    {
      id: 'ddb-i4', level: 'intermediate',
      question: 'DynamoDB Transactions (TransactWriteItems/TransactGetItems) enable what capability?',
      options: ['Parallel batch writes across multiple DynamoDB tables for high throughput', 'ACID transactions — atomically execute multiple Put, Update, Delete, and ConditionCheck operations across multiple items and tables in a single all-or-nothing operation. Either all operations succeed or none are applied', 'Cross-region synchronous replication of write operations to Global Tables', 'Optimized compression of multiple small items into fewer storage partitions'],
      correct: 1,
      explanation: 'DynamoDB Transactions provide ACID guarantees: Atomicity (all or nothing), Consistency (data validity maintained), Isolation (transactions don\'t interfere), Durability (committed data persists). TransactWriteItems: up to 100 operations in one atomic write. TransactGetItems: up to 100 consistent reads. Cost: 2× WCU/RCU vs standard operations. Essential for financial data integrity, inventory management, and reservation systems.'
    },
    {
      id: 'ddb-i5', level: 'intermediate',
      question: 'What are DynamoDB Global Tables and what consistency model do they use?',
      options: ['A single DynamoDB table replicated synchronously across multiple AZs within a region', 'Multi-region, multi-active (multi-master) DynamoDB tables that replicate data across chosen AWS regions. All replicas accept reads and writes. Uses last-writer-wins (LWW) conflict resolution with eventual consistency across regions (typically <1 second replication)', 'Read-only copies of a DynamoDB table distributed globally for CDN-like read caching', 'A billing consolidation feature grouping DynamoDB tables across multiple AWS accounts'],
      correct: 1,
      explanation: 'Global Tables (v2) are multi-active: any region can serve reads AND writes. Changes propagate to all regions asynchronously via DynamoDB Streams. Conflict resolution: last-writer-wins based on timestamp. Requires: DynamoDB Streams enabled, On-Demand or Auto Scaling. Same-region reads are eventually consistent (between local writes). Cross-region replication typically completes in sub-second. Ideal for globally distributed, latency-sensitive applications.'
    },
    {
      id: 'ddb-i6', level: 'intermediate',
      question: 'What is the DynamoDB Single Table Design pattern and why is it recommended?',
      options: ['Storing all application data in one DynamoDB table with carefully designed generic primary keys and GSIs to support multiple access patterns — reducing join operations, improving performance, and lowering costs vs. multiple specialized tables', 'A simplified DynamoDB table with only one attribute (the primary key) to minimize storage costs', 'A pattern restricting DynamoDB to store only one type of entity per table for data normalization', 'Using a single provisioned throughput allocation shared across multiple tables in an AWS account'],
      correct: 0,
      explanation: 'Single Table Design: store all entity types in one table using compound primary keys and "entity type" prefix conventions. Benefits: 1) No DynamoDB joins needed. 2) Items queried together stored together (co-located on same partition). 3) Reduced provisioned throughput waste. 4) Better performance for complex access patterns. Tradeoff: harder to visualize for relational-database-trained developers. Alex DeBrie\'s "The DynamoDB Book" is the canonical reference.'
    },
    {
      id: 'ddb-i7', level: 'intermediate',
      question: 'What is DynamoDB PartiQL and when would you use it?',
      options: ['A parallel query language for scanning DynamoDB tables across multiple partitions simultaneously', 'A SQL-compatible query language for DynamoDB that allows SELECT, INSERT, UPDATE, DELETE operations using familiar SQL syntax — useful for developers transitioning from relational databases or for ad-hoc data exploration', 'A partition key optimization language for defining DynamoDB key schemas', 'A data modeling language for defining DynamoDB Global Table replication topologies'],
      correct: 1,
      explanation: 'PartiQL (PartiQL is SQL-compatible) allows DynamoDB operations using SQL-like syntax: SELECT * FROM table WHERE PK=\'value\'. Benefits: familiar to SQL developers, supported in DynamoDB console for exploration, available via API. Limitations: still requires proper index design — full table scans are expensive. PartiQL doesn\'t eliminate the need to understand DynamoDB data modeling fundamentals.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'ddb-a1', level: 'advanced',
      question: 'Design a DynamoDB schema for a multi-tenant SaaS application with these access patterns: get all orders for a customer, get a specific order, get orders by status for all customers (admin). What keys and indexes accomplish this efficiently?',
      options: ['Three separate tables: Customers, Orders, OrderStatus — each with simple primary keys and cross-table joins', 'Single table: PK=TenantID#CustomerID, SK=ORDER#OrderID. GSI1: PK=TenantID#Status, SK=CreatedAt. Enables: GetItem (specific order), Query on PK (all customer orders), Query GSI1 (orders by status for admin) — all efficient, no scans required', 'Table with PK=CustomerID, SK=Status. Multiple GSIs on all queried attributes', 'Separate table per tenant with PK=OrderID and full table scans for status-based queries'],
      correct: 1,
      explanation: 'Single table pattern: PK=TenantID#CustomerID (tenant isolation + customer access), SK=ORDER#OrderID (specific order lookup). GSI1 with PK=TenantID#Status, SK=CreatedAt enables admin status queries with time-ordered results. All 3 access patterns use targeted key-based operations — no expensive scans. Tenant isolation enforced at partition key level. CreatedAt SK enables date range filtering without additional GSIs.'
    },
    {
      id: 'ddb-a2', level: 'advanced',
      question: 'DynamoDB Conditional Expressions prevent concurrent write conflicts. What does this ConditionExpression achieve: "attribute_not_exists(PK)"?',
      options: ['Checks if the PK attribute exists in the GSI index', 'Makes the write operation atomic conditional on the item NOT already existing in the table — an optimistic locking pattern that prevents duplicate creates (e.g., unique username registration). The operation fails with ConditionalCheckFailedException if the item already exists', 'Validates that the PK attribute value matches a specific format before writing', 'Prevents updates to items older than a certain TTL timestamp value'],
      correct: 1,
      explanation: '"attribute_not_exists(PK)" in a PutItem ConditionExpression implements a distributed check-and-set: if no item with that PK exists → write succeeds. If an item already exists → ConditionalCheckFailedException — atomic, no race conditions. Use cases: ensuring unique email registration, preventing duplicate order creation, idempotent write operations. This is DynamoDB\'s optimistic concurrency control mechanism.'
    },
    {
      id: 'ddb-a3', level: 'advanced',
      question: 'You need to implement an audit log that captures all changes to a DynamoDB orders table and stores them in S3 for compliance. What is the most operationally scalable approach?',
      options: ['Modify every application write path to send a copy to S3 before updating DynamoDB', 'DynamoDB Streams → Lambda → S3 (via Kinesis Firehose). DynamoDB Streams capture NEW_AND_OLD_IMAGES of every change. Lambda processes stream records and writes to Kinesis Firehose, which batches and delivers to S3 in Parquet format with Glue catalog registration — queryable via Athena', 'Enable DynamoDB Point-in-Time Recovery and export snapshots to S3 nightly', 'AWS CloudTrail data events log all DynamoDB API calls and store in S3 automatically'],
      correct: 1,
      explanation: 'Architecture: DynamoDB Streams (NEW_AND_OLD_IMAGES) → Lambda event source mapping → process and enrich change records → Kinesis Data Firehose (batching, Parquet conversion) → S3 partitioned by date/entity → Glue Catalog → Athena for compliance queries. Why not CloudTrail: CloudTrail captures API metadata (who called PutItem) not the actual data changed. Streams capture the actual before/after item values needed for audit.'
    },
    {
      id: 'ddb-a4', level: 'advanced',
      question: 'Explain DynamoDB Adaptive Capacity and when it is insufficient to prevent throttling.',
      options: ['Adaptive Capacity automatically converts provisioned tables to on-demand when sustained traffic exceeds limits', 'Adaptive Capacity automatically shifts provisioned throughput to hot partitions that are being throttled from under-utilized cold partitions — it can tolerate traffic imbalance temporarily. It CANNOT help when: total table throughput is truly insufficient (need more RCU/WCU total) or when a single partition key is receiving more than 3,000 RCU or 1,000 WCU (hard partition limit)', 'Adaptive Capacity enables burst read capacity from CloudFront edge caches during traffic spikes', 'Adaptive Capacity is a DAX feature that dynamically expands cache memory during traffic spikes'],
      correct: 1,
      explanation: 'DynamoDB Adaptive Capacity (automatic): when some partitions are hot (many requests) and others are cold, DynamoDB can "borrow" unused throughput from cold partitions to serve the hot ones. Limitations: 1) Cannot exceed the partition\'s maximum: 3,000 RCU or 1,000 WCU for a single partition key. 2) If the overall table needs more capacity, scale up RCU/WCU or enable On-Demand. 3) Adaptive Capacity is a temporary rebalancing — doesn\'t fix fundamental data modeling issues.'
    },
    {
      id: 'ddb-a5', level: 'advanced',
      question: 'What is DynamoDB PITR (Point-in-Time Recovery) and what is the exact recovery granularity?',
      options: ['PITR recovers to hourly snapshots within the last 7 days with 1-hour granularity', 'PITR continuously backs up the table and enables recovery to any 5-minute point within the last 35 days. Recovery creates a NEW table (not in-place restore) — the original table continues operating during the restore. Restore time scales with table size', 'PITR is identical to DynamoDB snapshots but with automated scheduling', 'PITR provides real-time recovery with zero data loss (RPO = 0) by maintaining synchronous backups'],
      correct: 1,
      explanation: 'DynamoDB PITR: 1) Enabled per table (toggle on/off). 2) Maintains continuous backups for up to 35 days. 3) Earliest restorable time: 5 minutes ago (not truly real-time). 4) Latest restorable time: 5 minutes ago. 5) Restores to a NEW DynamoDB table — doesn\'t overwrite the existing table. 6) GSIs, LSIs, billing mode, and encryption settings are preserved in the restored table. 7) No impact on performance of the source table.'
    },
    {
      id: 'ddb-a6', level: 'advanced',
      question: 'What is the DynamoDB "adjacency list" design pattern and what access patterns does it elegantly support?',
      options: ['A pattern using linked-list data structures to order DynamoDB items within a partition', 'A single-table design pattern using PK as entity ID and SK as entity type or relationship target. Example: PK=UserID, SK=USER (user data); PK=UserID, SK=FOLLOWS#UserID2 (follow relationship). This elegantly represents graph relationships — enabling: get all follows for a user, get specific relationship, get all users who follow someone (via GSI)', 'An ordered list stored as a DynamoDB attribute of type List, used for ranked leaderboards', 'A DynamoDB partitioning strategy that minimizes the number of storage partitions required'],
      correct: 1,
      explanation: 'Adjacency List: model many-to-many relationships in a single table. PK=EntityA, SK="EntityB" creates the "edge." Replicate edge item with PK=EntityB, SK="EntityA" for reverse traversal. GSI inverts PK and SK for reverse lookups. Use cases: social graph (followers), permission systems (user→role→permission), bill of materials (product→components). This is the DynamoDB equivalent of junction tables in relational databases without expensive joins.'
    }
  ]
};
