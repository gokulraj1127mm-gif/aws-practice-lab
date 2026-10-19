import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Calculator,
  ArrowRight,
  TrendingDown,
  Layers,
  Server,
  Database,
  Globe,
  ExternalLink,
  Info,
  ShieldCheck,
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import {
  pricingMetadata,
  regions,
  ec2InstanceTypes,
  rdsInstanceTypes,
  storagePricing,
  networkPricing,
  serverlessPricing
} from '../data/pricingData.js';

export const CostEstimator = () => {
  // Configuration for Architecture A (e.g. Traditional EC2 + RDS)
  const [archA, setArchA] = useState({
    region: 'us-east-1',
    ec2Type: 't3.micro',
    ec2Count: 2,
    ec2HoursPerMonth: 730,
    ebsGBPerInstance: 30,
    hasAlb: true,
    hasNatGateway: true,
    rdsType: 'db.t3.micro',
    rdsMultiAz: true,
    rdsStorageGB: 50,
    dataTransferGB: 100
  });

  // Configuration for Architecture B (e.g. Serverless API + DynamoDB)
  const [archB, setArchB] = useState({
    region: 'us-east-1',
    monthlyRequests: 5000000, // 5M requests
    lambdaMemoryMB: 256,
    lambdaDurationMs: 150,
    dynamodbReadUnits: 5,
    dynamodbWriteUnits: 5,
    s3StorageGB: 100,
    dataTransferGB: 100
  });

  // Calculation for Arch A
  const costA = useMemo(() => {
    const reg = regions.find(r => r.id === archA.region) || regions[0];
    const mult = reg.multiplier;

    // EC2
    const ec2 = ec2InstanceTypes.find(t => t.id === archA.ec2Type) || ec2InstanceTypes[0];
    const ec2Monthly = ec2.hourly * archA.ec2Count * archA.ec2HoursPerMonth * mult;

    // EBS
    const ebsMonthly = archA.ec2Count * archA.ebsGBPerInstance * storagePricing.ebsgp3PerGB * mult;

    // ALB
    const albMonthly = archA.hasAlb ? networkPricing.albHourly * 730 * mult : 0;

    // NAT Gateway
    const natMonthly = archA.hasNatGateway ? networkPricing.natGatewayHourly * 730 * mult : 0;

    // RDS
    const rds = rdsInstanceTypes.find(t => t.id === archA.rdsType) || rdsInstanceTypes[0];
    const rdsHourlyRate = archA.rdsMultiAz ? rds.hourlyMultiAz : rds.hourlySingle;
    const rdsComputeMonthly = rdsHourlyRate * 730 * mult;
    const rdsStorageMonthly = archA.rdsStorageGB * storagePricing.ebsgp3PerGB * mult * (archA.rdsMultiAz ? 2 : 1);
    const rdsMonthly = rdsComputeMonthly + rdsStorageMonthly;

    // Data Transfer Out
    const transferMonthly = archA.dataTransferGB * networkPricing.dataTransferOutPerGB;

    const totalMonthly = ec2Monthly + ebsMonthly + albMonthly + natMonthly + rdsMonthly + transferMonthly;
    const hourly = totalMonthly / 730;

    return {
      totalMonthly,
      hourly,
      breakdown: [
        { name: 'EC2 Instances', amount: ec2Monthly },
        { name: 'EBS Block Storage', amount: ebsMonthly },
        { name: 'Application Load Balancer', amount: albMonthly },
        { name: 'NAT Gateway', amount: natMonthly },
        { name: 'RDS Managed Database', amount: rdsMonthly },
        { name: 'Data Transfer Out', amount: transferMonthly }
      ]
    };
  }, [archA]);

  // Calculation for Arch B
  const costB = useMemo(() => {
    const reg = regions.find(r => r.id === archB.region) || regions[0];
    const mult = reg.multiplier;

    // API Gateway (HTTP APIs: $1.00 per million)
    const apiGatewayMonthly = (archB.monthlyRequests / 1000000) * serverlessPricing.apiGatewayPerMillion * mult;

    // Lambda (Duration in GB-s + Invocations)
    const requestCost = (archB.monthlyRequests / 1000000) * serverlessPricing.lambdaPerMillionRequests;
    const totalGBSeconds = archB.monthlyRequests * (archB.lambdaDurationMs / 1000) * (archB.lambdaMemoryMB / 1024);
    const computeCost = totalGBSeconds * serverlessPricing.lambdaPerGBSecond;
    const lambdaMonthly = (requestCost + computeCost) * mult;

    // DynamoDB (Provisioned RCU/WCU)
    // 1 RCU = $0.00013/hr, 1 WCU = $0.00065/hr
    const rcuMonthly = archB.dynamodbReadUnits * 0.00013 * 730;
    const wcuMonthly = archB.dynamodbWriteUnits * 0.00065 * 730;
    const dynamodbMonthly = (rcuMonthly + wcuMonthly) * mult;

    // S3 Standard
    const s3Monthly = archB.s3StorageGB * storagePricing.s3StandardPerGB * mult;

    // Data Transfer Out
    const transferMonthly = archB.dataTransferGB * networkPricing.dataTransferOutPerGB;

    const totalMonthly = apiGatewayMonthly + lambdaMonthly + dynamodbMonthly + s3Monthly + transferMonthly;
    const hourly = totalMonthly / 730;

    return {
      totalMonthly,
      hourly,
      breakdown: [
        { name: 'API Gateway', amount: apiGatewayMonthly },
        { name: 'AWS Lambda Compute', amount: lambdaMonthly },
        { name: 'DynamoDB Capacity', amount: dynamodbMonthly },
        { name: 'Amazon S3 Storage', amount: s3Monthly },
        { name: 'Data Transfer Out', amount: transferMonthly }
      ]
    };
  }, [archB]);

  const diffMonthly = Math.abs(costA.totalMonthly - costB.totalMonthly);
  const percentSaved = Math.round((diffMonthly / Math.max(costA.totalMonthly, costB.totalMonthly)) * 100);
  const cheaperIsB = costB.totalMonthly < costA.totalMonthly;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      
      {/* Banner & Disclaimer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Architectural Trade-Off & Cost Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AWS Educational Architecture Cost Estimator
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Compare Traditional Tiered IaaS against Modern Serverless Cloud Native architectures side-by-side.
            </p>
          </div>

          <div className="text-xs text-gray-400 p-3 bg-slate-950 rounded-lg border border-slate-800 max-w-xs space-y-1 font-mono text-[11px]">
            <div><strong>Source:</strong> {pricingMetadata.source}</div>
            <div><strong>Verified:</strong> {pricingMetadata.lastVerified}</div>
            <div className="text-amber-400">Notice: Illustrative estimates. Not an AWS invoice.</div>
          </div>
        </div>
      </div>

      {/* Comparison Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Option A: Traditional IaaS</span>
          <div className="text-3xl font-black text-white font-mono">
            ${costA.totalMonthly.toFixed(2)}<span className="text-sm font-normal text-gray-400">/mo</span>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            ~${costA.hourly.toFixed(4)} per hour
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Option B: Serverless Native</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            ${costB.totalMonthly.toFixed(2)}<span className="text-sm font-normal text-gray-400">/mo</span>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            ~${costB.hourly.toFixed(4)} per hour
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-2 shadow-lg flex flex-col justify-center">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" />
            <span>Economic Trade-Off</span>
          </div>
          <div className="text-2xl font-black text-white">
            {cheaperIsB ? `Serverless saves ~${percentSaved}%` : `IaaS saves ~${percentSaved}%`}
          </div>
          <p className="text-[11px] text-gray-400">
            Difference of ${diffMonthly.toFixed(2)}/mo based on your specified traffic and uptime parameters.
          </p>
        </div>
      </div>

      {/* DETAILED INTERACTIVE MODELING COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ARCHITECTURE A: Traditional IaaS Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Architecture A (EC2 + ALB + RDS)</span>
            </h2>
            <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold">
              ${costA.totalMonthly.toFixed(2)} / mo
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Region */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Target AWS Region</label>
              <select
                value={archA.region}
                onChange={(e) => setArchA({ ...archA, region: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
              >
                {regions.map(r => (
                  <option key={r.id} value={r.id}>{r.name} (multiplier: {r.multiplier}x)</option>
                ))}
              </select>
            </div>

            {/* EC2 Instance Type & Count */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">EC2 Instance Size</label>
                <select
                  value={archA.ec2Type}
                  onChange={(e) => setArchA({ ...archA, ec2Type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                >
                  {ec2InstanceTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Instance Count</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={archA.ec2Count}
                  onChange={(e) => setArchA({ ...archA, ec2Count: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                />
              </div>
            </div>

            {/* EBS Storage */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">EBS gp3 Storage per Instance (GB)</label>
              <input
                type="number"
                min="20"
                max="2000"
                value={archA.ebsGBPerInstance}
                onChange={(e) => setArchA({ ...archA, ebsGBPerInstance: Math.max(20, parseInt(e.target.value) || 20) })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
              />
            </div>

            {/* RDS Instance */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">RDS Database Engine Size</label>
                <select
                  value={archA.rdsType}
                  onChange={(e) => setArchA({ ...archA, rdsType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                >
                  {rdsInstanceTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">RDS Storage (GB)</label>
                <input
                  type="number"
                  min="20"
                  max="5000"
                  value={archA.rdsStorageGB}
                  onChange={(e) => setArchA({ ...archA, rdsStorageGB: Math.max(20, parseInt(e.target.value) || 20) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Toggles: Multi-AZ, ALB, NAT Gateway */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between text-gray-300 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                <span>RDS Multi-AZ Deployment (High Availability)</span>
                <input
                  type="checkbox"
                  checked={archA.rdsMultiAz}
                  onChange={(e) => setArchA({ ...archA, rdsMultiAz: e.target.checked })}
                  className="w-4 h-4 accent-amber-500"
                />
              </label>

              <label className="flex items-center justify-between text-gray-300 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                <span>Application Load Balancer ($0.0225/hr)</span>
                <input
                  type="checkbox"
                  checked={archA.hasAlb}
                  onChange={(e) => setArchA({ ...archA, hasAlb: e.target.checked })}
                  className="w-4 h-4 accent-amber-500"
                />
              </label>

              <label className="flex items-center justify-between text-gray-300 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                <span>VPC NAT Gateway for Private Subnets ($0.045/hr)</span>
                <input
                  type="checkbox"
                  checked={archA.hasNatGateway}
                  onChange={(e) => setArchA({ ...archA, hasNatGateway: e.target.checked })}
                  className="w-4 h-4 accent-amber-500"
                />
              </label>
            </div>

            {/* Cost Breakdown Table */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono text-[11px]">
              <span className="font-bold text-gray-400 block mb-1">Monthly Cost Breakdown:</span>
              {costA.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-300">
                  <span>{item.name}:</span>
                  <span className="text-amber-400 font-bold">${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ARCHITECTURE B: Serverless Native Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Architecture B (Serverless API + DynamoDB)</span>
            </h2>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              ${costB.totalMonthly.toFixed(2)} / mo
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Region */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Target AWS Region</label>
              <select
                value={archB.region}
                onChange={(e) => setArchB({ ...archB, region: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
              >
                {regions.map(r => (
                  <option key={r.id} value={r.id}>{r.name} (multiplier: {r.multiplier}x)</option>
                ))}
              </select>
            </div>

            {/* Monthly API Requests */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Monthly API Requests</label>
              <select
                value={archB.monthlyRequests}
                onChange={(e) => setArchB({ ...archB, monthlyRequests: parseInt(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
              >
                <option value={500000}>500,000 requests / month</option>
                <option value={1000000}>1,000,000 requests / month</option>
                <option value={5000000}>5,000,000 requests / month</option>
                <option value={20000000}>20,000,000 requests / month</option>
                <option value={50000000}>50,000,000 requests / month</option>
              </select>
            </div>

            {/* Lambda Memory & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Lambda Allocated Memory</label>
                <select
                  value={archB.lambdaMemoryMB}
                  onChange={(e) => setArchB({ ...archB, lambdaMemoryMB: parseInt(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                >
                  <option value={128}>128 MB (Microservice)</option>
                  <option value={256}>256 MB (Standard)</option>
                  <option value={512}>512 MB (Fast runtime)</option>
                  <option value={1024}>1024 MB (Heavy compute)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Average Execution Duration</label>
                <select
                  value={archB.lambdaDurationMs}
                  onChange={(e) => setArchB({ ...archB, lambdaDurationMs: parseInt(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                >
                  <option value={50}>50 ms (Cache hit)</option>
                  <option value={150}>150 ms (Average REST)</option>
                  <option value={500}>500 ms (Database query)</option>
                  <option value={1000}>1000 ms (Complex processing)</option>
                </select>
              </div>
            </div>

            {/* DynamoDB Provisioned Units */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">DynamoDB Read Units (RCU)</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={archB.dynamodbReadUnits}
                  onChange={(e) => setArchB({ ...archB, dynamodbReadUnits: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">DynamoDB Write Units (WCU)</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={archB.dynamodbWriteUnits}
                  onChange={(e) => setArchB({ ...archB, dynamodbWriteUnits: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
                />
              </div>
            </div>

            {/* S3 Storage */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Amazon S3 Asset Storage (GB)</label>
              <input
                type="number"
                min="10"
                max="5000"
                value={archB.s3StorageGB}
                onChange={(e) => setArchB({ ...archB, s3StorageGB: Math.max(10, parseInt(e.target.value) || 10) })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-gray-200 focus:outline-none"
              />
            </div>

            {/* Cost Breakdown Table */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono text-[11px]">
              <span className="font-bold text-gray-400 block mb-1">Monthly Cost Breakdown:</span>
              {costB.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-300">
                  <span>{item.name}:</span>
                  <span className="text-emerald-400 font-bold">${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FinOps Strategic Guidance & Official Tools */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400" />
          <span>FinOps Architectural Guidance & Key Takeaways</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">Idle Capacity Penalty</span>
            <p className="text-gray-400 leading-relaxed">
              Traditional EC2 and RDS instances charge for 100% of provisioned hours even during zero-traffic night hours. Serverless scales to absolute zero when idle.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">High-Throughput Crossover</span>
            <p className="text-gray-400 leading-relaxed">
              When request volume reaches tens of millions of continuous hits/second, dedicated EC2 instances with Compute Savings Plans often become more economical than per-request Lambda pricing.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">Hidden Network Fees</span>
            <p className="text-gray-400 leading-relaxed">
              VPC NAT Gateways and inter-AZ data transfer fees are significant cost drivers in enterprise setups. PrivateLink interface endpoints can reduce NAT processing charges.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-wrap gap-2 text-xs">
          <span className="text-gray-400">Need production AWS price modeling with custom billing terms?</span>
          <a
            href="https://calculator.aws/"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>Open Official AWS Pricing Calculator (calculator.aws)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
};
