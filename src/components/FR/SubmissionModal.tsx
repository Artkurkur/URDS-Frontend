"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import ResearchFeedback, { ResearchFeedbackProps } from './ResearchFeedback'; 

export interface Submission {
  id: string;
  studentName: string;
  submittedDate: string;
  status: "pending" | "submitted" | "rejected" | "approved";
  feedbackData?: Omit<ResearchFeedbackProps, 'isOpen' | 'onClose' | 'onViewFile'>;
}

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: string;
  title: string;
  submissions: Submission[];
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  chapter,
  title,
  submissions,
}) => {
  const [selectedFeedbackSubmission, setSelectedFeedbackSubmission] = useState<Submission | null>(null);

  if (!isOpen) return null;

  const getStatusColor = (status: Submission["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-400";
      case "submitted": return "bg-blue-400";
      case "rejected": return "bg-red-400";
      case "approved": return "bg-green-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: Submission["status"]) => {
    switch (status) {
      case "pending": return "Pending";
      case "submitted": return "Submitted";
      case "rejected": return "Rejected";
      case "approved": return "Approved";
      default: return "Unknown";
    }
  };

  // ✅ RESTORED: Only set state if feedbackData exists
  const handleViewFeedbackClick = (submission: Submission) => {
    if (submission.feedbackData) {
      setSelectedFeedbackSubmission(submission);
    } else {
      // Optional: Add toast notification here
      console.log("No feedback data available.");
    }
  };

  const handleFeedbackModalViewFile = () => {
    console.log("Opening file from feedback modal for:", selectedFeedbackSubmission?.id);
  };

  return (
    <>
      {/* 1. Main Submission List Modal */}
      <div 
        className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-gray-800 text-lg font-semibold">Chapter Submissions</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Submissions List */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {submissions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-white border-2 border-yellow-400 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-3xl">📁</div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {chapter}
                          </span>
                          <span className="text-xs text-gray-400">{submission.submittedDate}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800">{title}</p>
                      </div>

                      <div className={`w-3 h-3 rounded-full ${getStatusColor(submission.status)}`}></div>
                    </div>

                    <div className="ml-4 flex items-center gap-3">
                      <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-6 py-2 rounded-full transition">
                        {getStatusText(submission.status)}
                      </button>
                      
                      {/* View Feedback Button */}
                      <button 
                        onClick={() => handleViewFeedbackClick(submission)}
                        disabled={!submission.feedbackData}
                        className={`text-white text-sm font-medium px-6 py-2 rounded-full transition ${
                          submission.feedbackData 
                            ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        View Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. ResearchFeedback Modal */}
      {/* ✅ RESTORED: Guard clause to ensure we have data before rendering */}
      {selectedFeedbackSubmission && selectedFeedbackSubmission.feedbackData && (
        <ResearchFeedback
          isOpen={!!selectedFeedbackSubmission}
          onClose={() => setSelectedFeedbackSubmission(null)}
          onViewFile={handleFeedbackModalViewFile}
          {...selectedFeedbackSubmission.feedbackData}
        />
      )}
    </>
  );
};

export default SubmissionModal;