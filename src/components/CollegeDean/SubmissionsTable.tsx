"use client";

import React from 'react';
import { Eye } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  cell: string;
  submitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  statusDescription: string;
  submittedDate: string;
  comments?: string;
  suggestions?: string;
}

interface SubmissionsTableProps {
  submissions: Submission[];
  onViewSubmission: (id: string) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ submissions, onViewSubmission }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-400';
      case 'Approved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Faculty Submissions - College Engineering</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Researcher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Research Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{submission.name}</div>
                    <div className="text-sm text-gray-500">{submission.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {submission.cell}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                    {submission.submitted}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    {submission.statusDescription}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {submission.submittedDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(submission.status)}`}></div>
                      <span className="text-sm font-medium text-gray-700">{submission.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onViewSubmission(submission.id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                      title="View submission details"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No submissions found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsTable;