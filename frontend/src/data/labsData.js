export const labsData = [
  {
    id: 'lab-ec2-1',
    slug: 'launch-first-ec2-webserver',
    title: 'Deploy an Apache Web Server on Amazon EC2',
    service: 'EC2',
    category: 'Compute',
    difficulty: 'Beginner',
    estimatedTime: 15,
    points: 100,
    badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-500/10',
    description: 'Learn how to configure a Security Group for HTTP and SSH access, provision a Linux EC2 instance, and launch a live Apache web server using user data bootstrap scripts.',
    prerequisites: [
      'Basic understanding of public vs private IP addresses',
      'Familiarity with web protocols (HTTP port 80 and SSH port 22)',
      'Free Tier eligible AWS account or practice simulation environment'
    ],
    objectives: [
      'Create and configure an EC2 Security Group with inbound ports 80 & 22',
      'Select the Amazon Linux 2023 AMI on a t2.micro instance type',
      'Write a bash User Data script to install and start httpd on launch',
      'Verify public web server reachability via public IPv4 DNS'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Configure Security Group Firewall Rules',
        instruction: 'Navigate to EC2 > Security Groups > Create Security Group. Define inbound rules allowing SSH (Port 22) restricted to your IP, and HTTP (Port 80) open to anywhere (0.0.0.0/0).',
        cliCommand: 'aws ec2 create-security-group \\\n  --group-name "web-dmz-sg" \\\n  --description "Security group for web server" \\\n  --vpc-id vpc-practice-01',
        hint: 'Never leave SSH (port 22) open to 0.0.0.0/0 in production environments.'
      },
      {
        stepNumber: 2,
        title: 'Add Inbound Port 80 & 22 Authorizations',
        instruction: 'Authorize inbound HTTP and SSH traffic on your newly created security group.',
        cliCommand: 'aws ec2 authorize-security-group-ingress \\\n  --group-id sg-web-01 \\\n  --protocol tcp --port 80 --cidr 0.0.0.0/0\n\naws ec2 authorize-security-group-ingress \\\n  --group-id sg-web-01 \\\n  --protocol tcp --port 22 --cidr 192.168.1.100/32',
        hint: 'Security group rules are stateful; outbound return traffic is permitted automatically.'
      },
      {
        stepNumber: 3,
        title: 'Launch EC2 Instance with User Data Bootstrap Script',
        instruction: 'Launch a t2.micro Amazon Linux instance and supply a User Data shell script that installs Apache, enables the service, and creates an index.html welcome page.',
        cliCommand: `aws ec2 run-instances \\
  --image-id ami-0c55b159cbfafe1f0 \\
  --count 1 \\
  --instance-type t2.micro \\
  --key-name practice-key \\
  --security-group-ids sg-web-01 \\
  --user-data fileb://user-data.sh`,
        codeSnippet: `#!/bin/bash
dnf update -y
dnf install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Welcome to AWS Practice Lab Web Server!</h1><p>Instance ID: $(curl -s http://169.254.169.254/latest/meta-data/instance-id)</p>" > /var/www/html/index.html`,
        hint: 'User Data scripts execute with root permissions automatically during the initial instance boot.'
      },
      {
        stepNumber: 4,
        title: 'Verify HTTP Access and Instance Status',
        instruction: 'Wait for the instance status check to transition to "2/2 checks passed", then copy the Public IPv4 DNS and visit http://<public-ip> in your browser.',
        cliCommand: 'aws ec2 describe-instances --instance-ids i-practice-web01 --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]" --output table',
        hint: 'Make sure your browser uses http:// instead of automatically forcing https:// during early testing.'
      }
    ],
    expectedResults: 'When browsing to the public IP address, an HTML page displays "Welcome to AWS Practice Lab Web Server!" with the simulated instance ID. EC2 Console status checks show 2/2 passed.',
    commonMistakes: [
      'Opening https:// (port 443) instead of http:// (port 80) without having SSL/TLS certificates configured.',
      'Forgetting to assign a Public IPv4 address in the subnet launch settings, making the server unreachable from the internet.',
      'Attaching the security group to the VPC but omitting the HTTP rule in inbound security group configuration.',
      'Not enabling and starting the httpd service in the bootstrap script.'
    ]
  },
  {
    id: 'lab-s3-1',
    slug: 'host-static-website-s3',
    title: 'Host a Resilient Static Website on Amazon S3',
    service: 'S3',
    category: 'Storage',
    difficulty: 'Beginner',
    estimatedTime: 15,
    points: 100,
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    description: 'Configure an Amazon S3 bucket for website hosting, disable Block Public Access safely for public read, upload HTML/CSS assets, and attach an S3 Bucket Policy.',
    prerequisites: [
      'Basic knowledge of static web pages (index.html, error.html)',
      'Understanding of AWS JSON policy structure (Version, Statement, Effect, Principal, Action, Resource)'
    ],
    objectives: [
      'Create a globally unique S3 bucket with regional placement',
      'Disable specific Block Public Access settings for public read access',
      'Enable S3 Static Website Hosting with index and error document mapping',
      'Apply an S3 Bucket Policy granting s3:GetObject to all principals'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create Globally Unique Bucket',
        instruction: 'Create an S3 bucket with a unique DNS-compliant name in your target region.',
        cliCommand: 'aws s3api create-bucket \\\n  --bucket aws-practice-lab-site-2026 \\\n  --region us-east-1',
        hint: 'Bucket names must be between 3 and 63 characters and contain only lowercase letters, numbers, and hyphens.'
      },
      {
        stepNumber: 2,
        title: 'Configure Block Public Access Settings',
        instruction: 'To allow public website visitors to view images and HTML, adjust the bucket Public Access Block to permit public bucket policies.',
        cliCommand: `aws s3api put-public-access-block \\
  --bucket aws-practice-lab-site-2026 \\
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"`,
        hint: 'Keeping BlockPublicAcls active while allowing BlockPublicPolicy is standard AWS security hygiene.'
      },
      {
        stepNumber: 3,
        title: 'Apply Bucket Policy for Public Read (s3:GetObject)',
        instruction: 'Attach a JSON bucket policy granting read-only access to any visitor requesting objects within the bucket.',
        cliCommand: 'aws s3api put-bucket-policy --bucket aws-practice-lab-site-2026 --policy file://policy.json',
        codeSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aws-practice-lab-site-2026/*"
    }
  ]
}`,
        hint: 'Notice the /* wildcard at the end of the Resource ARN to cover all files inside the bucket.'
      },
      {
        stepNumber: 4,
        title: 'Enable Website Hosting & Upload index.html',
        instruction: 'Enable Static Website Hosting on the bucket specifying index.html as the index document, and upload your site files.',
        cliCommand: `aws s3 website s3://aws-practice-lab-site-2026/ --index-document index.html --error-document error.html

aws s3 cp ./index.html s3://aws-practice-lab-site-2026/ --content-type "text/html"`,
        hint: 'Use the Amazon S3 website endpoint URL (e.g., http://<bucket-name>.s3-website-<region>.amazonaws.com) to browse your site.'
      }
    ],
    expectedResults: 'Visiting the S3 Website Endpoint renders the index.html page cleanly without 403 Forbidden errors. The bucket displays the "Public" badge in the AWS Console.',
    commonMistakes: [
      'Using the S3 REST API endpoint (https://bucket.s3.amazonaws.com) instead of the Website Hosting endpoint, which requires authenticated requests.',
      'Omitting the /* at the end of the Resource ARN in the bucket policy, causing individual files to throw 403 Access Denied.',
      'Forgetting to disable Block Public Access before applying the public read policy.'
    ]
  },
  {
    id: 'lab-iam-1',
    slug: 'iam-least-privilege-roles',
    title: 'Enforce Least Privilege with IAM Users, Groups & Policies',
    service: 'IAM',
    category: 'Security',
    difficulty: 'Beginner',
    estimatedTime: 20,
    points: 100,
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    description: 'Implement AWS security best practices by creating an IAM Developer Group, defining customer-managed JSON policies, assigning users, and requiring MFA.',
    prerequisites: [
      'Understanding of authentication (who you are) vs authorization (what you can do)',
      'Basic knowledge of IAM identities (Users, Groups, Roles, Policies)'
    ],
    objectives: [
      'Create an IAM group with restricted permissions for cloud developers',
      'Author a custom policy granting Read-Only access to EC2 and S3',
      'Create a developer user and generate temporary CLI credentials',
      'Test permission boundary enforcement when attempting unauthorized actions'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create Custom Developer Policy',
        instruction: 'Define a customer-managed IAM policy that allows viewing EC2 instances and S3 bucket listings, but denies instance termination and bucket deletion.',
        cliCommand: 'aws iam create-policy \\\n  --policy-name DeveloperLimitedAccess \\\n  --policy-document file://dev-policy.json',
        codeSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadEC2AndS3",
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "s3:ListAllMyBuckets",
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": "*"
    },
    {
      "Sid": "DenySensitiveActions",
      "Effect": "Deny",
      "Action": [
        "ec2:TerminateInstances",
        "s3:DeleteBucket"
      ],
      "Resource": "*"
    }
  ]
}`,
        hint: 'In AWS IAM, an explicit DENY always trumps any ALLOW statement.'
      },
      {
        stepNumber: 2,
        title: 'Create IAM User Group and Attach Policy',
        instruction: 'Create an IAM group called "JuniorDevelopers" and attach the DeveloperLimitedAccess policy ARN to the group.',
        cliCommand: `aws iam create-group --group-name JuniorDevelopers

aws iam attach-group-policy \\
  --group-name JuniorDevelopers \\
  --policy-arn arn:aws:iam::123456789012:policy/DeveloperLimitedAccess`,
        hint: 'Managing permissions through User Groups rather than individual users prevents configuration drift.'
      },
      {
        stepNumber: 3,
        title: 'Create IAM User & Add to Group',
        instruction: 'Create user "alice-dev", enable Console password with forced password change on first login, and add Alice to the JuniorDevelopers group.',
        cliCommand: `aws iam create-user --user-name alice-dev

aws iam add-user-to-group --group-name JuniorDevelopers --user-name alice-dev

aws iam create-login-profile --user-name alice-dev --password "TempP@ssw0rd2026!" --password-reset-required`,
        hint: 'Always enforce password complexity and password rotation policies.'
      },
      {
        stepNumber: 4,
        title: 'Audit Access with IAM Policy Simulator',
        instruction: 'Simulate user actions to confirm Alice can describe EC2 instances but is blocked when attempting to terminate instances.',
        cliCommand: `aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123456789012:user/alice-dev \\
  --action-names ec2:DescribeInstances ec2:TerminateInstances`,
        hint: 'Policy simulator displays "allowed" for ec2:DescribeInstances and "denied" with explicitDeny for ec2:TerminateInstances.'
      }
    ],
    expectedResults: 'Alice can view EC2 instances and read S3 objects, but receives AccessDeniedException when trying to delete or terminate resources. MFA enforcement is active.',
    commonMistakes: [
      'Granting AdministratorAccess directly to developers when they only need service read permissions.',
      'Embedding IAM access keys into application source code or public GitHub repositories.',
      'Overlooking the explicit Deny rule precedence over Allow.'
    ]
  },
  {
    id: 'lab-vpc-1',
    slug: 'build-custom-vpc-networking',
    title: 'Architect a 2-Tier VPC with Public & Private Subnets',
    service: 'VPC',
    category: 'Networking',
    difficulty: 'Intermediate',
    estimatedTime: 25,
    points: 120,
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    description: 'Build an isolated virtual private network with public web subnets, private database subnets, an Internet Gateway, and custom route tables.',
    prerequisites: [
      'Understanding of IPv4 CIDR blocks (e.g. /16 has 65,536 IPs, /24 has 256 IPs)',
      'Understanding the difference between Public and Private subnets'
    ],
    objectives: [
      'Create a custom VPC with 10.0.0.0/16 CIDR block',
      'Subnet design: Public subnet (10.0.1.0/24) & Private subnet (10.0.2.0/24)',
      'Attach an Internet Gateway (IGW) to the VPC',
      'Create a Public Route Table pointing 0.0.0.0/0 to the Internet Gateway'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create Custom VPC',
        instruction: 'Create a VPC with the IPv4 CIDR block 10.0.0.0/16 and enable DNS hostnames.',
        cliCommand: `aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=production-vpc}]"

aws ec2 modify-vpc-attribute --vpc-id vpc-xxx --enable-dns-hostnames "{\\"Value\\":true}"`,
        hint: 'AWS reserves the first 4 and last 1 IP address in every subnet CIDR block (5 total reserved IPs).'
      },
      {
        stepNumber: 2,
        title: 'Provision Public & Private Subnets',
        instruction: 'Create a Public Subnet (10.0.1.0/24) in Availability Zone A and a Private Subnet (10.0.2.0/24) in Availability Zone B.',
        cliCommand: `aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24 --availability-zone ap-south-1a --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=public-web-1a}]"

aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.2.0/24 --availability-zone ap-south-1b --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=private-db-1b}]"`,
        hint: 'Enable "Auto-assign public IPv4 address" on the public subnet so instances get public IPs automatically.'
      },
      {
        stepNumber: 3,
        title: 'Create and Attach Internet Gateway (IGW)',
        instruction: 'Create an Internet Gateway and attach it to your VPC to allow bi-directional internet communication for public subnets.',
        cliCommand: `aws ec2 create-internet-gateway --tag-specifications "ResourceType=internet-gateway,Tags=[{Key=Name,Value=prod-igw}]"

aws ec2 attach-internet-gateway --internet-gateway-id igw-xxx --vpc-id vpc-xxx`,
        hint: 'A VPC can only have one Internet Gateway attached at a time.'
      },
      {
        stepNumber: 4,
        title: 'Configure Public Route Table and Associate Subnet',
        instruction: 'Create a route table for the public subnet, add a default route (0.0.0.0/0) pointing to the Internet Gateway, and associate the public subnet.',
        cliCommand: `aws ec2 create-route-table --vpc-id vpc-xxx

aws ec2 create-route --route-table-id rtb-xxx --destination-cidr-block 0.0.0.0/0 --gateway-id igw-xxx

aws ec2 associate-route-table --subnet-id subnet-public-xxx --route-table-id rtb-xxx`,
        hint: 'The private subnet remains associated with the main VPC route table, which only contains the local VPC route (10.0.0.0/16 local).'
      }
    ],
    expectedResults: 'Resources in the public subnet can reach and be reached from the public internet, while resources in the private subnet are completely shielded from direct inbound internet traffic.',
    commonMistakes: [
      'Creating an Internet Gateway but forgetting to attach it to the VPC.',
      'Adding a default route to the main route table instead of creating a dedicated custom public route table.',
      'Assigning overlapping CIDR blocks to subnets inside the same VPC.'
    ]
  },
  {
    id: 'lab-lambda-1',
    slug: 'serverless-thumbnail-function',
    title: 'Build a Serverless Event-Driven Function with AWS Lambda',
    service: 'Lambda',
    category: 'Compute',
    difficulty: 'Intermediate',
    estimatedTime: 20,
    points: 110,
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    description: 'Write an asynchronous Node.js Lambda function triggered by Amazon S3 object uploads, process metadata, and record audit metrics.',
    prerequisites: [
      'Understanding of serverless concepts (no server management, pay per invocation)',
      'Basic JavaScript / Node.js async/await syntax'
    ],
    objectives: [
      'Create an IAM execution role for Lambda with CloudWatch Logs permissions',
      'Deploy a Node.js 20.x Lambda function handler',
      'Configure environment variables and execution timeout',
      'Test function execution with a simulated S3 PutObject event payload'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create Lambda IAM Execution Role',
        instruction: 'Create an IAM role with trust relationship for lambda.amazonaws.com and attach the AWSLambdaBasicExecutionRole managed policy.',
        cliCommand: `aws iam create-role --role-name lambda-s3-processor-role \\
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

aws iam attach-role-policy --role-name lambda-s3-processor-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole`,
        hint: 'The Basic Execution Role gives the Lambda function rights to stream console.log output into Amazon CloudWatch Logs.'
      },
      {
        stepNumber: 2,
        title: 'Develop Function Code (index.js)',
        instruction: 'Write the handler function that extracts S3 bucket and object key details from the incoming event object.',
        codeSnippet: `export const handler = async (event) => {
  console.log("Received S3 Event:", JSON.stringify(event, null, 2));
  
  const records = event.Records || [];
  for (const record of records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\\+/g, " "));
    const size = record.s3.object.size;
    
    console.log(\`Processing object \${key} from bucket \${bucket} (\${size} bytes)\`);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Processed successfully", count: records.length }),
  };
};`,
        hint: 'Ensure object keys are URL-decoded, as spaces in filenames are represented as + or %20 in S3 events.'
      },
      {
        stepNumber: 3,
        title: 'Package and Deploy Lambda Function',
        instruction: 'Zip index.js and upload it to AWS Lambda specifying Node.js 20.x runtime and a 10-second timeout.',
        cliCommand: `zip function.zip index.js

aws lambda create-function \\
  --function-name S3ObjectProcessor \\
  --runtime nodejs20.x \\
  --role arn:aws:iam::123456789012:role/lambda-s3-processor-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip \\
  --timeout 10 \\
  --memory-size 256`,
        hint: 'Start with 256 MB memory and calibrate upward based on actual CloudWatch memory metrics.'
      },
      {
        stepNumber: 4,
        title: 'Invoke Function with Test Event',
        instruction: 'Trigger a synchronous test invocation using a sample S3 event payload and inspect the response output.',
        cliCommand: `aws lambda invoke \\
  --function-name S3ObjectProcessor \\
  --payload fileb://sample-s3-event.json \\
  --cli-binary-format raw-in-base64-out \\
  response.json

cat response.json`,
        hint: 'Status code 200 indicates success. Check CloudWatch Logs stream /aws/lambda/S3ObjectProcessor for detailed execution metrics.'
      }
    ],
    expectedResults: 'Function executes in under 100ms, returns a 200 OK payload, and automatically creates a CloudWatch Log Stream with START, END, and REPORT log lines detailing execution duration and billed memory.',
    commonMistakes: [
      'Forgetting to attach the Basic Execution Role, causing the function to fail to generate CloudWatch Logs.',
      'Setting too short an execution timeout (e.g. default 3 seconds for heavy tasks), causing Task timed out after 3.00 seconds errors.',
      'Not handling event structure variations when testing functions locally.'
    ]
  },
  {
    id: 'lab-rds-1',
    slug: 'deploy-multi-az-rds-mysql',
    title: 'Deploy a High-Availability Multi-AZ Amazon RDS MySQL Database',
    service: 'RDS',
    category: 'Database',
    difficulty: 'Intermediate',
    estimatedTime: 20,
    points: 120,
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    description: 'Set up an RDS DB Subnet Group across multiple Availability Zones, provision a managed MySQL instance with Multi-AZ automated failover, and configure DB Security Groups.',
    prerequisites: [
      'Basic relational database concepts (MySQL port 3306, user credentials)',
      'Understanding of High Availability (Active-Standby synchronous replication)'
    ],
    objectives: [
      'Create an RDS DB Subnet Group spanning at least two Availability Zones',
      'Create a Database Security Group restricting access to web application instances',
      'Launch an Amazon RDS MySQL instance with Multi-AZ enabled',
      'Review automated daily snapshot windows and maintenance schedules'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create DB Subnet Group Across 2 AZs',
        instruction: 'RDS requires subnets in at least two distinct Availability Zones in the same VPC for High Availability and failover.',
        cliCommand: `aws rds create-db-subnet-group \\
  --db-subnet-group-name "prod-db-subnet-group" \\
  --db-subnet-group-description "Subnet group for multi-az RDS" \\
  --subnet-ids "subnet-private-1a" "subnet-private-1b"`,
        hint: 'Never place RDS database instances in public subnets unless there is an extraordinary operational reason.'
      },
      {
        stepNumber: 2,
        title: 'Configure DB Security Group',
        instruction: 'Create a security group allowing inbound MySQL port 3306 only from the EC2 web server security group (sg-web-01).',
        cliCommand: `aws ec2 create-security-group --group-name "rds-db-sg" --description "Inbound MySQL from web servers" --vpc-id vpc-xxx

aws ec2 authorize-security-group-ingress \\
  --group-id sg-rds-01 \\
  --protocol tcp --port 3306 \\
  --source-group sg-web-01`,
        hint: 'Referencing the Web Security Group ID as the source creates a secure dynamic rule that does not rely on static IP addresses.'
      },
      {
        stepNumber: 3,
        title: 'Provision Multi-AZ MySQL Instance',
        instruction: 'Launch a db.t3.micro MySQL 8.0 instance with 20 GB allocated GP3 storage, Multi-AZ replication, and automated backups.',
        cliCommand: `aws rds create-db-instance \\
  --db-instance-identifier "practice-mysql-db" \\
  --db-instance-class "db.t3.micro" \\
  --engine "mysql" \\
  --allocated-storage 20 \\
  --master-username "adminuser" \\
  --master-user-password "Str0ngP@ssw0rd2026!" \\
  --db-subnet-group-name "prod-db-subnet-group" \\
  --vpc-security-group-ids "sg-rds-01" \\
  --multi-az \\
  --backup-retention-period 7`,
        hint: 'Multi-AZ automatically synchronously replicates writes to a standby replica in a different AZ with zero application code changes needed.'
      },
      {
        stepNumber: 4,
        title: 'Retrieve DB Endpoint & Test Connection',
        instruction: 'Wait for the DB instance status to change from "creating" to "available", and obtain the DNS endpoint for connection strings.',
        cliCommand: 'aws rds describe-db-instances --db-instance-identifier practice-mysql-db --query "DBInstances[*].[Endpoint.Address,DBInstanceStatus,MultiAZ]" --output table',
        hint: 'The endpoint resolves to the primary active instance IP. During failover, RDS automatically flips the DNS record to the standby instance.'
      }
    ],
    expectedResults: 'RDS instance is in "available" state with MultiAZ=true. Inbound port 3306 traffic is strictly limited to the application security group.',
    commonMistakes: [
      'Selecting only one subnet/AZ for the DB Subnet Group, which prevents Multi-AZ from being activated.',
      'Allowing 0.0.0.0/0 on port 3306, exposing the database to credential brute-force attacks from the internet.',
      'Forgetting that Multi-AZ standby instances cannot be read from; to scale read workloads, use Read Replicas.'
    ]
  },
  {
    id: 'lab-cloudwatch-1',
    slug: 'monitor-ec2-cloudwatch-alarms',
    title: 'Monitor System Health with Amazon CloudWatch Metrics & Alarms',
    service: 'CloudWatch',
    category: 'Management',
    difficulty: 'Beginner',
    estimatedTime: 15,
    points: 100,
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    description: 'Set up automated monitoring for EC2 instances using CloudWatch CPUUtilization metrics, create an SNS email notification topic, and trigger an automated alert.',
    prerequisites: [
      'Basic knowledge of system metrics (CPU utilization, Disk, Memory)',
      'Basic understanding of Amazon SNS publish/subscribe model'
    ],
    objectives: [
      'Create an Amazon SNS topic and subscribe your email address',
      'Inspect default EC2 5-minute CloudWatch metrics',
      'Create a CloudWatch Metric Alarm for CPUUtilization >= 75%',
      'Simulate high CPU stress to verify alarm transitions from OK to ALARM'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create SNS Alert Topic and Subscription',
        instruction: 'Create an Amazon SNS topic named "CloudWatch-Admin-Alerts" and subscribe your email address to receive notification emails.',
        cliCommand: `aws sns create-topic --name "CloudWatch-Admin-Alerts"

aws sns subscribe \\
  --topic-arn arn:aws:sns:ap-south-1:123456789012:CloudWatch-Admin-Alerts \\
  --protocol email \\
  --notification-endpoint admin@example.com`,
        hint: 'Check your email inbox and click "Confirm subscription" in the AWS SNS verification email.'
      },
      {
        stepNumber: 2,
        title: 'Create CloudWatch Alarm for High CPU',
        instruction: 'Configure an alarm that triggers whenever an EC2 instance CPUUtilization exceeds 75% for 2 consecutive evaluation periods of 60 seconds.',
        cliCommand: `aws cloudwatch put-metric-alarm \\
  --alarm-name "EC2-High-CPU-Alarm" \\
  --alarm-description "Triggered when CPU exceeds 75% for 2 minutes" \\
  --metric-name CPUUtilization \\
  --namespace AWS/EC2 \\
  --statistic Average \\
  --period 60 \\
  --threshold 75 \\
  --comparison-operator GreaterThanOrEqualToThreshold \\
  --dimensions Name=InstanceId,Value=i-practice-web01 \\
  --evaluation-periods 2 \\
  --alarm-actions arn:aws:sns:ap-south-1:123456789012:CloudWatch-Admin-Alerts`,
        hint: 'Standard CloudWatch monitoring reports EC2 metrics every 5 minutes. Detailed monitoring (1-minute granularity) can be enabled if required.'
      },
      {
        stepNumber: 3,
        title: 'Simulate High CPU Load with stress Tool',
        instruction: 'SSH into the EC2 instance and run the Linux stress utility to generate 100% CPU utilization.',
        cliCommand: `sudo dnf install -y stress
stress --cpu 2 --timeout 180s`,
        hint: 'The stress process will consume CPU cycles for 180 seconds, allowing the CloudWatch alarm to detect consecutive threshold breaches.'
      },
      {
        stepNumber: 4,
        title: 'Monitor Alarm State Transition',
        instruction: 'Watch the alarm change state from OK to INSUFFICIENT_DATA and finally into ALARM state, dispatching an alert email.',
        cliCommand: 'aws cloudwatch describe-alarms --alarm-names "EC2-High-CPU-Alarm" --query "MetricAlarms[*].[AlarmName,StateValue,StateReason]" --output table',
        hint: 'Once the stress command completes, the alarm returns to the OK state after the metric falls back below 75%.'
      }
    ],
    expectedResults: 'CloudWatch alarm successfully transitions from OK to ALARM state, and an SNS email notification is received with the exact instance ID and timestamp.',
    commonMistakes: [
      'Not clicking the confirmation link in the SNS verification email, leaving the subscription in "PendingConfirmation" state.',
      'Setting evaluation periods to 1 on spiky workloads, causing nuisance false-positive alarms.',
      'Expecting memory utilization metrics without installing the Amazon CloudWatch Agent on the OS (memory is an OS-level metric, not hardware virtualization).'
    ]
  }
];
