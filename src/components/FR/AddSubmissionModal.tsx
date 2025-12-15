import React from "react";
import Image from "next/image";

// Define Types Locally
interface SubmissionState {
  title: string;
  subtitle: string;
  file: File | null;
}

interface AddSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  selectedChapter: number | null;
  newSubmission: SubmissionState;
  // FIXED: Using specific React type for state setter
  setNewSubmission: React.Dispatch<React.SetStateAction<SubmissionState>>;
}

export default function AddSubmissionModal({
  isOpen,
  onClose,
  onSaveDraft,
  onSubmit,
  newSubmission,
  setNewSubmission
}: AddSubmissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Image src="/images/logo/UEPlogo.png" alt="UEP Logo" width={80} height={80} className="w-20 h-20" />
              <div className="text-sm">
                <p className="font-semibold">Republic of the Philippines</p>
                <p className="font-bold">UNIVERSITY OF EASTERN PHILIPPINES</p>
                <p>University Town • Northern Samar • Philippines</p>
                <p className="text-xs text-gray-600">Web : http://uep.edu.ph • Email : uepnofficial@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition">Research Proposal</button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition">Work Plan Activities</button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition">Budget Summary</button>
            </div>
          </div>
         
        </div>

        {/* Form Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-gray-200 px-4 py-2 font-semibold border-b border-gray-300">Detailed Research Proposal</div>
            <div className="border-b border-gray-300">
              <div className="bg-gray-100 px-4 py-2 font-semibold">I. Basic Information</div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Title</div>
                <input type="text" className="px-4 py-2 outline-none" value={newSubmission.title} onChange={(e) => setNewSubmission({ ...newSubmission, title: e.target.value })} />
              </div>
              {['Nature of Research', 'Leader / Main Proponent', 'Other Personnel Involved', 'Project Location/s', 'Duration'].map(label => (
                 <div key={label} className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                    <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">{label}</div>
                    <input type="text" className="px-4 py-2 outline-none" />
                 </div>
              ))}
              <div className="grid grid-cols-[200px_1fr]">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Budget for the Year</div>
                <input type="text" className="px-4 py-2 outline-none" />
              </div>
            </div>
            <div className="border-b border-gray-300">
              <div className="bg-gray-100 px-4 py-2 font-semibold">II. Technical Information</div>
              <div className="grid grid-cols-[200px_1fr]">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Rationale</div>
                <textarea className="px-4 py-2 outline-none min-h-[80px]" />
              </div>
            </div>
             {['III. Review of Literature', 'IV. Detailed Methodology', 'VI. Detailed Budgetary Requirements'].map(label => (
                <div key={label} className="border-b border-gray-300 last:border-0">
                   <div className="bg-gray-100 px-4 py-2 font-semibold">{label}</div>
                   <div className="px-4 py-2"><textarea className="w-full px-4 py-2 outline-none min-h-[80px] border border-gray-300 rounded" /></div>
                </div>
             ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-between items-center">
          <button className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition font-semibold" onClick={onClose}>Cancel</button>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-md bg-green-400 hover:bg-green-500 text-white transition font-semibold" onClick={onSaveDraft}>Save as Draft</button>
            <button className="px-6 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-gray-800 transition font-semibold" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}