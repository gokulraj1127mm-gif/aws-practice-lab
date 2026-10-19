import React from 'react';
import { Cloud, ShieldCheck, Heart, Terminal, BookOpen, ExternalLink } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-console-nav border-t border-console-border text-gray-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold">
                <Cloud className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span>AWS Practice Lab</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Interactive cloud engineering education platform. Practice real architectures safely without cloud bills or credit card commitments.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Simulation Engine v1.0.0 Active</span>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              Practice Domains
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">Amazon EC2 (Compute)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">Amazon S3 (Storage)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">AWS IAM (Security & MFA)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">Amazon VPC (Networking)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">AWS Lambda (Serverless)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">Amazon RDS (Databases)</button></li>
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              Learning Tracks
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('labs')} className="hover:text-amber-400 transition-colors">Hands-On Labs Catalog</button></li>
              <li><button onClick={() => onNavigate('quizzes')} className="hover:text-amber-400 transition-colors">Certification Mock Quizzes</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-amber-400 transition-colors">Well-Architected Framework</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-amber-400 transition-colors">Cloud Troubleshooting Playbooks</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-amber-400 transition-colors">AWS CLI Command Reference</button></li>
            </ul>
          </div>

          {/* Legal / Disclaimer */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              Educational Notice
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              AWS Practice Lab is an independent open educational simulation tool. It is not affiliated with, endorsed, or sponsored by Amazon Web Services, Inc.
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Amazon Web Services, AWS, EC2, S3, RDS, Lambda, VPC, and CloudWatch are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-console-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} AWS Practice Lab • Hands-on Cloud Education Sandbox
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => onNavigate('home')} className="hover:text-gray-300">Home</button>
            <span>•</span>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-gray-300">Dashboard</button>
            <span>•</span>
            <button onClick={() => onNavigate('labs')} className="hover:text-gray-300">Labs</button>
            <span>•</span>
            <button onClick={() => onNavigate('resources')} className="hover:text-gray-300">Resources</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
