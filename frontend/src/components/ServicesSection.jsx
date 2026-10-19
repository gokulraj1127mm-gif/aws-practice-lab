import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Shield, 
  Network, 
  Cpu, 
  Layers, 
  Activity, 
  Terminal, 
  Search, 
  Filter, 
  ArrowRight, 
  Check, 
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export const ServicesSection = ({ onSelectServiceLabs }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const iconMap = {
    Server: Server,
    Database: Database,
    Shield: Shield,
    Network: Network,
    Cpu: Cpu,
    Layers: Layers,
    Activity: Activity,
    Terminal: Terminal,
  };

  const categories = ['All', 'Compute', 'Storage', 'Security', 'Networking', 'Database', 'Management', 'Developer Tools'];

  const filteredServices = servicesData.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-sim-blue border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
          <Server className="w-3.5 h-3.5" />
          <span>Core Infrastructure & Services</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          AWS Cloud Architecture Catalog
        </h2>
        <p className="text-sm text-gray-400">
          Explore foundational AWS services, key architecture patterns, Free Tier best practices, and launch simulation labs to practice hands-on configurations.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="card p-4 border-console-border flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-console-bg text-gray-400 hover:text-gray-200 hover:bg-console-hover border border-console-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search EC2, S3, IAM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-9 py-1.5 text-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200"
            >
              Clear
            </button>
          )}
        </div>

      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const Icon = iconMap[service.iconName] || Server;
          return (
            <div 
              key={service.id}
              className="card p-6 border-console-border hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between group shadow-lg bg-console-card/90"
            >
              <div className="space-y-4">
                
                {/* Header: Icon, Names, Category Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-console-bg border border-console-border flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-500/40 transition-all shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {service.fullName}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${service.badgeColor}`}>
                    {service.category}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-gray-300 leading-relaxed">
                  {service.summary}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Key Cloud Features:
                  </span>
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Beginner Tip Alert */}
                <div className="p-3 rounded-md bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-400">Pro Tip: </span>
                    {service.beginnerTip}
                  </div>
                </div>

                {/* CLI Quick Preview */}
                <div className="p-2.5 rounded bg-[#0b0e14] border border-console-border font-mono text-[11px] text-gray-300 overflow-x-auto">
                  <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1 font-sans">
                    <Terminal className="w-3 h-3 text-purple-400" />
                    <span>Example AWS CLI syntax</span>
                  </div>
                  <pre className="text-amber-400/90 whitespace-pre-wrap">{service.cliSample}</pre>
                </div>

              </div>

              {/* Card Footer: Lab count & action */}
              <div className="pt-4 mt-5 border-t border-console-border flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">
                  {service.labCount} Hands-on Labs
                </span>
                <button
                  onClick={() => onSelectServiceLabs(service.id.toUpperCase())}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Practice {service.name} Labs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="card p-12 text-center text-gray-400 space-y-3">
          <Search className="w-8 h-8 text-gray-500 mx-auto" />
          <p className="text-base text-gray-200 font-semibold">No AWS services matched "{searchQuery}"</p>
          <p className="text-xs text-gray-500">Try adjusting your search query or selecting "All" categories.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="btn-secondary text-xs mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
