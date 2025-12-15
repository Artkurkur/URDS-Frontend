"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaPrint } from "react-icons/fa";

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
  [key: string]: string | number | boolean | undefined | null | object;
}

export default function ViewFilePage() {
  const router = useRouter();
  const [study, setStudy] = useState<Study | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('viewStudyData');
    if (storedData) {
      setStudy(JSON.parse(storedData));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!study) return <div className="p-10 text-center font-sans">Loading document...</div>;

  // --- REUSABLE COMPONENTS ---

  const DocumentHeader = () => (
    <div className="text-center mb-4">
      <div className="flex items-start justify-center gap-4 mb-2 relative">
        <div className="absolute left-10 top-0">
             <Image src="/images/logo/UEPlogo.png" alt="UEP Logo" width={80} height={80} className="object-contain" />
        </div>
        <div className="leading-tight pt-2">
          <p className="text-[12px] font-sans">Republic of the Philippines</p>
          <h1 className="font-bold text-[16px] font-sans tracking-wide">UNIVERSITY OF EASTERN PHILIPPINES</h1>
          <p className="text-[12px] font-sans">University Town, Northern Samar, Philippines</p>
          <p className="text-blue-700 underline text-[12px] font-sans">Web: http://uep.edu.ph; Email: uepnsofficial@gmail.com</p>
        </div>
      </div>
      <div className="mt-6 border-t-4 border-double border-black pt-2 mx-10"></div>
      <h2 className="font-bold text-[14px] font-sans uppercase mt-2">UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES</h2>
    </div>
  );

  const DocumentFooterControl = ({ docNo = "UEP-URDS-FM-003", revNo = "00" }) => (
    <div className="mt-auto border border-black text-[10px] font-sans flex text-center">
      <div className="border-r border-black p-1 w-1/4">
        <strong>DOCUMENT NO.:</strong><br/>{docNo}
      </div>
      <div className="border-r border-black p-1 w-1/4">
        <strong>REVISION NO.:</strong><br/>{revNo}
      </div>
      <div className="p-1 w-1/2">
        <strong>EFFECTIVITY</strong><br/>SEPTEMBER 12, 2022
      </div>
    </div>
  );

  // --- HELPER FUNCTION ---
  const getJobDescription = (id: number): string => {
    const desc: string[] = [
      "Conduct consultation with the client (Head of instruction...)",
      "Presentation and approval of the research study",
      "Assess the effectiveness of the existing workload computation template",
      "Procurement of equipment and materials",
      "Follow up Interviews and focus group discussions...",
      "Conduct preliminary Investigation and detailed data gathering",
      "Analyze and assess the scope and requirements...",
      "Conduct the System Development Life Cycle",
      "Conduct Training to the head of instruction...",
      "Conduct an assessment on the acceptability...",
      "Write terminal report, present completed extension project..."
    ];
    return desc[id - 1] || `Activity ${id}`;
  };

  // --- SPECIFIC RENDERERS ---

  const renderProposal = () => (
    <>
      <h3 className="font-bold text-center uppercase mb-4 text-[14px]">CAPSULE RESEARCH PROPOSAL TEMPLATE</h3>
      
      <div className="border border-black text-[11px] font-sans">
        <div className="font-bold p-1 border-b border-black bg-white">Detailed Research Proposal</div>
        <div className="font-bold p-1 border-b border-black bg-white">I. &nbsp;&nbsp; Basic Information</div>
        
        <table className="w-full border-collapse">
            <tbody>
                <tr>
                    <td className="border-r border-b border-black p-1 w-[25%] align-top">Title</td>
                    <td className="border-b border-black p-1 font-bold">&quot;{study.title}&quot;</td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Nature of Research<br/>(Please check one)</td>
                    <td className="border-b border-black p-1">
                        ___ Program ___ Project <span className="font-bold underline">x</span> Study
                    </td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Leader/ Main Proponent</td>
                    <td className="border-b border-black p-1">{study.leader}</td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Other Personnel Involved</td>
                    <td className="border-b border-black p-1">{study.personnel || "None"}</td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Project Location/s</td>
                    <td className="border-b border-black p-1">{study.location || "UEP Main Campus"}</td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Duration</td>
                    <td className="border-b border-black p-1">{study.duration || "1 Year"}</td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Budget for the Year</td>
                    <td className="border-b border-black p-1 font-bold">{study.budget || "16,000.00"}</td>
                </tr>
            </tbody>
        </table>

        <div className="font-bold p-1 border-b border-black bg-white">II. &nbsp;&nbsp; Technical Information</div>

        <table className="w-full border-collapse">
            <tbody>
                <tr>
                    <td className="border-r border-b border-black p-1 w-[25%] align-top">Rationale/Significance of Research</td>
                    <td className="border-b border-black p-1 text-justify whitespace-pre-wrap">
                        {study.rationale || "No rationale provided."}
                    </td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top">Objectives</td>
                    <td className="border-b border-black p-1 text-justify whitespace-pre-wrap">
                        {study.objectives || "No objectives provided."}
                    </td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top font-bold">III. &nbsp; Review of Literature</td>
                    <td className="border-b border-black p-1 text-justify whitespace-pre-wrap">
                        {study.literature || "No literature review provided."}
                    </td>
                </tr>
                <tr>
                    <td className="border-r border-b border-black p-1 align-top font-bold">IV. &nbsp; Detailed Methodology (including questionnaires for social science research)</td>
                    <td className="border-b border-black p-1 text-justify whitespace-pre-wrap">
                        {study.methodology || "No methodology provided."}
                    </td>
                </tr>
                 <tr>
                    <td className="border-r border-b border-black p-1 align-top font-bold">V. &nbsp; Work plan</td>
                    <td className="border-b border-black p-1">See another file attached</td>
                </tr>
                 <tr>
                    <td className="border-r border-black p-1 align-top font-bold">VI. &nbsp; Detailed Budgetary Requirement</td>
                    <td className="border-black p-1">See another file attached</td>
                </tr>
            </tbody>
        </table>
      </div>

      <div className="mt-4 text-[11px] font-sans">
         <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <p className="font-bold mb-6">Prepared by:</p>
                <p className="font-bold underline uppercase">{study.leader}</p>
                <p>Proponent</p>
            </div>
            <div>
                 <p className="font-bold mb-6">Endorsed by:</p>
                 <div className="flex gap-4">
                     <div>
                         <p className="font-bold underline uppercase">FRANKLIN E. CORTEZ</p>
                         <p>College Research Coordinator</p>
                     </div>
                     <div>
                         <p className="font-bold underline uppercase">ANELITA M. OBRAR, PhD</p>
                         <p>College Dean</p>
                     </div>
                 </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-8 mt-8">
             <div>
                 <p className="font-bold mb-6">Recommending Approval:</p>
                 <p className="font-bold underline uppercase mb-0">ROGELIO A. BANAGBANAG, DALL</p>
                 <p>Director, URDS</p>
             </div>
             <div>
                 <p className="font-bold mb-6">&nbsp;</p>
                 <p className="font-bold underline uppercase">KARINA MILAGROS C. LIM, PhD</p>
                 <p>VP for RDE</p>
             </div>
         </div>

         <div className="grid grid-cols-2 gap-8 mt-8">
             <div>{/* Empty Left */}</div>
             <div>
                 <p className="font-bold mb-6">Approved:</p>
                 <p className="font-bold underline uppercase">CHERRY I. ULTRA, PhD</p>
                 <p>President</p>
             </div>
         </div>
      </div>
      
      <div className="mt-8">
         <DocumentFooterControl docNo="UEP-URDS-FM-003" />
      </div>
    </>
  );

  const renderWorkPlan = () => (
    <>
      <h3 className="font-bold text-center uppercase mb-4 text-[14px]">WORKPLAN</h3>
      
      <table className="w-full border border-black text-[11px] font-sans border-collapse mb-4">
          <tbody>
              <tr>
                  <td className="border border-black p-1 w-[20%]">Program/Project/Study Title:</td>
                  <td className="border border-black p-1 font-bold">&quot;{study.title}&quot;</td>
              </tr>
              <tr>
                  <td className="border border-black p-1">Program/Project Study Leader:</td>
                  <td className="border border-black p-1">{study.leader}</td>
              </tr>
               <tr>
                  <td className="border border-black p-1">College/Unit/Campus:</td>
                  <td className="border border-black p-1">{study.college || "College of Science"}</td>
              </tr>
          </tbody>
      </table>

      <table className="w-full border-collapse border border-black text-[11px] font-sans">
          <thead>
             <tr>
                 <td rowSpan={2} className="border border-black p-1 text-center font-bold bg-white w-1/2">Activities</td>
                 <td colSpan={4} className="border border-black p-1 text-center font-bold bg-white">YEAR 1</td>
             </tr>
             <tr>
                 <td className="border border-black p-1 text-center w-[12.5%] font-bold">Q1</td>
                 <td className="border border-black p-1 text-center w-[12.5%] font-bold">Q2</td>
                 <td className="border border-black p-1 text-center w-[12.5%] font-bold">Q3</td>
                 <td className="border border-black p-1 text-center w-[12.5%] font-bold">Q4</td>
             </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((id) => (
                <tr key={id}>
                    <td className="border border-black p-1 align-middle">
                        {id}. {getJobDescription(id)}
                    </td>
                    {['q1', 'q2', 'q3', 'q4'].map((q) => {
                        const key = `act_${id}_${q}`;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const isActive = Boolean((study as any)[key]);
                        
                        return (
                          <td key={q} className="border border-black p-0 relative h-8">
                              {isActive ? (
                                  <div className="w-full h-full bg-[#00B0F0] print:bg-[#00B0F0] print-color-adjust"></div>
                              ) : null}
                          </td>
                        );
                    })}
                </tr>
            ))}
          </tbody>
      </table>

      <div className="mt-auto pt-10">
          <DocumentFooterControl docNo="UEP-URDS-FM-004" />
      </div>
    </>
  );

  const renderBudget = () => {
    // Helper to safely parse numbers with explicit return type
    const getVal = (key: string): number => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = (study as any)[key];
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return parseFloat(val) || 0;
        return 0;
    };

    // Helper to format number for display
    const formatCurrency = (value: number): string => {
        if (value > 0) {
            return value.toLocaleString('en-PH', { minimumFractionDigits: 2 });
        }
        return '';
    };
    
    const BudgetHeader = () => (
        <div className="text-center font-sans font-bold text-[12px] mb-4">
            <p>FINANCIAL COMPONENT OF THE RESEARCH</p>
            <p>(Budgetary Details of the Research)</p>
        </div>
    );

    const InfoBlock = () => (
        <div className="text-[11px] font-sans mb-4">
            <p>Program/Project/Study Title: <strong>{study.title}</strong></p>
            <p>Proponents: {study.leader}</p>
            <p>Duration: {study.duration || "1 Year"}</p>
        </div>
    );

    const BudgetRow = ({ label, k }: { label: string; k: string }) => {
        const v1: number = getVal(`${k}_y1`);
        const v2: number = getVal(`${k}_y2`);
        const v1Display: string = v1 > 0 ? formatCurrency(v1) : 'None';
        const v2Display: string = v2 > 0 ? formatCurrency(v2) : '';
        
        return (
            <tr>
                <td className="border border-black p-1">{label}</td>
                <td className="border border-black p-1 text-center">None</td>
                <td className="border border-black p-1 text-center">None</td>
                <td className="border border-black p-1 text-center">None</td>
                <td className="border border-black p-1 text-center">None</td>
                <td className="border border-black p-1 text-right">{v1Display}</td>
                <td className="border border-black p-1 text-right">{v2Display}</td>
                <td className="border border-black p-1 text-right"></td>
            </tr>
        );
    };

    return (
        <>
           <BudgetHeader />
           <InfoBlock />

           <div className="text-[11px] font-sans">
               <p className="font-bold mb-1">I. PERSONAL SERVICES</p>
               <table className="w-full border-collapse border border-black mb-4">
                   <thead>
                       <tr className="text-center font-bold">
                           <td className="border border-black p-1 w-[30%]">Item</td>
                           <td colSpan={4} className="border border-black p-1">YEAR</td>
                           <td colSpan={3} className="border border-black p-1">Total</td>
                       </tr>
                       <tr className="text-center font-bold text-[10px]">
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1 w-[10%]">Q1</td>
                           <td className="border border-black p-1 w-[10%]">Q2</td>
                           <td className="border border-black p-1 w-[10%]">Q3</td>
                           <td className="border border-black p-1 w-[10%]">Q4</td>
                           <td className="border border-black p-1 w-[10%]">Year 1</td>
                           <td className="border border-black p-1 w-[10%]">Year 2</td>
                           <td className="border border-black p-1 w-[10%]">Year 3</td>
                       </tr>
                   </thead>
                   <tbody>
                       <BudgetRow label="A. Wages" k="wages" />
                       <tr>
                           <td className="border border-black p-1">B. Honorarium</td>
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1 text-right font-bold">5,000.00</td>
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1"></td>
                       </tr>
                       <tr className="font-bold">
                           <td className="border border-black p-1 text-center">Total</td>
                           <td colSpan={4} className="border border-black p-1 bg-gray-200"></td>
                           <td className="border border-black p-1 text-right">5,000.00</td>
                           <td className="border border-black p-1"></td>
                           <td className="border border-black p-1"></td>
                       </tr>
                   </tbody>
               </table>
               
               <p className="font-bold mb-1">II. MOOE - Supplies and Materials</p>
               <table className="w-full border-collapse border border-black mb-4">
                   <thead>
                       <tr className="text-center font-bold">
                           <td className="border border-black p-1">Date<br/>(Quarter/Month/Year)</td>
                           <td className="border border-black p-1">Unit</td>
                           <td className="border border-black p-1 w-[40%]">Item Description</td>
                           <td className="border border-black p-1">Purpose</td>
                           <td className="border border-black p-1">Qty</td>
                           <td className="border border-black p-1">Total</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td className="border border-black p-1 align-top">4th Quarter</td>
                           <td className="border border-black p-1 align-top">
                               Ream<br/>Set<br/>box
                           </td>
                           <td className="border border-black p-1 align-top">
                               Bond paper (A4, 70 gsm)<br/>Ink (B,C,M,Y)<br/>Marker
                           </td>
                           <td className="border border-black p-1 align-top">Training</td>
                           <td className="border border-black p-1 align-top text-center">
                               5<br/>1<br/>1
                           </td>
                           <td className="border border-black p-1 align-top text-right">
                               1,500.00<br/>2,000.00<br/>400.00
                           </td>
                       </tr>
                       <tr className="font-bold">
                           <td colSpan={5} className="border border-black p-1 text-center">Total</td>
                           <td className="border border-black p-1 text-right">10,000.00</td>
                       </tr>
                   </tbody>
               </table>
           </div>

           <div className="mt-auto pt-4">
              <DocumentFooterControl docNo="UEP-URDS-FM-005" />
           </div>
        </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-500 py-8 flex justify-center overflow-auto print:bg-white print:p-0 print:overflow-visible">
      
      {/* FLOATING CONTROLS */}
      <div className="fixed top-5 left-5 z-50 print:hidden flex gap-3">
        <button onClick={() => router.back()} className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition border border-gray-300">
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="fixed top-5 right-5 z-50 print:hidden">
        <button onClick={handlePrint} className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <FaPrint /> Print / Save PDF
        </button>
      </div>

      {/* A4 PAPER - EXACT SIZE */}
      <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] shadow-2xl mx-auto text-black relative flex flex-col print:shadow-none print:w-full print:p-0 print:m-0">
        
        <DocumentHeader />

        <main className="flex-grow">
          {study.formType === 'Research Proposal' && renderProposal()}
          {study.formType === 'Work Plan Activities' && renderWorkPlan()}
          {study.formType === 'Budget Summary' && renderBudget()}
        </main>

      </div>
      
      <style jsx global>{`
        @media print {
          .print-color-adjust {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
} 