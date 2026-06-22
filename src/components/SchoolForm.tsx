/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { School, SchoolFeeStructure, SchoolCalendarEvent, User } from '../types';
import { Plus, Trash, Save, School as SchoolIcon, Milestone, Calendar, ShieldCheck, CheckSquare, Sparkles, AlertCircle, Trophy, Award } from 'lucide-react';
import { DoodleSparkle, DoodleLineDivider } from './Doodles';

interface SchoolFormProps {
  currentUser: User | null;
  existingSchool: School | null;
  onSave: (school: School) => void;
  onCancel: () => void;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({
  currentUser,
  existingSchool,
  onSave,
  onCancel
}) => {
  // Tabs for progressive onboarding form
  const [activeFormTab, setActiveFormTab] = useState<'general' | 'academics' | 'transport' | 'achievements' | 'admissions'>('general');

  // Input States
  const [name, setName] = useState(existingSchool?.name || '');
  const [boardOfEducation, setBoardOfEducation] = useState<School['boardOfEducation']>(existingSchool?.boardOfEducation || 'CBSE');
  const [locationSummary, setLocationSummary] = useState(existingSchool?.locationSummary || '');
  
  // Standards available represented as selected checkboxes
  const standardsOptions = [
    'Nursery',
    'Kindergarten',
    'Primary (Grade 1-5)',
    'Middle (Grade 6-8)',
    'High School (Grade 9-10)',
    'Higher Secondary (Grade 11-12)'
  ];
  const [standardsAvailable, setStandardsAvailable] = useState<string[]>(
    existingSchool?.standardsAvailable || ['Kindergarten', 'Primary (Grade 1-5)']
  );

  // Address & Contacts
  const [email, setEmail] = useState(existingSchool?.contactInfo.email || '');
  const [phone, setPhone] = useState(existingSchool?.contactInfo.phone || '');
  const [website, setWebsite] = useState(existingSchool?.contactInfo.website || '');
  const [address, setAddress] = useState(existingSchool?.contactInfo.address || '');
  const [city, setCity] = useState(existingSchool?.contactInfo.city || '');
  const [state, setState] = useState(existingSchool?.contactInfo.state || '');

  // Fee Structure (Dynamic entries row adding)
  const [feeStructure, setFeeStructure] = useState<SchoolFeeStructure[]>(
    existingSchool?.feeStructure || [
      { gradeRange: 'Kindergarten', tuitionFee: 35000, admissionFee: 8000, otherFees: 2000 },
      { gradeRange: 'Primary (Grade 1-5)', tuitionFee: 48000, admissionFee: 10000, otherFees: 3000 }
    ]
  );

  // Extracurriculars input separated by commas
  const [extracurricularsText, setExtracurricularsText] = useState(
    existingSchool?.extracurricularActivities.join(', ') || 'Robotics, Basketball, Chess, Vocal Music'
  );

  // Bus transport
  const [busAvailable, setBusAvailable] = useState(existingSchool?.busFacilities.available ?? true);
  const [busFee, setBusFee] = useState(existingSchool?.busFacilities.busFee || 120);
  const [busRoutesText, setBusRoutesText] = useState(
    existingSchool?.busFacilities.routes.join(', ') || 'Airport Link Road, West City, Central Gate, Metro Sub-branch'
  );
  const [busSafetyText, setBusSafetyText] = useState(
    existingSchool?.busFacilities.safetyFeatures.join(', ') || 'GPS Speed trackers, Attendant, First Aid Box'
  );

  // Calendar events (Dynamic items)
  const [academicCalendar, setAcademicCalendar] = useState<SchoolCalendarEvent[]>(
    existingSchool?.academicCalendar || [
      { title: 'New Semester Reopens', date: '2026-06-01', type: 'term_start_end', description: 'Annual opening' },
      { title: 'Independent Day celebrations', date: '2026-08-15', type: 'event', description: 'Assembly program' }
    ]
  );
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventType, setNewEventType] = useState<SchoolCalendarEvent['type']>('event');

