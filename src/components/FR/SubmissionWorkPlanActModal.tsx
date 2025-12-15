import React, { useState } from "react";
import Image from "next/image";

interface SubmissionState {
  title: string;
  subtitle: string;
  file: File | null;
  leader?: string;
  duration?: string;
  college?: string;
  [key: string]: string | number | boolean | undefined | null | File;
}

interface SubmissionWorkPlanActModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  selectedChapter: number | null;
  newSubmission: SubmissionState;
  setNewSubmission: React.Dispatch<React.SetStateAction<SubmissionState>>;
}

export default function SubmissionWorkPlanActModal({
  isOpen,
  onClose,
  onSaveDraft,
  onSubmit,
  selectedChapter,
  newSubmission,
  setNewSubmission
}: SubmissionWorkPlanActModalProps) {
  const [activeTab, setActiveTab] = useState<'proposal' | 'workplan' | 'budget'>('workplan');

  if (!isOpen) return null;

  const handleChange = (field: string, value: string | boolean) => {
    setNewSubmission((prev) => ({ ...prev, [field]: value }));
  };

  const getVal = (key: string) => parseFloat(String(newSubmission[key] || "0")) || 0;

  // --- RENDER CONTENT ---
  const renderProposalContent = () => (
    <div className="border border-gray-300 rounded-sm overflow-hidden mb-6">
      <div className="bg-gray-200 p-3 font-bold text-gray-800 border-b border-gray-300">Detailed Research Proposal (Submission)</div>
      <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-b border-gray-300">I. Basic Information</div>
      <div className="flex border-b border-gray-300 text-sm">
        <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">Submission Title</div>
        <div className="flex-grow bg-white"><input type="text" className="w-full h-full p-4 outline-none text-gray-800" value={newSubmission.title} onChange={(e) => handleChange("title", e.target.value)} /></div>
      </div>
      <div className="flex border-b border-gray-300 text-sm">
        <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">Upload File</div>
        <div className="flex-grow bg-white p-3"><input type="file" className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={(e) => setNewSubmission((prev) => ({ ...prev, file: e.target.files ? e.target.files[0] : null }))} /></div>
      </div>
      <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-y border-gray-300">II. Technical Information</div>
      <div className="flex text-sm">
        <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">Rationale</div>
        <div className="flex-grow bg-white"><textarea className="w-full h-full min-h-[100px] p-4 outline-none resize-none text-gray-800" /></div>
      </div>
    </div>
  );

  const renderWorkPlanContent = () => {
    const renderActivityRow = (activity: string, id: number) => (
      <tr className="text-sm">
        <td className="p-2 border border-black bg-white align-top text-black">{activity}</td>
        {['q1', 'q2', 'q3', 'q4'].map((q) => (
          <td key={q} className="p-0 border border-black w-24 text-center align-middle bg-white cursor-pointer" 
              onClick={() => handleChange(`act_${id}_${q}`, !newSubmission[`act_${id}_${q}`])}>
            <div className={`w-full h-10 flex items-center justify-center ${newSubmission[`act_${id}_${q}`] ? 'bg-[#00B0F0]' : ''}`} />
          </td>
        ))}
      </tr>
    );

    const renderInfoRow = (label: string, field: string) => (
      <tr>
        <td className="p-2 border border-black w-[250px] font-normal text-black bg-white">{label}</td>
        <td colSpan={4} className="p-0 border border-black bg-white">
          <input type="text" className="w-full h-full p-2 outline-none text-black font-bold" value={String(newSubmission[field] || "")} onChange={(e) => handleChange(field, e.target.value)} />
        </td>
      </tr>
    );

    return (
      <div className="flex flex-col items-center mt-4 mb-8 w-full">
        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-4">WORKPLAN</h2>
        <div className="w-full border-2 border-black">
          <table className="w-full border-collapse">
            <tbody>
              {renderInfoRow("Program/Project/Study Title:", "title")}
              {renderInfoRow("Program/Project Study Leader:", "leader")}
              {renderInfoRow("College/Unit/Campus:", "college")}
            </tbody>
          </table>
          <table className="w-full border-collapse mt-[-1px]">
            <thead>
              <tr>
                <th className="p-2 border border-black text-left bg-white"></th>
                <th colSpan={4} className="p-1 border border-black text-center bg-white text-black font-bold text-sm">YEAR 1</th>
              </tr>
              <tr className="bg-white text-black font-bold text-sm">
                <th className="p-2 border border-black text-left pl-2 w-1/2">Activities</th>
                <th className="p-1 border border-black text-center w-24">Q1</th>
                <th className="p-1 border border-black text-center w-24">Q2</th>
                <th className="p-1 border border-black text-center w-24">Q3</th>
                <th className="p-1 border border-black text-center w-24">Q4</th>
              </tr>
            </thead>
            <tbody>
              {renderActivityRow("1. Conduct consultation with the client", 1)}
              {renderActivityRow("2. Presentation and approval of the research study", 2)}
              {renderActivityRow("3. Assess effectiveness of workload template", 3)}
              {renderActivityRow("4. Procurement of equipment", 4)}
              {renderActivityRow("5. Follow up Interviews and FGDs", 5)}
              {renderActivityRow("6. Preliminary Investigation", 6)}
              {renderActivityRow("7. Analyze scope and requirements", 7)}
              {renderActivityRow("8. System Development Life Cycle", 8)}
              {renderActivityRow("9. Conduct Training", 9)}
              {renderActivityRow("10. Assessment of acceptability", 10)}
              {renderActivityRow("11. Write terminal report", 11)}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderBudgetContent = () => {
    const renderInfoRow = (label: string, field: string) => (
      <tr>
        <td className="p-2 border border-black w-[280px] font-normal text-black bg-white align-middle">{label}</td>
        <td colSpan={3} className="p-0 border border-black bg-white">
          <input type="text" className="w-full h-full p-2 outline-none text-black font-bold" value={String(newSubmission[field] || "")} onChange={(e) => handleChange(field, e.target.value)} />
        </td>
      </tr>
    );

    const renderMoneyRow = (label: string, key: string, placeholder1: string, placeholder2: string) => {
      const val1 = newSubmission[`${key}_y1`] ? parseFloat(String(newSubmission[`${key}_y1`])) : 0;
      const val2 = newSubmission[`${key}_y2`] ? parseFloat(String(newSubmission[`${key}_y2`])) : 0;
      const total = val1 + val2;

      return (
        <tr className="text-sm text-black">
          <td className="p-1 border border-black bg-white pl-2">{label}</td>
          <td className="p-0 border border-black w-32"><input type="number" className="w-full h-full p-1 text-right outline-none placeholder-black" placeholder={placeholder1} onChange={(e) => handleChange(`${key}_y1`, e.target.value)} value={String(newSubmission[`${key}_y1`] || "")} /></td>
          <td className="p-0 border border-black w-32"><input type="number" className="w-full h-full p-1 text-right outline-none placeholder-black" placeholder={placeholder2} onChange={(e) => handleChange(`${key}_y2`, e.target.value)} value={String(newSubmission[`${key}_y2`] || "")} /></td>
          <td className="p-1 border border-black text-right font-semibold w-32 pr-2">{total > 0 ? total.toLocaleString('en-US', {minimumFractionDigits: 2}) : ""}</td>
        </tr>
      );
    };

    const renderSubTotal = (keyBase: string[], label: string, defaultVal: string) => {
        const totalY1 = keyBase.reduce((acc, key) => acc + getVal(`${key}_y1`), 0);
        const totalY2 = keyBase.reduce((acc, key) => acc + getVal(`${key}_y2`), 0);
        const grand = totalY1 + totalY2;
        return (
          <tr className="font-bold text-sm text-black bg-white">
            <td className="p-1 border border-black pl-2">{label}</td>
            <td className="p-1 border border-black text-right">{totalY1 > 0 ? totalY1.toLocaleString(undefined, {minimumFractionDigits: 2}) : defaultVal}</td>
            <td className="p-1 border border-black text-right">{totalY2 > 0 ? totalY2.toLocaleString(undefined, {minimumFractionDigits: 2}) : ""}</td>
            <td className="p-1 border border-black text-right pr-2">{grand > 0 ? grand.toLocaleString(undefined, {minimumFractionDigits: 2}) : defaultVal}</td>
          </tr>
        );
    };

    const allKeys = ['honorarium', 'travel', 'supplies', 'comms', 'other', 'cont', 'equip'];
    const grandY1 = allKeys.reduce((acc, key) => acc + getVal(`${key}_y1`), 0);
    const grandY2 = allKeys.reduce((acc, key) => acc + getVal(`${key}_y2`), 0);
    const superGrand = grandY1 + grandY2;

    return (
      <div className="flex flex-col items-center mt-4 mb-8 w-full">
        <div className="text-center mb-4"><h2 className="text-lg font-bold text-black uppercase tracking-wide">FINANCIAL COMPONENTS OF THE RESEARCH</h2><h3 className="text-md font-bold text-black">(Budget Summary)</h3></div>
        <div className="w-full border-2 border-black p-0">
          <table className="w-full border-collapse">
            <tbody>
                {renderInfoRow("Program/Project/Study Title:", "title")}
                {renderInfoRow("Program/Project Study Leader:", "leader")}
                {renderInfoRow("Duration:", "duration")}
                {renderInfoRow("College/Unit/Campus:", "college")}
            </tbody>
          </table>
          <table className="w-full border-collapse mt-[-1px]">
            <thead>
              <tr className="bg-white text-black font-bold text-sm">
                <th className="p-1 border border-black text-left pl-2">Item</th>
                <th className="p-1 border border-black text-center w-32">Year 1</th>
                <th className="p-1 border border-black text-center w-32">Year 2</th>
                <th className="p-1 border border-black text-left pl-2 w-32">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white font-bold text-sm text-black"><td colSpan={4} className="p-1 pl-2 border border-black">I. Personal Services</td></tr>
              {renderMoneyRow("Honorarium", "honorarium", "5,000.00", "")}
              {renderSubTotal(['honorarium'], "Sub-Total", "5,000.00")}
              <tr className="bg-white font-bold text-sm text-black"><td colSpan={4} className="p-1 pl-2 border border-black">II. MOOE</td></tr>
              {renderMoneyRow("Travel", "travel", "0", "")}
              {renderMoneyRow("Supplies and Materials", "supplies", "10,000.00", "")}
              {renderMoneyRow("Communications", "comms", "0", "")}
              {renderMoneyRow("Other MOOE", "other", "0", "")}
              {renderMoneyRow("Contingencies (10% of MOOE)", "cont", "1,000.00", "")}
              {renderSubTotal(['travel', 'supplies', 'comms', 'other', 'cont'], "Sub-Total", "11,000.00")}
              <tr className="bg-white font-bold text-sm text-black"><td colSpan={4} className="p-1 pl-2 border border-black">III. Equipment Outlay</td></tr>
              {renderMoneyRow("Equipment", "equip", "0", "")}
              {renderSubTotal(['equip'], "Sub-Total", "0")}
              <tr className="bg-white font-extrabold text-black text-sm">
                <td className="p-2 border border-black uppercase">Grand Total</td>
                <td className="p-2 border border-black text-right">{grandY1 > 0 ? grandY1.toLocaleString(undefined, {minimumFractionDigits: 2}) : "16,000.00"}</td>
                <td className="p-2 border border-black text-right">{grandY2 > 0 ? grandY2.toLocaleString(undefined, {minimumFractionDigits: 2}) : ""}</td>
                <td className="p-2 border border-black text-right pr-2">{superGrand > 0 ? superGrand.toLocaleString(undefined, {minimumFractionDigits: 2}) : "16,000.00"}</td>
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
            
            <div className="flex gap-2 text-sm">
              <button onClick={() => setActiveTab('proposal')} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'proposal' ? 'bg-blue-700 text-white shadow-inner ring-2 ring-offset-1 ring-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Research Proposal</button>
              <button onClick={() => setActiveTab('workplan')} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'workplan' ? 'bg-blue-700 text-white shadow-inner ring-2 ring-offset-1 ring-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Work Plan Activities</button>
              <button onClick={() => setActiveTab('budget')} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'budget' ? 'bg-blue-700 text-white shadow-inner ring-2 ring-offset-1 ring-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Budget Summary</button>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Submission for Chapter {selectedChapter}</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto px-8 pb-8 mt-4">
          {activeTab === 'proposal' && renderProposalContent()}
          {activeTab === 'workplan' && renderWorkPlanContent()}
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