"use client";

import React, { useState } from "react";
import { X, MessageSquare } from "lucide-react";

// 1. Updated Interface to include 'feedback'
export interface Submission {
  id: string;
  studentName: string;
  submittedDate: string;
  status: "pending" | "submitted" | "rejected" | "approved";
  feedback?: string; // Optional feedback field
}

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: string;
  title: string;
  submissions: Submission[];
}

// 2. New Internal Component: Feedback Modal
interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission | null;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Feedback Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={20} />
            <h3 className="text-gray-800 text-lg font-semibold">Evaluator Feedback</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition hover:bg-gray-200 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Feedback Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Student</p>
            <p className="text-sm font-medium text-gray-800">{submission.studentName}</p>
          </div>
          
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Comments</p>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-gray-700 text-sm leading-relaxed min-h-[100px]">
              {submission.feedback ? (
                submission.feedback
              ) : (
                <span className="text-gray-400 italic">No feedback provided by the evaluator yet.</span>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Main Component
const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  chapter,
  title,
  submissions,
}) => {
  // State to track which submission's feedback is being viewed
  const [selectedFeedback, setSelectedFeedback] = useState<Submission | null>(null);

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

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
            <h2 className="text-gray-800 text-lg font-semibold">Chapter Submissions</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Submissions List */}
          <div className="p-6 overflow-y-auto">
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
                      {/* Folder Icon */}
                      <div className="text-3xl">📁</div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {chapter}
                          </span>
                          <span className="text-xs text-gray-400">{submission.submittedDate}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800">{title}</p>
                      </div>

                      {/* Status Dot */}
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(submission.status)}`}></div>
                    </div>

                    {/* Status and Action Buttons */}
                    <div className="ml-4 flex items-center gap-3">
                      <div className="bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
                        {getStatusText(submission.status)}
                      </div>
                      
                      {/* View Feedback Button */}
                      <button 
                        onClick={() => setSelectedFeedback(submission)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full transition shadow-sm flex items-center gap-2"
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

      {/* Render the Feedback Modal */}
      <FeedbackModal 
        isOpen={!!selectedFeedback}
        submission={selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </>
  );
};

export default SubmissionModal;