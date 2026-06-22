/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User } from '../types';
import { DoodleSchool, DoodleSparkle } from './Doodles';
import { LogIn, LogOut, User as UserIcon, ClipboardList, BookOpen, PlusCircle, Calendar, Palette, Sparkles, Check } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeTab: 'browse' | 'my-applications' | 'manage-school' | 'events';
  setActiveTab: (tab: 'browse' | 'my-applications' | 'manage-school' | 'events') => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  
  // Custom theme & tagline props
  themeColor: 'amber' | 'emerald' | 'indigo' | 'rose' | 'violet';
  setThemeColor: (color: 'amber' | 'emerald' | 'indigo' | 'rose' | 'violet') => void;
  tagline: string;
  setTagline: (tagline: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLogout,
  themeColor,
  setThemeColor,
  tagline,
  setTagline
}) => {
  const [showCustomizer, setShowCustomizer] = useState(false);

  const taglineOptions = [
    "Bridging Parents, Schools & Futures",
    "The Collaborative Admissions Portal",
    "The Smart Pathway to Academic Success",
    "Your Trusted Neighborhood School Finder",
    "Online Registry & Active Admissions Portal"
  ];

  const themes = [
    { id: 'amber', name: 'Amber Gold', hex: '#fbbf24', textClass: 'text-amber-500' },
    { id: 'emerald', name: 'Forest Emerald', hex: '#34d399', textClass: 'text-emerald-500' },
    { id: 'indigo', name: 'Indigo Royal', hex: '#818cf8', textClass: 'text-indigo-500' },
    { id: 'rose', name: 'Sunset Crimson', hex: '#fb7185', textClass: 'text-rose-500' },
    { id: 'violet', name: 'Lavender Dream', hex: '#a78bfa', textClass: 'text-violet-500' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-900 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Branding */}
          <div 
            onClick={() => setActiveTab('browse')} 
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="relative p-1 bg-brand-light rounded-lg group-hover:scale-105 transition-all">
              <DoodleSchool className="w-12 h-10 text-brand-primary" />
              <DoodleSparkle className="absolute -top-1.5 -right-1.5 w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-1.5 font-sans">
                CampusBridge
              </h1>
              <div className="text-[11px] text-brand-dark/90 font-mono tracking-wider font-extrabold uppercase line-clamp-1">
                {tagline}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-1 sm:gap-4 relative">
            
            {/* Interactive Theme Customizer Trigger */}
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={`p-2 rounded-xl transition-all relative ${
                showCustomizer 
                  ? 'bg-brand-light text-brand-dark border-2 border-slate-900 -p-[2px]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Customize Theme & Tagline"
              id="theme-customizer-trigger"
            >
              <Palette className="w-5 h-5 animate-swing" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
            </button>

            {/* Customizer Dropdown Card */}
            {showCustomizer && (
              <div 
                className="absolute right-0 top-14 bg-white border-2 border-slate-950 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-4 w-76 z-50 text-left space-y-4 animate-in slide-in-from-top-2 duration-150"
                id="theme-customizer-dropdown"
              >
                <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-950 font-black text-xs">
                    <Sparkles className="w-4 h-4 text-brand-dark" />
                    <span>Customize Branding & Theme</span>
                  </div>
                  <button 
                    onClick={() => setShowCustomizer(false)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-900"
                  >
                    ✕
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-black tracking-widest uppercase text-slate-400">
                    🎨 Color Palette Theme
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setThemeColor(t.id);
                        }}
                        className={`h-9 w-full rounded-xl border flex items-center justify-center transition-all ${
                          themeColor === t.id 
                            ? 'border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5' 
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                        style={{ backgroundColor: t.hex }}
                        title={t.name}
                      >
                        {themeColor === t.id && (
                          <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="block text-[9px] font-mono text-slate-500">
                    Applying <strong>{themes.find(t=>t.id===themeColor)?.name}</strong> Accent Dynamic CSS.
                  </span>
                </div>

                {/* Tagline Option selector */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-black tracking-widest uppercase text-slate-400">
                    📝 Choice of Tagline
                  </span>
                  <select
                    value={taglineOptions.includes(tagline) ? tagline : 'custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        setTagline(e.target.value);
                      }
                    }}
                    className="w-full text-xs p-2 border-2 border-slate-900 rounded-xl bg-white font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  >
                    {taglineOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                    {!taglineOptions.includes(tagline) && (
                      <option value="custom">🖊️ Custom Typed Tagline</option>
                    )}
                  </select>
                </div>

                {/* Custom Typed Tagline */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-black tracking-widest uppercase text-slate-400">
                    🖊️ Or Type a Custom Tagline
                  </span>
                  <input
                    type="text"
                    maxLength={50}
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Type an elegant slogan details..."
                    className="w-full text-xs p-2 border-2 border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-700 focus:border-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="text-[9px] text-slate-400 text-center border-t pt-2.5">
                  Persistent settings saved to 📋 local storage!
                </div>
              </div>
            )}

            {/* Main School Directory Trigger */}
            <button
              id="nav-browse"
              onClick={() => {
                setActiveTab('browse');
                setShowCustomizer(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'browse'
                  ? 'bg-brand-light text-brand-dark sketchy-border-sm py-1.5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Browse Schools</span>
            </button>

            {/* Upcoming School Events Link */}
            <button
              id="nav-events"
              onClick={() => {
                setActiveTab('events');
                setShowCustomizer(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'events'
                  ? 'bg-brand-light text-brand-dark sketchy-border-sm py-1.5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Events</span>
            </button>

            {/* Parent Applications Tab */}
            {currentUser && currentUser.role === 'parent' && (
              <button
                id="nav-applications"
                onClick={() => {
                  setActiveTab('my-applications');
                  setShowCustomizer(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'my-applications'
                    ? 'bg-brand-light text-brand-dark sketchy-border-sm py-1.5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>My Applications</span>
              </button>
            )}

            {/* School Admin Portal Tab */}
            {currentUser && currentUser.role === 'school_admin' && (
              <button
                id="nav-manage-school"
                onClick={() => {
                  setActiveTab('manage-school');
                  setShowCustomizer(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'manage-school'
                    ? 'bg-emerald-50 text-emerald-700 sketchy-border-sm py-1.5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Manage My School</span>
              </button>
            )}

            {/* User Profile / Authentication CTA */}
            <div className="h-6 w-[2px] bg-slate-300 mx-1 sm:mx-2 hidden xs:block" />

            {!currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-3" id="auth-buttons-container">
                <button
                  id="nav-login-btn"
                  onClick={() => {
                    onOpenAuth('login');
                    setShowCustomizer(false);
                  }}
                  className="px-3.5 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Sign In</span>
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => {
                    onOpenAuth('signup');
                    setShowCustomizer(false);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-brand-light transition-all text-sm font-bold shadow-sm rounded-xl py-2 px-3.5 sketchy-badge"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4" id="logged-user-container">
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-sm font-bold text-slate-800 line-clamp-1">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wide uppercase px-1.5 py-0.5 bg-slate-100 rounded">
                    {currentUser.role === 'parent' ? '👨‍👩‍👧 Parent' : '🏫 School Admin'}
                  </span>
                </div>
                
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-full text-slate-600">
                  <UserIcon className="w-4 h-4" />
                </div>

                <button
                  id="nav-logout-btn"
                  onClick={() => {
                    onLogout();
                    setShowCustomizer(false);
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

          </nav>

        </div>
      </div>
    </header>
  );
};
