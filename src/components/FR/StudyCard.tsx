"use client";

import { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";

/* ---------- TYPES ---------- */
export interface Submission {
  id: number;
  title: string;
  date: string;
  formType: "Research Proposal" | "Work Plan Activities" | "Budget Summary";
  status: "draft" | "submitted";
  data?: Record<string, unknown>;
}

export interface Study {
  chapter: number;
  title: string;
  formType: string;
  historyCount: number;
  submissions: Submission[];   // never undefined
  /* other dynamic fields */   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface StudyCardProps {
  study: Study;
  onAddSubmission: (study: Study) => void;
  onEditSubmission: (study: Study, submission: Submission) => void;
  onDeleteSubmission: (chapter: number, submissionId: number) => void;
  onSubmitSubmission: (chapter: number, submissionId: number) => void;
  onViewSubmission: (study: Study, submission: Submission) => void;
}

/* ---------- COMPONENT ---------- */
export default function StudyCard({
  study,
  onAddSubmission,
  onEditSubmission,
  onDeleteSubmission,
  onSubmitSubmission,
  onViewSubmission
}: StudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded(!isExpanded);

  const submittedCnt = study.submissions.filter(s => s.status === "submitted").length;
  const draftCnt     = study.submissions.filter(s => s.status === "draft").length;

  return (
    <div
      className={`flex flex-col border rounded-xl p-5 mb-4 transition-all duration-200 bg-white ${
        isExpanded ? "border-gray-300 shadow-md" : "border-gray-100 shadow-sm hover:shadow-md"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center w-full cursor-pointer" onClick={toggle}>
        <div className="mr-6 text-yellow-400 text-5xl">
          {isExpanded ? <FaFolderOpen /> : <FaFolder />}
        </div>

        <div className="flex-grow">
          <span className="text-[10px] text-gray-400 uppercase font-bold">Research Title</span>
          <h2 className="font-bold text-lg text-gray-800">{study.title}</h2>
          <p className="text-xs text-gray-500">Chapter {study.chapter}</p>
        </div>

        <div className="flex items-center gap-3">
          {submittedCnt > 0 && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
              {submittedCnt} Submitted
            </span>
          )}
          {draftCnt > 0 && (
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold">
              {draftCnt} Draft
            </span>
          )}
          {study.submissions.length === 0 && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-bold">
              No files yet
            </span>
          )}

          <button
            onClick={e => {
              e.stopPropagation();
              onAddSubmission(study);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg shadow"
          >
            + Submission
          </button>
        </div>
      </div>

      {/* FILES */}
      {isExpanded && (
        <div className="mt-6 ml-12 space-y-3">
          {study.submissions.map(sub => {
            const isDraft = sub.status === "draft";
            return (
              <div
                key={sub.id}
                className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-100"
              >
                <FaFile
                  className={`text-2xl mr-4 ${isDraft ? "text-orange-400" : "text-green-500"}`}
                />

                <div className="flex-grow mr-4">
                  <p className="text-sm font-bold text-gray-800">{sub.title}</p>
                  <span className="text-[10px] text-gray-500">
                    {sub.formType} • {sub.date}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                    isDraft
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "bg-green-100 text-green-700 border border-green-200"
                  }`}
                >
                  {isDraft ? "Draft" : "Submitted"}
                </span>

                {isDraft ? (
                  <>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSubmitSubmission(study.chapter, sub.id);
                      }}
                      className="ml-2 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                    >
                      Submit
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onEditSubmission(study, sub);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteSubmission(study.chapter, sub.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onViewSubmission(study, sub);
                    }}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                  >
                    View File
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}