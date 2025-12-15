"use client";

import React from "react";
import { 
  FileText, 
  Bell, 
  Clock, 
  Calendar, 
  Megaphone 
} from "lucide-react";

export interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  color: string;
  time: string;
  date: string;
  hasGuidelines?: boolean;
  needsRevision?: boolean;
}

interface AnnouncementCardProps {
  data: AnnouncementData;
  isChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  onViewGuidelines?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  // 🆕 ADDED: onClick prop
  onClick?: () => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  data, 
  isChecked = false, 
  onCheckChange, 
  onViewGuidelines,
  onClick // 🆕 Destructure logic
}) => {

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; badge: string; docBg: string; docBorder: string; megaphone: string } } = {
      purple: {
        bg: "bg-purple-700",
        border: "border-purple-400",
        text: "text-white",
        badge: "bg-purple-500",
        docBg: "bg-purple-100",
        docBorder: "border-purple-300",
        megaphone: "text-purple-500 fill-purple-300 stroke-purple-600",
      },
      blue: {
        bg: "bg-blue-600",
        border: "border-blue-400",
        text: "text-white",
        badge: "bg-blue-500",
        docBg: "bg-blue-100",
        docBorder: "border-blue-300",
        megaphone: "text-blue-500 fill-blue-300 stroke-blue-600",
      },
      green: {
        bg: "bg-green-600",
        border: "border-green-400",
        text: "text-white",
        badge: "bg-green-600",
        docBg: "bg-green-100",
        docBorder: "border-green-300",
        megaphone: "text-green-500 fill-green-300 stroke-green-600",
      },
      orange: {
        bg: "bg-orange-500",
        border: "border-orange-400",
        text: "text-white",
        badge: "bg-orange-600",
        docBg: "bg-orange-100",
        docBorder: "border-orange-300",
        megaphone: "text-orange-500 fill-orange-300 stroke-orange-600",
      },
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(data.color);

  return (
    // 🆕 Added onClick and cursor-pointer to the main div
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
    >
      
      {/* HEADER BAR */}
      <div className={`${colors.bg} ${colors.text} px-4 py-2 font-semibold text-sm flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Bell size={16} />
          {data.type}
        </div>
        {data.needsRevision && (
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Action Required</span>
        )}
      </div>

      {/* CARD BODY */}
      <div className="flex gap-6 p-5 items-start">
        
        {/* DATE BOX */}
        <div className={`flex flex-col items-center justify-center w-24 h-24 ${colors.bg} text-white font-bold rounded-xl shadow-inner shrink-0`}>
          <Calendar size={20} className="mb-1 opacity-80" />
          <span className="text-xs uppercase opacity-90">
              {new Date(data.date).toLocaleString('default', { month: 'short' })}
          </span>
          <span className="text-2xl">
              {new Date(data.date).getDate()}
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
              <div>
                  {data.title && (
                  <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">{data.title}</h3>
                  )}
                  {/* Truncate description for card view */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {data.description}
                  </p>
              </div>
              
              {/* Needs Revision Checkbox */}
              {data.needsRevision && (
                  <div 
                    className="flex items-center gap-2 ml-4 shrink-0 bg-red-50 px-3 py-1 rounded-full border border-red-100"
                    onClick={(e) => e.stopPropagation()} // Prevent modal open when clicking checkbox area
                  >
                      <input
                        type="checkbox"
                        id={`needRevision-${data.id}`}
                        checked={isChecked}
                        onChange={(e) => onCheckChange && onCheckChange(e.target.checked)}
                        className="accent-red-500 w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor={`needRevision-${data.id}`} className="text-red-600 font-bold text-xs cursor-pointer">
                        NEEDS REVISION
                      </label>
                  </div>
              )}
          </div>

          <div className="flex gap-3 text-xs text-gray-500 mt-4 items-center flex-wrap">
            <span className={`px-2 py-1 rounded-md ${colors.badge} text-white flex items-center gap-1 font-medium`}>
              <FileText size={12} />
              {data.category}
            </span>
            
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{data.time}</span>
            </div>

            {data.hasGuidelines && (
              <a
                href="#"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent modal open when clicking link
                    if(onViewGuidelines) onViewGuidelines(e);
                }}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center gap-1 ml-auto"
              >
                <FileText size={12} />
                View Guidelines
              </a>
            )}
          </div>
        </div>

        {/* MEGAPHONE ILLUSTRATION */}
        <div className="hidden md:flex w-[80px] h-[80px] relative items-center justify-center shrink-0">
          <div className={`absolute inset-0 ${colors.docBg} rounded-xl border-2 ${colors.docBorder} rotate-3`}></div>
          <div className={`absolute inset-0 ${colors.docBg} rounded-xl border-2 ${colors.docBorder} -rotate-2 bg-opacity-50`}></div>
          <div className="relative z-10">
            <Megaphone size={32} className={colors.megaphone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;