'use client';

import { useState } from 'react';
import { Clock, FileText, Pencil, Trash2, Megaphone, X } from 'lucide-react';

interface AnnouncementBannerProps {
  title: string;
  description: string;
  startDate: string;
  deadline: string;
}

export default function AnnouncementBanner({
  title,
  description,
  startDate,
  deadline,
}: AnnouncementBannerProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive(!isActive);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit clicked');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete clicked');
  };

  return (
    <div className="relative">
      <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
        New Announcement
      </span>

      <div
        onClick={handleClick}
        className={`relative bg-linear-to-r from-gray-50 to-orange-50 rounded-2xl p-4 flex items-center gap-4 border border-gray-100 cursor-pointer transition-all duration-300 ${
          isActive ? 'brightness-90 ring-2 ring-blue-400' : 'hover:brightness-95'
        }`}
      >
        {isActive && (
          <>
            <div
              onClick={handleEdit}
              className="absolute -top-3 right-20 bg-white rounded-xl shadow-lg p-3 z-20 hover:bg-blue-50 hover:scale-110 transition-all duration-200 cursor-pointer border border-gray-100"
            >
              <Pencil className="w-5 h-5 text-blue-500" />
            </div>
            <div
              onClick={handleDelete}
              className="absolute -top-3 right-6 bg-white rounded-xl shadow-lg p-3 z-20 hover:bg-red-50 hover:scale-110 transition-all duration-200 cursor-pointer border border-gray-100"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
          </>
        )}

        <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center min-w-16">
          <div className="text-xs">TODAY</div>
          <div className="text-xl font-bold">17:00</div>
        </div>

        <div className="flex-1">
          <p className="text-gray-700 text-sm md:text-base">{description}</p>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Deadline: {deadline}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" /> Guidelines Available
            </span>
          </div>
        </div>

        <button className="text-blue-600 text-sm hover:underline whitespace-nowrap">
          View All
        </button>

        <div className="hidden md:block">
          <Megaphone className="w-16 h-16 text-orange-400" />
        </div>
      </div>
    </div>
  );
}
