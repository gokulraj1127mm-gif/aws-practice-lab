import React from 'react';
import { 
  FlaskConical, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Flame, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  Server, 
  Database, 
  Cpu, 
  Network, 
  Layers, 
  Activity, 
  Play, 
  Sparkles,
  Info
} from 'lucide-react';

export const Dashboard = ({
  labs,
  completedLabIds,
  onOpenLab,
  onExploreLabs,
  onExploreServices,
  xpPoints,
  user
}) => {
  const totalLabs = labs.length;
  const completedCount = completedLabIds.length;
  const progressPercent = totalLabs > 0 ? Math.round((completedCount / totalLabs) * 100) : 0;

  // Find the next recommended lab (first uncompleted lab)
  const nextLab = labs.find(lab => !completedLabIds.includes(lab.id)) || labs[0];

  // Category breakdown
  const categories = [
    { name: 'Compute (EC2, Lambda)', service: 'EC2', total: labs.filter(l => l.service === 'EC2' || l.service === 'Lambda').length, done: labs.filter(l => (l.service === 'EC2' || l.service === 'Lambda') && completedLabIds.includes(l.id)).length, color: 'bg-orange-500' },
    { name: 'Storage (Amazon S3)', service: 'S3', total: labs.filter(l => l.service === 'S3').length, done: labs.filter(l => l.service === 'S3' && completedLabIds.includes(l.id)).length, color: 'bg-emerald-500' },
    { name: 'Security & IAM', service: 'IAM', total: labs.filter(l => l.service === 'IAM').length, done: labs.filter(l => l.service === 'IAM' && completedLabIds.includes(l.id)).length, color: 'bg-rose-500' },
    { name: 'Networking (Amazon VPC)', service: 'VPC', total: labs.filter(l => l.service === 'VPC').length, done: labs.filter(l => l.service === 'VPC' && completedLabIds.includes(l.id)).length, color: 'bg-blue-500' },
    { name: 'Database (Amazon RDS)', service: 'RDS', total: labs.filter(l => l.service === 'RDS').length, done: labs.filter(l => l.service === 'RDS' && completedLabIds.includes(l.id)).length, color: 'bg-cyan-500' },
    { name: 'Monitoring (CloudWatch)', service: 'CloudWatch', total: labs.filter(l => l.service === 'CloudWatch').length, done: labs.filter(l => l.service === 'CloudWatch' && completedLabIds.includes(l.id)).length, color: 'bg-purple-500' },
  ];

  // Retrieve actual quiz history from localStorage
  const quizHistory = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('aws_lab_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  const bestQuizScore = React.useMemo(() => {
    if (quizHistory.length === 0) return 0;
    return Math.max(...quizHistory.map(q => q.percentage || 0));
  }, [quizHistory]);

  // Identify weak topics from quiz history
  const weakTopics = React.useMemo(() => {
    const topicAgg = {};
    quizHistory.forEach(att => {
      if (att.topicBreakdown) {
        Object.entries(att.topicBreakdown).forEach(([topic, stats]) => {
          if (!topicAgg[topic]) topicAgg[topic] = { total: 0, correct: 0 };
          topicAgg[topic].total += stats.total;
          topicAgg[topic].correct += stats.correct;
        });
      }
    });

    const weak = [];
    Object.entries(topicAgg).forEach(([topic, stats]) => {
      const pct = Math.round((stats.correct / stats.total) * 100);
      if (pct < 70 && stats.total >= 3) {
        weak.push({ topic, pct, recommendation: `Review ${topic} fundamentals and practice hands-on lab configurations.` });
      }
    });
    return weak;
  }, [quizHistory]);

  const handleResetDemoProgress = () => {
    if (window.confirm('Reset local demo progress (completed labs and score cache)?')) {
      localStorage.removeItem('aws_lab_completed_ids');
      localStorage.removeItem('aws_lab_xp');
      localStorage.removeItem('aws_lab_quiz_history');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Simulation Notice Banner */}
      <div className="card p-4 bg-gradient-to-r from-amber-500/10 via-console-card to-blue-500/10 border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-100">Live Simulation Sandbox Active</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Safe Mode
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Simulated AWS metrics & state are synchronized locally. No real infrastructure is provisioned or billed.
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-400 font-mono shrink-0 flex items-center gap-1.5 bg-console-bg px-3 py-1.5 rounded border border-console-border">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span>Profile: {user?.name || 'Demo Trainee'}</span>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Available Labs */}
        <div className="card p-5 hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Available Labs</span>
            <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
              <FlaskConical className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalLabs}</span>
            <span className="text-xs text-gray-400">across 7 services</span>
          </div>
          <div className="mt-2 text-xs text-blue-400 font-medium cursor-pointer hover:underline" onClick={onExploreLabs}>
            View full lab catalog →
          </div>
        </div>

        {/* Completed Labs */}
        <div className="card p-5 hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Completed Labs</span>
            <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{completedCount}</span>
            <span className="text-xs text-gray-400">of {totalLabs} labs</span>
          </div>
          <div className="mt-3 w-full bg-console-bg rounded-full h-1.5 overflow-hidden border border-console-border">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Total XP Earned */}
        <div className="card p-5 hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Cloud Mastery XP</span>
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{xpPoints}</span>
            <span className="text-xs text-amber-400 font-mono font-medium">XP</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Rank: <span className="text-gray-200 font-semibold">{xpPoints > 300 ? 'Solutions Associate' : 'Cloud Practitioner Apprentice'}</span>
          </div>
        </div>

        {/* Practice Streak */}
        <div className="card p-5 hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Learning Streak</span>
            <div className="p-2 rounded-md bg-orange-500/10 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">3</span>
            <span className="text-xs text-gray-400">Days Active</span>
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Consistent daily learner</span>
          </div>
        </div>

      </div>

      {/* Middle Grid: Recommended Next Lab + Skill Mastery Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recommended Next Lab (7 cols) */}
        <div className="lg:col-span-7 card p-6 border-console-border hover:border-amber-500/40 transition-colors space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Next Lab</span>
            </div>
            {nextLab && (
              <span className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${nextLab.badgeColor}`}>
                {nextLab.difficulty}
              </span>
            )}
          </div>

          {nextLab ? (
            <div>
              <h2 className="text-xl font-bold text-white hover:text-amber-400 transition-colors cursor-pointer" onClick={() => onOpenLab(nextLab)}>
                {nextLab.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {nextLab.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  ~{nextLab.estimatedTime} mins
                </span>
                <span className="flex items-center gap-1.5 font-mono text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  +{nextLab.points} XP
                </span>
                <span className="px-2 py-0.5 rounded bg-console-bg text-gray-300 font-mono text-[11px] border border-console-border">
                  Service: {nextLab.service}
                </span>
              </div>

              <div className="pt-4 mt-4 border-t border-console-border flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {completedLabIds.includes(nextLab.id) ? (
                    <span className="text-emerald-400 font-medium">✓ You have completed this lab (re-take anytime)</span>
                  ) : (
                    <span>Ready to launch in sandbox</span>
                  )}
                </div>
                <button
                  onClick={() => onOpenLab(nextLab)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-md shadow transition-transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Lab</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-white">All Labs Completed!</p>
              <p className="text-xs text-gray-400 mt-1">Outstanding work! You have finished every lab in the catalog.</p>
            </div>
          )}
        </div>

        {/* Skill Mastery Breakdown (5 cols) */}
        <div className="lg:col-span-5 card p-6 border-console-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Mastery by Domain
            </h2>
            <span className="text-xs text-gray-500 font-mono">
              {completedCount}/{totalLabs} labs
            </span>
          </div>

          <div className="space-y-3.5">
            {categories.map((cat, idx) => {
              const catPercent = cat.total > 0 ? Math.round((cat.done / cat.total) * 100) : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300 font-medium">{cat.name}</span>
                    <span className="text-gray-400 font-mono">{cat.done}/{cat.total} ({catPercent}%)</span>
                  </div>
                  <div className="w-full bg-console-bg rounded-full h-2 overflow-hidden border border-console-border">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${cat.color}`}
                      style={{ width: `${catPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onExploreServices}
            className="w-full mt-4 py-2 bg-console-hover hover:bg-console-card text-gray-300 hover:text-white border border-console-border rounded-md text-xs font-medium transition-colors text-center"
          >
            Review AWS Service Architecture →
          </button>
        </div>

      </div>

      {/* Simulated Recent Activity Feed */}
      <div className="card p-6 border-console-border">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-console-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-sim-blue" />
            <span>Recent Practice Activity & Milestones</span>
          </h2>
          <span className="text-[11px] font-mono text-gray-500">Live Local Log</span>
        </div>

        <div className="divide-y divide-console-border text-xs">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <div>
                <span className="text-gray-200 font-medium">Session Initialized:</span>
                <span className="text-gray-400 ml-1">Connected to local simulation environment (ap-south-1)</span>
              </div>
            </div>
            <span className="text-gray-500 font-mono text-[11px]">Just now</span>
          </div>

          {completedCount > 0 ? (
            completedLabIds.map((id, index) => {
              const lab = labs.find(l => l.id === id);
              if (!lab) return null;
              return (
                <div key={id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <div>
                      <span className="text-emerald-400 font-medium">Lab Completed:</span>
                      <span className="text-gray-300 ml-1">{lab.title}</span>
                      <span className="text-amber-400 font-mono ml-2">+{lab.points} XP</span>
                    </div>
                  </div>
                  <span className="text-gray-500 font-mono text-[11px]">Saved locally</span>
                </div>
              );
            })
          ) : (
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <div>
                  <span className="text-gray-300 font-medium">Ready for your first lab:</span>
                  <span className="text-gray-400 ml-1">Select an EC2 or S3 lab above to earn your first 100 XP badge!</span>
                </div>
              </div>
              <span className="text-amber-400 font-mono text-[11px]">Pending</span>
            </div>
          )}
        </div>
      </div>

      {/* Weak Topics & Revision Recommendations */}
      <div className="card p-6 border-console-border space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-console-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <span>Personalized Study & Weak-Topic Recommendations</span>
          </h2>
          <span className="text-xs text-gray-400">
            {quizHistory.length} Recorded Exam Session{quizHistory.length === 1 ? '' : 's'} • Best: {bestQuizScore}%
          </span>
        </div>

        {weakTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {weakTopics.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-console-bg border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">{item.topic}</span>
                  <span className="font-mono text-rose-400 font-bold">{item.pct}% average</span>
                </div>
                <p className="text-xs text-gray-400">{item.recommendation}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-console-bg border border-console-border text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              {quizHistory.length === 0 
                ? 'No weak topics identified yet. Complete quizzes in the Exams tab to generate tailored study recommendations!' 
                : 'All tested topics meet the 70% proficiency threshold! Keep taking intermediate and advanced exams.'}
            </span>
            <button
              onClick={handleResetDemoProgress}
              className="text-xs text-gray-500 hover:text-rose-400 hover:underline shrink-0"
            >
              Reset local demo progress
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
