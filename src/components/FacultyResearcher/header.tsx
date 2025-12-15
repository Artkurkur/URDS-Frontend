// File: components/Header.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userDepartment: string;
  searchPlaceholder?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName, 
  userDepartment, 
  searchPlaceholder = "Search Announcement" 
}) => {
  return (
    <div className="bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Profile Photo Placeholder */}
          <div className="w-15 h-15 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-gray-400"></div>
          </div>
          
          <div>
            <h1 className="text-lg font-bold text-gray-900">{userName || "User Name"}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              {/* College Logo Placeholder */}
              <span className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-[10px]"></span>
              {userDepartment || "Department"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* University Logo Placeholder */}
          <div className="w-17 h-17 rounded-full bg-gray-400 flex items-center justify-center shadow-md">
          </div>
        </div>
      </div>
    </div>
  );
};