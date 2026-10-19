import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Server,
  Database,
  Shield,
  Layers,
  Cpu,
  Globe,
  Bell,
  Box,
  Sliders,
  DollarSign,
  Search,
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Info,
  Trash2,
  Lock,
  Eye,
  Check
} from 'lucide-react';

export const ConsoleSimulator = ({ onAwardXP }) => {
  // Active simulated service view
  const [activeService, setActiveService] = useState('ec2');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('us-east-1 (N. Virginia)');
  
  // Guided labs selection
  const [activeLabId, setActiveLabId] = useState('lab-s3-create');
  const [labProgress, setLabProgress] = useState({}); // { [stepId]: boolean }
  const [labFeedback, setLabFeedback] = useState(null);

  // Simulated state for all supported services
  const defaultState = {
    ec2: [
      { id: 'i-0ab12c34d56e78f90', name: 'Web-Server-Prod-01', type: 't3.micro', state: 'running', ip: '54.210.82.14', az: 'us-east-1a' },
      { id: 'i-0fe98d76c54b32a10', name: 'App-Worker-02', type: 't3.small', state: 'running', ip: '52.14.77.201', az: 'us-east-1b' }
    ],
    s3: [
      { name: 'prod-static-assets-2026', region: 'us-east-1', publicAccess: 'Blocked', objects: 1420, date: '2026-01-15' },
      { name: 'backup-database-archive-vault', region: 'us-east-1', publicAccess: 'Blocked', objects: 38, date: '2026-02-01' }
    ],
    iam: [
      { name: 'EC2-S3-ReadWrite-Role', type: 'Role', trusted: 'ec2.amazonaws.com', policies: ['AmazonS3ReadOnlyAccess'] },
      { name: 'Lambda-DynamoDB-Execution', type: 'Role', trusted: 'lambda.amazonaws.com', policies: ['AWSLambdaBasicExecutionRole'] }
    ],
    vpc: [
      { id: 'vpc-08a9f73c', name: 'Production-VPC', cidr: '10.0.0.0/16', subnets: 4, state: 'available' },
      { id: 'vpc-default', name: 'Default-VPC', cidr: '172.31.0.0/16', subnets: 3, state: 'available' }
    ],
    lambda: [
      { name: 'processPaymentWebhook', runtime: 'Node.js 20.x', memory: '256 MB', timeout: '15s', lastModified: '2026-03-10' },
      { name: 'resizeS3ImageThumbnail', runtime: 'Python 3.12', memory: '512 MB', timeout: '30s', lastModified: '2026-03-12' }
    ],
    rds: [
      { id: 'db-prod-mysql-primary', engine: 'MySQL 8.0.35', size: 'db.m5.large', status: 'available', multiAz: 'Yes' }
    ],
    dynamodb: [
      { name: 'UserSessionsTable', pk: 'userId (String)', sk: 'timestamp (Number)', items: 12490, billing: 'On-Demand' }
    ],
    cloudwatch: [
      { name: 'EC2-High-CPU-Utilization', metric: 'CPUUtilization > 80%', state: 'OK', action: 'Notify SNS topic' }
    ],
    cloudtrail: [
      { name: 'OrganizationManagementTrail', bucket: 'audit-log-bucket', multiRegion: 'Yes', logging: 'Active' }
    ],
    elb: [
      { name: 'prod-alb-public', type: 'Application', scheme: 'internet-facing', state: 'active', targets: 2 }
    ],
    autoscaling: [
      { name: 'web-asg-production', min: 2, desired: 2, max: 8, status: 'Healthy' }
    ],
    route53: [
      { zone: 'example-cloudlab.internal', type: 'Private Hosted Zone', records: 8 }
    ],
    cloudfront: [
      { id: 'E2A1B3C4D5E6F7', origin: 'prod-static-assets-2026.s3.amazonaws.com', status: 'Enabled', ssl: 'Custom (ACM)' }
    ],
    ecs: [
      { cluster: 'production-microservices', tasks: 6, services: 3, fargate: 'Enabled' }
    ],
    beanstalk: [
      { app: 'node-storefront-api', env: 'NodeStorefront-prod', health: 'Green', tier: 'Web Server' }
    ],
    cloudformation: [
      { stack: 'ProductionVpcNetworkStack', status: 'CREATE_COMPLETE', resources: 14 }
    ],
    ssm: [
      { instance: 'i-0ab12c34d56e78f90', agent: 'Online', platform: 'Amazon Linux 2023', compliance: 'Compliant' }
    ],
    budgets: [
      { name: 'Monthly-Cloud-Cap', limit: '$150.00', actual: '$42.18', forecasted: '$118.50', status: 'OK' }
    ]
  };

  const [simState, setSimState] = useState(() => {
    try {
      const saved = localStorage.getItem('aws_sim_state');
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  // Creation modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState('');
  const [actionSuccess, setActionSuccess] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aws_sim_state', JSON.stringify(simState));
    } catch (e) {
      console.error(e);
    }
  }, [simState]);

  // Guided Labs Catalog
  const guidedLabs = [
    {
      id: 'lab-s3-create',
      title: 'Lab 1: Create an S3 Bucket with Public Access Block',
      service: 's3',
      description: 'Create a private, secure S3 bucket conforming to global naming rules and least-privilege access.',
      steps: [
        'Open the Amazon S3 simulator console',
        'Click "Create Bucket"',
        'Enter a globally unique bucket name (lowercase, no spaces, e.g. my-cloud-lab-storage-2026)',
        'Ensure "Block all public access" is enabled for security',
        'Submit and verify the bucket appears in the bucket list'
      ],
      securityNotes: 'Leaving S3 buckets publicly readable is one of the most common cloud security misconfigurations leading to data breaches.',
      costNotes: 'Standard S3 storage costs ~$0.023 per GB/month with 5 GB free tier allowance for the first 12 months.'
    },
    {
      id: 'lab-iam-role',
      title: 'Lab 2: Create a Least-Privilege IAM Role',
      service: 'iam',
      description: 'Provision an IAM service role for EC2 instances to read from S3 without hardcoding access keys.',
      steps: [
        'Navigate to the IAM console view',
        'Click "Create Role"',
        'Select trusted entity type: "EC2 (ec2.amazonaws.com)"',
        'Attach policy "AmazonS3ReadOnlyAccess"',
        'Name the role (e.g., AppServerS3ReadOnlyRole) and create'
      ],
      securityNotes: 'Never embed permanent AWS access keys inside application source code or EC2 user data scripts. Always use IAM Roles.',
      costNotes: 'IAM is a foundational security service and is completely free of charge in AWS.'
    },
    {
      id: 'lab-ec2-sg',
      title: 'Lab 3: Launch EC2 Instance with Secured Security Group',
      service: 'ec2',
      description: 'Launch a virtual compute instance with restricted ingress firewall rules.',
      steps: [
        'Switch to the EC2 service view',
        'Click "Launch Instance"',
        'Specify an instance name (e.g., Secure-Bastion-Host)',
        'Select t3.micro instance type',
        'Confirm launch and check status changes to "running"'
      ],
      securityNotes: 'Restricting SSH port 22 to specific corporate IP CIDRs prevents brute-force credential stuffing attacks.',
      costNotes: 't2.micro / t3.micro instances offer 750 free hours per month under the 12-month AWS Free Tier.'
    },
    {
      id: 'lab-lambda-deploy',
      title: 'Lab 4: Deploy a Serverless Lambda Function',
      service: 'lambda',
      description: 'Create a stateless event-driven compute function with optimal memory allocation.',
      steps: [
        'Switch to the Lambda service view',
        'Click "Create Function"',
        'Enter function name: "orderProcessingEngine"',
        'Select runtime: "Node.js 20.x"',
        'Submit and view the deployed serverless function'
      ],
      securityNotes: 'Assign a dedicated IAM execution role granting access only to the specific DynamoDB tables required.',
      costNotes: 'AWS Lambda includes 1,000,000 free requests and 3,200,000 seconds of compute time every month indefinitely.'
    }
  ];

  const currentLab = guidedLabs.find(l => l.id === activeLabId);

  const resetSimulation = () => {
    if (window.confirm('Reset all simulated AWS resources back to initial lab defaults?')) {
      setSimState(defaultState);
      setLabProgress({});
      setLabFeedback('Simulation sandbox reset to default state.');
      setTimeout(() => setLabFeedback(null), 3000);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData({});
    setFormError('');
    setModalOpen(true);
  };

  const handleCreateResource = (e) => {
    e.preventDefault();
    setFormError('');

    if (activeService === 's3') {
      const name = (formData.bucketName || '').trim().toLowerCase();
      if (!name) {
        setFormError('Bucket name is required.');
        return;
      }
      if (!/^[a-z0-9.-]{3,63}$/.test(name)) {
        setFormError('Invalid S3 bucket name. Must be 3-63 characters, lowercase letters, numbers, hyphens, or dots.');
        return;
      }
      if (simState.s3.some(b => b.name === name)) {
        setFormError('Bucket name already exists globally. S3 bucket names must be globally unique.');
        return;
      }

      const newBucket = {
        name,
        region: activeRegion.split(' ')[0],
        publicAccess: formData.blockPublic !== false ? 'Blocked' : 'Objects can be public',
        objects: 0,
        date: new Date().toISOString().split('T')[0]
      };

      setSimState(prev => ({ ...prev, s3: [newBucket, ...prev.s3] }));
      setActionSuccess(`Successfully simulated creation of S3 bucket: ${name}`);
      if (onAwardXP) onAwardXP(25);
    } 
    else if (activeService === 'ec2') {
      const name = (formData.instanceName || '').trim();
      if (!name) {
        setFormError('Instance name is required.');
        return;
      }
      const randomId = 'i-0' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
      const newInst = {
        id: randomId,
        name,
        type: formData.instanceType || 't3.micro',
        state: 'running',
        ip: `54.${Math.floor(Math.random() * 200 + 20)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
        az: `${activeRegion.split(' ')[0]}a`
      };

      setSimState(prev => ({ ...prev, ec2: [newInst, ...prev.ec2] }));
      setActionSuccess(`Simulated EC2 instance ${name} (${randomId}) launched successfully!`);
      if (onAwardXP) onAwardXP(25);
    }
    else if (activeService === 'iam') {
      const name = (formData.roleName || '').trim();
      if (!name) {
        setFormError('IAM Role name is required.');
        return;
      }
      const newRole = {
        name,
        type: 'Role',
        trusted: formData.trustedService || 'ec2.amazonaws.com',
        policies: [formData.policy || 'AmazonS3ReadOnlyAccess']
      };

      setSimState(prev => ({ ...prev, iam: [newRole, ...prev.iam] }));
      setActionSuccess(`IAM Role ${name} created with assigned policy!`);
      if (onAwardXP) onAwardXP(25);
    }
    else if (activeService === 'lambda') {
      const name = (formData.funcName || '').trim();
      if (!name) {
        setFormError('Function name is required.');
        return;
      }
      const newFunc = {
        name,
        runtime: formData.runtime || 'Node.js 20.x',
        memory: '256 MB',
        timeout: '15s',
        lastModified: new Date().toISOString().split('T')[0]
      };

      setSimState(prev => ({ ...prev, lambda: [newFunc, ...prev.lambda] }));
      setActionSuccess(`Simulated AWS Lambda function ${name} deployed!`);
      if (onAwardXP) onAwardXP(25);
    }
    else {
      setActionSuccess(`Simulated resource created in ${activeService.toUpperCase()} service.`);
    }

    setModalOpen(false);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleDeleteResource = (serviceKey, identifierKey, idValue) => {
    setSimState(prev => ({
      ...prev,
      [serviceKey]: prev[serviceKey].filter(item => item[identifierKey] !== idValue)
    }));
    setActionSuccess(`Resource ${idValue} successfully terminated/deleted.`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Supported service tabs in the simulator
  const servicesList = [
    { id: 'ec2', name: 'EC2', category: 'Compute', icon: Server },
    { id: 's3', name: 'S3', category: 'Storage', icon: Database },
    { id: 'iam', name: 'IAM', category: 'Security', icon: Shield },
    { id: 'vpc', name: 'VPC', category: 'Networking', icon: Globe },
    { id: 'lambda', name: 'Lambda', category: 'Serverless', icon: Cpu },
    { id: 'rds', name: 'RDS', category: 'Database', icon: Database },
    { id: 'dynamodb', name: 'DynamoDB', category: 'Database', icon: Layers },
    { id: 'cloudwatch', name: 'CloudWatch', category: 'Management', icon: Bell },
    { id: 'cloudtrail', name: 'CloudTrail', category: 'Auditing', icon: Shield },
    { id: 'elb', name: 'Load Balancers', category: 'Networking', icon: Globe },
    { id: 'autoscaling', name: 'Auto Scaling', category: 'Compute', icon: RefreshCw },
    { id: 'route53', name: 'Route 53', category: 'Networking', icon: Globe },
    { id: 'cloudfront', name: 'CloudFront', category: 'Content Delivery', icon: Globe },
    { id: 'ecs', name: 'ECS / EKS', category: 'Containers', icon: Box },
    { id: 'beanstalk', name: 'Elastic Beanstalk', category: 'PaaS', icon: Layers },
    { id: 'cloudformation', name: 'CloudFormation', category: 'IaC', icon: Sliders },
    { id: 'ssm', name: 'Systems Manager', category: 'Operations', icon: Sliders },
    { id: 'budgets', name: 'AWS Budgets', category: 'Cost Management', icon: DollarSign }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* SIMULATOR NOTICE BANNER */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">AWS Educational Console Simulator</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 uppercase">
                Zero Cost Sandbox
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              This sandbox simulates AWS APIs locally for educational practice. <strong className="text-gray-200">No real AWS resources are created, and no charges are incurred.</strong>
            </p>
          </div>
        </div>

        <button
          onClick={resetSimulation}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-gray-300 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sandbox</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-lg text-xs flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {labFeedback && (
        <div className="bg-blue-500/15 border border-blue-500/40 text-blue-300 px-4 py-3 rounded-lg text-xs flex items-center gap-2 animate-fade-in shadow-md">
          <Info className="w-4 h-4 shrink-0" />
          <span>{labFeedback}</span>
        </div>
      )}

      {/* SIMULATED AWS CONSOLE TOPBAR */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Mock AWS Console Navigation Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>AWS Practice Console</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services, features, and docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 w-64 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Region Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-gray-300 font-mono text-[11px]">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{activeRegion}</span>
            </div>

            {/* Account Mock Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-gray-400 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Account: 1234-5678-9012 (Sandbox)</span>
            </div>
          </div>
        </div>

        {/* SIMULATOR BODY: Sidebar + Main Stage */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 min-h-[580px]">
          
          {/* Services Navigation Sidebar */}
          <div className="border-r border-slate-800 bg-slate-950/60 p-3 space-y-1 overflow-y-auto max-h-[700px]">
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Simulated Services ({servicesList.length})
            </div>

            {servicesList
              .filter(s => searchQuery ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
              .map(service => {
                const Icon = service.icon;
                const isActive = activeService === service.id;
                const count = Array.isArray(simState[service.id]) ? simState[service.id].length : 0;

                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                      <span>{service.name}</span>
                    </div>
                    {count > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-gray-400">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Service Workspace Area */}
          <div className="md:col-span-3 lg:col-span-4 p-6 space-y-6 bg-slate-900/50">
            
            {/* Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Amazon {activeService.toUpperCase()} Console</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 font-normal">
                    Region: {activeRegion.split(' ')[0]}
                  </span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Manage simulated {activeService.toUpperCase()} cloud resources and test operational configurations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenCreateModal}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create / Launch Resource</span>
                </button>
              </div>
            </div>

            {/* RESOURCE TABLE VIEW */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Active Resources in Sandbox ({Array.isArray(simState[activeService]) ? simState[activeService].length : 0})</span>
                <span className="text-[11px] text-gray-500 font-mono">Status: Healthy</span>
              </div>

              {/* EC2 Table */}
              {activeService === 'ec2' && (
                <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-gray-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Instance Name</th>
                        <th className="p-3">Instance ID</th>
                        <th className="p-3">Instance Type</th>
                        <th className="p-3">State</th>
                        <th className="p-3">Public IPv4</th>
                        <th className="p-3">Availability Zone</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-gray-300">
                      {simState.ec2.map(inst => (
                        <tr key={inst.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 font-semibold text-white">{inst.name}</td>
                          <td className="p-3 font-mono text-amber-400">{inst.id}</td>
                          <td className="p-3">{inst.type}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              {inst.state}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-blue-400">{inst.ip}</td>
                          <td className="p-3">{inst.az}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteResource('ec2', 'id', inst.id)}
                              className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                              title="Terminate Instance"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* S3 Table */}
              {activeService === 's3' && (
                <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-gray-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Bucket Name</th>
                        <th className="p-3">AWS Region</th>
                        <th className="p-3">Access</th>
                        <th className="p-3">Objects</th>
                        <th className="p-3">Creation Date</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-gray-300">
                      {simState.s3.map(b => (
                        <tr key={b.name} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 font-semibold text-white font-mono flex items-center gap-2">
                            <Database className="w-3.5 h-3.5 text-amber-400" />
                            <span>{b.name}</span>
                          </td>
                          <td className="p-3">{b.region}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              b.publicAccess === 'Blocked' 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}>
                              {b.publicAccess}
                            </span>
                          </td>
                          <td className="p-3">{b.objects} objects</td>
                          <td className="p-3 text-gray-400">{b.date}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteResource('s3', 'name', b.name)}
                              className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                              title="Delete Bucket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* IAM Table */}
              {activeService === 'iam' && (
                <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-gray-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Role Name</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Trusted Principal</th>
                        <th className="p-3">Attached Policies</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-gray-300">
                      {simState.iam.map(r => (
                        <tr key={r.name} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 font-semibold text-white font-mono">{r.name}</td>
                          <td className="p-3">{r.type}</td>
                          <td className="p-3 text-blue-400 font-mono">{r.trusted}</td>
                          <td className="p-3">
                            {r.policies.map((p, idx) => (
                              <span key={idx} className="inline-block px-2 py-0.5 rounded bg-slate-800 text-gray-300 mr-1 text-[10px]">
                                {p}
                              </span>
                            ))}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteResource('iam', 'name', r.name)}
                              className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                              title="Delete Role"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Generic Card View for Other Services */}
              {!['ec2', 's3', 'iam'].includes(activeService) && (
                <div className="space-y-3">
                  {Array.isArray(simState[activeService]) && simState[activeService].length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {simState[activeService].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">
                              {item.name || item.id || item.stack || item.zone || item.app || item.cluster || 'Resource'}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {item.status || item.state || 'Active'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 space-y-1 font-mono">
                            {Object.entries(item).map(([k, v]) => (
                              <div key={k} className="flex justify-between">
                                <span className="text-gray-500">{k}:</span>
                                <span className="text-gray-300">{String(v)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-gray-500 text-xs">
                      No simulated {activeService.toUpperCase()} resources currently active in this Region. Click "Create / Launch Resource" above to provision one.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* GUIDED LAB SCENARIO CHECKPOINT CARD */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Guided Hands-On Lab Walkthrough</span>
                </div>
                <select
                  value={activeLabId}
                  onChange={(e) => {
                    setActiveLabId(e.target.value);
                    const lab = guidedLabs.find(l => l.id === e.target.value);
                    if (lab) setActiveService(lab.service);
                  }}
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-gray-200 focus:outline-none"
                >
                  {guidedLabs.map(l => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
              </div>

              {currentLab && (
                <div className="space-y-4 text-xs">
                  <p className="text-gray-300">{currentLab.description}</p>
                  
                  {/* Step Checklist */}
                  <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                    <span className="font-semibold text-gray-400 block mb-1">Checklist Tasks:</span>
                    {currentLab.steps.map((step, idx) => {
                      const isDone = labProgress[`${currentLab.id}_${idx}`];
                      return (
                        <div
                          key={idx}
                          onClick={() => setLabProgress(prev => ({ ...prev, [`${currentLab.id}_${idx}`]: !isDone }))}
                          className="flex items-center gap-2.5 cursor-pointer text-gray-300 hover:text-white"
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-950'
                          }`}>
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={isDone ? 'line-through text-gray-500' : ''}>{step}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Security & Cost Guidance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-gray-300">
                      <span className="font-bold text-amber-400 block mb-0.5">🔒 Cloud Security Tip</span>
                      {currentLab.securityNotes}
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-gray-300">
                      <span className="font-bold text-blue-400 block mb-0.5">💰 Estimated AWS Cost</span>
                      {currentLab.costNotes}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* CREATE RESOURCE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Create Simulated {activeService.toUpperCase()} Resource</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
              
              {/* S3 Form */}
              {activeService === 's3' && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Bucket Name</label>
                    <input
                      type="text"
                      placeholder="e.g., my-cloud-lab-storage-2026"
                      value={formData.bucketName || ''}
                      onChange={(e) => setFormData({ ...formData, bucketName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-[11px] text-gray-500">Must be globally unique, 3-63 characters, lowercase letters and numbers only.</p>
                  </div>

                  <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-200">Block all public access</div>
                      <div className="text-[11px] text-gray-400">Recommended AWS security baseline</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.blockPublic !== false}
                      onChange={(e) => setFormData({ ...formData, blockPublic: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                  </div>
                </>
              )}

              {/* EC2 Form */}
              {activeService === 'ec2' && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Instance Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Web-Server-Dev-01"
                      value={formData.instanceName || ''}
                      onChange={(e) => setFormData({ ...formData, instanceName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Instance Type</label>
                    <select
                      value={formData.instanceType || 't3.micro'}
                      onChange={(e) => setFormData({ ...formData, instanceType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none"
                    >
                      <option value="t2.micro">t2.micro (1 vCPU, 1 GiB RAM - Free Tier)</option>
                      <option value="t3.micro">t3.micro (2 vCPU, 1 GiB RAM - Free Tier)</option>
                      <option value="t3.small">t3.small (2 vCPU, 2 GiB RAM)</option>
                      <option value="m5.large">m5.large (2 vCPU, 8 GiB RAM - General Purpose)</option>
                    </select>
                  </div>
                </>
              )}

              {/* IAM Form */}
              {activeService === 'iam' && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Role Name</label>
                    <input
                      type="text"
                      placeholder="e.g., EC2-S3-ReadWrite-Role"
                      value={formData.roleName || ''}
                      onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Trusted Service Principal</label>
                    <select
                      value={formData.trustedService || 'ec2.amazonaws.com'}
                      onChange={(e) => setFormData({ ...formData, trustedService: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none"
                    >
                      <option value="ec2.amazonaws.com">Amazon EC2 (ec2.amazonaws.com)</option>
                      <option value="lambda.amazonaws.com">AWS Lambda (lambda.amazonaws.com)</option>
                      <option value="ecs-tasks.amazonaws.com">Amazon ECS Tasks (ecs-tasks.amazonaws.com)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Permissions Policy</label>
                    <select
                      value={formData.policy || 'AmazonS3ReadOnlyAccess'}
                      onChange={(e) => setFormData({ ...formData, policy: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none"
                    >
                      <option value="AmazonS3ReadOnlyAccess">AmazonS3ReadOnlyAccess</option>
                      <option value="AmazonDynamoDBReadOnlyAccess">AmazonDynamoDBReadOnlyAccess</option>
                      <option value="AWSLambdaBasicExecutionRole">AWSLambdaBasicExecutionRole</option>
                      <option value="CloudWatchLogsFullAccess">CloudWatchLogsFullAccess</option>
                    </select>
                  </div>
                </>
              )}

              {/* Lambda Form */}
              {activeService === 'lambda' && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Function Name</label>
                    <input
                      type="text"
                      placeholder="e.g., processUserNotifications"
                      value={formData.funcName || ''}
                      onChange={(e) => setFormData({ ...formData, funcName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-medium">Runtime</label>
                    <select
                      value={formData.runtime || 'Node.js 20.x'}
                      onChange={(e) => setFormData({ ...formData, runtime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none"
                    >
                      <option value="Node.js 20.x">Node.js 20.x</option>
                      <option value="Python 3.12">Python 3.12</option>
                      <option value="Java 21">Java 21 (Corretto)</option>
                      <option value="Go (provided.al2023)">Go (Amazon Linux 2023)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Generic Form for others */}
              {!['ec2', 's3', 'iam', 'lambda'].includes(activeService) && (
                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">Resource Name / Identifier</label>
                  <input
                    type="text"
                    placeholder={`e.g., demo-${activeService}-resource`}
                    value={formData.resourceName || ''}
                    onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md"
                >
                  Simulate Create
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
