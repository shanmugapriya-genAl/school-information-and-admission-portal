/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { X, Mail, Lock, User as UserIcon, School, Sparkles } from 'lucide-react';
import { DoodleArrow, DoodleSparkle } from './Doodles';

interface AuthModalProps {
  onClose: () => void;
  onAuthenticate: (user: User) => void;
  initialMode: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onAuthenticate,
  initialMode
}) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [role, setRole] = useState<UserRole>('parent');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (isSignUp && !fullName) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    // Dynamic Mock Auth Database in localStorage
    const savedUsersRaw = localStorage.getItem('eduregistry_users');
    const users: User[] = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

    if (isSignUp) {
      // Sign-Up registration flow
      const userExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setErrorMessage('An account with this email already exists.');
        return;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: email.trim().toLowerCase(),
        fullName: fullName.trim(),
        role
      };

      // Store in users array
      users.push(newUser);
      localStorage.setItem('eduregistry_users', JSON.stringify(users));

      // Auto-trigger callback
      onAuthenticate(newUser);
      onClose();
    } else {
      // Sign-In authenticating flow
      // To provide a smooth client experience, if the user doesn't exist, we will create a dynamic session,
      // or match from registered users.
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      
      if (foundUser) {
        onAuthenticate(foundUser);
        onClose();
      } else {
        // Create auto-account if a test account or generic email is used:
        // This makes sure the user is never locked out of testing our application! Excellent UX practice.
        const fallbackUser: User = {
          id: `user-${Date.now()}`,
          email: email.trim().toLowerCase(),
          fullName: email.split('@')[0].toUpperCase(),
          role: email.includes('admin') || email.includes('school') ? 'school_admin' : 'parent'
        };
        
        users.push(fallbackUser);
        localStorage.setItem('eduregistry_users', JSON.stringify(users));
        
        onAuthenticate(fallbackUser);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" id="auth-modal-overlay">
      <div 
        className="relative w-full max-w-md bg-white border-2 border-slate-950 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] rounded-2xl sketchy-border bg-amber-50/10"
        id="auth-modal-content"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-300"
          id="close-auth-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Decorative Doodles */}
        <DoodleSparkle className="absolute -top-4 -left-4 w-10 h-10 text-yellow-500" />

        {/* Header Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 font-sans">
            {isSignUp ? 'Create a Portals Account' : 'Welcome to CampusBridge'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isSignUp 
              ? 'Register to publish school data or submit admission logs.' 
              : 'Sign in to access student applications and schools filtering.'}
          </p>
        </div>

        {/* Role Segment Selector (only for Sign-Up) */}
        {isSignUp && (
          <div className="mb-5" id="role-selector-container">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-3 px-4 rounded-xl text-sm font-bold flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
                  role === 'parent'
                    ? 'border-slate-900 bg-amber-50 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                <span>👨‍👩‍👧 Parent / Guardian</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('school_admin')}
                className={`py-3 px-4 rounded-xl text-sm font-bold flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
                  role === 'school_admin'
                    ? 'border-slate-900 bg-emerald-50/50 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <School className="w-5 h-5" />
                <span>🏫 School Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" id="auth-form">
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-700 text-xs font-semibold leading-relaxed">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Full Name field (Only during Sign-Up) */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full casual-input pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full casual-input pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none"
              />
            </div>
            {!isSignUp && (
              <span className="text-[10px] text-slate-400 mt-1 block">
                💡 Tip: Type standard email (add 'admin' in email for Instant Admin test role).
              </span>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full casual-input pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-slate-950 text-amber-50 hover:bg-slate-800 transition-all font-bold rounded-xl shadow-md flex items-center justify-center gap-2 border-2 border-transparent active:translate-y-[1px]"
            id="auth-submit-btn"
          >
            <span>{isSignUp ? 'Sign Up Registrations' : 'Sign In Securely'}</span>
          </button>
        </form>

        {/* Dynamic Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-600">
            {isSignUp ? 'Already registered on CampusBridge?' : 'Looking to publish a school profile?'}
          </p>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
            }}
            className="mt-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-all relative inline-block group"
            id="auth-toggle-mode"
          >
            <span>{isSignUp ? 'Formal Sign In Page' : 'Formal Registration Page'}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-600 transition-all group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};
