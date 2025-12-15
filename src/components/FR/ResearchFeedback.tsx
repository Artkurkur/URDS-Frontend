"use client";

import React from 'react';
import { X, FileEdit, Folder, MessageSquare, Lightbulb } from 'lucide-react';

export interface ResearchFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  date?: string;
  time?: string;
  topic?: string;
  chapterTitle?: string;
  revisionInstruction?: string;
  onViewFile?: () => void;
  feedbackText?: string;
  specificSuggestionsText?: string;
  statuses?: string[];
  selectedStatusIndex?: number;
}

const ResearchFeedback: React.FC<ResearchFeedbackProps> = ({
  isOpen,
  onClose,
  date,
  time,
  topic,
  chapterTitle,
  revisionInstruction,
  onViewFile,
  feedbackText,
  specificSuggestionsText,
  statuses = [], // Keep empty array as fallback to prevent map error
  selectedStatusIndex,
}) => {
  if (!isOpen) return null;

  // Custom icons to match the design
  const FeedbackIcon = () => (
    <div className="relative">
      <MessageSquare className="text-blue-600 w-12 h-12" fill="currentColor" />
      <div className="absolute top-0 right-0 text-orange-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );

  const LightbulbIcon = () => (
    <Lightbulb className="text-yellow-400 w-12 h-12" fill="currentColor" />
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent bg-opacity-50 outline-none focus:outline-none">
      <div className="relative w-full max-w-5xl mx-auto my-6 p-4">
        <div className="relative flex flex-col w-full bg-white rounded-[30px] border-[3px] border-purple-600 shadow-lg outline-none focus:outline-none mt-16 p-8 pt-12 animate-in fade-in zoom-in duration-200">
          
          {/* Header Elements (Overlapping) */}
          <div className="absolute -top-12 left-10 bg-[#6200EA] text-white rounded-2xl p-3 text-center shadow-md">
            <div className="text-xs font-semibold">TODAY</div>
            <div className="text-2xl font-bold">{time}</div>
          </div>
          <div className="absolute -top-5 left-40 bg-[#7C4DFF] text-white rounded-t-lg px-6 py-2 text-sm font-semibold shadow-sm">
            Revision Topic: {topic}
          </div>
          <div className="absolute -top-5 right-40 bg-[#7C4DFF] text-white rounded-t-lg px-6 py-2 text-sm font-semibold shadow-sm">
            {date}
          </div>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-1 bg-transparent border-0 text-gray-400 opacity-50 hover:opacity-100 hover:text-red-500 text-3xl leading-none font-semibold outline-none focus:outline-none transition-all"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Content */}
          <div className="flex flex-col space-y-8">
            {/* Chapter 1 Section */}
            <div className="relative bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] p-6 border border-gray-100 mt-4">
              <div className="absolute -top-4 left-6 bg-[#1976D2] text-white rounded-t-lg px-6 py-1.5 text-sm font-semibold shadow-sm">
                {chapterTitle}
              </div>
              <div className="flex items-start mt-4">
                <div className="mr-6 p-2">
                  <FileEdit className="w-12 h-12 text-[#1976D2]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {revisionInstruction}
                </p>
              </div>
              <button
                className="absolute top-6 right-6 flex flex-col items-center justify-center group"
                onClick={onViewFile}
              >
                <Folder className="w-10 h-10 text-yellow-500 group-hover:text-yellow-600 transition-colors" fill="currentColor" />
                <span className="text-[#1976D2] text-xs font-semibold mt-1 group-hover:text-blue-800 transition-colors">View File</span>
              </button>
            </div>

            {/* Feedback Section */}
            <div className="relative bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <div className="absolute -top-4 left-6 bg-[#FF5722] text-white rounded-t-lg px-6 py-1.5 text-sm font-semibold shadow-sm">
                Feedback
              </div>
              <div className="flex items-start mt-4">
                <div className="mr-6 p-2">
                  <FeedbackIcon />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {feedbackText}
                </p>
              </div>
            </div>

            {/* Specific Suggestions Section */}
            <div className="relative bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <div className="absolute -top-4 left-6 bg-[#FFC107] text-white rounded-t-lg px-6 py-1.5 text-sm font-semibold shadow-sm">
                Specific Suggestions
              </div>
              <div className="flex items-start mt-4">
                <div className="mr-6 p-2">
                  <LightbulbIcon />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {specificSuggestionsText}
                </p>
              </div>
            </div>

            {/* Approved Status Section */}
            <div className="relative mt-6">
              <div className="absolute -top-4 left-6 bg-[#C67CFF] text-white rounded-t-lg px-6 py-1.5 text-sm font-semibold shadow-sm z-10">
                Approved Status
              </div>
              <div className="bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] p-6 border border-gray-100 flex justify-around items-center pt-8">
                {statuses.map((status, index) => (
                  <div key={index} className="flex items-center cursor-default">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        index === selectedStatusIndex
                          ? 'border-[#1976D2] bg-[#1976D2]'
                          : 'border-gray-400 bg-white'
                      }`}
                    >
                      {index === selectedStatusIndex && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${index === selectedStatusIndex ? 'text-[#1976D2]' : 'text-gray-700'}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchFeedback;