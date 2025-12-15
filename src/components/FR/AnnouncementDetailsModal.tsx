"use client";

import React from "react";
import { X, Calendar, Clock, Tag, Bell } from "lucide-react";
import { AnnouncementData } from "./AnnouncementCard"; // Import the type

interface AnnouncementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnnouncementData | null;
}

const AnnouncementDetailsModal: React.FC<AnnouncementDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data) return null;

  // Helper to get colors (matching your existing theme)
  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      purple: "bg-purple-600 text-white",
      blue: "bg-blue-600 text-white",
      green: "bg-green-600 text-white",
      orange: "bg-orange-500 text-white",
    };
    return colors[color] || "bg-blue-600 text-white";
  };

  const headerColorClass = getColorClasses(data.color);

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-transparent bg-opacity-60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${headerColorClass} px-6 py-4 flex justify-between items-center shrink-0`}>
          <div className="flex items-center gap-2 font-semibold">
            <Bell size={20} />
            <span className="uppercase tracking-wide text-sm">{data.type}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
            {data.title}
          </h2>

          {/* Meta Data Row */}
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Calendar size={16} className="text-blue-500" />
              <span>{new Date(data.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Clock size={16} className="text-blue-500" />
              <span>{data.time}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Tag size={16} className="text-blue-500" />
              <span>{data.category}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
              {data.description}
            </p>
          </div>

          {/* Action Flags */}
          {data.needsRevision && (
             <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-red-700 text-sm">Action Required</h4>
                    <p className="text-red-600 text-sm">This item has been flagged for revision.</p>
                </div>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailsModal;