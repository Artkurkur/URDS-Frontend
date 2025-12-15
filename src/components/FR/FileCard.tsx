"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import SubmissionModal from "./SubmissionModal";
import type { Submission } from "./SubmissionModal";

export interface StudyCardProps {
  chapter: string;
  title: string;
  historyCount: number;
  submissions?: Submission[];
  onAdd?: () => void;
}

const StudyCard: React.FC<StudyCardProps> = ({
  chapter,
  title,
  historyCount,
  submissions = [],
  onAdd,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    console.log("Add clicked - Opening modal");
    setIsModalOpen(true);
    if (onAdd) {
      onAdd();
    }
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="text-3xl">📁</div>

          <div>
            <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">
              {chapter}
            </span>

            <p className="text-sm font-semibold text-gray-800">
              {title}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {historyCount} History
          </span>

          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md transition"
            type="button"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Render Modal Here - This is the key part! */}
      {isModalOpen && (
        <SubmissionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          chapter={chapter}
          title={title}
          submissions={submissions}
        />
      )}
    </div>
  );
};

export default StudyCard;
export type { Submission };