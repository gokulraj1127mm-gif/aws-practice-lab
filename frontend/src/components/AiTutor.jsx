import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sliders
} from 'lucide-react';
import api from '../services/api';

export const AiTutor = ({ onNavigateToQuiz }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'tutor',
      text: 'Hello! I am your AWS Practice Lab Cloud Architecture & Troubleshooting Tutor. Ask me any conceptual question, error diagnosis (e.g. S3 403 Forbidden, EC2 Port 22 Timeout), or architectural pattern inquiry.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      meta: {
        provider: 'Curated AWS Technical Knowledge Engine (Verified AWS Architecture Patterns)',
        isGenerativeAi: false
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate'); // 'beginner' | 'intermediate' | 'advanced'
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    'How do I fix S3 403 Access Denied?',
    'Troubleshoot EC2 SSH Connection Timeout on port 22',
    'Explain IAM least-privilege role delegation',
    'How do I minimize AWS Lambda cold starts in production?',
    'Explain public vs private subnet routing in a VPC'
  ];

  const handleSend = async (queryText = inputQuery) => {
    const q = (queryText || '').trim();
    if (!q || isLoading) return;

    const userMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: q,
      difficulty,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Send query to backend tutor endpoint via configured API client
      const response = await api.post('/tutor/ask', {
        message: q,
        difficulty
      });

      const data = response?.data || response;
      const botMsg = {
        id: 'tutor_' + Date.now(),
        sender: 'tutor',
        text: data.explanation || 'Response received.',
        diagnosticSteps: data.diagnosticSteps || [],
        followUpQuestions: data.followUpQuestions || [],
        relatedQuizId: data.relatedQuizId,
        docsUrl: data.docsUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: {
          provider: data.provider || 'Curated AWS Technical Knowledge Engine',
          isGenerativeAi: data.isGenerativeAi || false,
          topic: data.topic
        }
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      // Graceful local fallback if backend is unreachable
      const fallbackMsg = {
        id: 'tutor_' + Date.now(),
        sender: 'tutor',
        text: `Regarding your query "${q}": In AWS cloud engineering, always follow Well-Architected principles. Ensure least-privilege security group firewalls, enable multi-AZ high availability, and inspect CloudWatch log streams for stack traces.`,
        diagnosticSteps: [
          'Verify Security Group ingress/egress rules and route tables',
          'Inspect CloudTrail Event History for failed API calls',
          'Review AWS Service Quotas in your current region'
        ],
        followUpQuestions: ['Which specific AWS service or error message are you experiencing?'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: {
          provider: 'Local Offline Knowledge Engine (Backend Standby Mode)',
          isGenerativeAi: false
        }
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      
      {/* Tutor Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5" />
              <span>AWS Technical Architecture & Diagnostic Tutor</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Interactive Cloud Concepts & Troubleshooting Engine
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Receive structured conceptual breakdowns, error diagnostics, and recommended practice tasks.
            </p>
          </div>

          {/* Difficulty Level Selector */}
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Explanation Depth:
            </span>
            <div className="flex items-center gap-1">
              {['beginner', 'intermediate', 'advanced'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`px-2.5 py-1 rounded text-xs capitalize transition-colors font-medium ${
                    difficulty === lvl
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shrink-0 shadow-md mt-1">
                    <Bot className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-xl p-4 text-xs space-y-2.5 shadow-md ${
                  isUser
                    ? 'bg-amber-500 text-slate-950 font-medium'
                    : 'bg-slate-950 border border-slate-800 text-gray-200'
                }`}>
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 pb-1 border-b border-black/10">
                    <span className="font-semibold uppercase tracking-wider">
                      {isUser ? 'You' : 'AWS Practice Lab Tutor'}
                    </span>
                    <span>{m.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-line leading-relaxed text-[13px]">
                    {m.text}
                  </p>

                  {/* Diagnostic Steps if present */}
                  {!isUser && m.diagnosticSteps && m.diagnosticSteps.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="font-bold text-amber-400 block text-[11px]">Recommended Diagnostic Steps:</span>
                      <ul className="space-y-1 pl-4 list-disc text-gray-300 text-[11px]">
                        {m.diagnosticSteps.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Follow-up / Related Links */}
                  {!isUser && (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      {m.meta?.provider && (
                        <span className="text-gray-400 italic">Engine: {m.meta.provider}</span>
                      )}

                      <div className="flex items-center gap-2">
                        {m.docsUrl && (
                          <a
                            href={m.docsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                          >
                            <span>AWS Docs</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {m.relatedQuizId && onNavigateToQuiz && (
                          <button
                            onClick={() => onNavigateToQuiz(m.relatedQuizId)}
                            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                          >
                            <span>Take Quiz</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-gray-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 animate-pulse pl-11">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing technical knowledge base and synthesizing architecture explanation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-gray-500 shrink-0 font-medium">Quick Prompts:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-300 hover:text-white shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <input
            type="text"
            placeholder={`Ask a question in ${difficulty} language (e.g. How does DynamoDB partition keys work?)...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
