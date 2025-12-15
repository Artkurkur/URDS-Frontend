'use client';
import React from 'react';
import { X } from 'lucide-react';
import { Submission } from '../types';

export default function SubmissionModal({
  submission,
  onClose,
  onSubmitFeedback,
}: {
  submission: Submission | null;
  onClose: () => void;
  onSubmitFeedback?: (payload: { id: string; status: Submission['status']; score?: number; notes?: string }) => Promise<void>;
}) {
  const [selectedStatus, setSelectedStatus] = React.useState<Submission['status'] | ''>('');
  const [score, setScore] = React.useState<number | ''>('');
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (submission) {
      setSelectedStatus(submission.status);
      setNotes('');
      setScore('');
    }
  }, [submission]);

  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Submission Details</h2>
              <p className="text-sm opacity-90">UNIVERSITY OF EASTERN PHILIPPINES</p>
              <p className="text-xs opacity-80">Evaluator, College of Engineering</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-1">Researcher - College Engineering</p>
                <p className="font-bold text-lg text-gray-800">{submission.name}</p>
                <p className="text-sm text-gray-600">{submission.email}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-1">Research Title</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📘</span>
                  <p className="font-semibold text-gray-800">{submission.submitted}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-1">Comments</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">{submission.comments}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Specific Suggestions</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">{submission.suggestions}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-1">Department</p>
                <p className="font-semibold text-gray-800">{submission.cell}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-1">Date Submitted</p>
                <p className="font-semibold text-gray-800">{submission.submittedDate}</p>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50 h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-4">📄</p>
                  <p className="text-gray-600 font-semibold mb-2">CHAPTER 1</p>
                  <p className="text-sm text-gray-500">Preview of the document</p>
                  <button className="mt-4 text-blue-600 text-sm hover:underline">View Full Document</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="w-4 h-4"
                  value="Pending"
                  checked={selectedStatus === 'Pending'}
                  onChange={() => setSelectedStatus('Pending')}
                />
                <span className="text-sm">Need Revisions</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="w-4 h-4"
                  value="Rejected"
                  checked={selectedStatus === 'Rejected'}
                  onChange={() => setSelectedStatus('Rejected')}
                />
                <span className="text-sm">Disapproved</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="w-4 h-4"
                  value="Approved"
                  checked={selectedStatus === 'Approved'}
                  onChange={() => setSelectedStatus('Approved')}
                />
                <span className="text-sm">Approved</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                value={score === '' ? '' : String(score)}
                onChange={(e) => setScore(Number(e.target.value))}
              >
                <option value="">[1 to 10]</option>
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <button
                onClick={async () => {
                  if (!submission) return;
                  if (onSubmitFeedback) {
                    await onSubmitFeedback({
                      id: submission.id,
                      status: selectedStatus as Submission['status'],
                      score: typeof score === 'number' ? score : undefined,
                      notes,
                    });
                  } else {
                    // local fallback if no handler passed
                    alert('Feedback submitted (local demo).');
                  }
                  onClose();
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
              >
                SUBMIT FEEDBACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
