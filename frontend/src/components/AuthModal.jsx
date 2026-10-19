import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { login, register } from '../services/authService';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'register'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (mode === 'signin') {
        const res = await login({ email: formData.email, password: formData.password });
        if (res.data?.token) {
          localStorage.setItem('token', res.data.token);
          onAuthSuccess(res.data.user || { name: formData.email.split('@')[0], email: formData.email });
          onClose();
        } else {
          // If response format differs
          onAuthSuccess(res.user || { name: formData.email.split('@')[0], email: formData.email });
          onClose();
        }
      } else {
        const res = await register({ name: formData.name, email: formData.email, password: formData.password });
        if (res.data?.token) {
          localStorage.setItem('token', res.data.token);
        }
        onAuthSuccess(res.data?.user || { name: formData.name, email: formData.email });
        onClose();
      }
    } catch (err) {
      console.warn('Auth API request failed, offering quick demo fallback:', err);
      setErrorMessage(
        typeof err === 'string' 
          ? err 
          : err.message || 'Could not connect to backend auth service. You can use Quick Demo Mode below!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    const demoUser = {
      _id: 'demo-user-123',
      name: 'Cloud Apprentice',
      email: 'trainee@aws-practice-lab.internal',
      role: 'student'
    };
    onAuthSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-console-card border border-console-border rounded-xl shadow-2xl p-6 text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-console-hover transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {mode === 'signin' ? 'Sign In to AWS Practice Lab' : 'Create Trainee Account'}
          </h3>
          <p className="text-xs text-gray-400">
            Track your progress, earn XP, and sync simulated cloud resources.
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex rounded-lg bg-console-bg p-1 border border-console-border mb-5">
          <button
            onClick={() => { setMode('signin'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'signin' ? 'bg-console-card text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'register' ? 'bg-console-card text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Rivers"
                className="input-field"
              />
            </div>
          )}

          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-md shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-console-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-console-card px-2 text-gray-500 font-mono">OR</span>
          </div>
        </div>

        {/* Quick Demo Mode Button */}
        <button
          onClick={handleDemoSignIn}
          className="w-full py-2.5 bg-console-bg hover:bg-console-hover text-amber-400 border border-amber-500/40 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Continue as Demo Trainee (1-Click)</span>
        </button>

      </div>
    </div>
  );
};
