// IAM Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const iamQuiz = {
  id: 'iam',
  service: 'AWS IAM',
  icon: 'Shield',
  color: 'rose',
  questions: [
    // ─── Beginner ──────────────────────────────────────────────────────────
    {
      id: 'iam-b1', level: 'beginner',
      question: 'What does IAM stand for?',
      options: ['Integrated Account Manager', 'Identity and Access Management', 'Internal Access Monitor', 'Isolated Auth Module'],
      correct: 1,
      explanation: 'IAM stands for Identity and Access Management. It\'s the AWS service used to securely control who (authentication) can do what (authorization) with AWS resources.'
    },
    {
      id: 'iam-b2', level: 'beginner',
      question: 'Which is the best security practice for the AWS root account?',
      options: ['Use the root account for all daily administrative tasks', 'Share root credentials with trusted team members', 'Enable MFA on root, create an IAM admin user for daily tasks, lock root credentials', 'Disable root entirely and use an IAM user with AdministratorAccess instead'],
      correct: 2,
      explanation: 'The root account has unrestricted access to all AWS services. Best practice: enable MFA, do NOT create access keys for root, create an IAM admin user for daily operations, and only use root for tasks that absolutely require it (e.g., changing account support plan).'
    },
    {
      id: 'iam-b3', level: 'beginner',
      question: 'What is an IAM Policy?',
      options: ['A billing configuration file defining reserved instance commitments', 'A JSON document that defines permissions — specifying which actions are allowed or denied on which AWS resources', 'A network routing rule for VPC traffic', 'An encryption key specification for data at rest'],
      correct: 1,
      explanation: 'An IAM Policy is a JSON document that specifies permissions. It defines: Effect (Allow/Deny), Action (e.g., s3:GetObject), and Resource (e.g., arn:aws:s3:::my-bucket/*). Policies are attached to users, groups, or roles to grant or restrict permissions.'
    },
    {
      id: 'iam-b4', level: 'beginner',
      question: 'An IAM Role is different from an IAM User because:',
      options: ['A Role can only be used by human users, not services', 'A Role has no long-term credentials; it provides temporary security credentials assumed by trusted entities (services, users, accounts)', 'A Role can only access a single AWS service', 'A Role must be attached to a specific EC2 instance at launch and cannot be changed'],
      correct: 1,
      explanation: 'IAM Roles provide temporary security credentials via AWS STS (Security Token Service). Unlike IAM Users (with permanent passwords/access keys), roles are assumed by trusted entities (EC2 instances, Lambda functions, cross-account users) and credentials auto-rotate every hour.'
    },
    {
      id: 'iam-b5', level: 'beginner',
      question: 'What is the Principle of Least Privilege in IAM?',
      options: ['Grant every user Administrator access to maximize productivity', 'Grant only the minimum permissions required to perform a specific job function — no more, no less', 'Use only AWS managed policies, never customer-managed policies', 'Apply policies only at the account level, not at individual user level'],
      correct: 1,
      explanation: 'The Principle of Least Privilege (PoLP) states that identities should only have permissions for what they need to do their job — and nothing else. This minimizes the blast radius of compromised credentials and reduces attack surface.'
    },
    {
      id: 'iam-b6', level: 'beginner',
      question: 'IAM Groups are used to:',
      options: ['Group multiple AWS accounts together under a single billing profile', 'Assign identical permissions to multiple IAM users simultaneously by attaching policies to the group', 'Group EC2 instances in the same Availability Zone for low-latency communication', 'Create billing groups for cost allocation reporting'],
      correct: 1,
      explanation: 'An IAM Group is a collection of IAM users. Policies attached to the group are inherited by all users in it. This simplifies permission management: instead of attaching policies to each user individually, group by job function (Developers, DBAs, Auditors).'
    },
    {
      id: 'iam-b7', level: 'beginner',
      question: 'What are IAM Access Keys used for?',
      options: ['Logging into the AWS Management Console (web UI)', 'Programmatic access to AWS via CLI, SDK, or API calls — consists of an Access Key ID and a Secret Access Key', 'Unlocking encrypted EBS volumes', 'Enabling cross-account access to IAM roles'],
      correct: 1,
      explanation: 'IAM Access Keys enable programmatic access (CLI, SDK, API). An Access Key consists of two parts: an Access Key ID (public identifier) and a Secret Access Key (used to sign API requests, shown only once at creation). Best practice: never embed access keys in source code.'
    },

    // ─── Intermediate ──────────────────────────────────────────────────────
    {
      id: 'iam-i1', level: 'intermediate',
      question: 'When multiple IAM policies apply to a user, what is the final permission evaluation order?',
      options: ['Allow always wins over Deny regardless of source', 'An explicit Deny in any policy always overrides an Allow — except for the root account', 'The most recently attached policy takes precedence', 'Service Control Policies always override all IAM policies'],
      correct: 1,
      explanation: 'IAM policy evaluation: 1) Start with implicit Deny (default). 2) Any explicit Deny wins over Allow regardless of policy type or source. 3) An explicit Allow grants access only if no Deny is present. Note: SCPs (Service Control Policies) set the maximum available permissions, and an SCP Deny also overrides IAM Allows.'
    },
    {
      id: 'iam-i2', level: 'intermediate',
      question: 'What is the difference between AWS Managed Policies and Customer Managed Policies?',
      options: ['AWS Managed Policies can be modified by the account owner; Customer Managed Policies cannot', 'AWS Managed Policies are created and maintained by AWS for common use cases (e.g., ReadOnlyAccess); Customer Managed Policies are created by you for specific fine-grained control', 'Customer Managed Policies are automatically updated when AWS services release new features', 'AWS Managed Policies can only be attached to groups, Customer Managed Policies only to roles'],
      correct: 1,
      explanation: 'AWS Managed Policies are pre-built by AWS, covering common permission sets (AdministratorAccess, ReadOnlyAccess, AmazonS3FullAccess). AWS updates them when services add new actions. Customer Managed Policies are defined by you, giving full control over specific permissions tailored to your application.'
    },
    {
      id: 'iam-i3', level: 'intermediate',
      question: 'IAM Conditions in policies allow you to do what?',
      options: ['Set expiration dates on policy attachments', 'Add contextual constraints to policy statements (e.g., restrict access to specific IP ranges, require MFA, limit to specific regions or resource tags)', 'Define billing thresholds for IAM operations', 'Configure password complexity requirements'],
      correct: 1,
      explanation: 'IAM Condition elements add fine-grained controls. Examples: aws:SourceIp restricts API calls to specific IP ranges, aws:MultiFactorAuthPresent requires MFA before sensitive operations, aws:RequestedRegion limits actions to specific regions, aws:PrincipalTag matches resource tags to requester tags.'
    },
    {
      id: 'iam-i4', level: 'intermediate',
      question: 'What does the IAM Access Analyzer tool do?',
      options: ['Audits CloudTrail logs for unauthorized access attempts', 'Identifies resources (S3 buckets, IAM roles, KMS keys, etc.) that are shared with external principals (outside your AWS account or organization) — surfaces unintended access', 'Generates least-privilege policies based on CloudTrail activity history', 'Scans IAM policies for syntax errors before they are applied'],
      correct: 1,
      explanation: 'IAM Access Analyzer continuously monitors resource-based policies and generates findings when resources are accessible from outside the AWS account or organization — such as an S3 bucket with a public bucket policy or a role assumable from any AWS account. It also now includes unused access analysis.'
    },
    {
      id: 'iam-i5', level: 'intermediate',
      question: 'A Lambda function needs to read from an S3 bucket and write to a DynamoDB table. What is the correct and secure way to grant these permissions?',
      options: ['Embed an IAM user access key and secret in the Lambda environment variables', 'Use the root account credentials passed as Lambda environment variables', 'Create an IAM Role with the required S3 and DynamoDB permissions and attach it as the Lambda execution role', 'Generate pre-signed URLs for S3 and DynamoDB tokens via an external service'],
      correct: 2,
      explanation: 'The correct pattern is to create an IAM Role with the minimum required permissions (s3:GetObject on the specific bucket, dynamodb:PutItem on the specific table) and assign it as the Lambda function\'s execution role. Lambda automatically obtains temporary credentials via STS — no access keys needed, no credential rotation required.'
    },
    {
      id: 'iam-i6', level: 'intermediate',
      question: 'What does AWS Security Token Service (STS) provide, and which API call is most commonly used for cross-account access?',
      options: ['STS provides permanent IAM credentials; AssumeUser is the primary API', 'STS provides temporary security credentials; AssumeRole is used to assume a role in the same or different AWS account', 'STS is a credential storage service; GetAccessKey retrieves stored credentials', 'STS is an authentication service for SAML-based federation only'],
      correct: 1,
      explanation: 'AWS STS (Security Token Service) issues temporary, limited-privilege security credentials (Access Key ID, Secret Access Key, Session Token) with configurable durations. AssumeRole is the primary STS API for cross-account access and role assumption, enabling federation, CI/CD pipelines, and cross-account resource sharing.'
    },
    {
      id: 'iam-i7', level: 'intermediate',
      question: 'What is an IAM Permission Boundary?',
      options: ['A network ACL that limits IAM API calls to specific VPC subnets', 'A managed policy that sets the MAXIMUM permissions an IAM entity (user or role) can have — the effective permissions are the intersection of this boundary and identity policies', 'An SCP that applies to all accounts in an AWS Organization', 'A quota limiting how many IAM users can be created per account'],
      correct: 1,
      explanation: 'Permission Boundaries define the maximum permissions for an IAM entity. Even if an attached policy grants more permissions, the effective permissions cannot exceed what\'s defined in the Permission Boundary. This is commonly used to safely delegate user/role creation to developers without allowing privilege escalation.'
    },

    // ─── Advanced ──────────────────────────────────────────────────────────
    {
      id: 'iam-a1', level: 'advanced',
      question: 'A security engineer needs to allow developers to create IAM roles but prevent them from creating roles with more privileges than their own. How is this accomplished?',
      options: ['Attach a wildcard Deny on iam:CreateRole for all developers', 'Use IAM Permission Boundaries — require that any IAM role created by a developer must have a specific permission boundary attached (enforced via IAM conditions on iam:CreateRole)', 'Use Service Control Policies to restrict iam:PassRole across the organization', 'Enable IAM Access Analyzer to automatically remove extra permissions'],
      correct: 1,
      explanation: 'This is the Permission Boundary delegation pattern. The policy grants developers iam:CreateRole but with the condition iam:PermissionsBoundary equals a specific boundary ARN — ensuring any role they create inherits that boundary. This prevents privilege escalation where a developer creates a role with AdministratorAccess to bypass their own limits.'
    },
    {
      id: 'iam-a2', level: 'advanced',
      question: 'You want employees to sign in to AWS using their corporate Microsoft Active Directory credentials (SSO). Which AWS service and protocol combination enables this?',
      options: ['AWS Directory Service for Microsoft AD with IAM SAML 2.0 federation, routing through AWS IAM Identity Center (SSO)', 'Create IAM users for each AD user and sync passwords manually', 'AWS Cognito User Pools with LDAP integration to Active Directory', 'AWS IAM Groups with RADIUS authentication to Active Directory'],
      correct: 0,
      explanation: 'For enterprise SSO with Active Directory: AWS IAM Identity Center (formerly AWS SSO) integrates with AWS Managed Microsoft AD or AD Connector. It acts as a SAML 2.0 identity broker, allowing employees to sign in with AD credentials and access AWS accounts with appropriate permission sets — no separate IAM users needed.'
    },
    {
      id: 'iam-a3', level: 'advanced',
      question: 'An IAM policy uses the "NotAction" element. What does "Effect: Deny, NotAction: iam:*" accomplish?',
      options: ['Denies all actions except IAM actions — effectively restricting a user to only IAM operations', 'Allows all IAM actions and denies everything else', 'Is invalid syntax; NotAction can only be used with Effect: Allow', 'Denies all IAM actions while allowing everything else'],
      correct: 0,
      explanation: '"Effect: Deny, NotAction: iam:*" denies all actions EXCEPT IAM actions. This is a powerful deny that restricts an entity to only IAM operations. Alternatively, "Effect: Allow, NotAction: iam:CreateVirtualMFADevice" allows all actions except that specific one — NotAction inverts the action match scope.'
    },
    {
      id: 'iam-a4', level: 'advanced',
      question: 'AWS CloudTrail logs show that an IAM access key was used from an unfamiliar IP address. What is the CORRECT incident response sequence?',
      options: ['Delete the IAM user permanently and recreate with a new access key', 'Immediately deactivate (not delete) the compromised access key, rotate all keys for the account, attach a Deny all policy to the user, investigate CloudTrail for actions taken, then remediate any resources created', 'Change the account root password and notify all users', 'Enable MFA for the compromised user and wait for further investigation'],
      correct: 1,
      explanation: 'Incident response for compromised IAM credentials: 1) Deactivate (not delete) the access key immediately to preserve audit history. 2) Attach an explicit Deny All policy to contain the blast radius. 3) Query CloudTrail with Athena or CloudTrail Lake to enumerate all actions performed. 4) Remediate unauthorized resources (terminate instances, delete buckets, revoke roles). 5) Issue new credentials after investigation.'
    },
    {
      id: 'iam-a5', level: 'advanced',
      question: 'What is the IAM policy evaluation flow for a request in an AWS Organization member account?',
      options: ['IAM Policy → Resource Policy → SCP (SCPs evaluated last)', 'SCP must Allow → then IAM identity policy and resource policy intersection determines access', 'Resource Policy → SCP → IAM Policy (most specific wins)', 'IAM Policy → SCP → Permission Boundary (all must Allow independently)'],
      correct: 1,
      explanation: 'In AWS Organizations, the effective permissions are the INTERSECTION of: 1) SCP (Service Control Policy) — defines maximum permissions for the account. 2) IAM identity policies and resource-based policies. If an SCP doesn\'t Allow an action, it cannot be performed even if the IAM policy grants it. Permission Boundaries further constrain individual entities within those limits.'
    },
    {
      id: 'iam-a6', level: 'advanced',
      question: 'Using IAM roles for EC2 instances, what happens when the temporary credentials obtained via the instance metadata service (IMDS) expire?',
      options: ['The EC2 instance must be rebooted to obtain new credentials', 'The application must call STS AssumeRole manually to refresh credentials', 'AWS SDK and CLI automatically retrieve new credentials from IMDS before expiry — credential rotation is transparent', 'The IAM role must be detached and reattached to trigger credential refresh'],
      correct: 2,
      explanation: 'When an EC2 instance has an IAM role attached, the AWS SDK and CLI automatically retrieve temporary credentials from the instance metadata service (http://169.254.169.254). These credentials are automatically refreshed before they expire — typically rotating every 1–6 hours. Applications using standard SDK credential chains benefit from zero-downtime credential rotation.'
    }
  ]
};
