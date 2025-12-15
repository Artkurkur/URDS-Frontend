import React, { useState, useEffect } from "react";
import Image from "next/image";

interface StudyState {
  title: string;
  chapter: number;
  natureOfResearch: string;
  leader: string;
  personnel: string;
  location: string;
  duration: string;
  budget: string;
  college: string;
  rationale: string;
  objectives: string;
  literature: string;
  methodology: string;
  budgetaryRequirements: string;
  formType?: 'Research Proposal' | 'Work Plan Activities' | 'Budget Summary';
  [key: string]: string | number | boolean | undefined | null | object;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  newStudy: StudyState;
  setNewStudy: React.Dispatch<React.SetStateAction<StudyState>>;
  existingStudy?: StudyState | null;
}

export default function UnifiedAddStudyModal({
  isOpen,
  onClose,
  onSaveDraft,
  onSubmit,
  newStudy,
  setNewStudy,
  existingStudy
}: Props) {
  
  const [activeTab, setActiveTab] = useState<'Research Proposal' | 'Work Plan Activities' | 'Budget Summary'>('Research Proposal');

  useEffect(() => {
    if (newStudy.formType) {
      setActiveTab(newStudy.formType);
    }
  }, [newStudy.formType, isOpen]);

  useEffect(() => {
    if (isOpen && existingStudy) {
        setNewStudy(prev => ({
            ...prev,
            title: existingStudy.title,
            leader: existingStudy.leader,
            college: existingStudy.college,
            chapter: existingStudy.chapter,
            natureOfResearch: existingStudy.natureOfResearch,
        }));
    }
  }, [isOpen, existingStudy, setNewStudy]);

  const handleTabChange = (tab: 'Research Proposal' | 'Work Plan Activities' | 'Budget Summary') => {
    setActiveTab(tab);
    setNewStudy(prev => ({ ...prev, formType: tab }));
  };

  const handleChange = (field: string, value: string | boolean) => {
    setNewStudy((prev) => ({ ...prev, [field]: value }));
  };

  const getVal = (key: string) => parseFloat(String(newStudy[key] || "0")) || 0;

  if (!isOpen) return null;

  const renderProposalContent = () => {
    const renderRow = (label: string, field: string, isTextArea = false) => {
        const isLocked = !!existingStudy && ['title', 'leader', 'college', 'natureOfResearch', 'chapter'].includes(field);
        return (
            <div className="flex border-b border-gray-300 last:border-0 text-sm">
                <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">
                {label}
                </div>
                <div className="flex-grow bg-white">
                {isTextArea ? (
                    <textarea
                    className={`w-full h-full min-h-[100px] p-4 outline-none resize-none text-gray-800 ${isLocked ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    value={String(newStudy[field] || "")}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={isLocked}
                    />
                ) : (
                    <input
                    type="text"
                    className={`w-full h-full p-4 outline-none text-gray-800 ${isLocked ? 'bg-gray-100 cursor-not-allowed text-gray-500 font-bold' : ''}`}
                    value={String(newStudy[field] || "")}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={isLocked}
                    />
                )}
                </div>
            </div>
        );
    };

    return (
      <div className="border border-gray-300 rounded-sm overflow-hidden mb-6">
        <div className="bg-gray-200 p-3 font-bold text-gray-800 border-b border-gray-300">Detailed Research Proposal</div>
        <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-b border-gray-300">I. Basic Information</div>
        {renderRow("Title", "title")}
        {renderRow("Nature of Research", "natureOfResearch")}
        {renderRow("Leader / Main Proponent", "leader")}
        {renderRow("Other Personnel Involved", "personnel")}
        {renderRow("Project Location/s", "location")}
        {renderRow("Duration", "duration")}
        {renderRow("College/Unit/Campus", "college")}
        {renderRow("Budget for the Year", "budget")}
        <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-y border-gray-300">II. Technical Information</div>
        {renderRow("Rationale/Significance", "rationale", true)}
        {renderRow("Objectives", "objectives", true)}
        <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-y border-gray-300">III. Review of Literature</div>
        {renderRow("Review of Literature", "literature", true)}
        <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-y border-gray-300">IV. Detailed Methodology</div>
        {renderRow("Detailed Methodology", "methodology", true)}
        <div className="bg-gray-100 p-2 pl-4 font-bold text-gray-700 text-sm border-y border-gray-300">VI. Detailed Budgetary Requirements (Text)</div>
        {renderRow("Budgetary Requirements", "budgetaryRequirements", true)}
      </div>
    );
  };

  const renderWorkPlanContent = () => {
    const renderActivityRow = (activity: string, id: number) => (
      <tr className="border-b border-black text-sm">
        <td className="p-2 border-r border-black bg-white align-top text-black">{activity}</td>
        {['q1', 'q2', 'q3', 'q4'].map((q) => (
          <td key={q} className="p-0 border border-black w-24 text-center align-middle bg-white cursor-pointer"
              onClick={() => handleChange(`act_${id}_${q}`, !newStudy[`act_${id}_${q}`])}>
            <div className={`w-full h-10 flex items-center justify-center ${newStudy[`act_${id}_${q}`] ? 'bg-[#00B0F0]' : ''}`} />
          </td>
        ))}
      </tr>
    );

    const renderInfoRow = (label: string, field: string) => {
        const isLocked = !!existingStudy;
        return (
            <tr>
                <td className="p-2 border border-black w-[250px] font-normal text-black bg-white">{label}</td>
                <td colSpan={4} className="p-0 border border-black bg-white">
                <input
                    type="text"
                    className={`w-full h-full p-2 outline-none text-black font-bold ${isLocked ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    value={String(newStudy[field] || "")}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={isLocked}
                />
                </td>
            </tr>
        );
    };

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
              {renderActivityRow("4. Procurement of equipment and materials", 4)}
              {renderActivityRow("5. Follow up Interviews and FGDs", 5)}
              {renderActivityRow("6. Conduct preliminary Investigation", 6)}
              {renderActivityRow("7. Analyze and assess the scope", 7)}
              {renderActivityRow("8. Conduct the System Development Life Cycle", 8)}
              {renderActivityRow("9. Conduct Training", 9)}
              {renderActivityRow("10. Conduct an assessment on the acceptability", 10)}
              {renderActivityRow("11. Write terminal report", 11)}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderBudgetContent = () => {
    const renderInfoRow = (label: string, field: string) => {
        const isLocked = !!existingStudy && ['title', 'leader', 'college'].includes(field);
        return (
            <tr>
                <td className="p-2 border border-black w-[280px] font-normal text-black bg-white align-middle">{label}</td>
                <td colSpan={3} className="p-0 border border-black bg-white">
                <input
                    type="text"
                    className={`w-full h-full p-2 outline-none text-black font-bold ${isLocked ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    value={String(newStudy[field] || "")}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={isLocked}
                />
                </td>
            </tr>
        );
    };

    const renderMoneyRow = (label: string, key: string, placeholder1: string, placeholder2: string) => {
      const val1 = newStudy[`${key}_y1`] ? parseFloat(String(newStudy[`${key}_y1`])) : 0;
      const val2 = newStudy[`${key}_y2`] ? parseFloat(String(newStudy[`${key}_y2`])) : 0;
      const total = val1 + val2;

      return (
        <tr className="text-sm text-black">
          <td className="p-1 border border-black bg-white pl-2">{label}</td>
          <td className="p-0 border border-black w-32">
            <input
              type="number"0
              className="w-full h-full p-1 text-right outline-none placeholder-black"
              placeholder={placeholder1}
              value={String(newStudy[`${key}_y1`] || "")}
              onChange={(e) => handleChange(`${key}_y1`, e.target.value)}
            />
          </td>
          <td className="p-0 border border-black w-32">
            <input
              type="number"
              className="w-full h-full p-1 text-right outline-none placeholder-black"
              placeholder={placeholder2}
              value={String(newStudy[`${key}_y2`] || "")}
              onChange={(e) => handleChange(`${key}_y2`, e.target.value)}
            />
          </td>
          <td className="p-1 border border-black text-right font-semibold w-32 pr-2">
            {total > 0 ? total.toLocaleString('en-US', {minimumFractionDigits: 2}) : ""}
          </td>
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
          <td className="p-1 border border-black text-right">
            {totalY1 > 0 ? totalY1.toLocaleString(undefined, {minimumFractionDigits: 2}) : defaultVal}
          </td>
          <td className="p-1 border border-black text-right">
            {totalY2 > 0 ? totalY2.toLocaleString(undefined, {minimumFractionDigits: 2}) : ""}
          </td>
          <td className="p-1 border border-black text-right pr-2">
            {grand > 0 ? grand.toLocaleString(undefined, {minimumFractionDigits: 2}) : defaultVal}
          </td>
        </tr>
      );
    };

    const grandTotal = ['honorarium', 'travel', 'supplies', 'comms', 'other', 'cont', 'equip']
      .reduce((acc, key) => acc + getVal(`${key}_y1`) + getVal(`${key}_y2`), 0);
    const grandY1 = ['honorarium', 'travel', 'supplies', 'comms', 'other', 'cont', 'equip']
      .reduce((acc, key) => acc + getVal(`${key}_y1`), 0);
    const grandY2 = ['honorarium', 'travel', 'supplies', 'comms', 'other', 'cont', 'equip']
      .reduce((acc, key) => acc + getVal(`${key}_y2`), 0);

    return (
      <div className="flex flex-col items-center mt-4 mb-8 w-full">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-black uppercase tracking-wide">FINANCIAL COMPONENTS OF THE RESEARCH</h2>
          <h3 className="text-md font-bold text-black">(Budget Summary)</h3>
        </div>

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
                <td className="p-2 border border-black text-right pr-2">{grandTotal > 0 ? grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2}) : "16,000.00"}</td>
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
        
        {/* HEADER WITH TABS */}
        <div className="p-6 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border-b border-gray-200">
           <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="relative w-14 h-14 shrink-0">
                 <Image src="/images/logo/UEPlogo.png" alt="UEP Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600">Republic of the Philippines</p>
                <h1 className="font-bold text-lg leading-tight">UNIVERSITY OF EASTERN PHILIPPINES</h1>
                <p className="text-xs text-gray-500">University Town • Northern Samar</p>
                {existingStudy && (
                    <span className="inline-block mt-1 text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-300 font-bold uppercase">
                        Adding Submission to: {existingStudy.title}
                    </span>
                )}
              </div>
           </div>
           
           <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleTabChange('Research Proposal')}
                className={`px-4 py-2 rounded text-sm font-bold transition ${activeTab === 'Research Proposal' ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white hover:bg-blue-500'}`}
              >
                Research Proposal
              </button>
              <button
                onClick={() => handleTabChange('Work Plan Activities')}
                className={`px-4 py-2 rounded text-sm font-bold transition ${activeTab === 'Work Plan Activities' ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white hover:bg-blue-500'}`}
              >
                Work Plan Activities
              </button>
              <button
                onClick={() => handleTabChange('Budget Summary')}
                className={`px-4 py-2 rounded text-sm font-bold transition ${activeTab === 'Budget Summary' ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white hover:bg-blue-500'}`}
              >
                Budget Summary
              </button>
           </div>
        </div>

        <div className="flex-grow overflow-y-auto p-8 bg-gray-50">
           {existingStudy && (
               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                   <p className="text-sm text-yellow-800">
                       <strong>Submission Mode:</strong> You are adding a file to an existing study.
                       Basic details (Title, Leader, College) are locked to match the original record.
                   </p>
               </div>
           )}

           {activeTab === 'Research Proposal' && renderProposalContent()}
           {activeTab === 'Work Plan Activities' && renderWorkPlanContent()}
           {activeTab === 'Budget Summary' && renderBudgetContent()}
        </div>

        {/* FOOTER BUTTONS - IMPORTANT */}
        <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center">
          <button 
            onClick={onClose} 
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold transition"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            {/* SAVE AS DRAFT - Orange Button */}
            <button 
              onClick={onSaveDraft} 
              className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold transition"
            >
              Save as Draft
            </button>
            {/* SUBMIT - Green Button */}
            <button 
              onClick={onSubmit} 
              className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition"
            >
              {existingStudy ? "Submit File" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}