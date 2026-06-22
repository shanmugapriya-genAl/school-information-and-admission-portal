/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'parent' | 'school_admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  associatedSchoolId?: string; // If school_admin, links to their registered school
}

export interface SchoolFeeStructure {
  gradeRange: string; // e.g. "Nursery - Kindergarten", "Primary (Grade 1-5)", etc.
  tuitionFee: number; // annual
  admissionFee: number; // one-time
  otherFees: number; // yearly standard
}

export interface SchoolBusFacility {
  available: boolean;
  busFee: number; // monthly
  routes: string[]; // list of covered areas
  safetyFeatures: string[]; // e.g. ["GPS Tracking", "Attendant", "CCTV"]
}

export interface SchoolCalendarEvent {
  title: string;
  date: string; // YYYY-MM-DD
  type: 'holiday' | 'event' | 'exam' | 'term_start_end' | 'open_house' | 'orientation' | 'admission_test';
  description?: string;
}

export interface SchoolContact {
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
}

export interface School {
  id: string;
  name: string;
  boardOfEducation: 'CBSE' | 'ICSE' | 'State Board' | 'IB' | 'IGCSE';
  standardsAvailable: string[]; // e.g., ["Kindergarten", "Primary (Grade 1-5)", "Middle (Grade 6-8)", "High School (Grade 9-10)", "Higher Secondary (Grade 11-12)"]
  locationSummary: string; // brief overview area, e.g. "Sunnyvale, CA"
  academicCalendar: SchoolCalendarEvent[];
  contactInfo: SchoolContact;
  extracurricularActivities: string[];
  feeStructure: SchoolFeeStructure[];
  busFacilities: SchoolBusFacility;
  admissionInstructions: string; // how to apply explanation
  admissionStartDate: string;
  admissionEndDate: string;
  registeredByUserId?: string; // school_admin who registered this school
  imageUrl?: string; // school picture or illustration
  
  // High-fidelity enrichments added for achievements, stops, facilities
  staffCount?: number;
  classroomCount?: number;
  academicAchievements?: {
    overallAnalysis?: string;
    tenthToppers: { name: string; score: string; rank: number; badge?: string; imageUrl?: string }[];
    twelfthToppers?: { name: string; score: string; rank: number; badge?: string; imageUrl?: string }[];
  };
  sportsAchievements?: {
    title: string;
    event: string;
    year: string;
    rankOrStatus: string;
    description?: string;
    imageUrl?: string;
  }[];
  detailedBusRoutes?: {
    routeName: string;
    stops: { name: string; time: string; address?: string }[];
  }[];
  standardCurriculums?: {
    standardName: string;
    mandatorySubjects: string[];
    electiveSubjects: string[];
    coCurricularActivities: { name: string; fee: number }[];
  }[];
}

export interface SchoolAdmissionApplication {
  id: string;
  schoolId: string;
  schoolName: string;
  userId: string; // parent's user id
  studentName: string;
  gradeApplying: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  previousSchool?: string;
  additionalInfo?: string;
  appliedDate: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Declined';
}

export interface SchoolReview {
  id: string;
  schoolId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  experienceType: 'visited' | 'enrolled'; // "after visiting or enrolling their child"
  createdDate: string; // YYYY-MM-DD
}

