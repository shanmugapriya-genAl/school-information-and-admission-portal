/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { School, SchoolReview } from '../types';
import { MapPin, BookOpen, GraduationCap, Bus, Calendar } from 'lucide-react';
import { DoodleStar } from './Doodles';

interface SchoolCardProps {
  school: School;
  onSelect: () => void;
  reviews?: SchoolReview[];
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, onSelect, reviews = [] }) => {
  // Compute tuition fee range
  const tuitionFees = school.feeStructure.map((f) => f.tuitionFee);
  const minFee = tuitionFees.length > 0 ? Math.min(...tuitionFees) : 0;
  const maxFee = tuitionFees.length > 0 ? Math.max(...tuitionFees) : 0;

  // Calculate rating stats
  const ratingSum = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = reviews.length > 0 ? (ratingSum / reviews.length).toFixed(1) : null;


  return (
    <div
      onClick={onSelect}
      className="group bg-white border-2 border-slate-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
      id={`school-card-${school.id}`}
    >
      {/* School Image / Header Banner */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b-2 border-slate-900">
        <img
          src={school.imageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
          alt={school.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
          }}
        />
        
        {/* Board of Education Sticker / Badge */}
        <div className="absolute top-3 left-3 bg-slate-900 text-amber-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-700 font-mono">
          {school.boardOfEducation}
        </div>

        {/* Bus Facility Sticker */}
        {school.busFacilities.available && (
          <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 p-1.5 rounded-lg border border-slate-900 flex items-center gap-1 text-xs font-bold">
            <Bus className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-mono tracking-tight font-black">BUS</span>
          </div>
        )}
      </div>

      {/* Card Content details */}
      <div className="p-5 flex flex-col justify-between min-h-[220px]">
        <div>
          {/* Title & Star highlight */}
          <div className="flex items-start justify-between gap-1.5 mb-2">
            <h3 className="text-lg font-bold text-slate-950 font-sans tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
              {school.name}
            </h3>
            <span className="flex items-center gap-1 text-amber-500 mt-1 shrink-0" title={`${reviews.length} reviews`}>
              <DoodleStar className="w-4 h-4" fill={avgRating !== null} />
              <span className="text-xs font-black text-slate-700">
                {avgRating !== null ? `${avgRating} (${reviews.length})` : 'New'}
              </span>
            </span>
          </div>

          {/* Location details */}
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-3 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{school.locationSummary}</span>
          </div>

          {/* Standards / Grades available */}
          <div className="flex items-center gap-1.5 text-xs text-slate-700 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <GraduationCap className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="truncate font-medium">
              <span className="text-slate-500 font-bold mr-1">Standards:</span>
              {school.standardsAvailable.join(', ')}
            </div>
          </div>
        </div>

        {/* Fees range pricing and CTA Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block leading-none">
              Annual Fees Range
            </span>
            <span className="text-sm font-black text-slate-950">
              ${minFee.toLocaleString()} - ${maxFee.toLocaleString()}
            </span>
          </div>

          <div className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1">
            <span>View Details</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
