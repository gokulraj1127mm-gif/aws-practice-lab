import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Timer,
  Flag,
  Filter,
  BarChart2,
  BookOpen,
  AlertTriangle,
  Play,
  Check,
  Layers,
  History,
  Info
} from 'lucide-react';
import { allQuizzes, getQuizById, getAllQuestions } from '../data/quizzes/index.js';

export const QuizzesSection = ({ onAwardXP }) => {
  // Navigation & Config state
  const [selectedServiceId, setSelectedServiceId] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' | 'exam'
  const [isExamActive, setIsExamActive] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  
  // Active test state
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showPracticeFeedback, setShowPracticeFeedback] = useState({}); // { [questionId]: boolean }
  
  // Timer state (for exam mode)
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for exam
  const [timerRunning, setTimerRunning] = useState(false);

  // Filter mode for review
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'incorrect' | 'flagged'

  // History state
  const [attemptHistory, setAttemptHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('aws_lab_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Services list for dropdown
  const serviceOptions = useMemo(() => [
    { id: 'all', label: 'All 20 AWS Core Services (Full Exam Bank)' },
    ...allQuizzes.map(q => ({ id: q.id, label: q.service }))
  ], []);

  // Filter and prepare questions when test starts
  const startQuiz = (mode = quizMode, customQuestions = null) => {
    let pool = [];
    if (customQuestions) {
      pool = customQuestions;
    } else {
      if (selectedServiceId === 'all') {
        pool = getAllQuestions();
      } else {
        const found = getQuizById(selectedServiceId);
        pool = found ? found.questions.map(q => ({ ...q, serviceId: found.id, serviceName: found.service })) : [];
      }

      if (selectedDifficulty !== 'all') {
        pool = pool.filter(q => q.level.toLowerCase() === selectedDifficulty.toLowerCase());
      }
    }

    // If pool is large in 'all', cap to 25 questions for manageable session or take all if specific
    let selected = [...pool];
    // Shuffle slightly for variance
    selected = selected.sort(() => 0.5 - Math.random());
    if (selectedServiceId === 'all' && selected.length > 25) {
      selected = selected.slice(0, 25);
    }

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setShowPracticeFeedback({});
    setIsExamActive(true);
    setExamSubmitted(false);
    setReviewFilter('all');

    // Timer setup: 75 seconds per question in exam mode
    const duration = Math.max(300, selected.length * 75);
    setTimeLeft(duration);
    setTimerRunning(mode === 'exam');
    setQuizMode(mode);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0 && !examSubmitted) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(interval);
            handleAutoSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, examSubmitted]);

  const handleAutoSubmit = () => {
    submitQuiz();
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (examSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    if (quizMode === 'practice') {
      setShowPracticeFeedback(prev => ({
        ...prev,
        [questionId]: true
      }));
    }
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const submitQuiz = () => {
    setTimerRunning(false);
    setExamSubmitted(true);

    // Calculate score
    let correct = 0;
    const topicBreakdown = {};

    activeQuestions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correct;
      if (isCorrect) correct++;

      const sName = q.serviceName || q.serviceId || 'General';
      if (!topicBreakdown[sName]) {
        topicBreakdown[sName] = { total: 0, correct: 0 };
      }
      topicBreakdown[sName].total++;
      if (isCorrect) topicBreakdown[sName].correct++;
    });

    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = percentage >= 70;

    // Award XP if passed
    if (passed && onAwardXP) {
      onAwardXP(percentage >= 90 ? 150 : 100);
    }

    // Save attempt to history
    const record = {
      id: 'att_' + Date.now(),
      date: new Date().toISOString(),
      service: selectedServiceId === 'all' ? 'Comprehensive Mixed Exam' : activeQuestions[0]?.serviceName || 'Service Exam',
      mode: quizMode,
      total,
      correct,
      percentage,
      passed,
      topicBreakdown
    };

    const newHistory = [record, ...attemptHistory].slice(0, 30);
    setAttemptHistory(newHistory);
    try {
      localStorage.setItem('aws_lab_quiz_history', JSON.stringify(newHistory));
    } catch (e) {
      console.error(e);
    }

    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const currentQ = activeQuestions[currentIndex];

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  // Score statistics
  const scoreStats = useMemo(() => {
    if (!examSubmitted) return null;
    let correct = 0;
    const incorrectList = [];
    const topicAnalysis = {};

    activeQuestions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correct;
      if (isCorrect) correct++;
      else incorrectList.push(q);

      const topic = q.serviceName || 'General';
      if (!topicAnalysis[topic]) topicAnalysis[topic] = { total: 0, correct: 0 };
      topicAnalysis[topic].total++;
      if (isCorrect) topicAnalysis[topic].correct++;
    });

    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, total, percentage, incorrectList, topicAnalysis };
  }, [examSubmitted, activeQuestions, userAnswers]);

  // Retry incorrect questions
  const retryIncorrect = () => {
    if (scoreStats && scoreStats.incorrectList.length > 0) {
      startQuiz('practice', scoreStats.incorrectList);
    }
  };

  // Filtered review questions
  const displayedQuestions = useMemo(() => {
    if (!examSubmitted) return activeQuestions;
    if (reviewFilter === 'incorrect') {
      return activeQuestions.filter(q => userAnswers[q.id] !== q.correct);
    }
    if (reviewFilter === 'flagged') {
      return activeQuestions.filter(q => flaggedQuestions.has(q.id));
    }
    return activeQuestions;
  }, [examSubmitted, reviewFilter, activeQuestions, userAnswers, flaggedQuestions]);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Platform Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>400 Validated Questions Across 20 AWS Core Services</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AWS Certification & Practice Exam Hub
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Master Cloud Practitioner, Solutions Architect, and SysOps domains with technical scenario-based exams.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-400">Platform Threshold</div>
              <div className="text-sm font-bold text-emerald-400">70% Required</div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs text-gray-400 max-w-xs">
              <span className="font-semibold text-gray-300">Notice:</span> 70% is an application-defined learning threshold, not an official AWS certification passing score.
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ CONFIGURATION SCREEN (When not in active exam/practice session) */}
      {!isExamActive && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Launcher Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Configure Your Assessment Session</span>
            </h2>

            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">Select AWS Service Domain</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
              >
                {serviceOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">Difficulty Filter</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'all', label: 'All Levels' },
                  { id: 'beginner', label: 'Beginner' },
                  { id: 'intermediate', label: 'Intermediate' },
                  { id: 'advanced', label: 'Advanced' }
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedDifficulty(lvl.id)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                      selectedDifficulty === lvl.id
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                        : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:text-gray-200 hover:border-slate-700'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">Assessment Mode</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setQuizMode('practice')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    quizMode === 'practice'
                      ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      Practice Mode
                    </span>
                    {quizMode === 'practice' && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-xs text-gray-400">
                    Immediate question feedback, instant answers, and detailed explanations as you proceed. No countdown timer.
                  </p>
                </div>

                <div 
                  onClick={() => setQuizMode('exam')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    quizMode === 'exam'
                      ? 'bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-amber-400" />
                      Exam Mode
                    </span>
                    {quizMode === 'exam' && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-gray-400">
                    Timed simulation. Answers withheld until full submission. Question flagging and topic-wise score analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <button
              onClick={() => startQuiz()}
              className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch {quizMode === 'exam' ? 'Timed Exam' : 'Practice Session'}</span>
            </button>
          </div>

          {/* Quick Metrics & Learning History Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>Question Bank Distribution</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Total Services</span>
                  <span className="font-semibold text-gray-200">20 Categories</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Questions Per Service</span>
                  <span className="font-semibold text-gray-200">20 Validated</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Difficulty Balance</span>
                  <span className="font-semibold text-gray-200">7 Beg / 7 Int / 6 Adv</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Total Question Count</span>
                  <span className="font-semibold text-amber-400">400 Questions</span>
                </div>
              </div>
            </div>

            {/* Recent Attempts History */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" />
                <span>Recent Exam Attempts</span>
              </h3>
              {attemptHistory.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No recorded attempts yet. Start your first session above!</p>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {attemptHistory.slice(0, 5).map((att) => (
                    <div key={att.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-gray-200 line-clamp-1">{att.service}</div>
                        <div className="text-[10px] text-gray-500 capitalize">{att.mode} Mode • {att.correct}/{att.total}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs font-bold ${
                        att.passed ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {att.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE TEST INTERFACE */}
      {isExamActive && !examSubmitted && currentQ && (
        <div className="space-y-6">
          
          {/* Active Header & Timer Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono font-bold text-amber-400 border border-slate-700">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-xs text-gray-400 hidden sm:inline">
                {currentQ.serviceName || 'AWS Service'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                currentQ.level === 'beginner' ? 'bg-emerald-500/15 text-emerald-400' :
                currentQ.level === 'intermediate' ? 'bg-blue-500/15 text-blue-400' :
                'bg-purple-500/15 text-purple-400'
              }`}>
                {currentQ.level}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {quizMode === 'exam' && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-xs font-bold ${
                  timeLeft < 300 ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' : 'bg-slate-800 text-gray-200 border-slate-700'
                }`}>
                  <Timer className="w-3.5 h-3.5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              )}

              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  flaggedQuestions.has(currentQ.id)
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-slate-800 border-slate-700 text-gray-400 hover:text-gray-200'
                }`}
                title="Flag for later review"
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Flag</span>
              </button>

              <button
                onClick={submitQuiz}
                className="py-1.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const showFeedback = quizMode === 'practice' && showPracticeFeedback[currentQ.id];
                const isCorrect = optIdx === currentQ.correct;

                let optionClass = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-gray-200';
                if (showFeedback) {
                  if (isCorrect) {
                    optionClass = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 ring-1 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    optionClass = 'bg-rose-500/15 border-rose-500/50 text-rose-200 ring-1 ring-rose-500/30';
                  }
                } else if (isSelected) {
                  optionClass = 'bg-amber-500/15 border-amber-500/50 text-amber-200 ring-1 ring-amber-500/30';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${optionClass}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border ${
                      isSelected 
                        ? 'bg-amber-500 text-slate-950 border-amber-400' 
                        : 'bg-slate-900 text-gray-400 border-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <div className="text-sm flex-1 leading-snug">{option}</div>
                    {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Practice Mode Explanation Box */}
            {quizMode === 'practice' && showPracticeFeedback[currentQ.id] && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Info className="w-4 h-4" />
                  <span>Technical Explanation</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Navigation Grid & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Compact Question Jump Grid */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-md">
              {activeQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions.has(q.id);

                let dotColor = 'bg-slate-800 text-gray-400 border-slate-700';
                if (isCurrent) dotColor = 'ring-2 ring-amber-400 bg-slate-700 text-white font-bold';
                else if (isFlagged) dotColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
                else if (isAnswered) dotColor = 'bg-blue-500/20 text-blue-400 border-blue-500/40';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded text-[11px] font-mono border transition-all ${dotColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentIndex === activeQuestions.length - 1}
              onClick={() => setCurrentIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
              className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* EXAM RESULTS & REVIEW SCREEN */}
      {examSubmitted && scoreStats && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Summary Score Banner */}
          <div className={`p-8 rounded-2xl border text-center relative overflow-hidden shadow-2xl ${
            scoreStats.percentage >= 70
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
          }`}>
            <div className="inline-flex p-3 rounded-full bg-slate-900 border border-slate-800 shadow-md mb-4">
              <Award className={`w-8 h-8 ${scoreStats.percentage >= 70 ? 'text-emerald-400' : 'text-rose-400'}`} />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {scoreStats.percentage >= 70 ? 'Assessment Passed!' : 'Assessment Incomplete'}
            </h2>
            <div className="text-5xl font-black mt-2 tracking-tight text-white">
              {scoreStats.percentage}%
            </div>
            <p className="text-sm text-gray-300 mt-2 max-w-md mx-auto">
              You correctly answered {scoreStats.correct} of {scoreStats.total} questions. 
              {scoreStats.percentage >= 70 
                ? ' Outstanding mastery of the tested cloud domains.'
                : ' Review your weak topics and retry incorrect questions below.'}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {scoreStats.incorrectList.length > 0 && (
                <button
                  onClick={retryIncorrect}
                  className="py-2.5 px-5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry {scoreStats.incorrectList.length} Incorrect Questions</span>
                </button>
              )}
              <button
                onClick={() => startQuiz(quizMode)}
                className="py-2.5 px-5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Retake Assessment</span>
              </button>
              <button
                onClick={() => setIsExamActive(false)}
                className="py-2.5 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-gray-300 font-bold text-xs transition-all"
              >
                Exit to Assessment Menu
              </button>
            </div>
          </div>

          {/* Topic-Wise Breakdown Analysis */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <span>Domain Performance Analysis</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(scoreStats.topicAnalysis).map(([topic, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={topic} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-200">{topic}</span>
                      <span className={`font-mono font-bold ${pct >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {data.correct}/{data.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white">Question-by-Question Review</h3>
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: `All (${activeQuestions.length})` },
                { id: 'incorrect', label: `Incorrect (${scoreStats.incorrectList.length})` },
                { id: 'flagged', label: `Flagged (${flaggedQuestions.size})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setReviewFilter(f.id)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    reviewFilter === f.id
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Review List */}
          <div className="space-y-4">
            {displayedQuestions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correct;

              return (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-xs font-mono font-bold text-gray-300">
                      Review #{idx + 1} • {q.serviceName || q.serviceId}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white">{q.question}</h4>

                  {/* Options Review */}
                  <div className="space-y-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const wasSelected = selectedOpt === optIdx;
                      const isRealCorrect = optIdx === q.correct;

                      let cls = 'bg-slate-950/60 border-slate-800 text-gray-400';
                      if (isRealCorrect) {
                        cls = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-medium';
                      } else if (wasSelected && !isRealCorrect) {
                        cls = 'bg-rose-500/15 border-rose-500/40 text-rose-200 font-medium';
                      }

                      return (
                        <div key={optIdx} className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${cls}`}>
                          <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                          {isRealCorrect && <span className="text-[11px] font-bold text-emerald-400">Correct Answer</span>}
                          {wasSelected && !isRealCorrect && <span className="text-[11px] font-bold text-rose-400">Your Selection</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-gray-300">
                    <span className="font-semibold text-amber-400 block mb-1">AWS Explanation:</span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
