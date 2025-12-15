// ================================================================
// src/components/urds-director/SubmissionRow.tsx
import React from 'react';
import { Eye } from 'lucide-react';

// Define types locally to match the page component
interface Faculty {
  leader: string;
  email: string;
  college: string;
}

interface Submission {
  id: string;
  faculty: Faculty;
  researchTitle: string;
  call: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface SubmissionRowProps {
  data: Submission;
}

export const SubmissionRow: React.FC<SubmissionRowProps> = ({ data }) => {
  const isApproved = data.status === 'Approved';
  const isPending = data.status === 'Pending';
  const isRejected = data.status === 'Rejected';

  return (
    <div className="group relative bg-white border-2 border-blue-200 rounded-lg p-4 mb-3 flex items-center shadow-sm hover:shadow-md transition-all">
      {/* Selection Line (Blue bar on left) */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="grid grid-cols-12 w-full gap-4 items-center">
        
        {/* Faculty Leader */}
        <div className="col-span-2 flex flex-col">
          <span className="font-bold text-gray-800 text-sm">{data.faculty.leader}</span>
        </div>

        {/* College/Department */}
        <div className="col-span-2">
          <span className="text-xs font-semibold text-gray-600">{data.faculty.college}</span>
        </div>

        {/* Research Title */}
        <div className="col-span-3">
          <p className="text-xs text-gray-500 italic leading-snug">
            {data.researchTitle}
          </p>
        </div>

        {/* Research Type / Call */}
        <div className="col-span-2">
           <p className="text-[10px] text-gray-400 leading-tight">
             {data.call}
           </p>
        </div>

        {/* Submitted Date */}
        <div className="col-span-1 text-center">
           <span className="text-xs font-bold text-gray-800">{data.submittedDate}</span>
        </div>

        {/* Status - Left aligned with circle and text */}
        <div className="col-span-1 flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full ${
            isApproved ? 'bg-green-500' : 
            isPending ? 'bg-yellow-400' : 
            'bg-red-500'
          }`}></div>
          <span className="text-xs font-bold text-gray-800">{data.status}</span>
        </div>
        
        {/* Actions - Centered eye icon */}
        <div className="col-span-1 flex items-center justify-center">
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => console.log('View submission:', data.id)}
            title="View Details"
          >
            <Eye size={20} strokeWidth={2} className="text-gray-700" />
          </button>
        </div>

      </div>
    </div>
  );
};