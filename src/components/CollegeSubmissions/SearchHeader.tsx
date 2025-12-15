// ================================================================

// src/components/SearchHeader.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";

type SearchHeaderProps = {
  query: string;
  setQuery: (query: string) => void;
  onBack: () => void;
};

export default function SearchHeader({ query, setQuery, onBack }: SearchHeaderProps) {
  return (
    <header className="px-4 md:pl-28 md:pr-8 py-4 md:py-6 relative z-40 bg-linear-to-br from-orange-50 via-white to-orange-50">
      <div className="flex flex-col md:flex-row md:items-center gap-7 md:gap-0">
        <div className="flex items-center gap-3">
          {/* Back button - Hidden on mobile (menu handles navigation) */}
          <button 
            className="hidden md:block mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors" 
            onClick={onBack}
          >
            ←
          </button>
          
          {/* Title */}
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Submissions</h1>
        </div>

        {/* Search Bar - Full width on mobile, auto on desktop */}
        <div className="relative w-full md:w-64 md:ml-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
            placeholder="Search Colleges"
            aria-label="Search colleges"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>
    </header>
  );
}