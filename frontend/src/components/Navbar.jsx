import React, { useState } from 'react';
import { 
  Cloud, 
  LayoutDashboard, 
  Server, 
  FlaskConical, 
  HelpCircle, 
  BookOpen, 
  User, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Flame, 
  Award,
  ShieldCheck,
  Terminal,
  Layers,
  Calculator,
  Bot,
  Compass,
  Sun,
  Moon,
  Monitor,
  Shield,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  user, 
  onOpenAuth, 
  onLogout,
  completedLabsCount,
  totalLabsCount,
  xpPoints
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: Cloud },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Server },
    { id: 'simulator', label: 'Simulator', icon: Terminal, badge: 'New' },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'labs', label: 'Labs', icon: FlaskConical, badge: `${completedLabsCount}/${totalLabsCount}` },
    { id: 'quizzes', label: 'Exams', icon: HelpCircle, badge: '400' },
    { id: 'cost', label: 'Cost', icon: Calculator },
    { id: 'tutor', label: 'AI Tutor', icon: Bot },
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'admin', label: 'Admin', icon: Shield, adminGated: true }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-console-nav/95 backdrop-blur-md border-b border-console-border text-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <Cloud className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-900"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">AWS Practice Lab</span>
                <span className="hidden xl:inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Sandbox
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono hidden xl:block">Cloud Learning Platform</p>
            </div>
          </div>

          {/* Desktop Navigation Links (Compact & Responsive) */}
          <div className="hidden lg:flex items-center space-x-0.5 overflow-x-auto max-w-[620px] xl:max-w-none py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 relative shrink-0 ${
                    isActive
                      ? 'text-white bg-console-card border border-console-border shadow-inner font-semibold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-console-hover'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Theme Switcher + XP + User */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            
            {/* Theme Toggle Button */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-1.5 rounded-md bg-console-card border border-console-border text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                title="Theme Settings"
                aria-label="Theme Settings"
              >
                {resolvedTheme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-1 text-xs z-50 animate-fade-in">
                  <button
                    onClick={() => { setTheme('light'); setThemeDropdownOpen(false); }}
                    className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                      theme === 'light' ? 'text-amber-400 font-bold' : 'text-gray-300'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light Mode</span>
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setThemeDropdownOpen(false); }}
                    className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                      theme === 'dark' ? 'text-amber-400 font-bold' : 'text-gray-300'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark Mode</span>
                  </button>
                  <button
                    onClick={() => { setTheme('system'); setThemeDropdownOpen(false); }}
                    className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                      theme === 'system' ? 'text-amber-400 font-bold' : 'text-gray-300'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>System Theme</span>
                  </button>
                </div>
              )}
            </div>

            {/* XP Points Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-console-card border border-console-border text-xs">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-gray-300 font-mono font-medium">{xpPoints} XP</span>
            </div>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-console-border">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold border border-blue-400/40">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left text-xs hidden xl:block">
                  <div className="font-medium text-gray-200 truncate max-w-[90px]">{user.name || 'Cloud User'}</div>
                  <div className="text-[9px] text-emerald-400 font-mono">
                    {user.role === 'admin' ? '● ADMIN' : '● Online'}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1 rounded-md text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-bold rounded-md shadow-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-console-hover focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-console-border bg-console-card px-4 pt-3 pb-5 space-y-1.5 animate-fade-in max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs mb-2">
            <span className="text-gray-400">Theme Preference:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded ${theme === 'light' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400'}`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded ${theme === 'dark' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400'}`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded ${theme === 'system' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium ${
                  isActive
                    ? 'text-white bg-blue-500/15 border-l-4 border-amber-500 font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-console-hover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-console-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{xpPoints} XP</span>
            </div>
            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.role})</span>
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
