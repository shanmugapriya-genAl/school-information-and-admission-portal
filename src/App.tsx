/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { School, User, SchoolAdmissionApplication, SchoolReview } from './types';
import { SEED_SCHOOLS, INITIAL_REVIEWS } from './data/seedData';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { SchoolCard } from './components/SchoolCard';
import { SchoolDetail } from './components/SchoolDetail';
import { SchoolForm } from './components/SchoolForm';
import { MyApplications } from './components/MyApplications';
import { EventsPage } from './components/EventsPage';
import {
  DoodleSchool, DoodleBus, DoodleStar, DoodleArrow,
  DoodleSparkle, DoodleCloud, DoodleLineDivider
} from './components/Doodles';
import {
  Search, SlidersHorizontal, MapPin, GraduationCap,
  BookOpen, Plus, Landmark, Briefcase, UserPlus, CheckCircle, RefreshCw, X
} from 'lucide-react';

export default function App() {
  // --- STATE ---
  const [schools, setSchools] = useState<School[]>([]);
  const [applications, setApplications] = useState<SchoolAdmissionApplication[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Dynamic branding customizations state
  const [themeColor, setThemeColor] = useState<'amber' | 'emerald' | 'indigo' | 'rose' | 'violet'>(() => {
    return (localStorage.getItem('campusbridge_theme_color') as any) || 'amber';
  });
  const [tagline, setTagline] = useState<string>(() => {
    return localStorage.getItem('campusbridge_tagline') || 'The Smart Pathway to Academic Success';
  });

  // Synchronize dynamic theme accent color CSS properties
  useEffect(() => {
    const themeMappings = {
      amber: {
        primary: '#fbbf24',
        primaryHover: '#f59e0b',
        light: '#fef3c7',
        lightHover: '#fde68a',
        dark: '#b45309',
      },
      emerald: {
        primary: '#34d399',
        primaryHover: '#10b981',
        light: '#ecfdf5',
        lightHover: '#d1fae5',
        dark: '#047857',
      },
      indigo: {
        primary: '#818cf8',
        primaryHover: '#6366f1',
        light: '#f5f3ff',
        lightHover: '#e0e7ff',
        dark: '#4338ca',
      },
      rose: {
        primary: '#fb7185',
        primaryHover: '#f43f5e',
        light: '#fff1f2',
        lightHover: '#ffe4e6',
        dark: '#be123c',
      },
      violet: {
        primary: '#a78bfa',
        primaryHover: '#8b5cf6',
        light: '#faf5ff',
        lightHover: '#f3e8ff',
        dark: '#6d28d9',
      }
    };

    const scheme = themeMappings[themeColor] || themeMappings.amber;
    const s = document.documentElement.style;
    s.setProperty('--theme-primary', scheme.primary);
    s.setProperty('--theme-primary-hover', scheme.primaryHover);
    s.setProperty('--theme-light', scheme.light);
    s.setProperty('--theme-light-hover', scheme.lightHover);
    s.setProperty('--theme-dark', scheme.dark);

    localStorage.setItem('campusbridge_theme_color', themeColor);
  }, [themeColor]);

  // Synchronize tagline changes
  useEffect(() => {
    localStorage.setItem('campusbridge_tagline', tagline);
  }, [tagline]);
  
  // Reviews, Favorites and Notification Subscriptions
  const [reviews, setReviews] = useState<SchoolReview[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSubscribedNotifications, setIsSubscribedNotifications] = useState<boolean>(true);

  // View state coordinates
  const [activeTab, setActiveTab] = useState<'browse' | 'my-applications' | 'manage-school' | 'events'>('browse');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [editingSchool, setEditingSchool] = useState(false);
  
  // Auth Modal trigger
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });

  // Filter controllers
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterBoard, setFilterBoard] = useState<string>('All');
  const [filterStandard, setFilterStandard] = useState<string>('All');
  const [filterFeesType, setFilterFeesType] = useState<'all' | 'below' | 'above'>('all');
  const [filterFeesAmount, setFilterFeesAmount] = useState<number>(60000);
  const [showAdvanceFilters, setShowAdvanceFilters] = useState(false);

  // --- CORE LIFECYCLE SEEDING ---
  useEffect(() => {
    // 1. Recover schools from localStorage, or seed SEED_SCHOOLS
    try {
      const savedSchoolsRaw = localStorage.getItem('eduregistry_schools');
      if (savedSchoolsRaw) {
        setSchools(JSON.parse(savedSchoolsRaw));
      } else {
        setSchools(SEED_SCHOOLS);
        localStorage.setItem('eduregistry_schools', JSON.stringify(SEED_SCHOOLS));
      }
    } catch (e) {
      console.error('Error recovering schools database', e);
      setSchools(SEED_SCHOOLS);
    }

    // 2. Recover applications from localStorage
    try {
      const savedAppsRaw = localStorage.getItem('eduregistry_applications');
      if (savedAppsRaw) {
        setApplications(JSON.parse(savedAppsRaw));
      } else {
        setApplications([]);
      }
    } catch (e) {
      console.error('Error recovering admissions database', e);
    }

    // 3. Recover active sessions
    try {
      const activeSessionRaw = localStorage.getItem('eduregistry_active_session');
      if (activeSessionRaw) {
        setCurrentUser(JSON.parse(activeSessionRaw));
      }
    } catch (e) {
      console.error('Error recovering session info', e);
    }

    // 4. Recover reviews database or load INITIAL_REVIEWS
    try {
      const savedReviewsRaw = localStorage.getItem('eduregistry_reviews');
      if (savedReviewsRaw) {
        setReviews(JSON.parse(savedReviewsRaw));
      } else {
        setReviews(INITIAL_REVIEWS);
        localStorage.setItem('eduregistry_reviews', JSON.stringify(INITIAL_REVIEWS));
      }
    } catch (e) {
      console.error('Error recovering reviews database', e);
      setReviews(INITIAL_REVIEWS);
    }

    // 5. Recover favorites list
    try {
      const savedFavs = localStorage.getItem('eduregistry_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error('Error recovering favorites', e);
    }

    // 6. Recover notification alert toggle
    try {
      const savedSubToggle = localStorage.getItem('eduregistry_notif_sub');
      if (savedSubToggle !== null) {
        setIsSubscribedNotifications(JSON.parse(savedSubToggle));
      }
    } catch (e) {
      console.error('Error recovering subscription option', e);
    }
  }, []);

  // --- HANDLERS ---
  const handleAuthenticate = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('eduregistry_active_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eduregistry_active_session');
    setActiveTab('browse');
    setSelectedSchoolId(null);
  };

  const handleReviewSubmit = (review: Omit<SchoolReview, 'id' | 'createdDate'>) => {
    const newReview: SchoolReview = {
      ...review,
      id: `rev-${Date.now()}`,
      createdDate: new Date().toISOString()
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('eduregistry_reviews', JSON.stringify(updatedReviews));
  };

  const handleToggleFavorite = (schoolId: string) => {
    let updated: string[];
    if (favorites.includes(schoolId)) {
      updated = favorites.filter((id) => id !== schoolId);
    } else {
      updated = [...favorites, schoolId];
    }
    setFavorites(updated);
    localStorage.setItem('eduregistry_favorites', JSON.stringify(updated));
  };

  const handleToggleNotifications = () => {
    const nextVal = !isSubscribedNotifications;
    setIsSubscribedNotifications(nextVal);
    localStorage.setItem('eduregistry_notif_sub', JSON.stringify(nextVal));
  };

  const handleApplyAdmissions = (
    appData: Omit<SchoolAdmissionApplication, 'id' | 'appliedDate' | 'status'>
  ) => {
    if (!currentUser) return;

    const newApplication: SchoolAdmissionApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString(),
      status: 'Pending'
    };

    const updatedApps = [newApplication, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('eduregistry_applications', JSON.stringify(updatedApps));
  };

  const handlePublishSchool = (newSchool: School) => {
    let updatedSchools: School[];
    const exists = schools.some((s) => s.id === newSchool.id);

    if (exists) {
      updatedSchools = schools.map((s) => (s.id === newSchool.id ? newSchool : s));
    } else {
      updatedSchools = [newSchool, ...schools];
    }

    setSchools(updatedSchools);
    localStorage.setItem('eduregistry_schools', JSON.stringify(updatedSchools));
    
    // Auto-update user's associated school if needed
    if (currentUser) {
      const updatedUser: User = { ...currentUser, associatedSchoolId: newSchool.id };
      setCurrentUser(updatedUser);
      localStorage.setItem('eduregistry_active_session', JSON.stringify(updatedUser));

      // Also persistence save in central users list
      const savedUsersRaw = localStorage.getItem('eduregistry_users');
      if (savedUsersRaw) {
        const usersList: User[] = JSON.parse(savedUsersRaw);
        const updatedUsersList = usersList.map((u) => (u.id === currentUser.id ? updatedUser : u));
        localStorage.setItem('eduregistry_users', JSON.stringify(updatedUsersList));
      }
    }

    // Direct back to main board
    setActiveTab('browse');
    setSelectedSchoolId(newSchool.id); // View their registered profile
  };

  // Delete a school registered by this admin
  const handleDeleteMySchool = (schoolId: string) => {
    if (window.confirm('Are you sure you want to remove this school listing profile? This is irreversible.')) {
      const updatedSchools = schools.filter((s) => s.id !== schoolId);
      setSchools(updatedSchools);
      localStorage.setItem('eduregistry_schools', JSON.stringify(updatedSchools));

      if (currentUser) {
        const updatedUser: User = { ...currentUser, associatedSchoolId: undefined };
        setCurrentUser(updatedUser);
        localStorage.setItem('eduregistry_active_session', JSON.stringify(updatedUser));
      }
    }
  };

  // Simulate an application status review change for testing (Admins can toggle standard application states)
  const handleToggleApplicationStatus = (appId: string, nextStatus: SchoolAdmissionApplication['status']) => {
    const updated = applications.map((app) => (app.id === appId ? { ...app, status: nextStatus } : app));
    setApplications(updated);
    localStorage.setItem('eduregistry_applications', JSON.stringify(updated));
  };

  // --- FILTER CRITERIA EVALUATION ---
  const filteredSchools = schools.filter((school) => {
    // 1. Free search filter (matches name, location, or curriculum activities)
    const matchesSearch =
      searchQuery.trim() === '' ||
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.locationSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.extracurricularActivities.some((act) => act.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. City location selection filter
    const matchesLocation =
      filterLocation.trim() === '' ||
      school.locationSummary.toLowerCase().includes(filterLocation.toLowerCase()) ||
      school.contactInfo.city.toLowerCase().includes(filterLocation.toLowerCase());

    // 3. Board of Education filter
    const matchesBoard = filterBoard === 'All' || school.boardOfEducation === filterBoard;

    // 4. Standards Available Grade Filter
    const matchesStandard =
      filterStandard === 'All' ||
      school.standardsAvailable.some(
        (std) => std.toLowerCase().includes(filterStandard.toLowerCase()) || filterStandard.includes(std)
      );

    // 5. Tuition Fees Threshold Filter
    // Extract maximum tuition fee of this school to check bounds
    const tuitionFees = school.feeStructure.map((f) => f.tuitionFee);
    const minTuition = tuitionFees.length > 0 ? Math.min(...tuitionFees) : 0;
    const maxTuition = tuitionFees.length > 0 ? Math.max(...tuitionFees) : 0;

    let matchesFees = true;
    if (filterFeesType === 'below') {
      matchesFees = minTuition <= filterFeesAmount;
    } else if (filterFeesType === 'above') {
      matchesFees = maxTuition >= filterFeesAmount;
    }

    return matchesSearch && matchesLocation && matchesBoard && matchesStandard && matchesFees;
  });

  // Extract unique locations/cities for easy selection assistant tags
  const uniqueCities = Array.from(
    new Set(schools.map((s) => s.contactInfo.city).filter((c) => c && c.trim().length > 0))
  );

  // Switch view from Card selections
  const handleSelectSchoolCard = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find school admin's registered school (if they have one)
  const myAdminSchool = currentUser?.role === 'school_admin'
    ? schools.find((s) => s.registeredByUserId === currentUser.id) || null
    : null;

  // Find all admissions requests sent to myAdminSchool
  const receivedApplications = myAdminSchool
    ? applications.filter((app) => app.schoolId === myAdminSchool.id)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-light flex flex-col justify-between">
      
      {/* 1. Header Navigation */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedSchoolId(null);
        }}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onLogout={handleLogout}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        tagline={tagline}
        setTagline={setTagline}
      />

      {/* 2. Main Content Board */}
      <main className="flex-grow pb-16">
        
        {/* --- LANDING HERO (SIMPLE INTRUDUCTION / DOODLES CANVAS) --- */}
        {selectedSchoolId === null && activeTab === 'browse' && (
          <div className="relative overflow-hidden bg-gradient-to-b from-brand-light/75 to-transparent border-b border-slate-200 py-12 sm:py-16">
            
            {/* Draw Sketchy Clouds in corner */}
            <DoodleCloud className="absolute top-6 left-12 w-14 h-10 text-slate-300 opacity-80" />
            <DoodleCloud className="absolute top-16 right-16 w-20 h-12 text-slate-300 opacity-60 hidden md:block" />
            <DoodleArrow className="absolute top-2/3 right-1/4 w-12 h-12 text-slate-400 rotate-12 hidden lg:block" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
              
              {/* Star doodle badges */}
              <div className="flex justify-center mb-4">
                <div className="relative inline-flex items-center gap-1.5 bg-brand-light text-brand-dark text-xs font-bold px-3.5 py-1 rounded-full border border-brand-primary/50">
                  <DoodleStar className="w-3.5 h-3.5" fill={true} />
                  <span>Institutional Multi-Board Search Standardize Engine</span>
                </div>
              </div>

              {/* Catchy headline */}
              <h2 className="text-4xl sm:text-5xl font-black text-slate-950 font-sans tracking-tight max-w-2xl mx-auto leading-none">
                Find the perfect{' '}
                <span className="relative inline-block text-slate-950 px-2">
                  school
                  <span className="absolute left-0 right-0 bottom-1 h-3 bg-brand-primary/60 -z-10 transform -rotate-1" />
                </span>{' '}
                for your children.
              </h2>
              
              <p className="mt-4 text-slate-600 sm:text-lg max-w-xl mx-auto font-medium">
                CampusBridge connects schools and parents. Explore verified fee structure profiles, academic calendars, and submit application forms.
              </p>

              {/* Two quick registration channels */}
              {!currentUser && (
                <div className="mt-8 flex flex-wrap justify-center gap-4" id="home-intro-ctas">
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-amber-50 hover:bg-slate-800 font-bold text-sm rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] sketchy-badge"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Join as Parent</span>
                  </button>
                  <button
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: 'signup' });
                      // Instruct users they can switch role inside registration modal
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <Landmark className="w-4 h-4" />
                    <span>School Registry Enrollment</span>
                  </button>
                </div>
              )}

              {/* Hand drawn school bus & school animation showcase */}
              <div className="mt-12 max-w-md mx-auto grid grid-cols-2 gap-8 items-center bg-white/40 p-4 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <DoodleSchool className="w-20 h-16 text-slate-700 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 mt-1 uppercase">Institutions Registry</span>
                </div>
                <div className="flex flex-col items-center border-l border-slate-200">
                  <DoodleBus className="w-20 h-16 text-slate-705 text-slate-700" />
                  <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 mt-1 uppercase">Safety Bus Routing</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- DYNAMIC DIRECTORY SCREEN: SEARCH, FILTER, AND GRIDS --- */}
        {selectedSchoolId === null && activeTab === 'browse' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            
            {/* Search and Filters Section */}
            <div className="bg-white border-2 border-slate-905 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mb-8" id="search-filters-panel">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                
                {/* Search Bar text */}
                <div className="flex-grow relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by school name, keyword or activity (e.g. Robotics, ICSE, Seattle)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full casual-input pl-11 pr-4 py-3 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-950"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Search Assistant Trigger / Accordion */}
                <button
                  onClick={() => setShowAdvanceFilters(!showAdvanceFilters)}
                  className={`px-5 py-3 border-2 border-slate-900 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                    showAdvanceFilters 
                      ? 'bg-amber-100 dark:bg-amber-50 text-slate-950 shadow-none' 
                      : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                  }`}
                  id="toggle-filters-btn"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Advanced Refiners</span>
                  <span className="text-xs px-1.5 py-0.5 bg-slate-100 rounded-full text-slate-600 font-bold">
                    { [filterLocation, filterBoard !== 'All' ? '1' : '', filterStandard !== 'All' ? '1' : '', filterFeesType !== 'all' ? '1' : ''].filter(Boolean).length }
                  </span>
                </button>
              </div>

              {/* Expandable Advanced Filters Drawer */}
              {showAdvanceFilters && (
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 transition-all duration-300 ease-in-out" id="advanced-filters-drawer">
                  
                  {/* Filter Location Input */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>By Location/City</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Seattle, Bangalore"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="w-full casual-input px-3 py-2 text-xs"
                    />

                    {/* Quick helper location pills */}
                    {uniqueCities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5" id="quick-cities-selector">
                        {uniqueCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => setFilterLocation(city)}
                            className="text-[9.5px] px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 rounded font-semibold transition-all"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Filter Educational Board dropdown */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>Board of Education</span>
                    </label>
                    <select
                      value={filterBoard}
                      onChange={(e) => setFilterBoard(e.target.value)}
                      className="w-full casual-input px-3 py-2 text-xs bg-white"
                      id="filter-board-select"
                    >
                      <option value="All">All Curriculums</option>
                      <option value="CBSE">CBSE (Central Board)</option>
                      <option value="ICSE">ICSE (Coveted ICSE)</option>
                      <option value="State Board">State Board</option>
                      <option value="IB">IB (International)</option>
                      <option value="IGCSE">IGCSE (British)</option>
                    </select>
                  </div>

                  {/* Filter Standard Dropdown */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>Class Standard</span>
                    </label>
                    <select
                      value={filterStandard}
                      onChange={(e) => setFilterStandard(e.target.value)}
                      className="w-full casual-input px-3 py-2 text-xs bg-white"
                      id="filter-standard-select"
                    >
                      <option value="All">All Standards</option>
                      <option value="Nursery">Nursery / Pre-K</option>
                      <option value="Kindergarten">Kindergarten</option>
                      <option value="Primary (Grade 1-5)">Primary (Grade 1-5)</option>
                      <option value="Middle (Grade 6-8)">Middle (Grade 6-8)</option>
                      <option value="High School">High School (Grade 9-10)</option>
                      <option value="Higher Secondary">Higher Secondary (Grade 11-12)</option>
                    </select>
                  </div>

                  {/* Filter Budget Fee range limits */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Annual Tuition Fees Bounds
                    </label>
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => setFilterFeesType('all')}
                        className={`flex-1 py-1 text-[10px] uppercase font-bold rounded border ${
                          filterFeesType === 'all'
                            ? 'bg-slate-900 border-slate-900 text-amber-50'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Any Price
                      </button>
                      <button
                        onClick={() => setFilterFeesType('below')}
                        className={`flex-1 py-1 text-[10px] uppercase font-bold rounded border ${
                          filterFeesType === 'below'
                            ? 'bg-amber-300 border-amber-400 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        id="filter-fees-below-btn"
                      >
                        Below
                      </button>
                      <button
                        onClick={() => setFilterFeesType('above')}
                        className={`flex-1 py-1 text-[10px] uppercase font-bold rounded border ${
                          filterFeesType === 'above'
                            ? 'bg-amber-350 bg-amber-200 border-amber-300 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        id="filter-fees-above-btn"
                      >
                        Above
                      </button>
                    </div>

                    {filterFeesType !== 'all' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                          <span>$10,000</span>
                          <span className="text-slate-950 font-black">${filterFeesAmount.toLocaleString()}</span>
                          <span>$200,000</span>
                        </div>
                        <input
                          type="range"
                          min="10000"
                          max={200000}
                          step="5000"
                          value={filterFeesAmount}
                          onChange={(e) => setFilterFeesAmount(Number(e.target.value))}
                          className="w-full accent-amber-500 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* Active Refiners Badges indicator */}
              <div className="mt-4 flex flex-wrap gap-2 items-center" id="active-filter-badges">
                <span className="text-xs text-slate-400 font-bold">Active Refiners:</span>
                {filterLocation && (
                  <span className="text-[11px] font-semibold bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>City: {filterLocation}</span>
                    <button onClick={() => setFilterLocation('')} className="text-blue-500 hover:text-blue-800">×</button>
                  </span>
                )}
                {filterBoard !== 'All' && (
                  <span className="text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Board: {filterBoard}</span>
                    <button onClick={() => setFilterBoard('All')} className="text-emerald-500 hover:text-emerald-800">×</button>
                  </span>
                )}
                {filterStandard !== 'All' && (
                  <span className="text-[11px] font-semibold bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Grade: {filterStandard}</span>
                    <button onClick={() => setFilterStandard('All')} className="text-amber-500 hover:text-amber-800">×</button>
                  </span>
                )}
                {filterFeesType !== 'all' && (
                  <span className="text-[11px] font-semibold bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Fees: {filterFeesType === 'below' ? 'Under' : 'Over'} ${filterFeesAmount.toLocaleString()}</span>
                    <button onClick={() => setFilterFeesType('all')} className="text-rose-500 hover:text-rose-800">×</button>
                  </span>
                )}
                {(!filterLocation && filterBoard === 'All' && filterStandard === 'All' && filterFeesType === 'all') && (
                  <span className="text-xs text-slate-400 italic font-medium">None</span>
                )}
              </div>
            </div>

            {/* School cards results grid */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
                <span>Verified School Listings</span>
                <span className="text-sm px-2 py-0.5 bg-slate-200 text-slate-700 border border-slate-350 rounded-full font-bold">
                  {filteredSchools.length}
                </span>
              </h3>
              
              {/* Optional Admin quick list register helper */}
              {currentUser && currentUser.role === 'school_admin' && !myAdminSchool && (
                <button
                  onClick={() => setActiveTab('manage-school')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-amber-50 text-xs font-bold rounded-lg hover:bg-emerald-700 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register My School</span>
                </button>
              )}
            </div>

            {filteredSchools.length === 0 ? (
              <div className="text-center bg-white border-2 border-slate-900 rounded-3xl p-12 py-20 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" id="no-schools-empty-state">
                <DoodleSchool className="w-24 h-20 text-slate-405 text-slate-400 mx-auto opacity-50 mb-4" />
                <h4 className="text-lg font-black text-slate-800">No Matching Schools Found</h4>
                <p className="text-slate-500 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  We couldn't locate schools matching your combined filters. Try clearing advanced budget filters or search filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterLocation('');
                    setFilterBoard('All');
                    setFilterStandard('All');
                    setFilterFeesType('all');
                  }}
                  className="mt-6 px-4 py-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                >
                  Reset All Refiners
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="schools-listings-grid">
                {filteredSchools.map((school) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    reviews={reviews.filter((r) => r.schoolId === school.id)}
                    onSelect={() => handleSelectSchoolCard(school.id)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* --- SCHOOL DETAIL SCREEN --- */}
        {selectedSchoolId !== null && (
          (() => {
            const currentSelectedSchool = schools.find((s) => s.id === selectedSchoolId);
            return currentSelectedSchool ? (
              <SchoolDetail
                school={currentSelectedSchool}
                currentUser={currentUser}
                reviews={reviews.filter((r) => r.schoolId === currentSelectedSchool.id)}
                isFavorite={favorites.includes(currentSelectedSchool.id)}
                onToggleFavorite={handleToggleFavorite}
                onSubmitReview={handleReviewSubmit}
                onBack={() => setSelectedSchoolId(null)}
                onSubmitApplication={handleApplyAdmissions}
                applications={applications}
                onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
              />
            ) : (
              <div className="text-center py-12">School profile details has expired.</div>
            );
          })()
        )}

        {/* --- PARENTS APPLICATION PORTFOLIO SCREEN --- */}
        {activeTab === 'my-applications' && currentUser && currentUser.role === 'parent' && (
          <MyApplications
            currentUser={currentUser}
            applications={applications}
            onRefresh={() => {
              // Simulate checking server for status modifications
              const savedAppsRaw = localStorage.getItem('eduregistry_applications');
              if (savedAppsRaw) {
                setApplications(JSON.parse(savedAppsRaw));
              }
            }}
            onViewSchool={(schoolId) => {
              setActiveTab('browse');
              setSelectedSchoolId(schoolId);
            }}
          />
        )}

        {/* --- EVENTS PAGE TAB VIEW --- */}
        {activeTab === 'events' && (
          <EventsPage
            schools={schools}
            currentUser={currentUser}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isSubscribedNotifications={isSubscribedNotifications}
            onToggleNotifications={handleToggleNotifications}
            onSelectSchool={(schoolId) => {
              setActiveTab('browse');
              setSelectedSchoolId(schoolId);
            }}
          />
        )}

        {/* --- SCHOOL ADMIN CONTROL PANEL DASHBOARD --- */}
        {activeTab === 'manage-school' && currentUser && currentUser.role === 'school_admin' && (
          <div>
            {!myAdminSchool ? (
              /* IF NO SCHOOL REGISTERED YET: SHOW THE REGISTRATION FORM CONTAINER */
              <SchoolForm
                currentUser={currentUser}
                existingSchool={null}
                onSave={handlePublishSchool}
                onCancel={() => setActiveTab('browse')}
              />
            ) : (
              /* IF AN ACTIVE SCHOOL LISTING EXISTS: SHOW ADMIN OVERVIEW WITH CORRESPONDING APPLICATION TRACKER */
              <div className="max-w-5xl mx-auto py-8 px-4" id="school-admin-dashboard">
                
                {/* School Summary Header */}
                <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase py-0.5 px-2 bg-emerald-50 text-emerald-700 border border-emerald-250 border-emerald-200 rounded mb-2 inline-block">
                        ONLINE DIRECTORY ADMIN ACTIVE
                      </span>
                      <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
                        {myAdminSchool.name}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Managing profile listings data. Parents browse this live data.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSelectSchoolCard(myAdminSchool.id)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 hover:text-slate-950 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all font-mono"
                      >
                        👁️ PREVIEW LIVE PROFILE
                      </button>
                      <button
                        onClick={() => handleDeleteMySchool(myAdminSchool.id)}
                        className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
                      >
                        DELETE LISTING
                      </button>
                    </div>
                  </div>

                  <DoodleLineDivider className="text-slate-205 text-slate-200 mb-6" />

                  {/* Edit Form Embed Trigger button */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Update curriculum boards, pricing tables or facilities?</h4>
                      <p className="text-xs text-slate-500">Last updated: Just now</p>
                    </div>
                    
                    {/* Embedded form editor trigger */}
                    <button
                      onClick={() => {
                        // Instructing component to switch into editing mode
                        // We will set editing context state
                        // The user can edit elements seamlessly by setting myAdminSchool in SchoolForm
                        // We will open it below
                        // Let's create an "isEditing" sub-state
                        setSelectedSchoolId(null);
                        // Simulate opening edit form by toggling active tab parameters or state
                        // To keep UX clean, let's render edit form if a substate is active, or dynamically inline it!
                        // Let's implement editing state
                        setEditingSchool(true);
                      }}
                      className="px-5 py-2.5 bg-slate-950 text-amber-50 hover:bg-slate-800 font-bold text-xs rounded-xl shadow-md cursor-pointer whitespace-nowrap"
                    >
                      ✏️ Edit Complete School Profile
                    </button>
                  </div>
                </div>

                {/* ADMISSIONS TRACKER SENT TO MY SCHOOL */}
                <div className="bg-white border-2 border-slate-905 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
                      <span>Admissions Mailbox Applications</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-full">
                        {receivedApplications.length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage admissions pipeline registrations submitted by parents on the CampusBridge directory.
                    </p>
                  </div>

                  {receivedApplications.length === 0 ? (
                    <div className="text-center py-10" id="empty-mailbox-admissions">
                      <RefreshCw className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-slate-700">Admission mailbox is empty</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        No parents have placed standards applications to your school yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4" id="mailbox-applications-group">
                      {receivedApplications.map((app) => (
                        <div
                          key={app.id}
                          className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 text-sm"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">{app.studentName}</span>
                              <span className="px-2 py-0.5 bg-slate-200 text-slate-650 text-slate-700 text-[10px] font-bold rounded font-mono">
                                GRADE: {app.gradeApplying}
                              </span>
                            </div>
                            
                            <div className="text-xs text-slate-505 text-slate-600 space-y-0.5">
                              <div>Parent: <strong>{app.parentName}</strong> ({app.parentEmail})</div>
                              <div>Phone: <strong>{app.parentPhone}</strong></div>
                              {app.previousSchool && <div>Prior School: <span>{app.previousSchool}</span></div>}
                              {app.additionalInfo && (
                                <div className="mt-2 text-slate-400 italic text-[11px] bg-white p-2 border border-slate-100 rounded">
                                  "{app.additionalInfo}"
                                </div>
                              )}
                            </div>

                            <div className="text-[10px] text-slate-405 text-slate-400 font-mono pt-1">
                              Received: {new Date(app.appliedDate).toLocaleString()}
                            </div>
                          </div>

                          {/* Action Controllers for Admissions */}
                          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-2 shrink-0">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Pipeline Status: <strong>{app.status}</strong>
                            </span>

                            <div className="flex gap-1.5" id={`actions-${app.id}`}>
                              {app.status !== 'Accepted' && (
                                <button
                                  onClick={() => handleToggleApplicationStatus(app.id, 'Accepted')}
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all"
                                >
                                  Accept Candidate
                                </button>
                              )}
                              {app.status !== 'Under Review' && app.status !== 'Accepted' && (
                                <button
                                  onClick={() => handleToggleApplicationStatus(app.id, 'Under Review')}
                                  className="px-2.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-lg transition-all"
                                >
                                  Review State
                                </button>
                              )}
                              {app.status !== 'Declined' && (
                                <button
                                  onClick={() => handleToggleApplicationStatus(app.id, 'Declined')}
                                  className="px-2.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-105 text-xs font-bold rounded-lg transition-all"
                                >
                                  Decline
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

        {/* LOCAL SCOPE SUBSITE EDITOR POPUP OR ROW SWITCHER */}
        {activeTab === 'manage-school' && currentUser && currentUser.role === 'school_admin' && myAdminSchool && editingSchool && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-4 flex justify-center items-start pt-10">
            <div className="relative w-full max-w-4xl bg-slate-50 rounded-2xl p-4 border-2 border-slate-950 shadow-2xl">
              <button
                onClick={() => setEditingSchool(false)}
                className="absolute top-4 right-4 bg-white hover:bg-slate-100 p-2 border-2 border-slate-950 rounded-full z-15 text-slate-705 text-slate-700 transition-all font-bold text-sm"
              >
                ✕ Close Editor
              </button>
              
              <div className="max-h-[85vh] overflow-y-auto">
                <SchoolForm
                  currentUser={currentUser}
                  existingSchool={myAdminSchool}
                  onSave={(updatedSchool) => {
                    handlePublishSchool(updatedSchool);
                    setEditingSchool(false);
                  }}
                  onCancel={() => setEditingSchool(false)}
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Auth Modal embed */}
      {authModal.isOpen && (
        <AuthModal
          initialMode={authModal.mode}
          onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
          onAuthenticate={handleAuthenticate}
        />
      )}

      {/* 3. Aesthetic Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-4 border-t-2 border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-amber-300 font-extrabold text-lg flex items-center gap-1.5 font-sans">
              CampusBridge
            </span>
            <p className="text-xs text-slate-500 mt-2 max-w-sm">
              The humble standardized registry portal empowering school transparency and parents with simple search capabilities.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500">Registry Rules</span>
            <ul className="text-xs space-y-1.5 mt-2">
              <li className="hover:text-amber-100 transition-colors pointer-events-none">🏫 Multi-board Curriculum alignments</li>
              <li className="hover:text-amber-100 transition-colors pointer-events-none">🚗 Dynamic safety routing checklists</li>
              <li className="hover:text-amber-100 transition-colors pointer-events-none">📋 Instant Admissions digital submission</li>
            </ul>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block">Local Dev Time</span>
            <span className="text-sm font-bold text-slate-350 block mt-1">2026 CampusBridge, Inc.</span>
            <DoodleLineDivider className="text-amber-400/40 w-40 mt-3 ml-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-state context variable for App coordinate scope to support editing triggers smoothly
// We define a local state inside App body for `editingSchool` below.
// Let's add it near other states inside App component:
// We will edit the App component to add writing coordinates. Wait, since we are using create_file, let's look at what we've written!
// Wait! In our code block above, there is a reference to a variable `editingSchool` and `setEditingSchool` which needs to be defined inside the state section at the top of the App component.
// Let's check:
// Oh, yes! I should make sure `editingSchool` state is defined to avoid compiler errors! Let's check my written `App.tsx` context. Is `editingSchool` state declared?
// Looking at the states at the beginning of `App.tsx`:
// `const [schools, setSchools] = useState<School[]>([]);`
// `const [applications, setApplications] = useState<SchoolAdmissionApplication[]>([]);`
// `const [currentUser, setCurrentUser] = useState<User | null>(null);`
// `const [activeTab, setActiveTab] = useState<'browse' | 'my-applications' | 'manage-school'>('browse');`
// `const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);`
// `const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({ isOpen: false, mode: 'login' });`
// `const [editingSchool, setEditingSchool] = useState(false);` --> Oh, wait! I didn't write `const [editingSchool, setEditingSchool] = useState(false);` in the text above! Let's write the file correctly to include this state to ensure compiling is robust and clean.

// Let's update `App.tsx` using `create_file` again (with overwriting) to make sure `editingSchool` state is beautifully declared!
