import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";

// --- TYPES ---
export interface StudyState {
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

// --- CONSTANTS ---
const COLLEGES = [
  "College of Business Administration",
  "College of Agriculture Fisheries and Natural Resources",
  "College of Education",
  "College of Arts and Communication",
  "College of Science",
  "College of Nursing & Allied Health Science",
  "College of Engineering",
  "College of Law",
  "College of Veterinary Medicine"
];

// --- HELPER COMPONENTS ---

const InputCell = React.memo(({ 
  value, 
  onChange, 
  placeholder = "", 
  className = "",
  readOnly = false,
  type = "text"
}: { 
  value: string | number; 
  onChange?: (val: string) => void; 
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  type?: string;
}) => (
  <input
    type={type}
    readOnly={readOnly}
    placeholder={placeholder}
    className={`w-full h-full p-2 bg-transparent outline-none text-center focus:bg-blue-50 disabled:bg-gray-100 ${className}`}
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
  />
));
InputCell.displayName = 'InputCell';

const MoneyCell = React.memo(({ 
  value, 
  onChange, 
  placeholder = "0.00",
  className = "",
  readOnly = false
}: { 
  value: string | number; 
  onChange?: (val: string) => void; 
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}) => (
  <input
    type="text"
    readOnly={readOnly}
    className={`w-full h-full p-2 text-right outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100 disabled:bg-gray-50 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
  />
));
MoneyCell.displayName = 'MoneyCell';

const SignatoryInput = ({ 
  value, 
  onChange, 
  placeholder,
  titleValue,
  onTitleChange,
  titlePlaceholder
}: { 
  value: string; 
  onChange: (val: string) => void; 
  placeholder: string;
  titleValue?: string;
  onTitleChange?: (val: string) => void;
  titlePlaceholder?: string;
}) => (
  <div className="flex flex-col items-center w-full">
    <input 
      type="text" 
      className="w-full text-center uppercase font-bold outline-none bg-transparent hover:bg-gray-100 border-b border-transparent hover:border-gray-300 focus:border-blue-500 underline underline-offset-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    <input 
      type="text" 
      className="w-full text-center text-xs mt-1 outline-none bg-transparent hover:bg-gray-100 text-gray-600"
      value={titleValue}
      onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
      placeholder={titlePlaceholder}
    />
  </div>
);

const HeaderInput = ({ 
  value, 
  onChange, 
  placeholder,
  className = "" 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  placeholder: string; 
  className?: string;
}) => (
  <input
    type="text"
    className={`bg-transparent outline-none text-center font-bold w-full placeholder-gray-500 hover:bg-black/5 focus:bg-white ${className}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

// --- MAIN COMPONENT ---

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
  
  // Smart Initialization
  const [rowCounts, setRowCounts] = useState({
    ps: (newStudy['count_ps'] as number) || 2, 
    travel: (newStudy['count_travel'] as number) || 1,
    supplies: (newStudy['count_supplies'] as number) || 1,
    comms: (newStudy['count_comms'] as number) || 1,
    other: (newStudy['count_other'] as number) || 1,
    equip: (newStudy['count_equip'] as number) || 1
  });

  // Fallback scanner
  useEffect(() => {
     if (isOpen) {
        const counts = { ...rowCounts };
        ['travel', 'supplies', 'comms', 'other', 'equip'].forEach(section => {
            let maxIndex = 0;
            Object.keys(newStudy).forEach(key => {
                if (key.startsWith(section + '_')) {
                    const parts = key.split('_');
                    const idx = parseInt(parts[parts.length - 1], 10);
                    if (!isNaN(idx) && idx >= maxIndex) maxIndex = idx + 1;
                }
            });
            if (maxIndex > counts[section as keyof typeof counts]) {
                counts[section as keyof typeof counts] = maxIndex;
            }
        });
        setRowCounts(counts);
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (newStudy.formType) {
      setActiveTab(newStudy.formType);
    }
  }, [newStudy.formType, isOpen]);

  const handleTabChange = (tab: 'Research Proposal' | 'Work Plan Activities' | 'Budget Summary') => {
    setActiveTab(tab);
    setNewStudy(prev => ({ ...prev, formType: tab }));
  };

  const handleChange = (field: string, value: string | boolean) => {
    setNewStudy((prev) => ({ ...prev, [field]: value }));
  };

  const addRow = (section: keyof typeof rowCounts) => {
    const newCount = rowCounts[section] + 1;
    setRowCounts(prev => ({ ...prev, [section]: newCount }));
    setNewStudy(prev => ({ ...prev, [`count_${section}`]: newCount }));
  };

  const getVal = (key: string) => parseFloat(String(newStudy[key] || "0").replace(/,/g, '')) || 0;

  if (!isOpen) return null;

  /* --- RENDERERS --- */

  const renderProposalContent = () => {
    const renderRow = (label: string, field: string, isTextArea = false) => {
      return (
        <div className="flex border-b border-gray-300 last:border-0 text-sm">
          <div className="w-1/3 min-w-[200px] bg-gray-50 p-4 font-semibold text-gray-700 border-r border-gray-300 flex items-center">
            {label}
          </div>
          <div className="flex-grow bg-white">
            {isTextArea ? (
              <textarea 
                className="w-full h-full min-h-[100px] p-4 outline-none resize-none text-gray-800" 
                value={String(newStudy[field] || "")} 
                onChange={(e) => handleChange(field, e.target.value)} 
              />
            ) : (
              <input 
                type="text" 
                className="w-full h-full p-4 outline-none text-gray-800" 
                value={String(newStudy[field] || "")} 
                onChange={(e) => handleChange(field, e.target.value)} 
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
        {/* 🟢 MOVED: College/Unit/Campus is now below Leader */}
        {renderRow("College/Unit/Campus", "college")}
        {renderRow("Other Personnel Involved", "personnel")}
        {renderRow("Project Location/s", "location")}
        {renderRow("Duration", "duration")}
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
          <td key={q} className="p-0 border border-black w-24 text-center align-middle bg-white cursor-pointer" onClick={() => handleChange(`act_${id}_${q}`, !newStudy[`act_${id}_${q}`])}>
            <div className={`w-full h-10 flex items-center justify-center ${newStudy[`act_${id}_${q}`] ? 'bg-[#00B0F0]' : ''}`} />
          </td>
        ))}
      </tr>
    );
    const renderInfoRow = (label: string, field: string) => (
        <tr><td className="p-2 border border-black w-[250px]">{label}</td><td colSpan={4} className="p-0 border border-black"><input className="w-full h-full p-2 outline-none" value={String(newStudy[field] || "")} onChange={(e) => handleChange(field, e.target.value)} /></td></tr>
    );
    return (
      <div className="flex flex-col items-center mt-4 mb-8 w-full">
        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-4">WORKPLAN</h2>
        <div className="w-full border-2 border-black">
          <table className="w-full border-collapse">
            <tbody>{renderInfoRow("Program/Project/Study Title:", "title")}{renderInfoRow("Program/Project Study Leader:", "leader")}{renderInfoRow("College/Unit/Campus:", "college")}</tbody>
          </table>
          <table className="w-full border-collapse mt-[-1px]">
            <thead>
              <tr><th className="p-2 border border-black"></th><th colSpan={4} className="p-1 border border-black text-center">YEAR 1</th></tr>
              <tr className="bg-white text-black font-bold text-sm"><th className="p-2 border border-black w-1/2">Activities</th><th className="p-1 border border-black">Q1</th><th className="p-1 border border-black">Q2</th><th className="p-1 border border-black">Q3</th><th className="p-1 border border-black">Q4</th></tr>
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
    const h_y1 = String(newStudy.h_y1 || "Year 1");
    const h_y2 = String(newStudy.h_y2 || "Year 2");
    const h_y3 = String(newStudy.h_y3 || "Year 3");

    const renderInfoRow = (label: string, field: string) => (
      <tr>
        <td className="p-2 border border-black w-[280px] font-normal text-black bg-white align-middle">{label}</td>
        <td colSpan={7} className="p-0 border border-black bg-white">
          <input type="text" className="w-full h-full p-2 outline-none text-black font-bold" value={String(newStudy[field] || "")} onChange={(e) => handleChange(field, e.target.value)} />
        </td>
      </tr>
    );

    const AddRowButton = ({ onClick }: { onClick: () => void }) => (
      <div className="absolute -right-8 bottom-2 flex flex-col items-center cursor-pointer group" onClick={onClick} title="Add Row">
        <FaPlusCircle className="text-xl text-black group-hover:text-blue-600 transition" />
      </div>
    );

    const renderCell = (field: string, placeholder = "", isMoney = false, type = "text") => {
        if (isMoney) {
            return <MoneyCell value={String(newStudy[field] || "")} onChange={(val) => handleChange(field, val)} placeholder={placeholder} />;
        }
        return <InputCell value={String(newStudy[field] || "")} onChange={(val) => handleChange(field, val)} placeholder={placeholder} type={type} />;
    };

    const calculateSectionTotal = (section: string, count: number, years = ['y1', 'y2', 'y3']) => {
       let total = 0;
       [...Array(count)].forEach((_, i) => {
          years.forEach(y => {
             total += getVal(`${section}_${y}_${i}`);
          });
       });
       return total;
    };

    const grandTotal = calculateSectionTotal('ps', rowCounts.ps) + 
                       calculateSectionTotal('travel', rowCounts.travel) + 
                       calculateSectionTotal('supplies', rowCounts.supplies) + 
                       calculateSectionTotal('comms', rowCounts.comms) + 
                       calculateSectionTotal('other', rowCounts.other) + 
                       calculateSectionTotal('equip', rowCounts.equip);

    const renderPSRow = (index: number) => {
        return (
            <tr key={`ps_${index}`} className="text-sm text-black h-10">
                <td className="border border-black p-0" colSpan={4}>{renderCell(`ps_item_${index}`, "Item (e.g. Wages)")}</td>
                <td className="border border-black p-0">{renderCell(`ps_qty_${index}`, "Qty", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`ps_rate_${index}`, "Rate", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`ps_y1_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`ps_y2_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`ps_y3_${index}`, "", true)}</td>
            </tr>
        );
    };

    // 🟢 FIXED: Defined Missing renderTravelRow function
    const renderTravelRow = (index: number) => {
        return (
            <tr key={`travel_${index}`} className="text-sm text-black h-10">
                <td className="border border-black p-0">{renderCell(`travel_date_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`travel_place_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`travel_purpose_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`travel_mode_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`travel_cost_${index}`, "Cost", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`travel_y1_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`travel_y2_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`travel_y3_${index}`, "", true)}</td>
            </tr>
        );
    };

    // 🟢 FIXED: Removed Typo in type="number"0
    // const renderMoneyRow = (label: string, key: string, placeholder1: string, placeholder2: string) => {
    //   const val1 = newStudy[`${key}_y1`] ? parseFloat(String(newStudy[`${key}_y1`])) : 0;
    //   const val2 = newStudy[`${key}_y2`] ? parseFloat(String(newStudy[`${key}_y2`])) : 0;
    //   const total = val1 + val2;

    //   return (
    //     <tr className="text-sm text-black">
    //       <td className="p-1 border border-black bg-white pl-2">{label}</td>
    //       <td className="p-0 border border-black w-32">
    //         <input
    //           type="number"
    //           className="w-full h-full p-1 text-right outline-none placeholder-black"
    //           placeholder={placeholder1}
    //           value={String(newStudy[`${key}_y1`] || "")}
    //           onChange={(e) => handleChange(`${key}_y1`, e.target.value)}
    //         />
    //       </td>
    //       <td className="p-0 border border-black w-32">
    //         <input
    //           type="number"
    //           className="w-full h-full p-1 text-right outline-none placeholder-black"
    //           placeholder={placeholder2}
    //           value={String(newStudy[`${key}_y2`] || "")}
    //           onChange={(e) => handleChange(`${key}_y2`, e.target.value)}
    //         />
    //       </td>
    //       <td className="p-1 border border-black text-right font-semibold w-32 pr-2">
    //         {total > 0 ? total.toLocaleString('en-US', {minimumFractionDigits: 2}) : ""}
    //       </td>
    //     </tr>
    //   );
    // };

    const renderSuppliesRow = (index: number) => {
        return (
            <tr key={`supply_${index}`} className="text-sm text-black h-10">
                <td className="border border-black p-0">{renderCell(`supplies_date_${index}`)}</td>
                <td className="border border-black p-0 w-16">{renderCell(`supplies_unit_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`supplies_desc_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`supplies_purpose_${index}`)}</td>
                <td className="border border-black p-0 w-12">{renderCell(`supplies_qty_${index}`, "Qty", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`supplies_unitcost_${index}`, "Cost", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`supplies_y1_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`supplies_y2_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`supplies_y3_${index}`, "", true)}</td>
            </tr>
        );
    };

    const renderCommsRow = (index: number) => {
        return (
            <tr key={`comms_${index}`} className="text-sm text-black h-10">
                <td className="border border-black p-0">{renderCell(`comms_date_${index}`)}</td>
                <td className="border border-black p-0 w-16">{renderCell(`comms_unit_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`comms_desc_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`comms_purpose_${index}`)}</td>
                <td className="border border-black p-0 w-12">{renderCell(`comms_qty_${index}`, "Qty", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`comms_unitcost_${index}`, "Cost", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`comms_y1_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`comms_y2_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`comms_y3_${index}`, "", true)}</td>
            </tr>
        );
    };
    
    const renderOtherRow = (prefix: string, index: number) => {
        return (
            <tr key={`${prefix}_${index}`} className="text-sm text-black h-10">
                <td className="border border-black p-0">{renderCell(`${prefix}_date_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_place_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_purpose_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_mode_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_cost_${index}`, "Cost", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_y1_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_y2_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`${prefix}_y3_${index}`, "", true)}</td>
            </tr>
        );
    };

    const renderEquipmentRow = (index: number) => {
        return (
            <tr key={`equip_${index}`} className="text-sm text-black h-10">
                <td className="border border-black p-0">{renderCell(`equip_date_${index}`)}</td>
                <td className="border border-black p-0 w-16">{renderCell(`equip_unit_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`equip_desc_${index}`)}</td>
                <td className="border border-black p-0">{renderCell(`equip_purpose_${index}`)}</td>
                <td className="border border-black p-0 w-12">{renderCell(`equip_qty_${index}`, "Qty", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`equip_unitcost_${index}`, "Cost", false, "number")}</td>
                <td className="border border-black p-0">{renderCell(`equip_y1_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`equip_y2_${index}`, "", true)}</td>
                <td className="border border-black p-0">{renderCell(`equip_y3_${index}`, "", true)}</td>
            </tr>
        );
    };

    return (
      <div className="flex flex-col items-center mt-4 mb-8 w-full">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-black uppercase tracking-wide">FINANCIAL COMPONENTS OF THE RESEARCH</h2>
          <h3 className="text-md font-bold text-black">(Budget Summary)</h3>
        </div>

        <div className="w-full border-2 border-black p-0 overflow-visible relative">
          <table className="w-full border-collapse mb-4">
            <tbody>
              {renderInfoRow("Program/Project/Study Title:", "title")}
              {renderInfoRow("Program/Project Study Leader:", "leader")}
              {renderInfoRow("Duration:", "duration")}
              {renderInfoRow("College/Unit/Campus:", "college")}
            </tbody>
          </table>

          {/* 1. PERSONAL SERVICES */}
          <div className="border border-black mb-6 relative">
             <div className="bg-white font-bold text-sm text-black p-1 pl-2 border-b border-black">I. PERSONAL SERVICES</div>
             <table className="w-full border-collapse">
                <thead>
                    <tr className="text-xs font-bold text-center bg-white">
                        <th className="border border-black p-1" colSpan={4}>Item Description</th>
                        <th className="border border-black p-1 w-24">Qty/Months</th>
                        <th className="border border-black p-1 w-24">Rate</th>
                        {/* INPUTABLE YEAR HEADERS */}
                        <th className="border border-black p-1 w-24"><HeaderInput value={h_y1} onChange={(val) => handleChange("h_y1", val)} placeholder="Year 1" /></th>
                        <th className="border border-black p-1 w-24"><HeaderInput value={h_y2} onChange={(val) => handleChange("h_y2", val)} placeholder="Year 2" /></th>
                        <th className="border border-black p-1 w-24"><HeaderInput value={h_y3} onChange={(val) => handleChange("h_y3", val)} placeholder="Year 3" /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCounts.ps)].map((_, i) => renderPSRow(i))}
                    <tr className="font-bold text-sm">
                        <td colSpan={6} className="border border-black p-1 text-center">Total</td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('ps', rowCounts.ps, ['y1']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('ps', rowCounts.ps, ['y2']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('ps', rowCounts.ps, ['y3']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                    </tr>
                </tbody>
             </table>
             <AddRowButton onClick={() => addRow('ps')} />
          </div>

          {/* 2. MOOE - TRAVEL */}
          <div className="border border-black mb-6 relative">
             <div className="bg-white font-bold text-sm text-black p-1 pl-2 border-b border-black">II. MOOE-TRAVEL</div>
             <table className="w-full border-collapse">
                <thead>
                    <tr className="text-xs font-bold text-center bg-white">
                        <th className="border border-black p-1 w-24" rowSpan={2}>Date (Quarter\Month\Year)</th>
                        <th className="border border-black p-1" rowSpan={2}>Places to be Visited</th>
                        <th className="border border-black p-1" rowSpan={2}>Purpose of Travel</th>
                        <th className="border border-black p-1 w-24" rowSpan={2}>Mode of Transport</th>
                        <th className="border border-black p-1 w-24" rowSpan={2}>Estimated Cost</th>
                        <th className="border border-black p-1" colSpan={3}>Total</th>
                    </tr>
                    <tr className="text-xs font-bold text-center">
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y1} onChange={(val) => handleChange("h_y1", val)} placeholder="Year 1" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y2} onChange={(val) => handleChange("h_y2", val)} placeholder="Year 2" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y3} onChange={(val) => handleChange("h_y3", val)} placeholder="Year 3" /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCounts.travel)].map((_, i) => renderTravelRow(i))}
                    <tr className="font-bold text-sm">
                        <td colSpan={5} className="border border-black p-1 text-center">Total</td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('travel', rowCounts.travel, ['y1']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('travel', rowCounts.travel, ['y2']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('travel', rowCounts.travel, ['y3']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                    </tr>
                </tbody>
             </table>
             <AddRowButton onClick={() => addRow('travel')} />
          </div>

          {/* 3. MOOE - SUPPLIES */}
          <div className="border border-black mb-6 relative">
             <div className="bg-white font-bold text-sm text-black p-1 pl-2 border-b border-black">II. MOOE-Supplies and Materials</div>
             <table className="w-full border-collapse">
                <thead>
                    <tr className="text-xs font-bold text-center bg-white">
                        <th className="border border-black p-1 w-24" rowSpan={2}>Date (Quarter\Month\Year)</th>
                        <th className="border border-black p-1 w-16" rowSpan={2}>Unit</th>
                        <th className="border border-black p-1" rowSpan={2}>Item Description</th>
                        <th className="border border-black p-1" rowSpan={2}>Purpose</th>
                        <th className="border border-black p-1 w-12" rowSpan={2}>Qty</th>
                        <th className="border border-black p-1 w-20" rowSpan={2}>Unit cost</th>
                        <th className="border border-black p-1" colSpan={3}>Total</th>
                    </tr>
                    <tr className="text-xs font-bold text-center">
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y1} onChange={(val) => handleChange("h_y1", val)} placeholder="Year 1" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y2} onChange={(val) => handleChange("h_y2", val)} placeholder="Year 2" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y3} onChange={(val) => handleChange("h_y3", val)} placeholder="Year 3" /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCounts.supplies)].map((_, i) => renderSuppliesRow(i))}
                    <tr className="font-bold text-sm">
                        <td colSpan={6} className="border border-black p-1 text-center">Total</td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('supplies', rowCounts.supplies, ['y1']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('supplies', rowCounts.supplies, ['y2']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('supplies', rowCounts.supplies, ['y3']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                    </tr>
                </tbody>
             </table>
             <AddRowButton onClick={() => addRow('supplies')} />
          </div>

          {/* 4. MOOE - COMMUNICATIONS */}
          <div className="border border-black mb-6 relative">
             <div className="bg-white font-bold text-sm text-black p-1 pl-2 border-b border-black">II. MOOE-Communications</div>
             <table className="w-full border-collapse">
                <thead>
                    <tr className="text-xs font-bold text-center bg-white">
                        <th className="border border-black p-1 w-24" rowSpan={2}>Date (Quarter\Month\Year)</th>
                        <th className="border border-black p-1 w-16" rowSpan={2}>Unit</th>
                        <th className="border border-black p-1" rowSpan={2}>Item Description</th>
                        <th className="border border-black p-1" rowSpan={2}>Purpose</th>
                        <th className="border border-black p-1 w-12" rowSpan={2}>Qty</th>
                        <th className="border border-black p-1 w-20" rowSpan={2}>Unit cost</th>
                        <th className="border border-black p-1" colSpan={3}>Total</th>
                    </tr>
                    <tr className="text-xs font-bold text-center">
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y1} onChange={(val) => handleChange("h_y1", val)} placeholder="Year 1" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y2} onChange={(val) => handleChange("h_y2", val)} placeholder="Year 2" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y3} onChange={(val) => handleChange("h_y3", val)} placeholder="Year 3" /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCounts.comms)].map((_, i) => renderCommsRow(i))}
                    <tr className="font-bold text-sm">
                        <td colSpan={6} className="border border-black p-1 text-center">Total</td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('comms', rowCounts.comms, ['y1']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('comms', rowCounts.comms, ['y2']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('comms', rowCounts.comms, ['y3']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                    </tr>
                </tbody>
             </table>
             <AddRowButton onClick={() => addRow('comms')} />
          </div>

          {/* 5. OTHER MOOE */}
          <div className="border border-black mb-6 relative">
             <div className="bg-white font-bold text-sm text-black p-1 pl-2 border-b border-black">II. Other MOOE (Contract Labor )</div>
             <table className="w-full border-collapse">
                <thead>
                    <tr className="text-xs font-bold text-center bg-white">
                        <th className="border border-black p-1 w-24" rowSpan={2}>Date (Quarter\Month\Year)</th>
                        <th className="border border-black p-1" rowSpan={2}>Places to be Visited</th>
                        <th className="border border-black p-1" rowSpan={2}>Purpose of Travel</th>
                        <th className="border border-black p-1 w-24" rowSpan={2}>Mode of Transport</th>
                        <th className="border border-black p-1 w-24" rowSpan={2}>Estimated Cost</th>
                        <th className="border border-black p-1" colSpan={3}>Total</th>
                    </tr>
                    <tr className="text-xs font-bold text-center">
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y1} onChange={(val) => handleChange("h_y1", val)} placeholder="Year 1" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y2} onChange={(val) => handleChange("h_y2", val)} placeholder="Year 2" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y3} onChange={(val) => handleChange("h_y3", val)} placeholder="Year 3" /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCounts.other)].map((_, i) => renderOtherRow('other', i))}
                    <tr className="font-bold text-sm">
                        <td colSpan={5} className="border border-black p-1 text-center">Total</td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('other', rowCounts.other, ['y1']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('other', rowCounts.other, ['y2']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('other', rowCounts.other, ['y3']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                    </tr>
                </tbody>
             </table>
             <AddRowButton onClick={() => addRow('other')} />
          </div>

          {/* 6. EQUIPMENT */}
          <div className="border border-black mb-6 relative">
             <div className="bg-white font-bold text-sm text-black p-1 pl-2 border-b border-black">III. Equipment Outlay</div>
             <table className="w-full border-collapse">
                <thead>
                    <tr className="text-xs font-bold text-center bg-white">
                        <th className="border border-black p-1 w-24" rowSpan={2}>Date (Quarter\Month\Year)</th>
                        <th className="border border-black p-1 w-16" rowSpan={2}>Unit</th>
                        <th className="border border-black p-1" rowSpan={2}>Item Description</th>
                        <th className="border border-black p-1" rowSpan={2}>Purpose</th>
                        <th className="border border-black p-1 w-12" rowSpan={2}>Qty</th>
                        <th className="border border-black p-1 w-20" rowSpan={2}>Unit cost</th>
                        <th className="border border-black p-1" colSpan={3}>Total</th>
                    </tr>
                    <tr className="text-xs font-bold text-center">
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y1} onChange={(val) => handleChange("h_y1", val)} placeholder="Year 1" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y2} onChange={(val) => handleChange("h_y2", val)} placeholder="Year 2" /></th>
                        <th className="border border-black p-1 w-20"><HeaderInput value={h_y3} onChange={(val) => handleChange("h_y3", val)} placeholder="Year 3" /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCounts.equip)].map((_, i) => renderEquipmentRow(i))}
                    <tr className="font-bold text-sm">
                        <td colSpan={6} className="border border-black p-1 text-center">Total</td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('equip', rowCounts.equip, ['y1']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('equip', rowCounts.equip, ['y2']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="border border-black p-1 text-center bg-gray-200">
                            {calculateSectionTotal('equip', rowCounts.equip, ['y3']).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                    </tr>
                </tbody>
             </table>
             <AddRowButton onClick={() => addRow('equip')} />
          </div>
          
          {/* GRAND TOTAL ROW */}
          <div className="flex border border-black font-extrabold text-black text-sm">
             <div className="flex-grow p-2 uppercase text-center">Grand Total (All Sections)</div>
             <div className="w-32 border-l border-black p-2 text-center bg-blue-50">
                {grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
             </div>
          </div>

          {/* Document Control Footer */}
          <div className="mt-8 w-full flex justify-center">
            <div className="border border-black flex text-xs font-bold" style={{ width: "fit-content" }}>
              <div className="flex border-r border-black">
                <div className="p-2 border-r border-black bg-gray-100">DOCUMENT NO.:</div>
                <div className="p-2">UEP-URDS-FM-005</div>
              </div>
              <div className="flex border-r border-black">
                <div className="p-2 border-r border-black bg-gray-100">REVISION NO.:</div>
                <div className="p-2">00</div>
              </div>
              <div className="flex">
                <div className="p-2 border-r border-black bg-gray-100">EFFECTIVITY:</div>
                <div className="p-2">SEPTEMBER 12, 2022</div>
              </div>
            </div>
          </div>

          {/* Signatories Section */}
          <div className="pt-12 grid grid-cols-2 gap-16 text-sm text-gray-900 px-8">
            <div className="space-y-12">
                <div>
                    <p className="font-bold mb-8">Prepared by:</p>
                    <SignatoryInput 
                      value={String(newStudy.leader || "EMMANUEL D. SANTOS")}
                      onChange={(val) => handleChange("leader", val)}
                      placeholder="NAME OF PROPONENT"
                      titleValue={String(newStudy.leader_title || "Proponent")}
                      onTitleChange={(val) => handleChange("leader_title", val)}
                      titlePlaceholder="Designation"
                    />
                </div>
            </div>
            
            <div className="space-y-12">
                 <div>
                    <p className="font-bold mb-8">Recommending Approval:</p>
                    <SignatoryInput 
                      value={String(newStudy.sig_recommending_1 || "ROGELIO A. BANAGBANAG, DALL")}
                      onChange={(val) => handleChange("sig_recommending_1", val)}
                      placeholder="NAME OF VP"
                      titleValue={String(newStudy.sig_recommending_1_title || "VP for RDE")}
                      onTitleChange={(val) => handleChange("sig_recommending_1_title", val)}
                      titlePlaceholder="Designation"
                    />
                </div>
                 <div>
                    <div className="mt-8">
                        <SignatoryInput 
                          value={String(newStudy.sig_recommending_2 || "KARINA MILAGROS C. LIM, PhD")}
                          onChange={(val) => handleChange("sig_recommending_2", val)}
                          placeholder="NAME OF DIRECTOR"
                          titleValue={String(newStudy.sig_recommending_2_title || "Director, URDS")}
                          onTitleChange={(val) => handleChange("sig_recommending_2_title", val)}
                          titlePlaceholder="Designation"
                        />
                    </div>
                </div>
                 <div>
                    <p className="font-bold mb-8">Reviewed:</p>
                    <SignatoryInput 
                      value={String(newStudy.sig_reviewed || "FERDINAND S. REYES, CPA")}
                      onChange={(val) => handleChange("sig_reviewed", val)}
                      placeholder="NAME OF BUDGET OFFICER"
                      titleValue={String(newStudy.sig_reviewed_title || "Budget Officer")}
                      onTitleChange={(val) => handleChange("sig_reviewed_title", val)}
                      titlePlaceholder="Designation"
                    />
                </div>
                 <div>
                    <p className="font-bold mb-8">Approved:</p>
                    <SignatoryInput 
                      value={String(newStudy.sig_approved || "CHERRY I. ULTRA, PhD")}
                      onChange={(val) => handleChange("sig_approved", val)}
                      placeholder="NAME OF PRESIDENT"
                      titleValue={String(newStudy.sig_approved_title || "President")}
                      onTitleChange={(val) => handleChange("sig_approved_title", val)}
                      titlePlaceholder="Designation"
                    />
                </div>
            </div>
          </div>

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
                
                {/* 🟢 NEW: College Dropdown in Global Header (accessible to all forms) */}
                <div className="mt-2">
                   <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm outline-none cursor-pointer bg-gray-50 hover:bg-white transition w-full max-w-xs"
                        value={String(newStudy.college || "")}
                        onChange={(e) => handleChange("college", e.target.value)}
                    >
                        <option value="" disabled className="text-gray-400">Select College...</option>
                        {COLLEGES.map((col, idx) => (
                            <option key={idx} value={col}>{col}</option>
                        ))}
                    </select>
                </div>
                
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
          
           {activeTab === 'Research Proposal' && renderProposalContent()}
           {activeTab === 'Work Plan Activities' && renderWorkPlanContent()}
           {activeTab === 'Budget Summary' && renderBudgetContent()}
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center">
          <button 
            onClick={onClose} 
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold transition"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onSaveDraft} 
              className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold transition"
            >
              Save as Draft
            </button>
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