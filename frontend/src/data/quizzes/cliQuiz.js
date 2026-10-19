// AWS CLI Quiz — 7 Beginner, 7 Intermediate, 6 Advanced = 20 Questions
export const cliQuiz = {
  id: 'cli',
  service: 'AWS Command Line Interface (AWS CLI)',
  icon: 'Terminal',
  color: 'slate',
  questions: [
    // ─── Beginner (1–7) ────────────────────────────────────────────────────
    {
      id: 'cli-b1', level: 'beginner',
      question: 'What is the AWS Command Line Interface (AWS CLI)?',
      options: [
        'A graphical drag-and-drop web dashboard for launching EC2 instances',
        'An open-source unified tool that enables users to interact with AWS services, manage resources, and automate tasks through terminal commands and scripts',
        'A hardware serial console connected to AWS server motherboard ports',
        'A programming language invented by AWS to replace JavaScript'
      ],
      correct: 1,
      explanation: 'The AWS CLI is a unified command-line tool that lets you control multiple AWS services from the command line and automate them through scripts.'
    },
    {
      id: 'cli-b2', level: 'beginner',
      question: 'Which interactive command is used to configure your AWS CLI installation with your AWS Access Key ID, Secret Access Key, default AWS Region, and default output format?',
      options: [
        'aws init',
        'aws configure',
        'aws setup --credentials',
        'aws login'
      ],
      correct: 1,
      explanation: 'Running `aws configure` prompts you for AWS Access Key ID, AWS Secret Access Key, default region name (e.g. us-east-1), and default output format (json, text, table, yaml).'
    },
    {
      id: 'cli-b3', level: 'beginner',
      question: 'Where does the AWS CLI store your configured access credentials and configuration settings on Linux/macOS and Windows?',
      options: [
        '/etc/aws/config and /etc/aws/credentials',
        '~/.aws/credentials and ~/.aws/config (or %USERPROFILE%\\.aws\\ on Windows)',
        'In the browser\'s localStorage',
        'In an encrypted AWS S3 bucket'
      ],
      correct: 1,
      explanation: 'The CLI stores credentials in `~/.aws/credentials` and configuration options (like default region and output format) in `~/.aws/config`.'
    },
    {
      id: 'cli-b4', level: 'beginner',
      question: 'What is the general syntax structure for AWS CLI commands?',
      options: [
        'aws <service> <command/operation> [parameters]',
        'aws run <operation> on <service>',
        '<service> aws execute <parameters>',
        'curl https://aws.amazon.com/<service>'
      ],
      correct: 0,
      explanation: 'The standard AWS CLI command pattern is `aws <service> <operation> [parameters]`. For example: `aws s3 ls` or `aws ec2 describe-instances --region us-west-2`.'
    },
    {
      id: 'cli-b5', level: 'beginner',
      question: 'Which output formats are natively supported by the AWS CLI using the `--output` parameter?',
      options: [
        'pdf, docx, and txt',
        'json, text, table, and yaml (in CLI v2)',
        'sql, postgres, and mongodb',
        'html, css, and markdown'
      ],
      correct: 1,
      explanation: 'The AWS CLI supports `json` (default), `text`, `table`, and in CLI version 2, `yaml` and `yaml-stream` output formats.'
    },
    {
      id: 'cli-b6', level: 'beginner',
      question: 'Which command lists all Amazon S3 buckets in your AWS account?',
      options: [
        'aws s3 show-all',
        'aws s3 ls',
        'aws s3 get-buckets',
        'aws storage list-s3'
      ],
      correct: 1,
      explanation: 'The command `aws s3 ls` lists all S3 buckets owned by the authenticated account.'
    },
    {
      id: 'cli-b7', level: 'beginner',
      question: 'How can you obtain built-in documentation and command help directly within the terminal for any AWS CLI command?',
      options: [
        'Append `help` to any command (e.g., `aws ec2 help` or `aws s3 cp help`)',
        'Search StackOverflow from the command line',
        'Send an email to support@aws.amazon.com',
        'Re-run `aws configure` with the `--manual` flag'
      ],
      correct: 0,
      explanation: 'Appending `help` to any AWS CLI command (e.g. `aws ec2 describe-instances help`) opens the built-in man page detailing parameters, syntax, and examples.'
    },

    // ─── Intermediate (8–14) ───────────────────────────────────────────────
    {
      id: 'cli-i1', level: 'intermediate',
      question: 'What client-side query language does the AWS CLI use with the `--query` parameter to filter and extract specific fields from JSON responses?',
      options: [
        'XPath',
        'JMESPath',
        'GraphQL',
        'RegEx'
      ],
      correct: 1,
      explanation: 'The AWS CLI uses JMESPath (a JSON query language) via the `--query` flag to perform client-side filtering and slicing on JSON API responses before displaying them.'
    },
    {
      id: 'cli-i2', level: 'intermediate',
      question: 'What is the purpose of Named Profiles in the AWS CLI, and how do you execute a command with a specific profile?',
      options: [
        'To set custom terminal font colors',
        'To manage multiple AWS account credentials or IAM roles side-by-side in `~/.aws/credentials`, accessed via the `--profile <profile-name>` flag',
        'To give users nicknames in IAM',
        'To configure distinct Git commit emails'
      ],
      correct: 1,
      explanation: 'Named profiles allow you to define multiple collections of settings and credentials in your config/credentials files (e.g. `[profile dev]`, `[profile prod]`), invoked with `--profile <name>` or `AWS_PROFILE=<name>`.'
    },
    {
      id: 'cli-i3', level: 'intermediate',
      question: 'What is the difference between client-side filtering with `--query` and server-side filtering with `--filters` in AWS CLI commands like `aws ec2 describe-instances`?',
      options: [
        'There is no difference; they are redundant synonyms',
        '`--filters` sends criteria to the AWS service API so only matching records are returned over the network, reducing data transfer and latency; `--query` receives all records and filters them locally on your machine',
        '`--query` is faster because AWS computes the query in the cloud',
        '`--filters` only works on S3 buckets'
      ],
      correct: 1,
      explanation: 'Server-side filtering (`--filters`) filters data before returning it from AWS APIs, significantly improving network speed and reducing payload size. Client-side filtering (`--query`) applies JMESPath expressions locally.'
    },
    {
      id: 'cli-i4', level: 'intermediate',
      question: 'Which environment variable can be used to pass a temporary AWS Session Token obtained from AWS STS AssumeRole to the AWS CLI?',
      options: [
        'AWS_SECURITY_PASS',
        'AWS_SESSION_TOKEN',
        'AWS_TOKEN_KEY',
        'AWS_STS_CREDENTIAL'
      ],
      correct: 1,
      explanation: 'When using temporary security credentials (from IAM roles or STS AssumeRole), `AWS_SESSION_TOKEN` (alongside `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) must be supplied to authenticate.'
    },
    {
      id: 'cli-i5', level: 'intermediate',
      question: 'Which AWS CLI command recursively copies an entire local directory to an Amazon S3 bucket, uploading only new or modified files?',
      options: [
        'aws s3 cp --recursive',
        'aws s3 sync <local-directory> s3://<bucket-name>/',
        'aws s3 upload-folder',
        'aws s3 put-dir'
      ],
      correct: 1,
      explanation: 'The `aws s3 sync` command synchronizes a directory and an S3 prefix (or between two S3 prefixes), copying only missing or modified files based on size and timestamp.'
    },
    {
      id: 'cli-i6', level: 'intermediate',
      question: 'What is the purpose of the `--dry-run` flag available on many AWS CLI EC2 operations?',
      options: [
        'It runs the command without network connectivity',
        'It checks whether you have the required IAM permissions for the action without actually making the request or creating/modifying any AWS resources',
        'It runs the command in a sandbox AWS region for free',
        'It deletes resources after 5 minutes'
      ],
      correct: 1,
      explanation: 'The `--dry-run` parameter checks whether you have the required permissions for the action (returns `DryRunOperation` if authorized, `UnauthorizedOperation` if not) without actually creating or terminating resources.'
    },
    {
      id: 'cli-i7', level: 'intermediate',
      question: 'What does the `--generate-cli-skeleton` parameter do when appended to an AWS CLI command?',
      options: [
        'It prints a sample JSON structure representing the complete request body or input parameters for that API operation',
        'It creates an empty EC2 instance without an operating system',
        'It generates a CloudFormation template from existing infrastructure',
        'It deletes unnecessary CLI cache files'
      ],
      correct: 0,
      explanation: '`--generate-cli-skeleton` outputs a sample JSON input template for the command. You can fill in the parameters and pass them back via `--cli-input-json file://input.json`.'
    },

    // ─── Advanced (15–20) ──────────────────────────────────────────────────
    {
      id: 'cli-a1', level: 'advanced',
      question: 'What is the exact evaluation order of precedence used by the AWS CLI to resolve credentials from conflicting sources?',
      options: [
        '~/.aws/credentials -> Environment Variables -> IAM Instance Profile',
        'Command-line options (`--profile`) -> Environment variables (`AWS_ACCESS_KEY_ID`, etc.) -> Assume role in config -> AWS credentials file (`~/.aws/credentials`) -> AWS config file -> Container credentials -> IAM Instance Profile metadata',
        'IAM Instance Profile always overrides explicit environment variables',
        'Alphabetical order of configuration filenames'
      ],
      correct: 1,
      explanation: 'The AWS CLI follows a strict credential precedence order: CLI options override environment variables, which override credentials file entries, which override config profiles, which override container credentials, which finally override EC2 instance metadata.'
    },
    {
      id: 'cli-a2', level: 'advanced',
      question: 'How do you configure the AWS CLI in `~/.aws/config` to automatically assume an IAM role in a target production account using credentials from your default corporate identity?',
      options: [
        'Add `role_arn = arn:aws:iam::123456789012:role/ProdAdmin` and `source_profile = default` under `[profile prod]` in `~/.aws/config`',
        'Copy the target account root password into `~/.aws/credentials`',
        'Execute `aws iam set-admin --account 123456789012`',
        'Role assumption cannot be automated through AWS CLI config files'
      ],
      correct: 0,
      explanation: 'Configuring `role_arn` and `source_profile` under a named profile in `~/.aws/config` allows the CLI to automatically call `sts:AssumeRole` behind the scenes and refresh temporary session tokens transparently.'
    },
    {
      id: 'cli-a3', level: 'advanced',
      question: 'What JMESPath expression retrieves only the `InstanceId` values of all EC2 instances currently in the `running` state from an `aws ec2 describe-instances` command?',
      options: [
        'Reservations[].Instances[?State.Name==`running`].InstanceId',
        'SELECT InstanceId FROM Instances WHERE State = "running"',
        'Reservations.Instances.running.InstanceId',
        'Instances[State==running] -> InstanceId'
      ],
      correct: 0,
      explanation: 'In JMESPath, `Reservations[].Instances[?State.Name==\`running\`].InstanceId` flattens the Reservations array, filters instances whose nested `State.Name` equals literal string `running`, and projects their `InstanceId` strings.'
    },
    {
      id: 'cli-a4', level: 'advanced',
      question: 'When uploading large multi-gigabyte files to Amazon S3 via `aws s3 cp` or `aws s3 sync`, how does the CLI optimize performance and reliability?',
      options: [
        'By compressing the file with zip before uploading',
        'By automatically executing multi-part uploads concurrently in parallel byte-range parts (configurable via `s3.max_concurrent_requests` and `s3.multipart_chunksize`)',
        'By disabling MD5 checksum validation',
        'By transmitting the data over UDP port 53'
      ],
      correct: 1,
      explanation: 'The AWS CLI automatically splits files larger than 8 MB into multipart chunks and uploads parts concurrently using a thread pool, allowing individual part retries without restarting the whole file.'
    },
    {
      id: 'cli-a5', level: 'advanced',
      question: 'How can you protect production AWS resources when executing destructive CLI commands in automated CI/CD pipelines?',
      options: [
        'Use temporary short-lived credentials from AWS STS AssumeRole with Session Policies or IAM Permission Boundaries restricting destructive actions',
        'Store root credentials in CI/CD environment variables',
        'Disable CloudTrail auditing during script runs',
        'Rename the CLI executable'
      ],
      correct: 0,
      explanation: 'Using short-lived STS credentials combined with Session Policies or Permission Boundaries ensures that even if a pipeline script is compromised, it cannot exceed the strictly bounded permissions assigned for that specific run.'
    },
    {
      id: 'cli-a6', level: 'advanced',
      question: 'What is the purpose of the AWS CLI parameter `--page-size` versus `--max-items` in paginated API operations?',
      options: [
        '`--page-size` controls font size on paper printouts; `--max-items` controls display brightness',
        '`--page-size` specifies the number of items returned per internal AWS API call (to prevent API timeouts without altering total items returned); `--max-items` sets the absolute maximum total number of items returned in the overall CLI response',
        '`--max-items` is for EC2 only; `--page-size` is for S3 only',
        'They are identical parameters that cannot be used together'
      ],
      correct: 1,
      explanation: '`--page-size` changes the batch size of internal API calls to prevent timeouts when retrieving large sets, while `--max-items` sets the ceiling on the total number of items returned by the CLI command.'
    }
  ]
};
