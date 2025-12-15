import React from "react";
import Image from "next/image";

// Define Types Locally
interface StudyState {
  title: string;
  chapter: number;
  natureOfResearch: string;
  leader: string;
  personnel: string;
  location: string;
  duration: string;
  budget: string;
  rationale: string;
  objectives: string;
  literature: string;
  methodology: string;
  budgetaryRequirements: string;
}

interface AddStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  newStudy: StudyState;
  // FIXED: Using specific React type for state setter
  setNewStudy: React.Dispatch<React.SetStateAction<StudyState>>;
}

export default function AddStudyModal({ 
  isOpen, 
  onClose, 
  onSaveDraft, 
  onSubmit, 
  newStudy, 
  setNewStudy 
}: AddStudyModalProps) {
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
          <h2 className="text-2xl font-bold text-gray-800">Add New Study</h2>
        </div>

        {/* Form Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-gray-200 px-4 py-2 font-semibold border-b border-gray-300">Detailed Research Proposal</div>
            
            <div className="border-b border-gray-300">
              <div className="bg-gray-100 px-4 py-2 font-semibold">I. Basic Information</div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Title</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.title} onChange={(e) => setNewStudy({ ...newStudy, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Nature of Research</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.natureOfResearch} onChange={(e) => setNewStudy({ ...newStudy, natureOfResearch: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Leader / Main Proponent</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.leader} onChange={(e) => setNewStudy({ ...newStudy, leader: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Other Personnel Involved</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.personnel} onChange={(e) => setNewStudy({ ...newStudy, personnel: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Project Location/s</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.location} onChange={(e) => setNewStudy({ ...newStudy, location: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr] border-b border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Duration</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.duration} onChange={(e) => setNewStudy({ ...newStudy, duration: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr]">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Budget for the Year</div>
                <input type="text" className="px-4 py-2 outline-none" value={newStudy.budget} onChange={(e) => setNewStudy({ ...newStudy, budget: e.target.value })} />
              </div>
            </div>

            <div className="border-b border-gray-300">
              <div className="bg-gray-100 px-4 py-2 font-semibold">II. Technical Information</div>
              <div className="grid grid-cols-[200px_1fr]">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Rationale/Significance</div>
                <textarea className="px-4 py-2 outline-none min-h-[80px]" value={newStudy.rationale} onChange={(e) => setNewStudy({ ...newStudy, rationale: e.target.value })} />
              </div>
              <div className="grid grid-cols-[200px_1fr] border-t border-gray-300">
                <div className="px-4 py-2 border-r border-gray-300 bg-gray-50 font-medium">Objectives</div>
                <textarea className="px-4 py-2 outline-none min-h-[80px]" value={newStudy.objectives} onChange={(e) => setNewStudy({ ...newStudy, objectives: e.target.value })} />
              </div>
            </div>

            <div className="border-b border-gray-300">
              <div className="bg-gray-100 px-4 py-2 font-semibold">III. Review of Literature</div>
              <div className="px-4 py-2">
                <textarea className="w-full px-4 py-2 outline-none min-h-[80px] border border-gray-300 rounded" value={newStudy.literature} onChange={(e) => setNewStudy({ ...newStudy, literature: e.target.value })} />
              </div>
            </div>

            <div className="border-b border-gray-300">
              <div className="bg-gray-100 px-4 py-2 font-semibold">IV. Detailed Methodology</div>
              <div className="px-4 py-2">
                <textarea className="w-full px-4 py-2 outline-none min-h-[80px] border border-gray-300 rounded" value={newStudy.methodology} onChange={(e) => setNewStudy({ ...newStudy, methodology: e.target.value })} />
              </div>
            </div>

            <div>
              <div className="bg-gray-100 px-4 py-2 font-semibold">VI. Detailed Budgetary Requirements</div>
              <div className="px-4 py-2">
                <textarea className="w-full px-4 py-2 outline-none min-h-[80px] border border-gray-300 rounded" value={newStudy.budgetaryRequirements} onChange={(e) => setNewStudy({ ...newStudy, budgetaryRequirements: e.target.value })} />
              </div>
            </div>
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