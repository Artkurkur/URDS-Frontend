"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaFilePdf, FaPrint } from "react-icons/fa";

// --- TYPES ---
interface Study {
  chapter: number;
  title: string;
  leader: string;
  natureOfResearch?: string;
  personnel?: string;
  location?: string;
  duration?: string;
  budget?: string;
  rationale?: string;
  objectives?: string;
  literature?: string;
  methodology?: string;
  formType: 'Research Proposal' | 'Work Plan Activities' | 'Budget Summary';
  college?: string;
  // Allow dynamic keys for budget rows (travel_0_cost, etc.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// --- DOCUMENT FOOTER COMPONENT ---
const DocumentFooter = ({ 
  documentNo = "UEP-URDS-FM-005", 
  revisionNo = "00", 
  effectivityDate = "SEPTEMBER 12, 2022" 
}) => {
  return (
    <div className="w-full border border-black text-[9px] font-sans break-inside-avoid mt-8">
      <div className="grid grid-cols-3">
        {/* Document Number */}
        <div className="border-r border-black p-1">
          <div className="font-bold">DOCUMENT NO.:</div>
          <div className="text-center mt-0.5">{documentNo}</div>
        </div>
        
        {/* Revision Number */}
        <div className="border-r border-black p-1">
          <div className="font-bold">REVISION NO.:</div>
          <div className="text-center mt-0.5">{revisionNo}</div>
        </div>
        
        {/* Effectivity Date */}
        <div className="p-1">
          <div className="font-bold">EFFECTIVITY:</div>
          <div className="text-center mt-0.5">{effectivityDate}</div>
        </div>
      </div>
    </div>
  );
};

export default function ViewFilePage() {
  const router = useRouter();
  const [study, setStudy] = useState<Study | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('viewStudyData');
    if (storedData) {
      setStudy(JSON.parse(storedData));
    }
  }, []);

  // --- FUNCTION: BACK BUTTON ---
  const handleBack = () => {
    // Option 1: Standard Browser Back
    router.back();

    // Option 2: Force navigation to specific Dashboard (Use this if back doesn't work)
    // router.push('/URDS/Gerald/FRD-FILES'); 
  };

  // --- FUNCTION: PRINT (Browser Dialog) ---
  const handlePrint = () => {
    window.print();
  };

  // --- FUNCTION: DOWNLOAD PDF (Direct Save) ---
  const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-content');
    if (!element) return;

    // Dynamically import html2pdf to avoid server-side errors
    const html2pdf = (await import('html2pdf.js')).default;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const opt: any = {
      margin:       0.5,
      filename:     `${study?.title || 'document'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, 
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!study) return <div className="p-10 text-center font-sans">Loading document...</div>;

  // --- HELPERS ---
  const getVal = (key: string): number => {
    const val = study[key];
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return parseFloat(val.replace(/,/g, '')) || 0;
    return 0;
  };

  const getStr = (key: string): string => {
    const val = study[key];
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    return "";
  };

  const fmt = (num: number) => num > 0 ? num.toLocaleString('en-US', {minimumFractionDigits: 2}) : "";

  // 🟢 SMART ROW COUNTER: Scans data to find hidden rows
  const getRowCount = (prefix: string, defaultCount: number = 1) => {
      // 1. Check if we saved the count explicitly
      if (typeof study[`count_${prefix}`] === 'number') {
          return Array.from({ length: study[`count_${prefix}`] }, (_, i) => i);
      }

      // 2. Fallback: Scan the data keys to find the highest index used
      let maxIndex = -1;
      Object.keys(study).forEach(key => {
          if (key.startsWith(prefix)) {
              // Extract the number at the end of the key (e.g., travel_cost_2 -> 2)
              const parts = key.split('_');
              const lastPart = parts[parts.length - 1];
              const index = parseInt(lastPart, 10);
              if (!isNaN(index) && index > maxIndex) {
                  maxIndex = index;
              }
          }
      });

      // Calculate total rows needed (index + 1), but respect default minimums
      const calculatedCount = maxIndex >= 0 ? maxIndex + 1 : 1;
      const finalCount = Math.max(calculatedCount, defaultCount);

      return Array.from({ length: finalCount }, (_, i) => i);
  };

  // --- REUSABLE COMPONENTS ---

  const DocumentHeader = () => (
    <div className="text-center mb-6">
      <div className="flex items-start justify-center gap-4 mb-2 relative">
        <div className="absolute left-0 top-0">
             <Image src="/images/logo/UEPlogo.png" alt="UEP Logo" width={60} height={60} className="object-contain" />
        </div>
        <div className="leading-tight pt-2">
          <p className="text-[10px] font-sans">Republic of the Philippines</p>
          <h1 className="font-bold text-[14px] font-sans tracking-wide">UNIVERSITY OF EASTERN PHILIPPINES</h1>
          <p className="text-[10px] font-sans">University Town, Northern Samar, Philippines</p>
          <p className="text-blue-700 underline text-[10px] font-sans">Web: http://uep.edu.ph; Email: uepnsofficial@gmail.com</p>
        </div>
      </div>
      <div className="mt-4 border-t-2 border-black"></div>
      <div className="border-t border-black mt-[2px]"></div>
      <h2 className="font-bold text-[12px] font-sans uppercase mt-2">UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES</h2>
    </div>
  );

  // --- FORM 1: PROPOSAL ---
  const renderProposal = () => (
    <>
      <h3 className="font-bold text-center uppercase mb-6 text-[14px]">CAPSULE RESEARCH PROPOSAL TEMPLATE</h3>
      <div className="border border-black text-[11px] font-sans">
        <div className="font-bold p-1 border-b border-black bg-gray-100">Detailed Research Proposal</div>
        <div className="font-bold p-1 border-b border-black bg-gray-100">I. &nbsp;&nbsp; Basic Information</div>
        <table className="w-full border-collapse">
            <tbody>
                <tr><td className="border-r border-b border-black p-1 w-[25%] font-bold">College/Unit/Campus</td><td className="border-b border-black p-1">{study.college}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Title</td><td className="border-b border-black p-1 font-bold">&quot;{study.title}&quot;</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Nature of Research</td><td className="border-b border-black p-1">{study.natureOfResearch}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Leader/ Main Proponent</td><td className="border-b border-black p-1">{study.leader}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Other Personnel</td><td className="border-b border-black p-1">{study.personnel || "None"}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Project Location/s</td><td className="border-b border-black p-1">{study.location}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Duration</td><td className="border-b border-black p-1">{study.duration}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold">Budget for the Year</td><td className="border-b border-black p-1 font-bold">{study.budget}</td></tr>
            </tbody>
        </table>
        <div className="font-bold p-1 border-b border-black bg-gray-100">II. &nbsp;&nbsp; Technical Information</div>
        <table className="w-full border-collapse">
            <tbody>
                <tr><td className="border-r border-b border-black p-1 w-[25%] font-bold align-top">Rationale</td><td className="border-b border-black p-1 whitespace-pre-wrap">{study.rationale}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold align-top">Objectives</td><td className="border-b border-black p-1 whitespace-pre-wrap">{study.objectives}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold align-top">III. Review of Literature</td><td className="border-b border-black p-1 whitespace-pre-wrap">{study.literature}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold align-top">IV. Methodology</td><td className="border-b border-black p-1 whitespace-pre-wrap">{study.methodology}</td></tr>
                <tr><td className="border-r border-b border-black p-1 font-bold align-top">V. Work plan</td><td className="border-b border-black p-1">See attached Work Plan</td></tr>
                <tr><td className="border-r border-black p-1 font-bold align-top">VI. Budgetary Req.</td><td className="border-black p-1">See attached Budget Summary</td></tr>
            </tbody>
        </table>
      </div>
      <div className="mt-8 text-[11px] grid grid-cols-2 gap-8 break-inside-avoid">
         <div>
            <p className="font-bold mb-6">Prepared by:</p>
            <p className="font-bold uppercase underline">{study.leader}</p>
            <p>Proponent</p>
         </div>
         <div>
            <p className="font-bold mb-6">Approved by:</p>
            <p className="font-bold uppercase underline">CHERRY I. ULTRA, PhD</p>
            <p>President</p>
         </div>
      </div>
    </>
  );

  // --- FORM 2: WORK PLAN ---
  const renderWorkPlan = () => (
    <>
      <h3 className="font-bold text-center uppercase mb-6 text-[14px]">WORKPLAN</h3>
      <table className="w-full border border-black text-[11px] font-sans border-collapse mb-4">
          <tbody>
              <tr><td className="border border-black p-1 w-[20%] font-bold">Project Title:</td><td className="border border-black p-1">{study.title}</td></tr>
              <tr><td className="border border-black p-1 font-bold">Leader:</td><td className="border border-black p-1">{study.leader}</td></tr>
              <tr><td className="border border-black p-1 font-bold">College:</td><td className="border border-black p-1">{study.college}</td></tr>
          </tbody>
      </table>
      <table className="w-full border-collapse border border-black text-[11px] font-sans">
          <thead>
             <tr>
                 <td rowSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 w-1/2">Activities</td>
                 <td colSpan={4} className="border border-black p-1 text-center font-bold bg-gray-100">YEAR 1</td>
             </tr>
             <tr>
                 <td className="border border-black p-1 text-center font-bold w-[12.5%]">Q1</td>
                 <td className="border border-black p-1 text-center font-bold w-[12.5%]">Q2</td>
                 <td className="border border-black p-1 text-center font-bold w-[12.5%]">Q3</td>
                 <td className="border border-black p-1 text-center font-bold w-[12.5%]">Q4</td>
             </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((id) => (
                <tr key={id}>
                    <td className="border border-black p-1 align-middle">Activity {id}</td>
                    {['q1', 'q2', 'q3', 'q4'].map((q) => (
                      <td key={q} className="border border-black p-0 relative h-6">
                          {study[`act_${id}_${q}`] ? <div className="w-full h-full bg-[#00B0F0] print:bg-[#00B0F0] print-color-adjust"></div> : null}
                      </td>
                    ))}
                </tr>
            ))}
          </tbody>
      </table>
    </>
  );

  // --- FORM 3: BUDGET SUMMARY ---
  const renderBudget = () => {
    // --- CALCULATION HELPERS ---
    const calcSectionTotal = (prefix: string, rows: number[]) => {
       let total = 0;
       rows.forEach(i => {
          total += (getVal(`${prefix}_y1_${i}`) + getVal(`${prefix}_y2_${i}`) + getVal(`${prefix}_y3_${i}`));
       });
       return total;
    };

    // 🟢 FIXED: Use Smart Row Counter
    const psRows = getRowCount('ps', 2); 
    const travelRows = getRowCount('travel');
    const supplyRows = getRowCount('supplies');
    const commRows = getRowCount('comms');
    const otherRows = getRowCount('other');
    const equipRows = getRowCount('equip');

    const totalPS = calcSectionTotal('ps', psRows);
    const totalTravel = calcSectionTotal('travel', travelRows);
    const totalSupplies = calcSectionTotal('supplies', supplyRows);
    const totalComms = calcSectionTotal('comms', commRows);
    const totalOther = calcSectionTotal('other', otherRows);
    const totalEquip = calcSectionTotal('equip', equipRows);

    const grandTotal = totalPS + totalTravel + totalSupplies + totalComms + totalOther + totalEquip;

    const renderTotalHeader = () => (
       <td className="border border-black p-1 w-[20%] text-center p-0">
          <div className="border-b border-black p-1">Total</div>
          <div className="grid grid-cols-3">
             <div className="border-r border-black p-1 text-[9px]">Year 1</div>
             <div className="border-r border-black p-1 text-[9px]">Year 2</div>
             <div className="p-1 text-[9px]">Year 3</div>
          </div>
       </td>
    );

    return (
       <div className="text-[10px] font-sans">
           <div className="text-center font-bold mb-4">
              <p>FINANCIAL COMPONENT OF THE RESEARCH</p>
              <p>(Budget Summary)</p>
           </div>

           <table className="w-full border border-black mb-4 border-collapse">
             <tbody>
               <tr><td className="border border-black p-1 font-bold w-[20%]">Project Title:</td><td className="border border-black p-1">{study.title}</td></tr>
               <tr><td className="border border-black p-1 font-bold">Leader:</td><td className="border border-black p-1">{study.leader}</td></tr>
               <tr><td className="border border-black p-1 font-bold">Duration:</td><td className="border border-black p-1">{study.duration}</td></tr>
               <tr><td className="border border-black p-1 font-bold">College:</td><td className="border border-black p-1">{study.college}</td></tr>
             </tbody>
           </table>

           {/* 1. PERSONAL SERVICES */}
           <div className="mb-4">
               <div className="font-bold border border-black border-b-0 p-1 bg-gray-100">I. PERSONAL SERVICES</div>
               <table className="w-full border-collapse border border-black text-center">
                  <thead>
                     <tr className="font-bold bg-gray-50">
                        <td className="border border-black p-1 w-[40%]">Item Description</td>
                        <td className="border border-black p-1">Qty</td>
                        <td className="border border-black p-1">Rate</td>
                        {renderTotalHeader()}
                     </tr>
                  </thead>
                  <tbody>
                     {psRows.map(i => (
                         <tr key={i}>
                             <td className="border border-black p-1 text-left">{getStr(`ps_item_${i}`) || (i===0 ? "A. Wages" : "B. Honorarium")}</td>
                             <td className="border border-black p-1">{getStr(`ps_qty_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`ps_rate_${i}`)}</td>
                             <td className="border border-black p-0">
                                <div className="grid grid-cols-3 h-full">
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`ps_y1_${i}`))}</div>
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`ps_y2_${i}`))}</div>
                                    <div className="p-1 text-right">{fmt(getVal(`ps_y3_${i}`))}</div>
                                </div>
                             </td>
                         </tr>
                     ))}
                     <tr className="font-bold bg-gray-100">
                        <td colSpan={3} className="border border-black p-1 text-right pr-4">Sub-Total</td>
                        <td className="border border-black p-1 text-right">{fmt(totalPS)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>

           {/* 2. TRAVEL */}
           <div className="mb-4">
               <div className="font-bold border border-black border-b-0 p-1 bg-gray-100">II. MOOE - TRAVEL</div>
               <table className="w-full border-collapse border border-black text-center">
                  <thead>
                     <tr className="font-bold bg-gray-50">
                        <td className="border border-black p-1">Date</td>
                        <td className="border border-black p-1">Place</td>
                        <td className="border border-black p-1">Purpose</td>
                        <td className="border border-black p-1">Mode</td>
                        <td className="border border-black p-1">Est. Cost</td>
                        {renderTotalHeader()}
                     </tr>
                  </thead>
                  <tbody>
                     {travelRows.map(i => (
                         <tr key={i}>
                             <td className="border border-black p-1">{getStr(`travel_date_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`travel_place_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`travel_purpose_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`travel_mode_${i}`)}</td>
                             <td className="border border-black p-1">{fmt(getVal(`travel_cost_${i}`))}</td>
                             <td className="border border-black p-0">
                                <div className="grid grid-cols-3 h-full">
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`travel_y1_${i}`))}</div>
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`travel_y2_${i}`))}</div>
                                    <div className="p-1 text-right">{fmt(getVal(`travel_y3_${i}`))}</div>
                                </div>
                             </td>
                         </tr>
                     ))}
                     <tr className="font-bold bg-gray-100">
                        <td colSpan={5} className="border border-black p-1 text-right pr-4">Sub-Total</td>
                        <td className="border border-black p-1 text-right">{fmt(totalTravel)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>

           {/* 3. SUPPLIES */}
           <div className="mb-4">
               <div className="font-bold border border-black border-b-0 p-1 bg-gray-100">II. MOOE - Supplies</div>
               <table className="w-full border-collapse border border-black text-center">
                  <thead>
                     <tr className="font-bold bg-gray-50">
                        <td className="border border-black p-1">Date</td>
                        <td className="border border-black p-1">Unit</td>
                        <td className="border border-black p-1">Description</td>
                        <td className="border border-black p-1">Purpose</td>
                        <td className="border border-black p-1">Qty</td>
                        <td className="border border-black p-1">Cost</td>
                        {renderTotalHeader()}
                     </tr>
                  </thead>
                  <tbody>
                     {supplyRows.map(i => (
                         <tr key={i}>
                             <td className="border border-black p-1">{getStr(`supplies_date_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`supplies_unit_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`supplies_desc_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`supplies_purpose_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`supplies_qty_${i}`)}</td>
                             <td className="border border-black p-1">{fmt(getVal(`supplies_unitcost_${i}`))}</td>
                             <td className="border border-black p-0">
                                <div className="grid grid-cols-3 h-full">
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`supplies_y1_${i}`))}</div>
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`supplies_y2_${i}`))}</div>
                                    <div className="p-1 text-right">{fmt(getVal(`supplies_y3_${i}`))}</div>
                                </div>
                             </td>
                         </tr>
                     ))}
                     <tr className="font-bold bg-gray-100">
                        <td colSpan={6} className="border border-black p-1 text-right pr-4">Sub-Total</td>
                        <td className="border border-black p-1 text-right">{fmt(totalSupplies)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>

           {/* 4. COMMUNICATIONS */}
           <div className="mb-4">
               <div className="font-bold border border-black border-b-0 p-1 bg-gray-100">II. MOOE - Communications</div>
               <table className="w-full border-collapse border border-black text-center">
                  <thead>
                     <tr className="font-bold bg-gray-50">
                        <td className="border border-black p-1">Date</td>
                        <td className="border border-black p-1">Unit</td>
                        <td className="border border-black p-1">Description</td>
                        <td className="border border-black p-1">Purpose</td>
                        <td className="border border-black p-1">Qty</td>
                        <td className="border border-black p-1">Cost</td>
                        {renderTotalHeader()}
                     </tr>
                  </thead>
                  <tbody>
                     {commRows.map(i => (
                         <tr key={i}>
                             <td className="border border-black p-1">{getStr(`comms_date_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`comms_unit_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`comms_desc_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`comms_purpose_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`comms_qty_${i}`)}</td>
                             <td className="border border-black p-1">{fmt(getVal(`comms_unitcost_${i}`))}</td>
                             <td className="border border-black p-0">
                                <div className="grid grid-cols-3 h-full">
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`comms_y1_${i}`))}</div>
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`comms_y2_${i}`))}</div>
                                    <div className="p-1 text-right">{fmt(getVal(`comms_y3_${i}`))}</div>
                                </div>
                             </td>
                         </tr>
                     ))}
                     <tr className="font-bold bg-gray-100">
                        <td colSpan={6} className="border border-black p-1 text-right pr-4">Sub-Total</td>
                        <td className="border border-black p-1 text-right">{fmt(totalComms)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>

           {/* 5. OTHER MOOE */}
           <div className="mb-4">
               <div className="font-bold border border-black border-b-0 p-1 bg-gray-100">II. Other MOOE (Contract Labor)</div>
               <table className="w-full border-collapse border border-black text-center">
                  <thead>
                     <tr className="font-bold bg-gray-50">
                        <td className="border border-black p-1">Date</td>
                        <td className="border border-black p-1">Place</td>
                        <td className="border border-black p-1">Purpose</td>
                        <td className="border border-black p-1">Mode</td>
                        <td className="border border-black p-1">Cost</td>
                        {renderTotalHeader()}
                     </tr>
                  </thead>
                  <tbody>
                     {otherRows.map(i => (
                         <tr key={i}>
                             <td className="border border-black p-1">{getStr(`other_date_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`other_place_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`other_purpose_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`other_mode_${i}`)}</td>
                             <td className="border border-black p-1">{fmt(getVal(`other_cost_${i}`))}</td>
                             <td className="border border-black p-0">
                                <div className="grid grid-cols-3 h-full">
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`other_y1_${i}`))}</div>
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`other_y2_${i}`))}</div>
                                    <div className="p-1 text-right">{fmt(getVal(`other_y3_${i}`))}</div>
                                </div>
                             </td>
                         </tr>
                     ))}
                     <tr className="font-bold bg-gray-100">
                        <td colSpan={5} className="border border-black p-1 text-right pr-4">Sub-Total</td>
                        <td className="border border-black p-1 text-right">{fmt(totalOther)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>

           {/* 6. EQUIPMENT */}
           <div className="mb-4">
               <div className="font-bold border border-black border-b-0 p-1 bg-gray-100">III. Equipment Outlay</div>
               <table className="w-full border-collapse border border-black text-center">
                  <thead>
                     <tr className="font-bold bg-gray-50">
                        <td className="border border-black p-1">Date</td>
                        <td className="border border-black p-1">Unit</td>
                        <td className="border border-black p-1">Description</td>
                        <td className="border border-black p-1">Purpose</td>
                        <td className="border border-black p-1">Qty</td>
                        <td className="border border-black p-1">Cost</td>
                        {renderTotalHeader()}
                     </tr>
                  </thead>
                  <tbody>
                     {equipRows.map(i => (
                         <tr key={i}>
                             <td className="border border-black p-1">{getStr(`equip_date_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`equip_unit_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`equip_desc_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`equip_purpose_${i}`)}</td>
                             <td className="border border-black p-1">{getStr(`equip_qty_${i}`)}</td>
                             <td className="border border-black p-1">{fmt(getVal(`equip_unitcost_${i}`))}</td>
                             <td className="border border-black p-0">
                                <div className="grid grid-cols-3 h-full">
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`equip_y1_${i}`))}</div>
                                    <div className="border-r border-black p-1 text-right">{fmt(getVal(`equip_y2_${i}`))}</div>
                                    <div className="p-1 text-right">{fmt(getVal(`equip_y3_${i}`))}</div>
                                </div>
                             </td>
                         </tr>
                     ))}
                     <tr className="font-bold bg-gray-100">
                        <td colSpan={6} className="border border-black p-1 text-right pr-4">Sub-Total</td>
                        <td className="border border-black p-1 text-right">{fmt(totalEquip)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>

           {/* GRAND TOTAL */}
           <div className="flex border border-black bg-blue-100 font-extrabold mb-8">
               <div className="flex-grow p-2 text-center uppercase">GRAND TOTAL</div>
               <div className="w-[20%] border-l border-black p-2 text-right">{fmt(grandTotal)}</div>
           </div>

           {/* SIGNATORIES (Budget) */}
           <div className="grid grid-cols-2 gap-16 break-inside-avoid">
             <div>
                <p className="font-bold mb-6">Prepared by:</p>
                <p className="font-bold uppercase underline">{study.leader}</p>
                <p>Proponent</p>
             </div>
             <div>
                <p className="font-bold mb-6">Approved by:</p>
                <p className="font-bold uppercase underline">{study.sig_approved || "CHERRY I. ULTRA, PhD"}</p>
                <p>President</p>
             </div>
           </div>

       </div>
    );
  };

  // Determine footer props
  const footerProps = {
    'Research Proposal': { documentNo: "UEP-URDS-FM-003" },
    'Work Plan Activities': { documentNo: "UEP-URDS-FM-004" },
    'Budget Summary': { documentNo: "UEP-URDS-FM-005" }
  }[study.formType] || { documentNo: "UEP-URDS-FM-005" };

  return (
    <div className="min-h-screen bg-gray-500 py-8 flex justify-center overflow-auto print:bg-white print:p-0 print:overflow-visible">
      
      {/* FLOATING CONTROLS */}
      <div className="fixed top-5 left-5 z-50 print:hidden flex gap-3">
        {/* 🟢 BACK BUTTON with Logic */}
        <button onClick={handleBack} className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition border border-gray-300">
          <FaArrowLeft /> Back
        </button>
      </div>
      
      <div className="fixed top-5 right-5 z-50 print:hidden flex gap-3">
        <button onClick={handleDownloadPdf} className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-green-700 transition">
          <FaFilePdf className="mr-2" /> Download PDF
        </button>
        <button onClick={handlePrint} className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <FaPrint className="mr-2" /> Print
        </button>
      </div>

      {/* A4 PAPER */}
      <div id="printable-content" className="bg-white w-[210mm] min-h-[297mm] p-[25.4mm] shadow-2xl mx-auto text-black relative print:shadow-none print:w-full print:p-0 print:m-0 flex flex-col justify-between">
        
        <div className="flex-grow">
            <DocumentHeader />
            <main>
            {study.formType === 'Research Proposal' && renderProposal()}
            {study.formType === 'Work Plan Activities' && renderWorkPlan()}
            {study.formType === 'Budget Summary' && renderBudget()}
            </main>
        </div>

        <DocumentFooter 
            documentNo={footerProps.documentNo} 
            revisionNo="00" 
            effectivityDate="SEPTEMBER 12, 2022" 
        />

      </div>
      
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 25.4mm;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}