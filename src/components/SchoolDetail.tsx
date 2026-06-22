/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { School, User, SchoolAdmissionApplication, SchoolReview } from '../types';
import {
  MapPin, Phone, Mail, Globe, ArrowLeft, Bus, Calendar,
  Activity, DollarSign, Sparkles, GraduationCap, Clock, FileText, CheckCircle, Heart, Star, Send, Trophy, Award
} from 'lucide-react';
import { DoodleSparkle, DoodleLineDivider, DoodleStar, DoodleBus, DoodleSchool, DoodleArrow, DoodleCloud } from './Doodles';

interface SchoolDetailProps {
  school: School;
  currentUser: User | null;
  onBack: () => void;
  onSubmitApplication: (application: Omit<SchoolAdmissionApplication, 'id' | 'appliedDate' | 'status'>) => void;
  applications: SchoolAdmissionApplication[];
  onOpenAuth: (mode: 'login' | 'signup') => void;
  reviews?: SchoolReview[];
  onSubmitReview?: (rating: number, comment: string, experienceType: 'visited' | 'enrolled') => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const SchoolDetail: React.FC<SchoolDetailProps> = ({
  school,
  currentUser,
  onBack,
  onSubmitApplication,
  applications,
  onOpenAuth,
  reviews = [],
  onSubmitReview,
  isFavorite = false,
  onToggleFavorite
}) => {
  // Application form states
  const [studentName, setStudentName] = useState('');
  const [gradeApplying, setGradeApplying] = useState(school.standardsAvailable[0] || 'Grade 1');
  const [parentName, setParentName] = useState(currentUser?.fullName || '');
  const [parentEmail, setParentEmail] = useState(currentUser?.email || '');
  const [parentPhone, setParentPhone] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [applicationCompleted, setApplicationCompleted] = useState(false);

  // Custom Navigation Tabs & Explorer Modals State
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'academics' | 'sports' | 'transit'>('overview');
  const [selectedCurriculumClass, setSelectedCurriculumClass] = useState<string | null>(null);
  const [selectedBusRouteDetail, setSelectedBusRouteDetail] = useState<any>(null);

  const handleDownloadBrochure = (sch: School) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(`Brochure downloads blocked by browser pop-ups. Standard prospectus: ${sch.name} has ${sch.staffCount || 34} teachers, ${sch.classroomCount || 18} smart rooms. Contact our desk at ${sch.contactInfo.email}!`);
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>\${sch.name} - Official School Brochure</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #0f172a;
              margin: 40px;
              line-height: 1.5;
            }
            .header {
              text-align: center;
              border-bottom: 5px solid #0f172a;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 32px;
              font-weight: 900;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: -1px;
            }
            .subtitle {
              font-size: 14px;
              font-weight: 700;
              color: #f59e0b;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-top: 5px;
            }
            .badge {
              display: inline-block;
              background-color: #0f172a;
              color: #fff;
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
              padding: 5px 10px;
              border-radius: 4px;
              margin-top: 10px;
            }
            .section {
              margin-bottom: 25px;
              border: 2px solid #0f172a;
              border-radius: 12px;
              padding: 20px;
              background-color: #f8fafc;
            }
            .section-title {
              font-size: 18px;
              font-weight: 900;
              margin-top: 0;
              margin-bottom: 12px;
              border-bottom: 2px solid #0f172a;
              padding-bottom: 6px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
            }
            .metric {
              background-color: #fff;
              border: 1px solid #0f172a;
              padding: 12px;
              border-radius: 8px;
            }
            .metric-val {
              font-size: 20px;
              font-weight: 900;
              color: #4f46e5;
            }
            .metric-lbl {
              font-size: 11px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: 700;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #cbd5e1;
              padding: 8px 12px;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #0f172a;
              color: #fff;
              font-weight: 700;
            }
            .f-toppers {
              background-color: #fff;
              border: 1px solid #0f172a;
              padding: 10px;
              border-radius: 8px;
              margin-bottom: 8px;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              font-weight: 700;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 11px;
              color: #64748b;
              border-top: 2px solid #cbd5e1;
              padding-top: 15px;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
            .btn-print {
              display: block;
              margin: 0 auto 30px auto;
              background-color: #f59e0b;
              color: #0f172a;
              border: 2px solid #0f172a;
              padding: 10px 20px;
              font-weight: 900;
              text-transform: uppercase;
              font-size: 13px;
              border-radius: 8px;
              cursor: pointer;
              box-shadow: 3px 3px 0 0 #0f172a;
            }
          </style>
        </head>
        <body>
          <button class="btn-print no-print" onclick="window.print()">🖨️ Save as PDF / Print Brochure</button>
          
          <div class="header">
            <div class="title">\${sch.name}</div>
            <div class="subtitle">Official Academic Prospectus & Brochure</div>
            <div class="badge">\${sch.boardOfEducation} AFFILIATED BOARD • CO-EDUCATIONAL ACADEMY</div>
          </div>

          <div class="section">
            <div class="section-title">🏫 About Our Campus & Infrastructure</div>
            <p style="font-size: 13px; margin-bottom: 15px;">Welcome to \${sch.name}. We support interactive and transdisciplinary learning paths, enabling students to explore specialized technical modules, scientific logic, and artistic expression. Our campus provides high-security transport fleets and fully equipped labs.</p>
            <div class="grid">
              <div class="metric">
                <div class="metric-val">\${sch.staffCount || 42} Qualified Members</div>
                <div class="metric-lbl">Academic Faculty and Sports Coaches</div>
              </div>
              <div class="metric">
                <div class="metric-val">\${sch.classroomCount || 22} Dynamic Spaces</div>
                <div class="metric-lbl">Smart Interactive Digitized Classrooms</div>
              </div>
              <div class="metric">
                <div class="metric-val">~1 : \${Math.round((sch.classroomCount || 18) * 1.2)}</div>
                <div class="metric-lbl">Standard Student-Educator Ratio</div>
              </div>
              <div class="metric">
                <div class="metric-val">\${sch.standardsAvailable.length} Cohorts Offered</div>
                <div class="metric-lbl">Available Standards ranges</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🎓 Academic Achievements (Board Standards)</div>
            <p style="font-size: 12px; margin-bottom: 12px;">\${sch.academicAchievements?.overallAnalysis || 'The school boasts a top record in standardized national board evaluations with high-distinction honors.'}</p>
            
            <h4 style="margin: 10px 0 5px 0; font-size: 13px;">Class 10th Toppers:</h4>
            \${(sch.academicAchievements?.tenthToppers || [
              { name: 'Siddharth Goel', score: '99.2%', rank: 1, badge: 'Deans Scholar' },
              { name: 'Kavita Rathi', score: '98.4%', rank: 2, badge: 'National Talent search' }
            ]).map(t => \`
              <div class="f-toppers">
                <span>Rank #\${t.rank}: \text{\${t.name}} (\text{\${t.badge}})</span>
                <span style="color:#10b981;">Score: \${t.score}</span>
              </div>
            \`).join('')}

            <h4 style="margin: 15px 0 5px 0; font-size: 13px;">Class 12th Toppers:</h4>
            \${(sch.academicAchievements?.twelfthToppers || [
              { name: 'Tushar Singhania', score: '99.4%', rank: 1, badge: 'IIT Admit' },
              { name: 'Aishwarya Sen', score: '98.8%', rank: 2, badge: 'Commerce standard honors' }
            ]).map(t => \`
              <div class="f-toppers">
                <span>Rank #\${t.rank}: \text{\${t.name}} (\text{\${t.badge}})</span>
                <span style="color:#8b5cf6;">Score: \${t.score}</span>
              </div>
            \`).join('')}
          </div>

          <div class="section" style="page-break-before: always;">
            <div class="section-title">🏆 Sports & Athletics Highlights</div>
            <ul>
              \${(sch.sportsAchievements || [
                { title: 'National Roller Skating Relays', event: '1000m rink speed', year: '2025', rankOrStatus: 'Gold Medalists' },
                { title: 'Western Interscholastic Tennis Open', event: 'U19 Singles', year: '2026', rankOrStatus: 'First Rank Cup' }
              ]).map(s => \`
                <li style="font-size: 12px; margin-bottom: 8px;">
                  <strong>\${s.title} (\${s.year})</strong> - Winner of \${s.rankOrStatus} for the \${s.event} category.
                </li>
              \`).join('')}
            </ul>
          </div>

          <div class="section">
            <div class="section-title">💰 Tuition & Fee Breakdown</div>
            <table>
              <thead>
                <tr>
                  <th>Grade Level Range</th>
                  <th>Annual Tuition Fee</th>
                  <th>One-Time Admission Fee</th>
                  <th>Other Activity Fees</th>
                </tr>
              </thead>
              <tbody>
                \${sch.feeStructure.map(f => \`
                  <tr>
                    <td><strong>\${f.gradeRange}</strong></td>
                    <td>\${f.tuitionFee ? '$' + f.tuitionFee.toLocaleString() : 'N/A'}</td>
                    <td>\${f.admissionFee ? '$' + f.admissionFee.toLocaleString() : 'N/A'}</td>
                    <td>\${f.otherFees ? '$' + f.otherFees.toLocaleString() : 'N/A'} / year</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">📞 Registrar Contacts & Campus Address</div>
            <div style="font-size: 12px; line-height: 1.6;">
              <strong>Campus Box:</strong> \${sch.contactInfo.address}, \${sch.contactInfo.city}, \${sch.contactInfo.state} <br>
              <strong>Administrative Desk:</strong> \${sch.contactInfo.phone} | <strong>Email:</strong> \${sch.contactInfo.email} <br>
              <strong>Web Domain:</strong> \${sch.contactInfo.website}
            </div>
          </div>

          <div class="footer">
            CampusBridge School Information Services • Generated dynamically on \${new Date().toLocaleDateString()} • Authorized for circulation
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadOfflineForm = (sch: School) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(`Download blocked. Please contact ${sch.contactInfo.email} directly for registration sheets.`);
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>\${sch.name} - Registration Form</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #0c111e;
              margin: 45px;
              line-height: 1.4;
            }
            .header {
              text-align: center;
              border-bottom: 4px double #0c111e;
              padding-bottom: 15px;
              margin-bottom: 25px;
            }
            .title {
              font-size: 26px;
              font-weight: 900;
              margin: 0;
              text-transform: uppercase;
            }
            .form-code {
              font-family: 'JetBrains Mono', monospace;
              text-align: right;
              font-size: 11px;
              color: #475569;
              margin-bottom: 15px;
            }
            .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 20px;
            }
            .form-item {
              border-bottom: 1px solid #000;
              padding: 5px 0;
              min-height: 35px;
              display: flex;
              align-items: flex-end;
              font-size: 12px;
            }
            .form-label {
              font-weight: 700;
              font-size: 11px;
              text-transform: uppercase;
              color: #334155;
              width: 160px;
              flex-shrink: 0;
            }
            .section-header {
              font-size: 14px;
              font-weight: 900;
              text-transform: uppercase;
              background-color: #f1f5f9;
              border: 1.5px solid #000;
              padding: 6px 10px;
              margin: 25px 0 15px 0;
              letter-spacing: 0.5px;
            }
            .checkbox-group {
              display: flex;
              gap: 15px;
              font-size: 12px;
              font-weight: 700;
              margin-top: 10px;
            }
            .checkbox-item {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .box {
              width: 14px;
              height: 14px;
              border: 1.5px solid #000;
              display: inline-block;
            }
            .signatures {
              margin-top: 50px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 50px;
              font-size: 11px;
              font-weight: 700;
              text-align: center;
            }
            .sig-line {
              border-top: 1.5px solid #000;
              margin-top: 50px;
              padding-top: 5px;
            }
            @media print {
              .no-print { display: none; }
            }
            .btn-print {
              display: block;
              margin: 0 auto 30px auto;
              background-color: #38bdf8;
              color: #0c111e;
              border: 2px solid #0c111e;
              padding: 10px 20px;
              font-weight: 900;
              text-transform: uppercase;
              font-size: 13px;
              border-radius: 8px;
              cursor: pointer;
              box-shadow: 3px 3px 0 0 #0c111e;
            }
          </style>
        </head>
        <body>
          <button class="btn-print no-print" onclick="window.print()">🖨️ Open Native Print / Save application PDF</button>
          
          <div class="form-code">REF REGISTRATION SHEET: CB-\${sch.id.toUpperCase()}-2026</div>
          
          <div class="header">
            <div class="title">\${sch.name}</div>
            <div style="font-size: 11px; color:#475569; margin-top:5px;">Affiliated with \${sch.boardOfEducation} Education Board | Session Year 2026-2027</div>
            <div style="font-size: 13px; font-weight:700; margin-top:8px; letter-spacing:1px; text-transform:uppercase;">Student Admission Application Form</div>
          </div>

          <p style="font-size:11px; color:#475569; italic">Directions: Fill this application block using uppercase print ink. Submit to Registered school registrar, or mail with documents to \${sch.contactInfo.email}. Required attachments: candidate Birth proof, prior report card, and two passport photos.</p>

          <div class="section-header">1. Candidate / Student Information Details</div>
          <div class="form-grid">
            <div class="form-item"><div class="form-label">Full Name of Student</div> </div>
            <div class="form-item"><div class="form-label">Gender (Male/Female/Other)</div> </div>
            <div class="form-item"><div class="form-label">Date of Birth (DD/MM/YYYY)</div> </div>
            <div class="form-item"><div class="form-label">Grade standard applying</div> </div>
            <div class="form-item"><div class="form-label">Prior elementary school</div> </div>
            <div class="form-item"><div class="form-label">Mother Tongue</div> </div>
          </div>

          <div class="section-header">2. Parent & Guardian Contact profiles</div>
          <div class="form-grid">
            <div class="form-item"><div class="form-label">Primary Father Name</div> </div>
            <div class="form-item"><div class="form-label">Primary Mother Name</div> </div>
            <div class="form-item"><div class="form-label">Parent Mobil/Phone</div> </div>
            <div class="form-item"><div class="form-label">Active Email Address</div> </div>
            <div class="form-item" style="grid-column: span 2;"><div class="form-label">Residency address</div> </div>
          </div>

          <div class="section-header">3. Auxilliary services enrollment</div>
          <div style="font-size:12px; font-weight:700; margin-bottom:10px;">A. Bus Transport Subscription requested?</div>
          <div class="checkbox-group">
            <div class="checkbox-item"><span class="box"></span> Yes, enroll in route: ____________________</div>
            <div class="checkbox-item"><span class="box"></span> No, arranging local carpool</div>
          </div>

          <div style="font-size:12px; font-weight:700; margin:15px 0 10px 0;">B. Select Standard Co-curricular Interest:</div>
          <div class="checkbox-group">
            <div class="checkbox-item"><span class="box"></span> Robotics & Tech</div>
            <div class="checkbox-item"><span class="box"></span> Athletics & Skate</div>
            <div class="checkbox-item"><span class="box"></span> Violin / Classical Vocal</div>
            <div class="checkbox-item"><span class="box"></span> Chess & Debate</div>
          </div>

          <div class="section-header">4. Parental Declaration & Acknowledgements</div>
          <p style="font-size: 10px; color:#475569; leading-relaxed">I herby certify that statement particulars given above are completely accurate to the best of my knowledge and visual files uploaded. I understand that the initial registration seat is subject to interactive screening, interview rounds, and registration deposit compliance as mentioned in \${sch.name} standards criteria.</p>

          <div class="signatures">
            <div class="sig-line">Official Signature of Mother / Guardian</div>
            <div class="sig-line">Official Signature of Father / Guardian</div>
          </div>

          <div style="margin-top:40px; text-align:center; font-size:10px; color:#475569; border-top:1px solid #cbd5e1; padding-top:15px">
            School registrar office block: Accepted [ ] Pending [ ] | Dated signature of verifier: __________________
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Review form states
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [experienceType, setExperienceType] = useState<'visited' | 'enrolled'>('visited');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Calculate rating stats
  const ratingSum = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = reviews.length > 0 ? (ratingSum / reviews.length).toFixed(1) : null;

  const handleReviewSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!reviewComment.trim()) {
      setReviewError('Please write a short comment describing your experience.');
      return;
    }

    if (onSubmitReview) {
      onSubmitReview(reviewRating, reviewComment.trim(), experienceType);
    }
    setReviewSuccess(true);
    setReviewComment('');
    setReviewRating(5);
    setReviewError('');
    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };


  // Check if current parent already has a submission with this school
  const existingApp = applications.find(
    (app) => app.userId === currentUser?.id && app.schoolId === school.id
  );

  const handleApplyAdmissions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    onSubmitApplication({
      schoolId: school.id,
      schoolName: school.name,
      userId: currentUser.id,
      studentName: studentName.trim(),
      gradeApplying,
      parentName: parentName.trim(),
      parentEmail: parentEmail.trim(),
      parentPhone: parentPhone.trim(),
      previousSchool: previousSchool.trim() || undefined,
      additionalInfo: additionalInfo.trim() || undefined
    });

    setApplicationCompleted(true);
  };

  // Convert dates to locale standard readable format
  const parseDate = (d: string) => {
    return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4" id={`school-detail-${school.id}`}>
      
      {/* Back Navigator Banner */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors py-1.5"
        id="btn-back-to-schools"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Registry Board</span>
      </button>

      {/* Hero Visual Block */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] mb-8">
        <div className="h-64 sm:h-80 w-full relative bg-slate-100 border-b-2 border-slate-900">
          <img
            src={school.imageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80'}
            alt={school.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-amber-400 text-slate-950 text-xs font-black font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-slate-950 inline-block">
                {school.boardOfEducation} Curriculum Board
              </span>
              {avgRating !== null ? (
                <span className="bg-slate-950/80 border border-slate-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{avgRating} ({reviews.length} reviews)</span>
                </span>
              ) : (
                <span className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5" />
                  <span>No reviews yet</span>
                </span>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                {school.name}
              </h1>
              {currentUser?.role === 'parent' && onToggleFavorite && (
                <button
                  id={`btn-favorite-${school.id}`}
                  onClick={onToggleFavorite}
                  className={`flex items-center gap-1.5 px-4 py-2 font-bold text-sm rounded-xl transition-all border-2 border-slate-900 self-start ${
                    isFavorite
                      ? 'bg-rose-500 text-amber-50 hover:bg-rose-600 shadow-[3px_3px_0px_0px_white]'
                      : 'bg-white text-slate-950 hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                  }`}
                  title={isFavorite ? 'Unfollow school' : 'Follow school'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-white text-amber-50' : 'text-slate-700'}`} />
                  <span>{isFavorite ? 'Following School' : 'Follow School'}</span>
                </button>
              )}
            </div>

            <p className="flex items-center gap-1.5 mt-2 text-slate-200 text-sm font-semibold">
              <MapPin className="w-4 h-4 shrink-0 text-amber-300" />
              <span>{school.contactInfo.address}, {school.contactInfo.city}, {school.contactInfo.state}</span>
            </p>
          </div>
        </div>

        {/* Institution Highlights strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-150 bg-slate-50 text-center font-medium">
          <div className="p-4 py-6">
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">Education Board</span>
            <span className="text-lg font-black text-slate-800">{school.boardOfEducation}</span>
          </div>
          <div className="p-4 py-6">
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">Admission Window</span>
            <span className="text-xs font-black text-slate-800">
              {parseDate(school.admissionStartDate)} - {parseDate(school.admissionEndDate)}
            </span>
          </div>
          <button
            onClick={() => {
              setActiveMainTab('transit');
              setTimeout(() => {
                const block = document.getElementById('transit-tab-content-anchor');
                block?.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}
            className="p-4 py-6 cursor-pointer hover:bg-amber-100 group transition-all text-center flex flex-col items-center justify-center h-full w-full border-none outline-none"
            title="Click to redirect to Transportation coverage page and explore stops schedule!"
          >
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block group-hover:text-amber-600 transition-colors">Bus routing Coverage</span>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1 group-hover:underline mt-0.5 justify-center">
              {school.busFacilities.available ? `🚌 ${school.busFacilities.routes.length} Active Routes` : '❌ Not Offered'}
            </span>
            <span className="text-[9px] text-amber-600 font-extrabold opacity-70 group-hover:opacity-100 transition-opacity mt-1 font-mono tracking-tight">Explore stops ➔</span>
          </button>
          <div className="p-4 py-6">
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">Co-curricular programs</span>
            <span className="text-xs font-black text-slate-800">
              {school.extracurricularActivities.length} Interactive modules
            </span>
          </div>
        </div>

        {/* Detail Body section split */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: Core Academic features details */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Elegant Sliding Tab Header */}
            <div className="flex flex-wrap gap-2 pb-1 border-b-2 border-slate-900" id="transit-tab-content-anchor">
              <button
                type="button"
                onClick={() => setActiveMainTab('overview')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-slate-950 rounded-t-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  activeMainTab === 'overview'
                    ? 'bg-amber-300 text-slate-950 border-b-transparent shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -mb-[2px] z-10'
                    : 'bg-white text-slate-600 hover:text-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                🏫 Overview & About
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab('academics')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-slate-950 rounded-t-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  activeMainTab === 'academics'
                    ? 'bg-purple-300 text-slate-950 border-b-transparent shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -mb-[2px] z-10'
                    : 'bg-white text-slate-600 hover:text-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                🎓 Academics
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab('sports')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-slate-950 rounded-t-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  activeMainTab === 'sports'
                    ? 'bg-rose-300 text-slate-950 border-b-transparent shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -mb-[2px] z-10'
                    : 'bg-white text-slate-600 hover:text-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                🏆 Sports Athletics
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab('transit')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-slate-950 rounded-t-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  activeMainTab === 'transit'
                    ? 'bg-emerald-300 text-slate-950 border-b-transparent shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -mb-[2px] z-10'
                    : 'bg-white text-slate-600 hover:text-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                🚌 Bus Routes ({school.busFacilities.available ? school.busFacilities.routes.length : 0})
              </button>
            </div>

            {/* TAB PANELS ROUTING */}
            {activeMainTab === 'overview' && (
              <div className="space-y-10 animate-in fade-in duration-200">
                
                {/* 1. Infrastructure facilities block (About page info) */}
                <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                    <DoodleSchool className="w-44 h-44 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Campus Profile & Infrastructure
                  </h3>
                  <DoodleLineDivider className="text-slate-900/10" />

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Welcome to the campus portal of {school.name}. Recognized for pioneering student co-creative inquiry, we provide an academic refuge where digital smart tools fuse with dedicated physical recreation domains.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                    <div className="p-3.5 border-2 border-slate-900 rounded-2xl bg-indigo-50/70 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
                      <span className="text-2xl">👩‍🏫</span>
                      <div>
                        <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-wider font-extrabold">Professional Staff</span>
                        <span className="text-sm font-black text-slate-900">{school.staffCount || 38} Dedicated Educators</span>
                      </div>
                    </div>
                    
                    <div className="p-3.5 border-2 border-slate-900 rounded-2xl bg-pink-50/70 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
                      <span className="text-2xl">🏫</span>
                      <div>
                        <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-wider font-extrabold">Smart Classrooms</span>
                        <span className="text-sm font-black text-slate-900">{school.classroomCount || 20} Configured Rooms</span>
                      </div>
                    </div>

                    <div className="p-3.5 border-2 border-slate-900 rounded-2xl bg-amber-50/70 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
                      <span className="text-2xl">🎓</span>
                      <div>
                        <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-wider font-extrabold">Ideal Teacher Ratio</span>
                        <span className="text-xs font-black text-slate-900">
                          1 Educator : {Math.round((school.staffCount || 38) / 3)} Students
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2.5">🛡️ Active Campus Infrastructure Assets:</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-bold text-slate-600">
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>🔬</span> Scientific Physics Lab
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>📚</span> RFID Literary Center
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>💻</span> High-Tier Robotics Bay
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>⚽</span> Olympic Grass Pitch
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>🎨</span> Fine-Arts Studio Annex
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>🩺</span> Pediatric Medical Cabin
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Standards list of courses (clickable!) */}
                <div className="bg-amber-50/10 border-2 border-slate-900 rounded-3xl p-5 sm:p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                    <DoodleSchool className="w-40 h-40 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 flex items-center gap-2 font-sans tracking-tight">
                    <GraduationCap className="w-5 h-5 text-amber-500 shrink-0" />
                    Standards & Cohorts Offered
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-3.5 mt-0.5">
                    Authorized scholastic standards available for enrollment. <strong>👉 Click standard tags below to view core mandatory/elective subjects and activity fees!</strong>
                  </p>
                  <DoodleLineDivider className="text-slate-900/10 mb-4" />
                  
                  <div className="flex flex-wrap gap-3">
                    {school.standardsAvailable.map((std, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCurriculumClass(std)}
                        className="px-4 py-2.5 rounded-2xl border-2 border-slate-900 bg-white hover:bg-amber-100 text-slate-900 hover:text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3.5px_3.5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all text-xs font-extrabold flex items-center gap-2 cursor-pointer group"
                        title="Click to check syllabus, courses, electives, and fees"
                      >
                        <span className="shrink-0 text-amber-500 group-hover:scale-125 transition-transform font-black">★</span>
                        <span>{std}</span>
                        <span className="text-[9px] font-mono tracking-widest uppercase bg-slate-105 border border-slate-200 group-hover:bg-amber-300 group-hover:border-slate-950 text-slate-500 group-hover:text-slate-950 px-1.5 py-0.5 rounded transition-colors ml-1.5">View courses ➔</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Fee structures table */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h3 className="text-xl font-black text-slate-950 flex items-center gap-2 font-sans tracking-tight">
                        <DollarSign className="w-5 h-5 text-emerald-500 shrink-0" />
                        Transparent Fee Structure
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Clear breakdown of tuition fees, admission deposits, and other auxiliary dues.
                      </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto text-xs font-mono font-bold text-emerald-800">
                      <span>No hidden ledger charges</span>
                    </div>
                  </div>
                  <DoodleLineDivider className="text-slate-900/10" />

                  <div className="overflow-x-auto border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] bg-white">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-950 text-amber-50 font-black border-b-2 border-slate-900 uppercase tracking-widest font-mono">
                          <th className="p-4 pl-5">Grade Level / Class Cohort</th>
                          <th className="p-4">Tuition Fee (Annual)</th>
                          <th className="p-4">Admission Fee (One-Time)</th>
                          <th className="p-4 pr-5 text-right">Auxiliary Dues</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-slate-900">
                        {school.feeStructure.map((fee, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 font-semibold text-slate-700">
                            <td className="p-4 pl-5 font-black text-slate-950 text-sm">{fee.gradeRange}</td>
                            <td className="p-4 text-slate-950 font-extrabold text-sm">
                              <span className="text-xs text-slate-400 mr-0.5">$</span>
                              {fee.tuitionFee.toLocaleString()}
                            </td>
                            <td className="p-4 text-slate-600 font-bold">
                              ${fee.admissionFee.toLocaleString()}
                            </td>
                            <td className="p-4 pr-5 text-right text-slate-500 font-mono">
                              ${fee.otherFees.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] leading-relaxed text-slate-600 font-medium">
                    <span className="text-emerald-500 font-black">💡 Note:</span>
                    <span>Annual tuition fees can typically be split into equal quarterly terms. Sibling discounts are available on primary admission fees when registering multiple candidates.</span>
                  </div>
                </div>

                {/* 4. Extracurricular Co-Curricular Clubs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-950 flex items-center gap-2 font-sans tracking-tight">
                    <Activity className="w-5 h-5 text-rose-500 shrink-0" />
                    Extracurricular Co-Curricular Clubs
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Vibrant after-school programming covering physical athletics, technical coding, and musical workshops.
                  </p>
                  <DoodleLineDivider className="text-slate-900/10" />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {school.extracurricularActivities.map((act, idx) => {
                      const highlights = [
                        { bg: 'bg-rose-50 border-rose-300 text-rose-900', icon: '🎨' },
                        { bg: 'bg-amber-50 border-amber-300 text-amber-900', icon: '⚽' },
                        { bg: 'bg-blue-50 border-blue-300 text-blue-900', icon: '💻' },
                        { bg: 'bg-purple-50 border-purple-300 text-purple-900', icon: '🎻' },
                        { bg: 'bg-emerald-50 border-emerald-300 text-emerald-990', icon: '🧬' },
                        { bg: 'bg-indigo-50 border-indigo-300 text-indigo-900', icon: '🥋' }
                      ];
                      const pick = highlights[idx % highlights.length];
                      
                      return (
                        <div
                          key={idx}
                          className="p-3.5 border-2 rounded-2xl flex flex-col justify-between hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all text-left bg-white border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                        >
                          <span className="text-2xl mb-1.5">{pick.icon}</span>
                          <span className="text-xs font-black text-slate-900 tracking-tight leading-tight">
                            {act}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Academic calendar events */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <h3 className="text-xl font-black text-slate-950 flex items-center gap-2 font-sans tracking-tight">
                        <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                        Academic Calendar & Milestones
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Stay synchronized with upcoming general assemblies, holidays, examination dates, and open houses.
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <DoodleCloud className="w-12 h-6 text-slate-300" />
                    </div>
                  </div>
                  <DoodleLineDivider className="text-slate-900/10" />

                  <div className="space-y-3.5 border-l-4 border-slate-900 pl-5 ml-2.5 pt-1.5">
                    {school.academicCalendar.map((event, idx) => {
                      const mapEventBadge = (type: string) => {
                        switch (type) {
                          case 'open_house':
                            return { label: '🏫 Open House', styles: 'bg-amber-100 text-amber-900 border-amber-300' };
                          case 'orientation':
                            return { label: '🎒 Orientation', styles: 'bg-blue-100 text-blue-900 border-blue-300' };
                          case 'admission_test':
                            return { label: '📝 Exam Date', styles: 'bg-purple-100 text-purple-900 border-purple-300' };
                          case 'event':
                            return { label: '⭐ Major Event', styles: 'bg-rose-100 text-rose-900 border-rose-300' };
                          case 'exam':
                            return { label: '📚 Exam Term', styles: 'bg-indigo-100 text-indigo-900 border-indigo-300' };
                          case 'holiday':
                            return { label: '🌴 Holiday', styles: 'bg-emerald-100 text-emerald-950 border-emerald-300' };
                          default:
                            return { label: '📅 Milestone', styles: 'bg-slate-100 text-slate-900 border-slate-300' };
                        }
                      };

                      const badge = mapEventBadge(event.type);

                      return (
                        <div 
                          key={idx} 
                          className="relative py-3 px-4 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 bg-white rounded-2xl shadow-sm hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all font-medium text-left"
                        >
                          <div className="absolute -left-[30px] top-[18px] w-4 h-4 rounded-full border-2 border-slate-950 bg-white flex items-center justify-center shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                            <span className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-lg font-mono font-bold leading-none">
                              {parseDate(event.date)}
                            </span>
                            
                            <span className={`text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border rounded-md shrink-0 block leading-none ${badge.styles}`}>
                              {badge.label}
                            </span>
                          </div>

                          <h4 className="text-sm font-extrabold text-slate-950">
                            {event.title}
                          </h4>
                          {event.description && (
                            <p className="text-slate-500 text-xs mt-1 font-semibold leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Parent Reviews Section */}
                <div className="pt-6 border-t border-slate-200 space-y-6" id="school-reviews-block">
                  <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Parent Reviews & School Ratings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-col items-center justify-center text-center p-2 border-r-0 md:border-r border-slate-200">
                      <span className="text-4xl font-extrabold text-slate-950">
                        {avgRating !== null ? avgRating : 'N/A'}
                      </span>
                      <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const numericRating = avgRating !== null ? parseFloat(avgRating) : 0;
                          return (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= Math.round(numericRating) ? 'fill-current' : 'text-slate-300'}`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium mt-1">
                        Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>

                    <div className="col-span-2 space-y-2 py-1 px-2 text-left">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Rating Breakdown</h4>
                      {[5, 4, 3, 2, 1].map((starsCount) => {
                        const countOfThisRating = reviews.filter((r) => r.rating === starsCount).length;
                        const percent = reviews.length > 0 ? (countOfThisRating / reviews.length) * 100 : 0;
                        return (
                          <div key={starsCount} className="flex items-center gap-2 text-xs font-medium">
                            <span className="w-5 text-slate-600 text-right">{starsCount}★</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="w-8 text-slate-500 text-right font-mono">{countOfThisRating}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Single review elements rendering */}
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-4 border border-dashed border-slate-300 rounded-2xl text-left">
                        ⭐ No parent feedback logged yet. Be the first registered guardian to record a rating experience!
                      </p>
                    ) : (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 border-2 border-slate-900 bg-white rounded-2xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-left space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                                {review.userName.substring(0, 2)}
                              </div>
                              <div>
                                <span className="block text-xs font-black text-slate-900 leading-none">{review.userName}</span>
                                <span className="text-[10px] text-slate-400 font-bold">{review.experienceType === 'enrolled' ? '✅ Enrolled Candidate' : '👀 Visited Guest'}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${star <= review.rating ? 'fill-current' : 'text-slate-200'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                            "{review.comment}"
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

            {activeMainTab === 'academics' && (
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-6 text-left animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-purple-600 shrink-0" />
                    Academic Achievements & Board Scores
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Consistently registering high placements, competitive standard clearance scores, and district merit rankings.
                  </p>
                </div>
                
                <DoodleLineDivider className="text-slate-900/10" />

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-semibold text-xs leading-relaxed flex gap-3.5">
                  <span className="text-2xl pt-0.5">💡</span>
                  <div>
                    <span className="font-extrabold block text-purple-900 mb-0.5">Campus Academic Director Evaluation:</span>
                    {school.academicAchievements?.overallAnalysis || `Our flagship ${school.boardOfEducation} curriculum standards remain calibrated to national excellence goals. Under our optimized educator mentorship structure, we registered 100% board clearing counts for preceding cohorts.`}
                  </div>
                </div>

                {/* Class lists toppers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="border-2 border-slate-900 rounded-2xl p-4 bg-slate-50/50 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2.5">
                      <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <span>🥇</span> Grade 10th Board Toppers
                      </h4>
                      <span className="bg-slate-950 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">2024 EVALS</span>
                    </div>

                    <div className="space-y-2.5">
                      {school.academicAchievements?.tenthToppers ? school.academicAchievements.tenthToppers.map((topper, i) => (
                        <div key={i} className="bg-white border-2 border-slate-900 p-3 rounded-xl flex items-center justify-between shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] font-semibold">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 bg-amber-300 text-slate-950 font-black border border-slate-950 rounded-full flex items-center justify-center text-xs shrink-0">#{topper.rank}</span>
                            {topper.imageUrl ? (
                              <img
                                src={topper.imageUrl}
                                alt={topper.name}
                                className="w-9 h-9 rounded-full object-cover border border-slate-900 shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-900 flex items-center justify-center text-xs text-slate-400 font-bold font-mono shrink-0">
                                {topper.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <span className="block text-xs font-black text-slate-900 leading-none">{topper.name}</span>
                              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">{topper.badge}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-xs font-black text-emerald-600 font-mono">{topper.score}</span>
                            <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">Overall</span>
                          </div>
                        </div>
                      )) : (
                        <div className="text-xs text-slate-400 italic text-center py-4">Board results are awaiting regional tabulation.</div>
                      )}
                    </div>
                  </div>

                  <div className="border-2 border-slate-900 rounded-2xl p-4 bg-slate-50/50 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2.5">
                      <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <span>👑</span> Grade 12th Board Toppers
                      </h4>
                      <span className="bg-slate-950 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">2024 EVALS</span>
                    </div>

                    <div className="space-y-2.5">
                      {school.academicAchievements?.twelfthToppers ? school.academicAchievements.twelfthToppers.map((topper, i) => (
                        <div key={i} className="bg-white border-2 border-slate-900 p-3 rounded-xl flex items-center justify-between shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] font-semibold">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 bg-purple-300 text-slate-950 font-black border border-slate-950 rounded-full flex items-center justify-center text-xs shrink-0">#{topper.rank}</span>
                            {topper.imageUrl ? (
                              <img
                                src={topper.imageUrl}
                                alt={topper.name}
                                className="w-9 h-9 rounded-full object-cover border border-slate-900 shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-900 flex items-center justify-center text-xs text-slate-400 font-bold font-mono shrink-0">
                                {topper.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <span className="block text-xs font-black text-slate-900 leading-none">{topper.name}</span>
                              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">{topper.badge}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-xs font-black text-purple-600 font-mono">{topper.score}</span>
                            <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">Overall</span>
                          </div>
                        </div>
                      )) : (
                        <div className="text-xs text-slate-400 italic text-center py-4">Advanced Stream results pending final validation.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMainTab === 'sports' && (
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-6 text-left animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500 shrink-0" />
                    Student Sports & Athletic Accolades
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Exploring championships, medals, and state-level tournament triumphs registered by our training academy teams.
                  </p>
                </div>

                <DoodleLineDivider className="text-slate-900/10" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {school.sportsAchievements && school.sportsAchievements.length > 0 ? (
                    school.sportsAchievements.map((sport, i) => (
                      <div key={i} className="bg-slate-50 hover:bg-slate-100/60 border-2 border-slate-900 p-4 rounded-3xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex flex-col sm:flex-row gap-4 transition-colors text-left font-medium">
                        {sport.imageUrl && (
                          <img
                            src={sport.imageUrl}
                            alt={sport.title}
                            className="w-full sm:w-28 h-28 object-cover rounded-2xl border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] shrink-0"
                          />
                        )}
                        <div className="space-y-1.5 text-left flex-1 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-[9px] font-mono font-black tracking-widest bg-rose-100 border border-rose-300 text-rose-900 px-2.5 py-0.5 rounded-full">
                                🏆 SEASON {sport.year}
                              </span>
                              <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{sport.rankOrStatus}</span>
                            </div>

                            <h4 className="text-sm font-black text-slate-950 leading-tight">{sport.title}</h4>
                            <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">{sport.event}</span>

                            <p className="text-xs text-slate-600 font-semibold leading-relaxed pt-1">
                              {sport.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl font-bold font-mono text-xs text-slate-400">
                      ❌ Athletic achievements are currently being cataloged by the Sports Committee.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeMainTab === 'transit' && (
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-6 text-left animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                    <Bus className="w-6 h-6 text-amber-500 shrink-0" />
                    Detailed Commute & Bus Routing Support
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    We maintain secure, high-tech vehicles with experienced drivers and supervisors. GPS tracker relays map the pickup coordinates in real-time.
                  </p>
                </div>

                <DoodleLineDivider className="text-slate-900/10" />

                {school.busFacilities.available ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-black bg-slate-900 text-white border border-slate-900 px-3.5 py-1.5 rounded-xl">
                        🚌 MONTHLY Transit Fee: ${school.busFacilities.busFee} / STUDENT
                      </span>
                    </div>

                    <div className="space-y-3">
                      <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        🧭 ACTIVE TRANSIT ROUTES & STOPS (👉 Click route tags to explore pickup times):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {school.busFacilities.routes.map((route, i) => {
                          const detailedMatch = school.detailedBusRoutes?.find(dr => 
                            dr.routeName.toLowerCase().includes(route.toLowerCase()) || 
                            route.toLowerCase().includes(dr.routeName.toLowerCase())
                          );

                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                if (detailedMatch) {
                                  setSelectedBusRouteDetail(detailedMatch);
                                } else {
                                  setSelectedBusRouteDetail({
                                    routeName: route,
                                    stops: [
                                      { name: `${route} Crossing Entry Point`, time: '07:15 AM' },
                                      { name: `${route} Community Stop Area`, time: '07:35 AM' },
                                      { name: 'Primary School Gate Terminal', time: '07:55 AM' }
                                    ]
                                  });
                                }
                              }}
                              className="p-3 bg-slate-50 hover:bg-emerald-50 border-2 border-slate-900 rounded-2xl shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold text-xs text-slate-900 hover:text-slate-950 flex items-center justify-between cursor-pointer group text-left"
                            >
                              <span>📍 Route Sector: <strong className="font-mono">{route}</strong></span>
                              <span className="text-[9px] font-mono bg-white group-hover:bg-amber-300 border border-slate-200 px-2 py-0.5 rounded font-black shrink-0 transition-colors">View timetable ➔</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        🛡️ Safety, Compliance and Guards:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-semibold">
                        {school.busFacilities.safetyFeatures.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-extrabold text-sm">✔</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-slate-550 text-slate-500 italic bg-slate-50 p-4 border border-dashed border-slate-200 rounded-2xl">
                    ❌ Standard Bus Routing services are currently not offered for this school. Parents coordinate together or employ local private ride pools.
                  </p>
                )}
              </div>
            )}

          </div>

          {/* RIGHT 1 COL: Contacts & Admission Application Form */}
          <div className="space-y-6">
            
            {/* Contact Panel Card */}
            <div className="bg-amber-50/20 border-2 border-slate-900 rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200" />
              
              <div className="pt-1.5">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-lg">📞</span>
                  <span>Office & Admissions</span>
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold">Contact the registered registrar or desk secretary for offline tours.</p>
              </div>
              
              <DoodleLineDivider className="text-slate-900/10" />

              <div className="space-y-3 font-semibold text-slate-800 text-xs">
                <a
                  href={`mailto:${school.contactInfo.email}`}
                  className="flex items-center gap-2.5 hover:text-slate-950 transition-colors py-1 hover:translate-x-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-900 flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                    <Mail className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="truncate">{school.contactInfo.email}</span>
                </a>
                
                <a
                  href={`tel:${school.contactInfo.phone}`}
                  className="flex items-center gap-2.5 hover:text-slate-950 transition-colors py-1 hover:translate-x-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-900 flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                    <Phone className="w-4 h-4 text-slate-700" />
                  </div>
                  <span>{school.contactInfo.phone}</span>
                </a>
                
                <a
                  href={`https://${school.contactInfo.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-blue-600 hover:text-blue-800 hover:underline transition-colors py-1 hover:translate-x-0.5"
                  referrerPolicy="no-referrer"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-900 flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="truncate underline">{school.contactInfo.website}</span>
                </a>
              </div>

              {/* Physical Address details */}
              <div className="text-[11px] text-slate-600 bg-white border-2 border-slate-900 p-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <span className="font-extrabold text-slate-950 block mb-1">📍 Campus Address:</span>
                <p className="font-semibold">{school.contactInfo.address}, {school.contactInfo.city}, {school.contactInfo.state}</p>
              </div>

              {/* Action prospectus link simulations */}
              <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-2">
                <a 
                  href={`https://${school.contactInfo.website || 'example.com'}`}
                  target="_blank"
                  className="w-full text-center py-2 bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all block"
                  referrerPolicy="no-referrer"
                >
                  🌐 Visit External Portal website
                </a>
                
                <button 
                  onClick={() => alert(`Initiating prompt: Standard prospectus file generated for ${school.name}. Feel free to write to Registrar at ${school.contactInfo.email}!`)}
                  className="w-full text-center py-2 bg-amber-300 hover:bg-amber-400 text-slate-950 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all"
                >
                  📄 Download prospectus Guide (.PDF)
                </button>
              </div>
            </div>

            {/* Curriculum Board Guide sticker */}
            <div className="bg-slate-900 border-2 border-slate-950 rounded-3xl p-5 text-white space-y-2 relative overflow-hidden">
              <div className="absolute -top-3 -right-3 w-16 h-16 opacity-10 pointer-events-none">
                <DoodleSparkle className="w-full h-full text-white" />
              </div>
              <span className="text-[9px] font-mono tracking-widest font-black uppercase text-amber-300 block">Affiliated Framework</span>
              <h4 className="text-sm font-black tracking-tight">{school.boardOfEducation} Education Board</h4>
              <p className="text-[11px] text-slate-350 text-slate-300 leading-relaxed font-semibold">
                {school.boardOfEducation === 'CBSE' && 'Central Board of Secondary Education. Rigorous curriculum focused on systemic development, standardized sciences, and nationwide compatibility.'}
                {school.boardOfEducation === 'ICSE' && 'Indian Certificate of Secondary Education. Comprehensive, language-heavy analytical mapping with immense practical project evaluations.'}
                {school.boardOfEducation === 'IB' && 'International Baccalaureate board curriculum. High-order student inquiry, transdisciplinary skills, global research projects, & global honors credits.'}
                {school.boardOfEducation === 'IGCSE' && 'Cambridge Assessment International Education curriculum framework. Flexible paths, international outlooks, sciences, and global university entry alignment.'}
                {school.boardOfEducation === 'State Board' && 'Regional Education Standards Curriculum. Focused on state-native language excellence, practical localized history, and high compatibility with native colleges.'}
              </p>
            </div>

            {/* DUAL ROLE: STUDENT ADMISSION PORTAL */}
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sticky top-24">
              <div className="relative">
                <DoodleSparkle className="absolute -top-5.5 -right-5.5 w-8 h-8 text-yellow-500" />
                <h3 className="text-lg font-black text-slate-950 mb-2 font-sans tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Admission Portal
                </h3>
              </div>

              {/* Status information check */}
              <p className="text-xs text-slate-500 mb-4 bg-blue-50/50 p-2 border border-blue-200 rounded-lg">
                📋 Admissions open till: <strong>{parseDate(school.admissionEndDate)}</strong>
              </p>

              {/* Admission instructions summary */}
              <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-3 italic mb-4">
                <strong>Process:</strong> "{school.admissionInstructions}"
              </div>

              <div className="border-t border-slate-100 pt-4" id="admission-portal-actions">
                {!currentUser ? (
                  <div className="text-center py-4" id="portal-logged-out-prompt">
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                      Please register or sign in as a Parent to unlock application forms.
                    </p>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onOpenAuth('login')}
                        className="px-4 py-2 border-2 border-slate-900 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => onOpenAuth('signup')}
                        className="px-4 py-2 bg-slate-900 text-amber-50 hover:bg-slate-850 hover:bg-slate-800 font-bold text-xs rounded-xl sketchy-badge transition-all"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                ) : currentUser.role === 'school_admin' ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg text-center leading-relaxed">
                    🏫 You are currently viewing as a School Administrator. Switch or log out to simulate parental applications submission.
                  </div>
                ) : existingApp ? (
                  /* ALREADY APPLIED DISPLAY */
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-3" id="portal-existing-application">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Application Submitted</h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        You already applied for {existingApp.studentName} (Grade: {existingApp.gradeApplying}).
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 font-mono tracking-wide rounded-full">
                        PIPELINE STATUS: {existingApp.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ) : applicationCompleted ? (
                  /* RECENTLY APPLIED DISPLAY */
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2" id="portal-recent-success">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-800">Registration Standard Placed!</h4>
                    <p className="text-[11px] text-emerald-700">
                      The admission data was saved to local pipeline. Our representative will contact you.
                    </p>
                  </div>
                ) : (
                  /* APPLICATION FORM TRIGGER */
                  <form onSubmit={handleApplyAdmissions} className="space-y-3.5" id="admission-submission-form">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest block">
                      Rapid Admission Form
                    </h4>

                    {/* Student Name */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Child's full Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full casual-input px-2.5 py-1.5 text-xs"
                      />
                    </div>

                    {/* Grade applying (from available grades drop-down) */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Grade / Scholastic standard *
                      </label>
                      <select
                        value={gradeApplying}
                        onChange={(e) => setGradeApplying(e.target.value)}
                        className="w-full casual-input px-2.5 py-1.5 text-xs bg-white"
                      >
                        {school.standardsAvailable.map((std) => (
                          <option key={std} value={std}>
                            {std}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Parent Phone */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Parent Contact Phone *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98XXX XXX55"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className="w-full casual-input px-2.5 py-1.5 text-xs"
                      />
                    </div>

                    {/* Prior School */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Previous School (if any)
                      </label>
                      <input
                        type="text"
                        placeholder="St. Jones Elementary Block"
                        value={previousSchool}
                        onChange={(e) => setPreviousSchool(e.target.value)}
                        className="w-full casual-input px-2.5 py-1.5 text-xs"
                      />
                    </div>

                    {/* Statement textarea */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Remarks / Physical needs (optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g., medical requirements, allergy logs"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="w-full casual-input px-2.5 py-1.5 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-950 text-amber-50 hover:bg-slate-800 transition-all font-bold text-xs rounded-xl shadow-md border-2 border-transparent"
                    >
                      Classroom Admission Submission
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* CURRICULUM EXPLORER OVERLAY MODAL */}
      {selectedCurriculumClass && (() => {
        const curriculum = school.standardCurriculums?.find(c => 
          c.standardName.toLowerCase().trim() === selectedCurriculumClass.toLowerCase().trim()
        ) || {
          standardName: selectedCurriculumClass,
          mandatorySubjects: ["English Literature", "Algebraic Mathematics", "General Applied Science", "History & Social Civics"],
          electiveSubjects: ["Computer Code & Algorithms", "Fine Creative Arts", "Physical Health Science"],
          coCurricularActivities: [
            { name: "Symphonic Jazz Orchestra", fee: 20 },
            { name: "Robotics Design Lab", fee: 25 },
            { name: "Junior Football League", fee: 15 }
          ]
        };

        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white border-4 border-slate-950 rounded-3xl p-6 max-w-lg w-full shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden flex flex-col max-h-[85vh]">
              
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300" />
              
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mt-1.5 text-left">
                <div>
                  <span className="text-[10px] uppercase font-mono font-black text-purple-600 tracking-wider">Class Cohort Overview</span>
                  <h3 className="text-xl font-black text-slate-950 leading-tight">📚 {curriculum.standardName} Studies</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCurriculumClass(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-950 hover:bg-slate-200 transition-all flex items-center justify-center text-slate-950 font-black cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,15)] active:translate-y-[1px]"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto space-y-4 py-4 pr-1 text-left flex-1">
                
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    📖 Required Core Subjects (Mandatory):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {curriculum.mandatorySubjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold rounded-lg shrink-0">
                        • {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    ⭐ Electives & Specialized Streams (Choose One):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {curriculum.electiveSubjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold rounded-lg shrink-0">
                        ★ {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    ⚽ Co-curricular Academies & Subscription Fees:
                  </span>
                  <div className="border-2 border-slate-900 rounded-2xl overflow-hidden bg-slate-50 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="bg-slate-950 text-amber-50 font-black uppercase font-mono text-[9px] border-b-2 border-slate-900">
                          <th className="p-2.5 pl-3.5">Specialized Activity / Club</th>
                          <th className="p-2.5 pr-3.5 text-right">Subscription Activity Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-slate-900 font-semibold text-slate-700">
                        {curriculum.coCurricularActivities.map((act, idx) => (
                          <tr key={idx} className="hover:bg-amber-50/30">
                            <td className="p-2.5 pl-3.5 font-bold text-slate-900">{act.name}</td>
                            <td className="p-2.5 pr-3.5 text-right font-mono text-emerald-800 font-black">
                              ${act.fee} / Month
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-500 leading-relaxed font-semibold">
                  🌿 Note: Active training in at least one co-curricular block is recommended to foster collaborative student friendship circles.
                </div>
              </div>

              <div className="border-t-2 border-slate-900 pt-3 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedCurriculumClass(null)}
                  className="px-5 py-2.5 bg-slate-905 bg-slate-900 text-amber-50 border-2 border-slate-950 hover:bg-slate-800 transition-all font-black text-xs rounded-2xl shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
                >
                  Close Curriculum View
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* DETAILED BUS ROUTES TIMETABLE MODAL */}
      {selectedBusRouteDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border-4 border-slate-955 border-slate-900 rounded-3xl p-6 max-w-md w-full shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden flex flex-col max-h-[80vh]">
            
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-200" />
            
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mt-1.5 text-left">
              <div>
                <span className="text-[10px] uppercase font-mono font-black text-emerald-600 tracking-wider">Transit Timetables</span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">📍 Route: {selectedBusRouteDetail.routeName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBusRouteDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-950 hover:bg-slate-200 transition-all flex items-center justify-center text-slate-950 font-black cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 py-4 text-left flex-1">
              <span className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">
                ⏱️ TIMED ARRIVAL STOPS LISTING:
              </span>
              
              <div className="space-y-2 border-l-4 border-emerald-500 pl-4 ml-2 mt-1.5">
                {selectedBusRouteDetail.stops.map((stop: any, idx: number) => (
                  <div key={idx} className="relative py-2.5 px-3.5 bg-slate-50 border-2 border-slate-900 rounded-2xl shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] font-medium">
                    <div className="absolute -left-[27px] top-[16px] w-3 h-3 rounded-full border-2 border-slate-900 bg-white shadow-sm" />
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-black text-slate-900">{stop.name}</span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-100 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded-md shrink-0">
                        {stop.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-slate-600 leading-relaxed font-semibold">
                🛡️ <strong>Safety Advisory:</strong> Candidates should present themselves at the respective stopping points 5 minutes in advance of arrival hours.
              </div>
            </div>

            <div className="border-t-2 border-slate-900 pt-3 text-right">
              <button
                type="button"
                onClick={() => setSelectedBusRouteDetail(null)}
                className="px-5 py-2.5 bg-slate-900 text-amber-50 border-2 border-slate-950 hover:bg-slate-800 transition-all font-black text-xs rounded-2xl shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
              >
                Done Exploring
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
