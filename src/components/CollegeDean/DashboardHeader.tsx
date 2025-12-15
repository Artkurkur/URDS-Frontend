"use client";

import React from 'react';
import { Edit2 } from 'lucide-react';

interface DashboardHeaderProps {
  onProfileClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onProfileClick }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div 
          className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={onProfileClick}
          title="View Profile"
        >
          <span className="text-white text-2xl font-bold">👤</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Senior Faculty Researcher</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img 
              src="/images/logo/UEPlogo.png" 
              alt="UEP" 
              className="w-6 h-6" 
            />
            <span className="font-semibold">UNIVERSITY OF EASTERN PHILIPPINES</span>
          </div>
          <p className="text-sm text-gray-600">Dr. Eva L. Autorayan - Senior Faculty Researcher, College of Engineering</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">Computer Science</p>
          <p className="text-sm text-gray-600">Faculty Submissions - College Engineering</p>
        </div>
        <button 
          onClick={onProfileClick}
          className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all shadow-md flex items-center gap-2 font-medium"
        >
          <Edit2 className="w-4 h-4" />
          My Profile
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;