  // School Admissions info
  const [admissionInstructions, setAdmissionInstructions] = useState(
    existingSchool?.admissionInstructions || 'Submit student birth logs, current grades reports, and complete physical health verification card.'
  );
  const [admissionStartDate, setAdmissionStartDate] = useState(existingSchool?.admissionStartDate || '2026-04-01');
  const [admissionEndDate, setAdmissionEndDate] = useState(existingSchool?.admissionEndDate || '2026-07-31');
  const [imageUrl, setImageUrl] = useState(
    existingSchool?.imageUrl || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  );

  // Achievements States
  const [overallAnalysis, setOverallAnalysis] = useState(
    existingSchool?.academicAchievements?.overallAnalysis || ''
  );
  const [tenthToppers, setTenthToppers] = useState<NonNullable<School['academicAchievements']>['tenthToppers']>(
    existingSchool?.academicAchievements?.tenthToppers || []
  );
  const [twelfthToppers, setTwelfthToppers] = useState<NonNullable<NonNullable<School['academicAchievements']>['twelfthToppers']>>(
    existingSchool?.academicAchievements?.twelfthToppers || []
  );
  const [sportsAchievements, setSportsAchievements] = useState<NonNullable<School['sportsAchievements']>>(
    existingSchool?.sportsAchievements || []
  );

  // Tenth Toppers List Handlers
  const addTenthTopper = () => {
    setTenthToppers([...tenthToppers, { name: '', score: '', rank: tenthToppers.length + 1, badge: '', imageUrl: '' }]);
  };
  const updateTenthTopper = (index: number, key: string, value: any) => {
    const updated = [...tenthToppers];
    updated[index] = { ...updated[index], [key]: value };
    setTenthToppers(updated);
  };
  const removeTenthTopper = (index: number) => {
    setTenthToppers(tenthToppers.filter((_, i) => i !== index));
  };

  // Twelfth Toppers List Handlers
  const addTwelfthTopper = () => {
    setTwelfthToppers([...twelfthToppers, { name: '', score: '', rank: twelfthToppers.length + 1, badge: '', imageUrl: '' }]);
  };
  const updateTwelfthTopper = (index: number, key: string, value: any) => {
    const updated = [...twelfthToppers];
    updated[index] = { ...updated[index], [key]: value };
    setTwelfthToppers(updated);
  };
  const removeTwelfthTopper = (index: number) => {
    setTwelfthToppers(twelfthToppers.filter((_, i) => i !== index));
  };

  // Sports Achievements List Handlers
  const addSportsAchievement = () => {
    setSportsAchievements([...sportsAchievements, { title: '', event: '', year: new Date().getFullYear().toString(), rankOrStatus: '', description: '', imageUrl: '' }]);
  };
  const updateSportsAchievement = (index: number, key: string, value: any) => {
    const updated = [...sportsAchievements];
    updated[index] = { ...updated[index], [key]: value };
    setSportsAchievements(updated);
  };
  const removeSportsAchievement = (index: number) => {
    setSportsAchievements(sportsAchievements.filter((_, i) => i !== index));
  };

  const [validationError, setValidationError] = useState('');

