import React from 'react';
import { 
  FlaskConical, 
  Server, 
  ShieldCheck, 
  CreditCard, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Activity
} from 'lucide-react';

export const Hero = ({ onExploreLabs, onExploreServices, completedCount, totalCount }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-console-bg via-[#111827] to-console-bg border-b border-console-border py-16 sm:py-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 to-blue-500/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Supporting Text, CTA Buttons */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive AWS Simulation Sandbox</span>
              <span className="text-gray-500">|</span>
              <span className="text-emerald-400 font-mono">100% Risk-Free</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Master AWS Through <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Hands-On Practice
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Beginners and cloud engineers can learn real AWS services through guided, step-by-step labs in an isolated simulation environment. Launch EC2 instances, manage S3 storage, enforce IAM security, and deploy serverless architectures with zero credit card required and zero risk of unexpected AWS billing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreLabs}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm rounded-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-150 group"
              >
                <FlaskConical className="w-4 h-4 stroke-[2.5]" />
                <span>Explore Labs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-console-card hover:bg-console-hover text-gray-200 border border-console-border hover:border-gray-500 text-sm font-semibold rounded-lg transition-all duration-150"
              >
                <Server className="w-4 h-4 text-amber-400" />
                <span>Explore AWS Services</span>
              </button>
            </div>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-console-border/70 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>No AWS Bills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Step Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Real CLI & Console</span>
              </div>
            </div>

          </div>

          {/* Right Column: Simulated Terminal & Live Architecture Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card */}
              <div className="card shadow-2xl shadow-black/80 border-console-border overflow-hidden bg-console-nav">
                
                {/* Simulated Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#111622] border-b border-console-border">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="text-xs text-gray-400 font-mono ml-2">aws-cloud-shell ~ simulation</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    ONLINE
                  </span>
                </div>

                {/* Simulated CLI Terminal Output */}
                <div className="p-4 sm:p-5 font-mono text-xs text-gray-300 space-y-3 bg-[#0c1017]">
                  <div>
                    <span className="text-amber-400">cloud-trainee@aws-lab</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-gray-400">$ </span>
                    <span className="text-white">aws ec2 run-instances --instance-type t2.micro</span>
                  </div>

                  <div className="p-3 rounded bg-console-bg/90 border border-console-border text-gray-300 text-[11px] leading-relaxed">
                    <span className="text-emerald-400">✓ Instance Provisioned:</span> i-09a8bc4319fe12<br />
                    <span className="text-gray-400">• Service:</span> Amazon EC2 (Elastic Compute Cloud)<br />
                    <span className="text-gray-400">• Status:</span> <span className="text-emerald-400">running (2/2 checks passed)</span><br />
                    <span className="text-gray-400">• Security Group:</span> sg-08b291 (SSH:22, HTTP:80)<br />
                    <span className="text-gray-400">• Region:</span> ap-south-1 (Mumbai)
                  </div>

                  <div>
                    <span className="text-amber-400">cloud-trainee@aws-lab</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-gray-400">$ </span>
                    <span className="text-white">aws-practice-lab validate-lab --slug ec2-webserver</span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lab Validated! +100 XP awarded to your profile.</span>
                  </div>
                </div>

                {/* Micro Service Cards Row */}
                <div className="p-4 bg-console-card border-t border-console-border grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded bg-console-bg border border-console-border hover:border-amber-500/40 transition-colors">
                    <Server className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <div className="text-[10px] font-semibold text-gray-300">EC2</div>
                    <div className="text-[9px] text-gray-500">Virtual VM</div>
                  </div>
                  <div className="p-2 rounded bg-console-bg border border-console-border hover:border-emerald-500/40 transition-colors">
                    <Database className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <div className="text-[10px] font-semibold text-gray-300">S3</div>
                    <div className="text-[9px] text-gray-500">Storage</div>
                  </div>
                  <div className="p-2 rounded bg-console-bg border border-console-border hover:border-amber-500/40 transition-colors">
                    <Cpu className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <div className="text-[10px] font-semibold text-gray-300">Lambda</div>
                    <div className="text-[9px] text-gray-500">Serverless</div>
                  </div>
                  <div className="p-2 rounded bg-console-bg border border-console-border hover:border-cyan-500/40 transition-colors">
                    <Layers className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                    <div className="text-[10px] font-semibold text-gray-300">RDS</div>
                    <div className="text-[9px] text-gray-500">Database</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
