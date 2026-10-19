import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  Clock, 
  Copy, 
  Check, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { resourcesData } from '../data/resourcesData';

export const ResourcesSection = () => {
  const [activeSection, setActiveSection] = useState('docs'); // 'docs', 'guides', 'security', 'troubleshooting', 'cli'
  const [copiedCliIndex, setCopiedCliIndex] = useState(null);
  const [expandedTroubleshoot, setExpandedTroubleshoot] = useState({});

  const toggleTroubleshoot = (index) => {
    setExpandedTroubleshoot(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyCliCommand = (cmd, index) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCliIndex(index);
    setTimeout(() => setCopiedCliIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cloud Architect Knowledge Base</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          AWS Documentation & Learning Resources
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          Essential architectural whitepapers, Well-Architected Framework guides, cloud security guidelines, and real-world troubleshooting playbooks.
        </p>
      </div>

      {/* Resource Category Selector */}
      <div className="card p-2 border-console-border flex flex-wrap items-center justify-center gap-1.5 bg-console-card">
        <button
          onClick={() => setActiveSection('docs')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
            activeSection === 'docs' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow' 
              : 'text-gray-400 hover:text-white hover:bg-console-hover'
          }`}
        >
          Official Documentation ({resourcesData.documentationLinks.length})
        </button>
        <button
          onClick={() => setActiveSection('guides')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
            activeSection === 'guides' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow' 
              : 'text-gray-400 hover:text-white hover:bg-console-hover'
          }`}
        >
          Learning Roadmaps ({resourcesData.learningGuides.length})
        </button>
        <button
          onClick={() => setActiveSection('security')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
            activeSection === 'security' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow' 
              : 'text-gray-400 hover:text-white hover:bg-console-hover'
          }`}
        >
          Security Best Practices ({resourcesData.securityBestPractices.length})
        </button>
        <button
          onClick={() => setActiveSection('troubleshooting')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
            activeSection === 'troubleshooting' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow' 
              : 'text-gray-400 hover:text-white hover:bg-console-hover'
          }`}
        >
          Troubleshooting Playbooks ({resourcesData.troubleshootingTips.length})
        </button>
        <button
          onClick={() => setActiveSection('cli')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
            activeSection === 'cli' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow' 
              : 'text-gray-400 hover:text-white hover:bg-console-hover'
          }`}
        >
          CLI Cheat Sheet
        </button>
      </div>

      {/* SECTION 1: Official Documentation */}
      {activeSection === 'docs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
          {resourcesData.documentationLinks.map((doc, idx) => (
            <div key={idx} className="card p-5 border-console-border hover:border-amber-500/40 transition-colors flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-console-bg text-amber-400 border border-console-border">
                    {doc.category}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {doc.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-console-border flex items-center justify-end">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Open Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: Learning Guides & Roadmaps */}
      {activeSection === 'guides' && (
        <div className="space-y-6 animate-fade-in">
          {resourcesData.learningGuides.map((guide, idx) => (
            <div key={idx} className="card p-6 border-console-border space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-sim-blue border border-blue-500/30">
                    {guide.level}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">
                {guide.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {guide.summary}
              </p>

              <div className="p-4 rounded-lg bg-console-bg border border-console-border space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                  Actionable Key Takeaways:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {guide.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: Security Best Practices */}
      {activeSection === 'security' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              These rules directly reflect the Security Pillar of the AWS Well-Architected Framework and foundational cloud compliance controls.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {resourcesData.securityBestPractices.map((sec, idx) => (
              <div key={idx} className="card p-5 border-console-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    Domain: <span className="text-gray-200 font-medium">{sec.category}</span>
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                    sec.priority === 'Critical' 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {sec.priority} Priority
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {sec.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Troubleshooting Playbooks */}
      {activeSection === 'troubleshooting' && (
        <div className="space-y-4 animate-fade-in">
          {resourcesData.troubleshootingTips.map((tip, idx) => {
            const isExpanded = expandedTroubleshoot[idx] ?? true;
            return (
              <div key={idx} className="card border-console-border overflow-hidden">
                <div 
                  onClick={() => toggleTroubleshoot(idx)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-console-hover/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    <h3 className="text-sm font-bold text-white">
                      {tip.problem}
                    </h3>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-console-border/60 bg-console-bg/50 space-y-3.5 text-xs animate-fade-in">
                    <div>
                      <span className="font-semibold text-rose-400 uppercase tracking-wider text-[11px] block mb-1">
                        Root Causes:
                      </span>
                      <ul className="space-y-1 text-gray-300 pl-4 list-disc">
                        {tip.causes.map((c, cIdx) => (
                          <li key={cIdx}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block mb-1">
                        Recommended Resolution:
                      </span>
                      <p className="leading-relaxed text-gray-200">
                        {tip.solution}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 5: CLI Cheat Sheet */}
      {activeSection === 'cli' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-purple-400 shrink-0" />
            <span>
              Quick copy-paste AWS CLI commands for frequent infrastructure operations in bash or PowerShell.
            </span>
          </div>

          <div className="card divide-y divide-console-border overflow-hidden">
            {resourcesData.cliCheatSheet.map((item, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-console-hover/40 transition-colors">
                <div className="space-y-1 max-w-xl">
                  <div className="text-xs text-gray-400 font-medium">
                    {item.description}
                  </div>
                  <pre className="text-xs font-mono text-amber-400 bg-black/60 px-3 py-1.5 rounded border border-console-border whitespace-pre-wrap">
                    {item.command}
                  </pre>
                </div>

                <button
                  onClick={() => copyCliCommand(item.command, idx)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-console-bg hover:bg-console-hover border border-console-border rounded text-xs text-gray-300 hover:text-white shrink-0"
                >
                  {copiedCliIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
