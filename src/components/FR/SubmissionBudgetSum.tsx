import React, { useState } from "react";
import Image from "next/image";

interface SubmissionState {
  title: string;
  subtitle: string;
  file: File | null;
  leader?: string;
  duration?: string;
  college?: string;
  [key: string]: string | number | undefined | null | File;
}

interface SubmissionBudgetSumProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  selectedChapter: number | null;
  newSubmission: SubmissionState;
  setNewSubmission: React.Dispatch<React.SetStateAction<SubmissionState>>;
}

export default function SubmissionBudgetSum({
  isOpen,
  onClose,
  onSaveDraft,
  onSubmit,
  selectedChapter,
  newSubmission,
  setNewSubmission
}: SubmissionBudgetSumProps) {
  const [activeTab, setActiveTab] = useState<'proposal' | 'workplan' | 'budget'>('proposal');

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setNewSubmission((prev) => ({ ...prev, [field]: value }));
  };

  const getVal = (key: string) => parseFloat(String(newSubmission[key] || "0")) || 0;

  // --- RENDER CONTENT ---
  const renderProposalContent = () => (
    <div className="border border-gray-300 rounded-sm overflow-hidden">
      <div className="bg-gray-200 p-3 font-bold text-gray-800 border-b border-gray-300">
        Detailed Research Proposal (Submission)
      </div>
      
      <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-b border-gray-300">
        I. Basic Information
      </div>
      
      {/* Title Row */}
      <div className="flex border-b border-gray-300 text-sm">
        <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">
          Submission Title
        </div>
        <div className="flex-grow bg-white">
          <input 
            type="text" 
            className="w-full h-full p-4 outline-none text-gray-800" 
            value={newSubmission.title} 
            onChange={(e) => handleChange("title", e.target.value)} 
          />
        </div>
      </div>

      {/* Upload File Row */}
      <div className="flex border-b border-gray-300 text-sm">
        <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">
          Upload File
        </div>
        <div className="flex-grow bg-white p-3">
          <input
            type="file"
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setNewSubmission((prev) => ({ ...prev, file: e.target.files ? e.target.files[0] : null }))}
          />
        </div>
      </div>

      {/* Rationale */}
      <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-y border-gray-300">
        II. Technical Information
      </div>
      <div className="flex text-sm">
        <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">
          Rationale
        </div>
        <div className="flex-grow bg-white">
          <textarea className="w-full h-full min-h-[100px] p-4 outline-none resize-none text-gray-800" />
        </div>
      </div>
    </div>
  );

  const renderBudgetContent = () => {
    const renderInfoRow = (label: string, field: string) => (
      <div className="flex border-b border-gray-800 text-sm">
        <div className="w-[280px] bg-white p-2 font-normal text-gray-900 border-r border-gray-800 flex items-center">
          {label}
        </div>
        <div className="flex-grow bg-white">
          <input
            type="text"
            className="w-full h-full p-2 outline-none text-gray-900 font-bold"
            value={String(newSubmission[field] || "")}
            readOnly
          />
        </div>
      </div>
    );

    const renderMoneyRow = (label: string, key: string, placeholder1: string, placeholder2: string) => {
      const val1 = newSubmission[`${key}_y1`] ? parseFloat(String(newSubmission[`${key}_y1`])) : 0;
      const val2 = newSubmission[`${key}_y2`] ? parseFloat(String(newSubmission[`${key}_y2`])) : 0;
      const total = val1 + val2;

      return (
        <tr className="text-sm text-gray-900 border-b border-gray-400">
          <td className="p-1 border-r border-gray-400 bg-white pl-2">{label}</td>
          <td className="p-0 border-r border-gray-400 w-32">
            <input type="number" className="w-full h-full p-1 text-right outline-none focus:bg-yellow-50 placeholder-gray-400" placeholder={placeholder1} onChange={(e) => handleChange(`${key}_y1`, e.target.value)} />
          </td>
          <td className="p-0 border-r border-gray-400 w-32">
            <input type="number" className="w-full h-full p-1 text-right outline-none focus:bg-yellow-50 placeholder-gray-400" placeholder={placeholder2} onChange={(e) => handleChange(`${key}_y2`, e.target.value)} />
          </td>
          <td className="p-1 text-right font-semibold w-32 pr-2">{total > 0 ? total.toLocaleString('en-US', {minimumFractionDigits: 2}) : ""}</td>
        </tr>
      );
    };

    const grandTotal = 
      getVal('honorarium_y1') + getVal('honorarium_y2') +
      getVal('travel_y1') + getVal('travel_y2') +
      getVal('supplies_y1') + getVal('supplies_y2') +
      getVal('comms_y1') + getVal('comms_y2') +
      getVal('other_y1') + getVal('other_y2') +
      getVal('cont_y1') + getVal('cont_y2') +
      getVal('equip_y1') + getVal('equip_y2');

    return (
      <div className="border-2 border-gray-900">
        <div className="bg-white p-4 text-center border-b-2 border-gray-900">
          <h2 className="text-lg font-bold text-gray-900 uppercase">FINANCIAL COMPONENTS OF THE RESEARCH</h2>
          <h3 className="text-md font-bold text-gray-900">(Budget Summary) - Chapter {selectedChapter}</h3>
        </div>

        {renderInfoRow("Program/Project/Study Title:", "title")}
        {renderInfoRow("Program/Project Study Leader:", "leader")}
        {renderInfoRow("Duration:", "duration")}
        {renderInfoRow("College/Unit/Campus:", "college")}

        <div className="overflow-x-auto border-t-2 border-gray-900">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white text-gray-900 font-bold border-b border-gray-900 text-sm">
                <th className="p-1 border-r border-gray-400 text-left pl-2">Item</th>
                <th className="p-1 border-r border-gray-400 text-center w-32">Year 1</th>
                <th className="p-1 border-r border-gray-400 text-center w-32">Year 2</th>
                <th className="p-1 text-left pl-2 w-32">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {/* I. Personal Services */}
              <tr className="bg-white font-bold text-sm text-gray-900 border-b border-gray-400"><td colSpan={4} className="p-1 pl-2">I. Personal Services</td></tr>
              {renderMoneyRow("Honorarium", "honorarium", "5,000.00", "")}
              <tr className="font-bold text-sm text-gray-900 border-b border-gray-800 bg-white">
                <td className="p-1 border-r border-gray-400 pl-2">Sub-Total</td>
                <td className="p-1 text-right border-r border-gray-400">{(getVal('honorarium_y1')).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="p-1 text-right border-r border-gray-400">{(getVal('honorarium_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="p-1 text-right pr-2">{(getVal('honorarium_y1') + getVal('honorarium_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
              </tr>

              {/* II. MOOE */}
              <tr className="bg-white font-bold text-sm text-gray-900 border-b border-gray-400"><td colSpan={4} className="p-1 pl-2">II. MOOE</td></tr>
              {renderMoneyRow("Travel", "travel", "0", "")}
              {renderMoneyRow("Supplies and Materials", "supplies", "10,000.00", "")}
              {renderMoneyRow("Communications", "comms", "0", "")}
              {renderMoneyRow("Other MOOE", "other", "0", "")}
              {renderMoneyRow("Contingencies (10% of MOOE)", "cont", "1,000.00", "")}
              
              <tr className="font-bold text-sm text-gray-900 border-b border-gray-800 bg-white">
                <td className="p-1 border-r border-gray-400 pl-2">Sub-Total</td>
                <td className="p-1 text-right border-r border-gray-400">
                  {(getVal('travel_y1') + getVal('supplies_y1') + getVal('comms_y1') + getVal('other_y1') + getVal('cont_y1')).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
                <td className="p-1 text-right border-r border-gray-400">
                  {(getVal('travel_y2') + getVal('supplies_y2') + getVal('comms_y2') + getVal('other_y2') + getVal('cont_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
                <td className="p-1 text-right pr-2">
                   {/* Total MOOE */}
                   {(getVal('travel_y1') + getVal('travel_y2') + getVal('supplies_y1') + getVal('supplies_y2') + getVal('comms_y1') + getVal('comms_y2') + getVal('other_y1') + getVal('other_y2') + getVal('cont_y1') + getVal('cont_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
              </tr>

              {/* III. Equipment Outlay */}
              <tr className="bg-white font-bold text-sm text-gray-900 border-b border-gray-400"><td colSpan={4} className="p-1 pl-2">III. Equipment Outlay</td></tr>
              {renderMoneyRow("Equipment", "equip", "0", "")}
              
              <tr className="font-bold text-sm text-gray-900 border-b border-gray-800 bg-white">
                <td className="p-1 border-r border-gray-400 pl-2">Sub-Total</td>
                <td className="p-1 text-right border-r border-gray-400">{(getVal('equip_y1')).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="p-1 text-right border-r border-gray-400">{(getVal('equip_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="p-1 text-right pr-2">{(getVal('equip_y1') + getVal('equip_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
              </tr>

              {/* Grand Total */}
              <tr className="bg-white font-extrabold text-gray-900 border-t-2 border-gray-900 text-sm">
                <td className="p-2 border-r border-gray-400 uppercase">Grand Total</td>
                <td className="p-2 text-right border-r border-gray-400">
                  {/* Total Year 1 */}
                  {(getVal('honorarium_y1') + getVal('travel_y1') + getVal('supplies_y1') + getVal('comms_y1') + getVal('other_y1') + getVal('cont_y1') + getVal('equip_y1')).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
                <td className="p-2 text-right border-r border-gray-400">
                  {/* Total Year 2 */}
                  {(getVal('honorarium_y2') + getVal('travel_y2') + getVal('supplies_y2') + getVal('comms_y2') + getVal('other_y2') + getVal('cont_y2') + getVal('equip_y2')).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
                <td className="p-2 text-right pr-2">
                  {grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0">
                <Image src="/images/logo/UEPlogo.png" alt="UEP Logo" fill className="object-contain" />
              </div>
              <div className="text-xs text-gray-800 space-y-0.5">
                <p className="font-semibold text-gray-900">Republic of the Philippines</p>
                <p className="font-bold text-sm">UNIVERSITY OF EASTERN PHILIPPINES</p>
                <p>University Town • Northern Samar • Philippines</p>
              </div>
            </div>
            
            {/* TABS */}
            <div className="flex gap-2 text-sm">
              <button 
                onClick={() => setActiveTab('proposal')}
                className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'proposal' ? 'bg-blue-700 text-white shadow-inner ring-2 ring-offset-1 ring-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Research Proposal
              </button>
              <button 
                onClick={() => setActiveTab('workplan')}
                className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'workplan' ? 'bg-blue-700 text-white shadow-inner ring-2 ring-offset-1 ring-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Work Plan Activities
              </button>
              <button 
                onClick={() => setActiveTab('budget')}
                className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'budget' ? 'bg-blue-700 text-white shadow-inner ring-2 ring-offset-1 ring-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Budget Summary
              </button>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Submission for Chapter {selectedChapter}</h2>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-grow overflow-y-auto px-8 pb-8">
          {activeTab === 'proposal' && renderProposalContent()}
          {activeTab === 'workplan' && (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 text-lg">Work Plan Activities Form (Placeholder)</p>
            </div>
          )}
          {activeTab === 'budget' && renderBudgetContent()}
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-200 bg-white flex justify-between items-center">
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition">Cancel</button>
          <div className="flex gap-3">
            <button onClick={onSaveDraft} className="px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm transition">Save as Draft</button>
            <button onClick={onSubmit} className="px-6 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold shadow-sm transition">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}