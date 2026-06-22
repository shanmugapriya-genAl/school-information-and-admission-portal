/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { School, SchoolCalendarEvent, User } from '../types';
import {
  Calendar, Bell, BellOff, Info, Search, Filter,
  Heart, CheckCircle, Sparkles, AlertCircle, Bookmark, Mail, Star
} from 'lucide-react';
import { DoodleSparkle } from './Doodles';

interface EventsPageProps {
  schools: School[];
  currentUser: User | null;
  favorites: string[];
  onToggleFavorite: (schoolId: string) => void;
  isSubscribedNotifications: boolean;
  onToggleNotifications: () => void;
  onSelectSchool: (schoolId: string) => void;
}

interface AnnotatedEvent extends SchoolCalendarEvent {
  schoolId: string;
  schoolName: string;
  isFollowed: boolean;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  schools,
  currentUser,
  favorites,
  onToggleFavorite,
  isSubscribedNotifications,
  onToggleNotifications,
  onSelectSchool
}) => {
  const [filterSchoolId, setFilterSchoolId] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [onlyFollowed, setOnlyFollowed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Feed simulated toast alert when subscription changed
  const [alertToast, setAlertToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });

  const triggerToast = (msg: string) => {
    setAlertToast({ show: true, msg });
    setTimeout(() => {
      setAlertToast({ show: false, msg: '' });
    }, 4500);
  };

  // Compile all calendar events from all schools, annotated with source details
  const allEvents: AnnotatedEvent[] = schools.flatMap((school) => {
    return (school.academicCalendar || []).map((event) => ({
      ...event,
      schoolId: school.id,
      schoolName: school.name,
      isFollowed: favorites.includes(school.id)
    }));
  });

  // Sort chronologically (earliest first, but showing current and future events first)
  const sortedEvents = [...allEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Filter events based on selections
  const filteredEvents = sortedEvents.filter((event) => {
    const matchesSchool = filterSchoolId === 'all' || event.schoolId === filterSchoolId;
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesFollowed = !onlyFollowed || event.isFollowed;
    const matchesQuery = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.schoolName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSchool && matchesType && matchesFollowed && matchesQuery;
  });

  // Format type badges
  const getEventBadgeDetails = (type: SchoolCalendarEvent['type']) => {
    switch (type) {
      case 'open_house':
        return { label: '🏫 Open House', classes: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'orientation':
        return { label: '🎒 Orientation Day', classes: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'admission_test':
        return { label: '📝 Admission Test Date', classes: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'event':
        return { label: '⭐ Major Event', classes: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'exam':
        return { label: '📚 Examination', classes: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'holiday':
        return { label: '🌴 Holiday/Vacation', classes: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      default:
        return { label: '📅 Planner Event', classes: 'bg-slate-100 text-slate-850 border-slate-300 text-slate-800' };
    }
  };

  const parseReadableDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleToggleSubAlert = () => {
    onToggleNotifications();
    if (!isSubscribedNotifications) {
      triggerToast('🔔 Notification Alert Subscribed! You will receive priority push notifications and email reminders for followed schools.');
    } else {
      triggerToast('🔕 Reminder Subscriptions disabled.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4" id="events-schedule-board">
      
      {/* Toast Alert Simulator */}
      {alertToast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-slate-900 text-amber-100 border-2 border-amber-300 px-5 py-4 rounded-2xl shadow-2xl max-w-sm flex items-start gap-3">
          <Sparkles className="w-6 h-6 shrink-0 text-amber-400 mt-0.5 animate-pulse" />
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider">Simulated Event Pipeline</h5>
            <p className="text-[11px] text-slate-350 mt-1 font-semibold leading-relaxed">
              {alertToast.msg}
            </p>
          </div>
        </div>
      )}

      {/* Header section with doodles */}
      <div className="text-center max-w-2xl mx-auto mb-10 relative">
        <DoodleSparkle className="absolute -top-4 left-1/4 w-8 h-8 text-yellow-500 animate-pulse animate-pulse-once" />
        <span className="bg-blue-100 text-blue-805 border border-blue-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-blue-800">
          Academic Planner Hub
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-2 tracking-tight">
          Upcoming Events & Orientations Calendar
        </h2>
        <p className="mt-2 text-slate-600 text-sm font-medium">
          Monitor upcoming open houses, admission examination dates, and orientation events. Search and subscribe to live alerts for schools you coordinate with.
        </p>
      </div>

      {/* Subscriptions Dashboard (For Parents) */}
      {currentUser && currentUser.role === 'parent' && (
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] mb-8 flex flex-col md:flex-row items-center justify-between gap-6" id="alerts-config-box">
          <div className="space-y-2 text-left">
            <h4 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500 fill-amber-500 animate-swing" />
              Notification & Email Reminders Subscription
            </h4>
            <p className="text-xs text-slate-600 font-medium max-w-3xl leading-relaxed">
              Enable priority schedules! When you Follow/Favorite a school, subscription activates automatic push alerts and email summaries 24 hours prior to scheduled Open Houses, Orientation Days, or Admission Tests.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
              <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                ⭐ {favorites.length} Followed institutions
              </span>
              <span className={`px-2 py-0.5 rounded font-bold border ${isSubscribedNotifications ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                {isSubscribedNotifications ? '● Push Alerts active' : '○ Reminders disabled'}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleSubAlert}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs transition-all border-2 border-slate-900 whitespace-nowrap ${
              isSubscribedNotifications
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
            }`}
          >
            {isSubscribedNotifications ? (
              <>
                <BellOff className="w-4 h-4" />
                <span>Unsubscribe Reminders</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                <span>Subscribe to Alerts</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* FILTER CONTROL STATION */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 mb-8 space-y-4" id="event-filters-station">
        
        {/* Row 1: Search Queries and Following restriction */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search events by keywords, themes, or school names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full casual-input pl-10 py-2.5 text-xs bg-slate-50 focus:bg-white"
            />
          </div>

          {currentUser && currentUser.role === 'parent' && (
            <label className="flex items-center gap-2 px-4 py-2 border-2 border-slate-900 bg-amber-50/40 rounded-xl cursor-pointer self-start md:self-auto shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold text-xs">
              <input
                type="checkbox"
                checked={onlyFollowed}
                onChange={(e) => setOnlyFollowed(e.target.checked)}
                className="rounded border-slate-350 border-slate-300 text-slate-950 focus:ring-slate-900 w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-800">Only Show My Followed Schools</span>
            </label>
          )}

        </div>

        {/* Row 2: Categorization dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Filter by School</label>
            <select
              value={filterSchoolId}
              onChange={(e) => setFilterSchoolId(e.target.value)}
              className="w-full casual-input px-3 py-2 text-xs bg-slate-50"
            >
              <option value="all">🔎 All Registered Schools</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  🏫 {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Filter by Category</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full casual-input px-3 py-2 text-xs bg-slate-50"
            >
              <option value="all">🎨 All Event Categories</option>
              <option value="open_house">🏫 Open Houses</option>
              <option value="orientation">🎒 Orientation Days</option>
              <option value="admission_test">📝 Admission Test Dates</option>
              <option value="event">⭐ Major Events</option>
              <option value="exam">📚 Examinations</option>
              <option value="holiday">🌴 Holidays / Vacations</option>
              <option value="term_start_end">📅 Term Milestones</option>
            </select>
          </div>

          <div className="flex items-end sm:col-span-2 lg:col-span-1 justify-end">
            <button
              onClick={() => {
                setFilterSchoolId('all');
                setFilterType('all');
                setOnlyFollowed(false);
                setSearchQuery('');
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 leading-none"
            >
              <span>Reset Search Filters</span>
            </button>
          </div>

        </div>

      </div>

      {/* CHRONOLOGICAL LIST OF EVENTS */}
      <div className="space-y-4" id="events-grid-listing">
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white border-2 border-slate-900 rounded-3xl p-8 space-y-4 shadow-sm" id="empty-events-banner">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">No Scheduled Events Found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              We couldn't locate any events matching your selected search query, categorization, or follow criteria. Modify your selection or register a new one to populate.
            </p>
            {onlyFollowed && favorites.length === 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg p-3 max-w-sm mx-auto">
                  💡 Tip: You aren't following any schools yet. Turn off the 'Only Show My Followed Schools' toggle above to view public happenings!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((event, idx) => {
              const badge = getEventBadgeDetails(event.type);
              return (
                <div
                  key={`${event.schoolId}-${event.title}-${idx}`}
                  className="bg-white border-2 border-slate-900 rounded-2xl p-5 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all relative group text-left"
                >
                  <div>
                    {/* Header: Date and subscription notifier */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-xs bg-slate-100 border border-slate-350 border-slate-200 text-slate-805 text-slate-700 px-2.5 py-1 rounded-lg font-mono font-bold leading-none shrink-0">
                        🗓️ {parseReadableDate(event.date)}
                      </span>
                      
                      {currentUser?.role === 'parent' && (
                        <button
                          onClick={() => {
                            onToggleFavorite(event.schoolId);
                            const action = favorites.includes(event.schoolId) ? 'Unfollowed' : 'Followed';
                            triggerToast(`💖 ${action} ${event.schoolName}. Reminders active and saved!`);
                          }}
                          className={`p-1.5 rounded-lg border transition-all ${
                            event.isFollowed
                              ? 'bg-rose-550 bg-rose-500 border-rose-300 text-white shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                          }`}
                          title={event.isFollowed ? 'Unfollow parent school' : 'Follow school to receive alerts'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${event.isFollowed ? 'fill-current' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* School reference */}
                    <button
                      onClick={() => onSelectSchool(event.schoolId)}
                      className="text-[11px] font-bold text-blue-650 hover:underline hover:text-blue-700 truncate block text-blue-600 mb-1 leading-none text-left"
                    >
                      🏫 {event.schoolName}
                    </button>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-950 font-sans tracking-tight mb-2">
                      {event.title}
                    </h3>

                    {/* Category Type Badge */}
                    <span className={`inline-block border text-[10px] font-bold px-2 py-0.5 rounded-md font-mono tracking-wide ${badge.classes} mb-3 uppercase`}>
                      {badge.label}
                    </span>

                    {/* Description */}
                    {event.description && (
                      <p className="text-slate-600 text-xs font-semibold leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Notification Alert Strip for Followed/Favorited Schools */}
                  {currentUser?.role === 'parent' && event.isFollowed && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5 text-[11px]" id={`notif-alert-strip-${idx}`}>
                      <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
                        <span>Reminders Enrolled</span>
                      </span>

                      {isSubscribedNotifications ? (
                        <span className="text-slate-400 font-medium flex items-center gap-1 font-mono">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Push & Email ON</span>
                        </span>
                      ) : (
                        <button
                          onClick={handleToggleSubAlert}
                          className="text-[10px] text-amber-700 hover:underline font-bold"
                        >
                          Enable Alert System
                        </button>
                      )}
                    </div>
                  )}

                  {/* Non-followed prompt */}
                  {currentUser?.role === 'parent' && !event.isFollowed && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-450 text-slate-400 font-semibold italic">Reminders inactive</span>
                      <button
                        onClick={() => {
                          onToggleFavorite(event.schoolId);
                          triggerToast(`💖 Followed ${event.schoolName}. Auto-enrolled in event notifications!`);
                        }}
                        className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Follow to Enable Alerts</span>
                        <span>🔔</span>
                      </button>
                    </div>
                  )}

                  {/* Public placeholder (Logged Out) */}
                  {!currentUser && (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                      <span className="text-[10px] text-slate-400 italic">
                        🔒 Sign in as parent to receive email/push notifications
                      </span>
                    </div>
                  )}
                  
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