  // Auto layout boilerplate seeding helper
  const handleLoadSample = () => {
    setName('Sunflower Academy of Excellence');
    setBoardOfEducation('CBSE');
    setLocationSummary('Green Acres, San Francisco');
    setStandardsAvailable(['Nursery', 'Kindergarten', 'Primary (Grade 1-5)', 'Middle (Grade 6-8)']);
    setEmail('contact@sunfloweracademy.edu');
    setPhone('+1 (415) 555-0925');
    setWebsite('www.sunfloweracademy.edu');
    setAddress('828 Golden Gate Ave');
    setCity('San Francisco');
    setState('CA');
    setExtracurricularsText('Symphony Orchestra, Robotics Lab, Swimming Team, French Language Club');
    setImageUrl('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
    setOverallAnalysis('Our academy registers excellent board scores with comprehensive student success across sports and science olympiads.');
    setTenthToppers([
      { name: 'Alice Smith', score: '98.4%', rank: 1, badge: 'Presidential Gold Medalist', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { name: 'Bob Jones', score: '97.2%', rank: 2, badge: 'Academic Honors', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ]);
    setTwelfthToppers([
      { name: 'Charlie Brown', score: '99.1%', rank: 1, badge: 'State Rank #1', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' }
    ]);
    setSportsAchievements([
      { title: 'National Basketball Championship', event: 'Under-17 Inter-School Athletics', year: '2024', rankOrStatus: 'Winners / Gold Medal', description: 'Defeated city competitors in a dramatic double-overtime final match.', imageUrl: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=400&auto=format&fit=crop&q=80' }
    ]);
  };

  // Switch check boxes
  const toggleStandardSelection = (opt: string) => {
    if (standardsAvailable.includes(opt)) {
      setStandardsAvailable(standardsAvailable.filter((x) => x !== opt));
    } else {
      setStandardsAvailable([...standardsAvailable, opt]);
    }
  };

  // Add Dynamic Fee Structures entry
  const addFeeRow = () => {
    setFeeStructure([...feeStructure, { gradeRange: 'Grade Level', tuitionFee: 40000, admissionFee: 5000, otherFees: 2000 }]);
  };

  const updateFeeRow = (index: number, key: keyof SchoolFeeStructure, value: any) => {
    const updated = [...feeStructure];
    updated[index] = { ...updated[index], [key]: value };
    setFeeStructure(updated);
  };

  const removeFeeRow = (index: number) => {
    setFeeStructure(feeStructure.filter((_, i) => i !== index));
  };

  // Add Dynamic calendar row
  const addCalendarEvent = () => {
    if (!newEventTitle || !newEventDate) return;
    const newEvent: SchoolCalendarEvent = {
      title: newEventTitle,
      date: newEventDate,
      type: newEventType
    };
    setAcademicCalendar([...academicCalendar, newEvent]);
    setNewEventTitle('');
    setNewEventDate('');
  };

  const removeCalendarEvent = (index: number) => {
    setAcademicCalendar(academicCalendar.filter((_, i) => i !== index));
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('School Name is required.');
      return;
    }
    if (standardsAvailable.length === 0) {
      setValidationError('Please select at least one educational standard available.');
      return;
    }
    if (!email.trim() || !phone.trim() || !city.trim()) {
      setValidationError('Please provide core contact details (Email, Phone, and City).');
      return;
    }

    const schoolObject: School = {
      id: existingSchool?.id || `school-${Date.now()}`,
      name: name.trim(),
      boardOfEducation,
      standardsAvailable,
      locationSummary: locationSummary.trim() || `${city}, ${state}`,
      contactInfo: {
        email: email.trim(),
        phone: phone.trim(),
        website: website.trim() || 'www.schoolwebsite.edu',
        address: address.trim(),
        city: city.trim(),
        state: state.trim()
      },
      extracurricularActivities: extracurricularsText
        .split(',')
        .map((x) => x.trim())
        .filter((x) => x.length > 0),
      feeStructure,
      busFacilities: {
        available: busAvailable,
        busFee: busAvailable ? Number(busFee) : 0,
        routes: busAvailable
          ? busRoutesText
              .split(',')
              .map((x) => x.trim())
              .filter((x) => x.length > 0)
          : [],
        safetyFeatures: busAvailable
          ? busSafetyText
              .split(',')
              .map((x) => x.trim())
              .filter((x) => x.length > 0)
          : []
      },
      academicCalendar,
      academicAchievements: {
        overallAnalysis: overallAnalysis.trim(),
        tenthToppers,
        twelfthToppers
      },
      sportsAchievements,
      admissionInstructions: admissionInstructions.trim(),
      admissionStartDate,
      admissionEndDate,
      registeredByUserId: currentUser?.id,
      imageUrl: imageUrl.trim()
    };

    onSave(schoolObject);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4" id="register-school-portal">
      {/* Title & Headline Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SchoolIcon className="w-8 h-8 text-emerald-600" />
            <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
              SCHOOL REGISTRY ADMIN
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
            {existingSchool ? 'Update School Details' : 'Register New School Profile'}
          </h2>
          <p className="text-slate-500 text-sm">
            Publish curriculum, fee tables, extracurriculars, transport, and calendars for looking parents.
          </p>
        </div>

        {!existingSchool && (
          <button
            type="button"
            onClick={handleLoadSample}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl sketchy-border-sm cursor-pointer transition-all shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ Seed Sample Template</span>
          </button>
        )}
      </div>

      <DoodleLineDivider className="text-slate-200 mb-8" />

      {/* Main Validation Alert */}
      {validationError && (
        <div className="p-4 mb-6 bg-rose-50 border-2 border-rose-300 text-rose-800 text-sm rounded-xl font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Form Tabs Navigator */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-1 mb-8" id="form-tab-bar">
        {(['general', 'academics', 'transport', 'achievements', 'admissions'] as const).map((tab) => {
          const labels = {
            general: '1. General & Contact',
            academics: '2. Academics & Fees',
            transport: '3. Bus & Activities',
            achievements: '4. Achievements & Trophies',
            admissions: '5. Admissions Control'
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveFormTab(tab)}
              className={`py-3 px-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all shrink-0 ${
                activeFormTab === tab
                  ? 'border-slate-900 text-slate-950 bg-slate-50/50'
                  : 'border-transparent text-slate-450 text-slate-500 hover:text-slate-800'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Form Main Body */}
      <form onSubmit={handleFormSubmission} className="space-y-8 bg-white border-2 border-slate-900 p-6 sm:p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
        
        {/* TAB 1: General & Contact Info */}
        {activeFormTab === 'general' && (
          <div className="space-y-6" id="form-tab-pane-general">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Milestone className="w-5 h-5 text-amber-500" />
              General Institutional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* School Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  School Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. St. Xavier Academic Campus"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full casual-input px-3.5 py-2.5 text-sm"
                />
              </div>

              {/* Board of Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Board of Education *
                </label>
                <select
                  value={boardOfEducation}
                  onChange={(e) => setBoardOfEducation(e.target.value as School['boardOfEducation'])}
                  className="w-full casual-input px-3.5 py-2.5 text-sm bg-white"
                >
                  <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                  <option value="ICSE">ICSE (Indian Certificate of Secondary Education)</option>
                  <option value="State Board">State Board curriculum</option>
                  <option value="IB">IB (International Baccalaureate)</option>
                  <option value="IGCSE">IGCSE (Cambridge Assessment)</option>
                </select>
              </div>

              {/* Location Short Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location Summary (Area, District) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 12, Gurgaon"
                  value={locationSummary}
                  onChange={(e) => setLocationSummary(e.target.value)}
                  className="w-full casual-input px-3.5 py-2.5 text-sm"
                />
              </div>

              {/* School Banner Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  School Banner Picture (Image URL)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full casual-input px-3.5 py-2.5 text-sm font-mono text-xs"
                />
              </div>
            </div>

            {/* Standards Available checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Educational Standards / Grades Available *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                {standardsOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={standardsAvailable.includes(opt)}
                      onChange={() => toggleStandardSelection(opt)}
                      className="rounded border-slate-300 text-slate-950 focus:ring-slate-900 w-4 h-4 cursor-pointer"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sub Contact grid */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                Office Contact details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="office@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full casual-input px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Telephone contact *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 123-456-789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full casual-input px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Official Website
                  </label>
                  <input
                    type="text"
                    placeholder="www.schoolsite.edu"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full casual-input px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Physical Street address
                  </label>
                  <input
                    type="text"
                    placeholder="12 Main Boulevard Road"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full casual-input px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Guindy"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full casual-input px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Chennai"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full casual-input px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setActiveFormTab('academics')}
                className="px-5 py-2.5 bg-slate-900 text-amber-50 font-bold rounded-xl text-sm"
              >
                Continue to Academics & Fees →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Academics & Fees */}
        {activeFormTab === 'academics' && (
          <div className="space-y-6" id="form-tab-pane-academics">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Save className="w-5 h-5 text-blue-500" />
                Fee Structure Configuration
              </h3>
              
              <button
                type="button"
                onClick={addFeeRow}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 rounded-lg shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Grade Fees Row</span>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Set the estimated fees per year according to standard divisions. This lets parents filter by budget ranges.
            </p>

            <div className="space-y-3" id="fees-rows-group">
              {feeStructure.map((row, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <div className="w-full sm:w-1/3">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">
                      Grade/Standard Range
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nursery, Grade 1-5"
                      value={row.gradeRange}
                      onChange={(e) => updateFeeRow(index, 'gradeRange', e.target.value)}
                      className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                    />
                  </div>

                  <div className="w-1/2 sm:w-1/5">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">
                      Tuition ($ / Year)
                    </label>
                    <input
                      type="number"
                      value={row.tuitionFee}
                      onChange={(e) => updateFeeRow(index, 'tuitionFee', Number(e.target.value))}
                      className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                    />
                  </div>

                  <div className="w-1/2 sm:w-1/5">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">
                      Admission ($)
                    </label>
                    <input
                      type="number"
                      value={row.admissionFee}
                      onChange={(e) => updateFeeRow(index, 'admissionFee', Number(e.target.value))}
                      className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                    />
                  </div>

                  <div className="w-1/2 sm:w-1/5">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">
                      Other Charges ($)
                    </label>
                    <input
                      type="number"
                      value={row.otherFees}
                      onChange={(e) => updateFeeRow(index, 'otherFees', Number(e.target.value))}
                      className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                    />
                  </div>

                  {feeStructure.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeeRow(index)}
                      className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all border border-rose-200 text-xs font-bold self-end sm:self-center"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Academic Calendar section */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-rose-500" />
                Academic Calendar / Major Dates
              </h3>

              {/* Event addition sub-panel */}
              <div className="p-4 bg-amber-50/20 border border-slate-300 rounded-xl mb-4 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Event Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Winter Semester Term Exams"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full casual-input p-2 mt-0.5 text-xs bg-white"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Event Date</label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full casual-input p-2 mt-0.5 text-xs bg-white"
                  />
                </div>
                <div className="w-full sm:w-36">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Category type</label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value as SchoolCalendarEvent['type'])}
                    className="w-full casual-input p-2 mt-0.5 text-xs bg-white"
                  >
                    <option value="event">Major Event</option>
                    <option value="holiday">Holiday/Vacation</option>
                    <option value="exam">Examination</option>
                    <option value="term_start_end">Term Start/End</option>
                    <option value="open_house">🏫 Open House</option>
                    <option value="orientation">🎒 Orientation Day</option>
                    <option value="admission_test">📝 Admission Test Date</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={addCalendarEvent}
                  className="px-3.5 bg-slate-900 text-amber-50 hover:bg-slate-800 rounded-lg text-xs font-bold self-end h-9 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </div>

              {/* Added events layout */}
              <div className="max-h-52 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100" id="form-added-calendar-events">
                {academicCalendar.length === 0 ? (
                  <p className="p-4 text-xs text-slate-400 italic text-center text-slate-500">
                    No custom academic calendar points added yet.
                  </p>
                ) : (
                  academicCalendar.map((ev, idx) => (
                    <div key={idx} className="p-3 px-4 flex items-center justify-between text-xs hover:bg-slate-50 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                          {ev.date}
                        </span>
                        <span className="font-semibold text-slate-900">{ev.title}</span>
                        <span className="p-1 px-1.5 bg-blue-50 border border-blue-100 text-blue-700 font-mono tracking-tight text-[9px] uppercase rounded">
                          {ev.type}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCalendarEvent(idx)}
                        className="text-rose-600 hover:text-rose-800 font-bold text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveFormTab('general')}
                className="px-5 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('transport')}
                className="px-5 py-2.5 bg-slate-900 text-amber-50 font-bold rounded-xl text-sm"
              >
                Continue to Transport & Activities →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Bus Transport & Extracurriculars */}
        {activeFormTab === 'transport' && (
          <div className="space-y-6" id="form-tab-pane-transport">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              Institutions Extracurriculars List
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Extracurricular Activities (Comma Separated List)
              </label>
              <textarea
                rows={3}
                placeholder="Robotics club, Football academy, Horse riding, Keyboard Class, Chess club"
                value={extracurricularsText}
                onChange={(e) => setExtracurricularsText(e.target.value)}
                className="w-full casual-input px-3.5 py-2.5 text-sm"
              />
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                Provide individual activity categories separated by commas.
              </span>
            </div>

            {/* Transport System */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  School Bus Transport Facilities
                </h3>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={busAvailable}
                    onChange={(e) => setBusAvailable(e.target.checked)}
                    className="rounded border-slate-300 text-slate-950 focus:ring-slate-900 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-800">Bus Transport Offered</span>
                </label>
              </div>

              {busAvailable && (
                <div className="p-5 bg-amber-50/10 border border-slate-200 rounded-xl space-y-4 transition-all">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Monthly Bus Routing Surcharge ($ / Month)
                    </label>
                    <input
                      type="number"
                      value={busFee}
                      onChange={(e) => setBusFee(Number(e.target.value))}
                      className="w-full casual-input px-3.5 py-2.5 text-sm max-w-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Covered Bus Routes (Comma Separated List)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sector 12 Corridor, MG Road Crossing, West Gate Metro, Terminal 2"
                      value={busRoutesText}
                      onChange={(e) => setBusRoutesText(e.target.value)}
                      className="w-full casual-input px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Bus Security & Safety Precautions (Comma Separated)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. GPS Location Updates, Trained Lady Attendant, Speed Governors"
                      value={busSafetyText}
                      onChange={(e) => setBusSafetyText(e.target.value)}
                      className="w-full casual-input px-3.5 py-2.5 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveFormTab('academics')}
                className="px-5 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('achievements')}
                className="px-5 py-2.5 bg-slate-900 text-amber-50 font-bold rounded-xl text-sm"
              >
                Continue to Achievements & Trophies →
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: Achievements & Trophies */}
        {activeFormTab === 'achievements' && (
          <div className="space-y-6 animate-in fade-in duration-150" id="form-tab-pane-achievements">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Academic & Sports Accomplishments
            </h3>

            {/* Academic Director Analysis */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Overall Academic Analysis / Director Evaluation
              </label>
              <textarea
                rows={3}
                placeholder="Describe your school's board examination performance, subject highlights, and overall accomplishments..."
                value={overallAnalysis}
                onChange={(e) => setOverallAnalysis(e.target.value)}
                className="w-full casual-input px-3.5 py-2.5 text-sm"
              />
            </div>

            {/* Grade 10 Toppers List */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Grade 10th Board Toppers
                </h4>
                <button
                  type="button"
                  onClick={addTenthTopper}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 rounded-lg shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Topper</span>
                </button>
              </div>

              <div className="space-y-3">
                {tenthToppers.map((topper, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Topper Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alice Smith"
                          value={topper.name}
                          onChange={(e) => updateTenthTopper(index, 'name', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Score / Percentage</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 98.4%"
                          value={topper.score}
                          onChange={(e) => updateTenthTopper(index, 'score', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Rank</label>
                        <input
                          type="number"
                          required
                          value={topper.rank}
                          onChange={(e) => updateTenthTopper(index, 'rank', Number(e.target.value))}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Honor / Badge</label>
                        <input
                          type="text"
                          placeholder="e.g. Gold Medalist"
                          value={topper.badge || ''}
                          onChange={(e) => updateTenthTopper(index, 'badge', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Topper Profile Picture Image URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/photo-... (Leave blank for default)"
                          value={topper.imageUrl || ''}
                          onChange={(e) => updateTenthTopper(index, 'imageUrl', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white font-mono text-[10px]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTenthTopper(index)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 border border-rose-200 text-xs font-bold self-end h-8"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade 12 Toppers List */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-500" />
                  Grade 12th Board Toppers
                </h4>
                <button
                  type="button"
                  onClick={addTwelfthTopper}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 rounded-lg shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Topper</span>
                </button>
              </div>

              <div className="space-y-3">
                {twelfthToppers.map((topper, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Topper Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Charlie Brown"
                          value={topper.name}
                          onChange={(e) => updateTwelfthTopper(index, 'name', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Score / Percentage</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 99.1%"
                          value={topper.score}
                          onChange={(e) => updateTwelfthTopper(index, 'score', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Rank</label>
                        <input
                          type="number"
                          required
                          value={topper.rank}
                          onChange={(e) => updateTwelfthTopper(index, 'rank', Number(e.target.value))}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Honor / Badge</label>
                        <input
                          type="text"
                          placeholder="e.g. State Rank #1"
                          value={topper.badge || ''}
                          onChange={(e) => updateTwelfthTopper(index, 'badge', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Topper Profile Picture Image URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/photo-... (Leave blank for default)"
                          value={topper.imageUrl || ''}
                          onChange={(e) => updateTwelfthTopper(index, 'imageUrl', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white font-mono text-[10px]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTwelfthTopper(index)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 border border-rose-200 text-xs font-bold self-end h-8"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sports Achievements List */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  Sports Achievements & Accolades
                </h4>
                <button
                  type="button"
                  onClick={addSportsAchievement}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 rounded-lg shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sport Event</span>
                </button>
              </div>

              <div className="space-y-4">
                {sportsAchievements.map((sport, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Achievement Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. National Championship"
                          value={sport.title}
                          onChange={(e) => updateSportsAchievement(index, 'title', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Tournament / Event</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Inter-School Tournament"
                          value={sport.event}
                          onChange={(e) => updateSportsAchievement(index, 'event', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Year</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2024"
                          value={sport.year}
                          onChange={(e) => updateSportsAchievement(index, 'year', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Rank or Status</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Winners / Gold Medal"
                          value={sport.rankOrStatus}
                          onChange={(e) => updateSportsAchievement(index, 'rankOrStatus', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase">Brief Description</label>
                      <textarea
                        rows={2}
                        placeholder="Detail the match highlights, competitive school score counts, etc..."
                        value={sport.description || ''}
                        onChange={(e) => updateSportsAchievement(index, 'description', e.target.value)}
                        className="w-full casual-input px-2.5 py-1.5 text-xs bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Achievement Banner Image URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/photo-... (Leave blank for default)"
                          value={sport.imageUrl || ''}
                          onChange={(e) => updateSportsAchievement(index, 'imageUrl', e.target.value)}
                          className="w-full casual-input px-2 py-1.5 text-xs bg-white font-mono text-[10px]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSportsAchievement(index)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 border border-rose-200 text-xs font-bold self-end h-8"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveFormTab('transport')}
                className="px-5 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('admissions')}
                className="px-5 py-2.5 bg-slate-900 text-amber-50 font-bold rounded-xl text-sm"
              >
                Continue to Admissions Control →
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: Admissions & Final Register */}
        {activeFormTab === 'admissions' && (
          <div className="space-y-6" id="form-tab-pane-admissions">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              Admission Portal Details & Instructions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admissions Commencement Date
                </label>
                <input
                  type="date"
                  value={admissionStartDate}
                  onChange={(e) => setAdmissionStartDate(e.target.value)}
                  className="w-full casual-input px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admissions Closure Deadline
                </label>
                <input
                  type="date"
                  value={admissionEndDate}
                  onChange={(e) => setAdmissionEndDate(e.target.value)}
                  className="w-full casual-input px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Detailed Admission Instructions & Prerequisite checklist
              </label>
              <textarea
                rows={5}
                placeholder="List criteria, eligibility bounds, essential document checks, or parent meeting information clearly."
                value={admissionInstructions}
                onChange={(e) => setAdmissionInstructions(e.target.value)}
                className="w-full casual-input px-3.5 py-2.5 text-sm"
              />
            </div>

            {/* Custom alert disclaimer */}
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-800 text-sm leading-relaxed">
              <strong>📢 Complete Institutional Verification:</strong> By publishing, this school profile configuration will appear instantly in parents searches directory lists on the main search engine. Ensure billing charts reflect actual annual fee scales.
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveFormTab('achievements')}
                className="px-5 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold"
              >
                ← Back
              </button>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 text-amber-50 font-bold hover:bg-slate-800 rounded-xl text-sm flex items-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px]"
                  id="final-publish-profile-btn"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Registry Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
