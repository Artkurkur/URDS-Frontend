// ================================================================
// src/components/urds-director/Header.tsx
"use client";

import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { College } from '@/app/URDS/Artnomer/PROPOSALS/page';

interface HeaderProps {
  selectedCollege: College;
  setSelectedCollege: (college: College) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedCollege, setSelectedCollege }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // List of colleges
  const colleges: College[] = [
    { id: 'cba',  name: 'College of Business Administration', code: 'CBA', logoUrl: '/images/logo/CBA-logo.png' },
    { id: 'cac',  name: 'College of Arts and Communication', code: 'CAC', logoUrl: '/images/logo/CAC-logo.png' },
    { id: 'coe',  name: 'College of Engineering', code: 'COE', logoUrl: '/images/logo/COE-logo.png' },
    { id: 'cafnr',name: 'College of Agriculture, Fisheries and Natural Resources', code: 'CAFNR', logoUrl: '/images/logo/CAFNR-logo.png' },
    { id: 'cs',   name: 'College of Science', code: 'CS', logoUrl: '/images/logo/CS-logo.png' },
    { id: 'cl',   name: 'College of Law', code: 'CL', logoUrl: '/images/logo/CL-logo.png' },
    { id: 'coed', name: 'College of Education', code: 'COED', logoUrl: '/images/logo/COED-logo.png' },
    { id: 'cnahs',name: 'College of Nursing and Allied Health Sciences', code: 'CNAHS', logoUrl: '/images/logo/CNAHS-logo.png' },
    { id: 'cvm',  name: 'College of Veterinary Medicine', code: 'CVM', logoUrl: '/images/logo/CVM-logo.png' },
  ];

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 mb-6 md:mb-8 relative z-10">
      {/* Top Bar with Logos */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Left Side: Back button (desktop only) and Main Logo */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={28} className="text-gray-700" />
          </button>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Main College Seal */}
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-gray-200 p-1 flex items-center justify-center bg-white shadow-sm overflow-hidden flex-shrink-0">
              <img
                src={selectedCollege.logoUrl}
                alt={selectedCollege.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <h1 className="text-sm md:text-2xl font-bold text-gray-900 tracking-tight truncate">
                {selectedCollege.name.toUpperCase()}
              </h1>
              <div className="h-0.5 w-full bg-gray-200 my-0.5 md:my-1"></div>
              <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase truncate">
                University of Eastern Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: College Logos - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex bg-white rounded-l-full rounded-r-2xl shadow-md border border-gray-100 py-2 px-6 items-center gap-3 overflow-x-auto">
          {colleges.map((college) => (
            <div
              key={college.id}
              className={`w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-50 hover:scale-110 transition-transform cursor-pointer shrink-0 ${
                selectedCollege.id === college.id ? 'w-13 h-13 ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedCollege(college)}
              title={college.name}
            >
              <img
                src={college.logoUrl}
                alt={college.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar and College Logos for Mobile */}
      <div className="flex flex-col gap-3 w-full">
        {/* Search Bar */}
        <div className="relative w-full md:w-96 md:ml-auto">
          <input
            type="text"
            placeholder="Search College"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 md:pl-6 pr-10 py-2 md:py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-gray-600 bg-white text-sm md:text-base"
          />
          <Search className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Mobile College Logos - Horizontal Scroll */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-2 px-1">
          {(searchQuery ? filteredColleges : colleges).map((college) => (
            <div
              key={college.id}
              className={`flex-shrink-0 w-12 h-12 rounded-full border-2 overflow-hidden bg-gray-50 active:scale-95 transition-transform cursor-pointer ${
                selectedCollege.id === college.id ? 'border-green-500 ring-2 ring-green-500' : 'border-gray-200'
              }`}
              onClick={() => {
                setSelectedCollege(college);
                setSearchQuery('');
              }}
              title={college.name}
            >
              <img
                src={college.logoUrl}
                alt={college.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
