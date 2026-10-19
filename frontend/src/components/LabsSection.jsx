import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  Filter, 
  Clock, 
  Award, 
  CheckCircle2, 
  Play, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LabsSection = ({
  labs,
  completedLabIds,
  onOpenLab,
  selectedServiceFilter,
  onClearServiceFilter
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState(selectedServiceFilter || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  // Keep internal filter in sync if parent passed one
  React.useEffect(() => {
    if (selectedServiceFilter) {
      setServiceFilter(selectedServiceFilter);
    }
  }, [selectedServiceFilter]);

  const services = ['All', 'EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda', 'CloudWatch'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLabs = labs.filter(lab => {
    const matchesService = serviceFilter === 'All' || lab.service.toUpperCase() === serviceFilter.toUpperCase();
    const matchesDifficulty = difficultyFilter === 'All' || lab.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesSearch = 
      lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesDifficulty && matchesSearch;
  });

  const completedCount = labs.filter(l => completedLabIds.includes(l.id)).length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Interactive Hands-On Cloud Labs</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Cloud Engineering Practice Labs
        </h2>
        <p className="text-sm text-gray-400">
          Learn by doing with real-world scenarios. Each lab includes guided steps, CLI snippets, expected results, and automated validation.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 border-console-border space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Service Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-semibold text-gray-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-gray-400" />
              Service:
            </span>
            {services.map((svc) => (
              <button
                key={svc}
                onClick={() => {
                  setServiceFilter(svc);
                  if (onClearServiceFilter && svc === 'All') onClearServiceFilter();
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  serviceFilter === svc
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-console-bg text-gray-400 hover:text-gray-200 border border-console-border'
                }`}
              >
                {svc}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search labs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 py-1.5 text-xs"
            />
          </div>

        </div>

        {/* Secondary Filter: Difficulty & Stats Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-console-border text-xs text-gray-400">
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-400">Difficulty:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-blue-500/20 text-sim-blue border border-blue-500/40 font-semibold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="font-mono text-gray-400">
            Showing <span className="text-white font-bold">{filteredLabs.length}</span> of {labs.length} labs
            <span className="mx-2">•</span>
            <span className="text-emerald-400 font-semibold">{completedCount} Completed</span>
          </div>

        </div>

      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => {
          const isDone = completedLabIds.includes(lab.id);
          return (
            <div
              key={lab.id}
              className={`card p-5 border transition-all duration-200 flex flex-col justify-between group shadow-lg ${
                isDone 
                  ? 'border-emerald-500/40 bg-gradient-to-b from-console-card to-emerald-950/5' 
                  : 'border-console-border hover:border-amber-500/50 hover:bg-console-hover/50'
              }`}
            >
              <div className="space-y-3.5">
                
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${lab.badgeColor}`}>
                    {lab.service}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-console-bg text-gray-400 border border-console-border">
                      {lab.difficulty}
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Done
                      </span>
                    )}
                  </div>
                </div>

                {/* Lab Title */}
                <h3 
                  onClick={() => onOpenLab(lab)}
                  className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer leading-snug"
                >
                  {lab.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                  {lab.description}
                </p>

                {/* Quick Info Points */}
                <div className="flex items-center gap-4 text-xs text-gray-400 pt-1 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    ~{lab.estimatedTime}m
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Award className="w-3.5 h-3.5" />
                    {lab.points} XP
                  </span>
                  <span className="text-gray-500">
                    {lab.steps.length} Steps
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 mt-5 border-t border-console-border flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  {isDone ? 'Click to re-practice' : 'Ready to launch'}
                </span>
                <button
                  onClick={() => onOpenLab(lab)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm ${
                    isDone
                      ? 'bg-console-card text-emerald-400 hover:bg-console-hover border border-emerald-500/30'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isDone ? 'Review Lab' : 'Launch Lab'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredLabs.length === 0 && (
        <div className="card p-12 text-center text-gray-400 space-y-3">
          <FlaskConical className="w-8 h-8 text-gray-500 mx-auto" />
          <p className="text-base text-gray-200 font-semibold">No hands-on labs found</p>
          <p className="text-xs text-gray-500">Try selecting "All" services and difficulties to view available labs.</p>
          <button
            onClick={() => { setServiceFilter('All'); setDifficultyFilter('All'); setSearchQuery(''); }}
            className="btn-secondary text-xs mt-2"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
