// AWS CloudFormation Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const cloudformationQuiz = {
  id: 'cloudformation',
  service: 'AWS CloudFormation',
  icon: 'FileCode',
  color: 'orange',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'cfn-b1', level: 'beginner',
      question: 'What is AWS CloudFormation?',
      options: [
        'A weather forecasting service powered by AWS satellites',
        'An Infrastructure as Code (IaC) service that allows you to model, provision, and manage AWS and third-party resources using JSON or YAML templates',
        'A database migration tool for Oracle databases',
        'A network load balancer for TCP traffic'
      ],
      correct: 1,
      explanation: 'AWS CloudFormation enables Infrastructure as Code (IaC). You declare resources, configurations, and dependencies in a template file (JSON or YAML), and CloudFormation automatically provisions and manages them as a single unit.'
    },
    {
      id: 'cfn-b2', level: 'beginner',
      question: 'What are the two file formats supported for AWS CloudFormation templates?',
      options: [
        'XML and HTML',
        'JSON and YAML',
        'CSV and Markdown',
        'Python and Java bytecode'
      ],
      correct: 1,
      explanation: 'CloudFormation templates are text files formatted in either JSON (JavaScript Object Notation) or YAML (YAML Ain\'t Markup Language).'
    },
    {
      id: 'cfn-b3', level: 'beginner',
      question: 'What is a CloudFormation Stack?',
      options: [
        'A collection of physical servers stacked in a rack',
        'A unified management unit of AWS resources created, updated, and deleted together according to a single template',
        'A memory allocation buffer in the Linux kernel',
        'An IAM user group with administrative privileges'
      ],
      correct: 1,
      explanation: 'A Stack is a single unit of management. All resources in a stack are defined by the stack\'s CloudFormation template and can be created, updated, or deleted as a single group.'
    },
    {
      id: 'cfn-b4', level: 'beginner',
      question: 'Which section of a CloudFormation template is the ONLY mandatory section required to be present?',
      options: [
        'Parameters',
        'Resources',
        'Outputs',
        'Mappings'
      ],
      correct: 1,
      explanation: 'The `Resources` section is the only mandatory section of a CloudFormation template. It specifies the AWS resources (e.g., S3 bucket, EC2 instance) you want to create and configure.'
    },
    {
      id: 'cfn-b5', level: 'beginner',
      question: 'What is the purpose of the `Parameters` section in a CloudFormation template?',
      options: [
        'To define custom encryption algorithms for S3 buckets',
        'To allow users to pass custom input values (e.g., instance type, key pair name, environment name) into the template at stack creation or update time without hardcoding values',
        'To list software dependencies installed inside an EC2 instance',
        'To configure DNS nameservers for Route 53'
      ],
      correct: 1,
      explanation: 'Parameters enable you to customize your templates by providing dynamic inputs when creating or updating a stack, making templates reusable across environments (dev, test, prod).'
    },
    {
      id: 'cfn-b6', level: 'beginner',
      question: 'What happens by default if an error occurs during the creation of a CloudFormation stack (e.g., resource limit exceeded or invalid parameter)?',
      options: [
        'The stack continues provisioning other resources and ignores the failed resource',
        'CloudFormation automatically initiates a rollback (`ROLLBACK_IN_PROGRESS`), deleting all previously created resources in that stack to leave a clean state',
        'The AWS account is paused for 1 hour',
        'All resources are converted into AWS Lambda functions'
      ],
      correct: 1,
      explanation: 'CloudFormation maintains atomic transactions: if a resource creation fails, it rolls back all created resources (`ROLLBACK_IN_PROGRESS` → `ROLLBACK_COMPLETE`) by default to prevent orphaned or misconfigured resources.'
    },
    {
      id: 'cfn-b7', level: 'beginner',
      question: 'What is the intrinsic function `!Ref` used for in CloudFormation YAML templates?',
      options: [
        'To reference an external GitHub repository commit',
        'To return the value of a specified parameter or the physical ID of a specified resource (e.g., instance ID, bucket name)',
        'To reboot an operating system instance',
        'To delete an S3 bucket when the stack completes'
      ],
      correct: 1,
      explanation: 'The intrinsic function `!Ref` (or `{"Ref": "LogicalName"}`) returns the value of a specified parameter or the physical runtime ID of a declared resource.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'cfn-i1', level: 'intermediate',
      question: 'What is a CloudFormation Change Set?',
      options: [
        'A list of currency conversion rates for AWS billing',
        'A preview of proposed changes that CloudFormation will execute on running resources before you apply an update to a stack',
        'A git commit difference between two local branches',
        'A backup snapshot of an RDS database before schema migration'
      ],
      correct: 1,
      explanation: 'Change Sets allow you to preview how proposed stack changes might impact running resources (e.g. whether a change will modify a property in-place or require replacing/destroying a resource) before applying the update.'
    },
    {
      id: 'cfn-i2', level: 'intermediate',
      question: 'What is CloudFormation Drift Detection?',
      options: [
        'Detecting physical seismic shifts in data center foundations',
        'Identifying differences between the actual configuration of AWS resources and the configuration declared in the CloudFormation template/stack',
        'Measuring network latency degradation across VPC peering connections',
        'Tracking changes in employee IAM usernames'
      ],
      correct: 1,
      explanation: 'Drift Detection identifies unmanaged configuration changes (drift) made to resources outside of CloudFormation management (e.g., someone manually changing a security group rule in the AWS Console).'
    },
    {
      id: 'cfn-i3', level: 'intermediate',
      question: 'What are CloudFormation StackSets?',
      options: [
        'A collection of physical flash drives used for data import',
        'A feature that lets you create, update, or delete CloudFormation stacks across multiple AWS accounts and multiple AWS Regions with a single operation',
        'An array of database tables in Amazon DynamoDB',
        'A monitoring dashboard combining multiple CloudWatch widgets'
      ],
      correct: 1,
      explanation: 'StackSets extends stack capabilities by letting you define a single template and provision resources consistently across multiple AWS accounts and Regions in AWS Organizations.'
    },
    {
      id: 'cfn-i4', level: 'intermediate',
      question: 'What is the `Outputs` section of a template used for, and how can other stacks consume these outputs?',
      options: [
        'It prints log messages to the browser console during template validation',
        'It exports values (e.g., VPC ID, Subnet ID) using the `Export: Name` attribute, allowing other independent stacks to import them using the `!ImportValue` intrinsic function',
        'It lists the software licenses purchased for the application',
        'It terminates the stack after execution'
      ],
      correct: 1,
      explanation: 'The `Outputs` section declares output values you can view in the console or CLI. By adding `Export: Name: SharedVpcId`, other stacks can use `Fn::ImportValue` (`!ImportValue`) to create decoupled, cross-stack architectures.'
    },
    {
      id: 'cfn-i5', level: 'intermediate',
      question: 'What is the `DeletionPolicy` attribute used for on a CloudFormation resource?',
      options: [
        'To force immediate deletion of all resources after 24 hours',
        'To control what happens to a resource when its stack is deleted (options: `Delete`, `Retain`, or `Snapshot` for supported resources like EBS/RDS)',
        'To prohibit users from logging out of the AWS Console',
        'To wipe local hard drives on client laptops'
      ],
      correct: 1,
      explanation: '`DeletionPolicy` lets you preserve resources when a stack is deleted. For example, `DeletionPolicy: Retain` prevents an S3 bucket or DynamoDB table from being deleted, while `Snapshot` takes a backup snapshot of RDS/EBS.'
    },
    {
      id: 'cfn-i6', level: 'intermediate',
      question: 'Which intrinsic function allows you to construct a string by substituting variable values, such as combining a Region name and environment name (`!Sub "app-${AWS::Region}-${Environment}"`)?',
      options: [
        '!Join',
        '!Sub',
        '!Select',
        '!GetAZs'
      ],
      correct: 1,
      explanation: 'The `Fn::Sub` (`!Sub`) intrinsic function substitutes variables in an input string with values that you specify, or automatically resolves pseudo parameters like `${AWS::Region}` and `${AWS::AccountId}`.'
    },
    {
      id: 'cfn-i7', level: 'intermediate',
      question: 'What is a Nested Stack in CloudFormation?',
      options: [
        'A stack that contains only containerized Docker applications',
        'A stack created within another stack using the `AWS::CloudFormation::Stack` resource type, promoting modular, reusable template components (e.g., standard VPC or load balancer templates)',
        'A database query with subqueries in RDS',
        'A recursive bash loop in an EC2 user data script'
      ],
      correct: 1,
      explanation: 'Nested Stacks are stacks created as resources within other stacks. They allow you to reuse common architectural patterns (such as standard VPCs or security groups) stored in S3 across multiple parent templates.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'cfn-a1', level: 'advanced',
      question: 'What is a CloudFormation Custom Resource and how does it execute custom logic during stack creation, update, or deletion?',
      options: [
        'A custom hardware device shipped from an AWS fulfillment facility',
        'An `AWS::CloudFormation::CustomResource` that invokes an AWS Lambda function (or SNS topic), passing event data and expecting a signed HTTPS PUT response containing `Status: SUCCESS` back to a pre-signed S3 URL',
        'An EC2 instance with custom shell aliases',
        'A modified Linux kernel module'
      ],
      correct: 1,
      explanation: 'Custom Resources allow you to write custom provisioning logic in AWS Lambda (such as seeding an RDS database, querying a third-party API, or looking up an AMI). Lambda receives an event and sends a response back to CloudFormation via a pre-signed S3 URL.'
    },
    {
      id: 'cfn-a2', level: 'advanced',
      question: 'What is a Stack Policy and how does it prevent unintentional updates or deletions of critical production resources (like production databases)?',
      options: [
        'An IAM policy attached to developer desktop workstations',
        'A JSON document that acts as an authorization guardrail applied directly to the stack, explicitly defining which update actions are allowed or denied on specific resources (e.g., `Effect: Deny`, `Principal: *`, `Action: Update:*`, `Resource: LogicalResourceId/ProdDB`)',
        'An antivirus policy for Windows servers',
        'A billing spending limit alert in AWS Budgets'
      ],
      correct: 1,
      explanation: 'A Stack Policy prevents stack updates from inadvertently modifying or replacing critical resources. By default, all resources can be updated, but a Stack Policy with an explicit `Deny` protects designated resources.'
    },
    {
      id: 'cfn-a3', level: 'advanced',
      question: 'How does CloudFormation handle helper scripts `cfn-init`, `cfn-signal`, `cfn-hup`, and the `CreationPolicy` attribute on an EC2 instance?',
      options: [
        'They are used to install third-party games on EC2 instances',
        '`cfn-init` reads template metadata to install packages and write files; the instance signals completion via `cfn-signal`; the stack pauses in `CREATE_IN_PROGRESS` until the `CreationPolicy` receives the success signals or times out',
        'They replace the Linux systemd initialization daemon permanently',
        'They send diagnostic telemetry to third-party advertising companies'
      ],
      correct: 1,
      explanation: '`cfn-init` parses `AWS::CloudFormation::Init` metadata to configure the OS. `CreationPolicy` tells CloudFormation to wait for a success signal from `cfn-signal` before marking the EC2 instance as successfully created.'
    },
    {
      id: 'cfn-a4', level: 'advanced',
      question: 'What is the AWS Cloud Development Kit (AWS CDK)?',
      options: [
        'A graphical game development suite for mobile games',
        'An open-source software development framework to define cloud infrastructure in familiar programming languages (TypeScript, Python, Java, C#, Go) that synthesizes into CloudFormation templates',
        'A hardware development board for embedded microcontrollers',
        'A desktop text editor competing with VS Code'
      ],
      correct: 1,
      explanation: 'The AWS CDK lets developers define cloud infrastructure using expressive, object-oriented programming languages. When compiled (`cdk synth`), it synthesizes into standard CloudFormation JSON/YAML templates.'
    },
    {
      id: 'cfn-a5', level: 'advanced',
      question: 'What is the consequence of updating a resource property that requires "Replacement" according to the CloudFormation Resource Specification?',
      options: [
        'CloudFormation creates the new replacement resource first, updates references, and then deletes the old resource (unless property requires delete-first)',
        'The existing resource is immediately wiped before the new one is launched',
        'CloudFormation converts the resource into an unmanaged resource',
        'The stack automatically cancels the update with an error without changing anything'
      ],
      correct: 0,
      explanation: 'When a property update requires replacement (e.g., changing DB engine or S3 bucket name), CloudFormation creates the new replacement resource, points references to it, and finally terminates/deletes the old resource.'
    },
    {
      id: 'cfn-a6', level: 'advanced',
      question: 'What is a CloudFormation Macro?',
      options: [
        'An Excel spreadsheet macro for budgeting',
        'A custom processing extension that performs pre-processing transformations on CloudFormation templates before stack execution (e.g., custom string manipulation, schema shortcuts, or policy enforcement) using AWS Lambda',
        'A high-powered EC2 instance type with 128 vCPUs',
        'A keyboard shortcut in the AWS Management Console'
      ],
      correct: 1,
      explanation: 'CloudFormation Macros use AWS Lambda to process and transform template ASTs before CloudFormation provisions resources, enabling custom template syntaxes, organization-wide templating standards, and dynamic resource generation.'
    }
  ]
};
