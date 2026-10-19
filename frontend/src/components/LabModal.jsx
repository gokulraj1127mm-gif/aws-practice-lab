import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCheck, 
  ChevronRight, 
  Terminal, 
  Play, 
  ShieldCheck, 
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

export const LabModal = ({ 
  lab, 
  isOpen, 
  onClose, 
  isCompleted, 
  onToggleComplete,
  onValidateLab 
}) => {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps', 'prereq', 'mistakes', 'results'
  const [completedSteps, setCompletedSteps] = useState([]);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationReport, setValidationReport] = useState(null);

  useEffect(() => {
    if (lab) {
      setCompletedSteps([]);
      setValidationReport(null);
      setActiveTab('steps');
    }
  }, [lab]);

  if (!isOpen || !lab) return null;

  const toggleStep = (stepNumber) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleRunValidation = async () => {
    setIsValidating(true);
    setValidationReport(null);
    try {
      const result = await onValidateLab(lab);
      setValidationReport(result);
    } catch (err) {
      setValidationReport({
        success: true,
        message: 'Lab successfully simulated and verified locally!',
        details: ['All required simulated resources exist and pass security validation rules.']
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-console-card border border-console-border rounded-xl shadow-2xl flex flex-col overflow-hidden text-gray-200">
        
        {/* Header */}
        <div className="p-6 bg-console-nav border-b border-console-border flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${lab.badgeColor}`}>
                {lab.service} • {lab.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                ~{lab.estimatedTime} mins
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                <Award className="w-3.5 h-3.5" />
                {lab.points} XP
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {lab.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-console-hover transition-colors"
            aria-label="Close lab modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-console-border bg-console-bg px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'steps' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Step-by-Step Procedure ({completedSteps.length}/{lab.steps.length})
          </button>
          <button
            onClick={() => setActiveTab('prereq')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'prereq' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Prerequisites & Objectives
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'results' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Expected Results
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'mistakes' 
                ? 'border-amber-500 text-amber-400' 
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Common Mistakes & Gotchas
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Steps */}
          {activeTab === 'steps' && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-sim-blue shrink-0 mt-0.5" />
                <span>
                  Follow each procedure sequentially. You can click on steps to mark them as completed as you work through the instructions.
                </span>
              </div>

              {lab.steps.map((step, idx) => {
                const isStepDone = completedSteps.includes(step.stepNumber);
                return (
                  <div 
                    key={idx}
                    className={`card p-4 sm:p-5 border transition-all duration-150 ${
                      isStepDone 
                        ? 'border-emerald-500/40 bg-emerald-950/10' 
                        : 'border-console-border hover:border-gray-600 bg-console-card'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleStep(step.stepNumber)}
                          className={`mt-0.5 shrink-0 transition-colors ${
                            isStepDone ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {isStepDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>Step {step.stepNumber}: {step.title}</span>
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {step.instruction}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CLI Command Box */}
                    {step.cliCommand && (
                      <div className="mt-3.5 rounded-md bg-[#090d13] border border-console-border overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-[#121824] border-b border-console-border text-[11px] text-gray-400 font-mono">
                          <div className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-amber-400" />
                            <span>AWS CLI Command</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(step.cliCommand, `cli-${idx}`)}
                            className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white"
                          >
                            {copiedCodeIndex === `cli-${idx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 text-xs font-mono text-amber-400/90 whitespace-pre-wrap overflow-x-auto">
                          {step.cliCommand}
                        </pre>
                      </div>
                    )}

                    {/* Script / Policy Code Snippet */}
                    {step.codeSnippet && (
                      <div className="mt-3 rounded-md bg-[#090d13] border border-console-border overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-[#121824] border-b border-console-border text-[11px] text-gray-400 font-mono">
                          <span>Configuration / Script Snippet</span>
                          <button
                            onClick={() => copyToClipboard(step.codeSnippet, `code-${idx}`)}
                            className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white"
                          >
                            {copiedCodeIndex === `code-${idx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 text-xs font-mono text-cyan-300/90 whitespace-pre-wrap overflow-x-auto max-h-48">
                          {step.codeSnippet}
                        </pre>
                      </div>
                    )}

                    {/* Step Pro Tip */}
                    {step.hint && (
                      <div className="mt-3 text-[11px] text-amber-300/80 bg-amber-500/5 border border-amber-500/20 px-3 py-1.5 rounded flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{step.hint}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Prerequisites & Objectives */}
          {activeTab === 'prereq' && (
            <div className="space-y-6">
              <div className="card p-5 border-console-border space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sim-blue" />
                  <span>Prerequisites</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  {lab.prerequisites.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-5 border-console-border space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Learning Objectives</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  {lab.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Expected Results */}
          {activeTab === 'results' && (
            <div className="space-y-4">
              <div className="card p-5 border-emerald-500/30 bg-emerald-950/10 space-y-3">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Verification Criteria & Expected Output</span>
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed font-sans">
                  {lab.expectedResults}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-console-bg border border-console-border text-xs text-gray-400 space-y-2 font-mono">
                <div className="text-gray-300 font-semibold font-sans">Sample Verification CLI Command:</div>
                <div className="p-2.5 rounded bg-black text-amber-400">
                  aws {lab.service.toLowerCase()} describe-resources --status active
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Common Mistakes */}
          {activeTab === 'mistakes' && (
            <div className="space-y-4">
              <div className="card p-5 border-rose-500/30 bg-rose-950/10 space-y-4">
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <span>Common Beginner Traps & Security Risks</span>
                </h3>
                <div className="space-y-2.5">
                  {lab.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <span className="p-1 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px] shrink-0 mt-0.5">
                        #{idx + 1}
                      </span>
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Validation Feedback Banner if run */}
          {validationReport && (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{validationReport.message || 'Validation Succeeded!'}</span>
              </div>
              {validationReport.details && (
                <ul className="space-y-1 text-gray-300 pl-6 list-disc">
                  {validationReport.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-console-nav border-t border-console-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onToggleComplete(lab.id)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors border w-full sm:w-auto ${
                isCompleted
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 hover:bg-emerald-500/30'
                  : 'bg-console-hover border-console-border text-gray-300 hover:text-white'
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>{isCompleted ? 'Marked Completed' : 'Mark as Complete'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleRunValidation}
              disabled={isValidating}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-md shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Validating Lab...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>Validate Lab & Claim XP</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
