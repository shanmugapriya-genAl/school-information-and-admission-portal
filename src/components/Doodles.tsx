/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Hand-drawn sketchy horizontal rule
export const DoodleLineDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 400 12"
    fill="none"
    preserveAspectRatio="none"
    className={`w-full h-3 select-none pointer-events-none ${className}`}
  >
    <path
      d="M3 6.5 C 100 8.5, 200 4.5, 397 5.5 C 300 7.5, 150 7.0, 5 4.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Highlighting arrow
export const DoodleArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M10 24 C 18 20, 26 15, 34 16 M 34 16 L 24 10 M 34 16 L 26 26"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn star doodle
export const DoodleStar: React.FC<{ className?: string; fill?: boolean }> = ({ className = '', fill = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    className={`select-none ${className}`}
  >
    <path
      d="M12 2 L 14.8 8.5 L 21.8 9 L 16.5 13.8 L 18.2 20.8 L 12 17.1 L 5.8 20.8 L 7.5 13.8 L 2.2 9 L 9.2 8.5 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn sparkle / highlight details
export const DoodleSparkle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M12 3 L 12 9 M12 15 L 12 21 M3 12 L 9 12 M15 12 L 21 12 M6 6 L 9.5 9.5 M14.5 14.5 L 18 18 M18 6 L 14.5 9.5 M9.5 14.5 L 6 18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

// Minimal hand-drawn style school building
export const DoodleSchool: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    className={`select-none ${className}`}
  >
    {/* Ground line */}
    <path d="M5 75 C 30 76, 70 74, 95 75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Main body */}
    <path d="M15 75 L 15 40 L 40 40 L 40 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 75 L 40 30 L 60 30 L 60 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M60 75 L 60 40 L 85 40 L 85 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Roofs */}
    <path d="M12 40 L 27.5 28 L 43 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M37 30 L 50 18 L 63 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M57 40 L 72.5 28 L 88 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Flagpole and Flag */}
    <path d="M50 18 L 50 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M50 5 C 55 5, 58 8, 62 7 C 58 10, 54 9, 50 11" stroke="currentColor" fill="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Big Clock/Circle in center */}
    <circle cx="50" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Windows */}
    <rect x="22" y="47" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="72" y="47" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    
    <rect x="22" y="60" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="72" y="60" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Main Entrance Door */}
    <path d="M47 75 L 47 62 C 47 58, 53 58, 53 62 L 53 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Minimal hand-drawn style school bus
export const DoodleBus: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    className={`select-none ${className}`}
  >
    {/* Ground line */}
    <path d="M5 52 C 35 53, 65 52, 95 53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Main body of bus with nice sketchy alignment */}
    <path d="M10 40 L 15 15 L 85 15 L 90 28 L 90 40 L 85 46 L 15 46 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Front hood bump typical of school buses */}
    <path d="M85 46 L 91 46 L 93 38 L 90 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Wheels */}
    <circle cx="28" cy="46" r="6" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="28" cy="46" r="2.2" stroke="currentColor" fill="currentColor" />
    
    <circle cx="72" cy="46" r="6" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="72" cy="46" r="2.2" stroke="currentColor" fill="currentColor" />
    
    {/* Windows */}
    <rect x="20" y="20" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="34" y="20" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="48" y="20" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="62" y="20" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M76 20 Z" />
    {/* Front windshield */}
    <path d="M76 20 L 84 20 L 85 30 L 76 30 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Decorative details */}
    <path d="M15 35 L 85 35" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M15 38 L 85 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <text x="32" y="32" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="currentColor">SCHOOL BUS</text>
  </svg>
);

// Clean hand-drawn cloud doodle
export const DoodleCloud: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 50 30"
    fill="none"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M10 20 C 5 20, 3 15, 7 10 C 5 5, 12 3, 17 6 C 21 1, 30 1, 34 5 C 40 2, 45 6, 43 11 C 48 13, 47 20, 40 20 C 40 20, 10 20, 10 20 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
