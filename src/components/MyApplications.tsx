/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SchoolAdmissionApplication, User } from '../types';
import { ClipboardList, Calendar, GraduationCap, MapPin, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { DoodleSparkle } from './Doodles';

interface MyApplicationsProps {
  currentUser: User | null;
  applications: SchoolAdmissionApplication[];
  onRefresh: () => void;
  onViewSchool: (schoolId: string) => void;
}

export const MyApplications: React.FC<MyApplicationsProps> = ({
  currentUser,
  applications,
  onRefresh,
  onViewSchool
}) => {
  const filteredApps = applications.filter((app) => app.userId === currentUser?.id);

  const getStatusBadge = (status: SchoolAdmissionApplication['status']) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Accepted
          </span>
        );
      case 'Declined':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Declined
          </span>
        );
      case 'Under Review':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-750 border border-blue-200">
            <Clock className="w-3.5 h-3.5" />
            Under Review
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-55 bg-amber-50 text-amber-700 border border-amber-200">
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4" id="parent-applications-portal">
      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="relative">
          <DoodleSparkle className="absolute -top-6 -left-6 w-10 h-10 text-yellow-500" />
          <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
            My Admission Applications
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Tracking current admission pipeline events and feedback logs for your kids.
          </p>
        </div>

        {/* Refresh status */}
        <button
          onClick={onRefresh}
          className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold rounded-xl transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
        >
          <RefreshCw className="w-4 h-4 text-slate-500" />
          <span>Refresh Pipe</span>
        </button>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="text-center bg-white border-2 border-slate-900 rounded-2xl p-10 py-16 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div className="mx-auto w-16 h-16 bg-amber-50 border-2 border-slate-900 rounded-full flex items-center justify-center text-amber-500 mb-4 sketchy-border-sm">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Applications Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            You haven't submitted any applications. Browse available schools and click on "Apply Classroom Admission" inside their details.
          </p>
          <button
            onClick={onRefresh} // or navigate to browse
            className="px-5 py-2.5 bg-slate-950 text-amber-50 hover:bg-slate-800 font-bold text-sm rounded-xl sketchy-badge transition-all"
          >
            Start Browsing Registry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Application School Details */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    {app.schoolName}
                  </h3>
                  <button
                    onClick={() => onViewSchool(app.schoolId)}
                    className="text-xs font-bold text-blue-600 hover:underline hover:text-blue-800"
                  >
                    (View School Info)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Student: <strong className="text-slate-800">{app.studentName}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Grade Level: <strong className="text-slate-800">{app.gradeApplying}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Applied On:{' '}
                      <strong className="text-slate-800">
                        {new Date(app.appliedDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </strong>
                    </span>
                  </div>
                </div>

                {app.additionalInfo && (
                  <div className="bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg text-slate-500 italic max-w-xl">
                    "{app.additionalInfo}"
                  </div>
                )}
              </div>

              {/* Application Status Badge */}
              <div className="flex flex-col items-start md:items-end justify-between shrink-0 h-full py-1">
                <div className="mb-2 md:mb-0">{getStatusBadge(app.status)}</div>
                
                <div className="text-[10px] text-slate-400 font-mono text-left md:text-right mt-2 uppercase tracking-tight">
                  Reference: {app.id.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
