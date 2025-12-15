// ================================================================
// src/components/CollegeGrid.tsx
"use client";

import React from "react";

export type College = {
  id: string | number;
  code?: string;
  name: string;
  logoUrl?: string;
  submissions: number;
};

type CollegeGridProps = {
  colleges: College[];
  onSelect: (college: College) => void;
  defaultLogo: string;
};

export default function CollegeGrid({ colleges, onSelect, defaultLogo }: CollegeGridProps) {
  if (colleges.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No colleges found matching your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {colleges.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          className="
            group bg-white rounded-xl border shadow-md hover:shadow-lg
            transition p-4 flex flex-col justify-between relative
          "
        >
          {/* Top row: Logo + Title */}
          <div className="flex items-center gap-4">

            {/* Logo */}
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src={c.logoUrl || defaultLogo}
                alt={c.name}
                onError={(e) => (e.currentTarget.src = defaultLogo)}
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Text column */}
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-600 tracking-wide">
                {c.code}
              </span>
              <span className="text-lg font-bold text-gray-800 leading-tight">
                {c.name}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 mt-4 mb-2"></div>

          {/* Submissions Count — aligned to bottom right */}
          <div className="flex justify-end items-center gap-2">
            <span className="text-xs text-gray-600">Total Submissions:</span>
            <div
              className="
                bg-orange-500 text-white font-bold w-10 h-10 rounded-full
                flex items-center justify-center shadow
              "
            >
              {c.submissions}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
