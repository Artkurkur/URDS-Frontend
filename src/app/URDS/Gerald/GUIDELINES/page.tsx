'use client';

import React from 'react';
import { X, ChevronLeft, Download, Mail, Building2, Paperclip } from 'lucide-react';

export default function ResearchProposalModal() {
  const handleDownloadPDF = () => {
    // Create PDF content
    const content = `
Research Proposal Submission Guidelines (A.Y. 2024-2025)

The University Research and Development Services (URDS) is now accepting Research Proposals for the Academic Year 2024-2025. Please review the guidelines and submit your proposal before the deadline.

ELIGIBILITY:
Open to all full-time faculty members of the University. Collaborative research between departments or colleges is encouraged. Researchers must have no pending or incomplete research projects from previous calls.

REQUIRED SECTIONS:
Each proposal must include the following sections:
• Title Page
• Abstract (150-250 words)
• Introduction / Background of the Study
• Statement of the Problem
• Objectives of the Study
• Methodology
• Expected Output / Impact
• Timeline (Gantt Chart)
• Budget Breakdown (if applicable)
• References

EVALUATION CRITERIA:
Proposals will be evaluated based on:
• Relevance to institutional and national research priorities
• Originality and innovation
• Feasibility and clarity of methods
• Potential for publication or practical application
• Ethical compliance

IMPORTANT DATES:
• Call Opens: October 15, 2025
• Submission Deadline: November 30, 2025
• Evaluation Period: December 2025
• Results Announcement: January 2026

SUBMISSION INSTRUCTIONS:
Use the URDS Research Proposal Template (available for download). Submit your proposal in PDF format only.

Filename format: Lastname_Firstname_College_Title.pdf
Upload through the URDS Research Portal or submit via your College Research Coordinator.

FOR INQUIRIES:
University Research and Development Services (URDS)
Email: urds@uep.edu.ph
Office: University Research and Development Services Office
    `;

    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Research_Proposal_Guidelines_2024-2025.txt';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Green Sidebar Indicator */}
      <div className="fixed left-0 top-0 h-full w-8 bg-gradient-to-b from-green-400 to-green-600"></div>

      {/* Back Button */}
      <button className="fixed left-12 top-8 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <div className="text-xs font-bold text-gray-700">LOGO</div>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 italic">
              Research Proposal Submission Guidelines (A.Y. 2024-2025)
            </h1>
          </div>
          <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Scrollbar visible on right */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {/* Introduction */}
          <div className="mb-8 pb-6 border-b-2 border-gray-200">
            <p className="text-gray-800 leading-relaxed">
              The University Research and Development Services (URDS) is now accepting Research Proposals for the Academic Year 2024-2025. Please review the guidelines and submit your proposal before the deadline.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Eligibility */}
              <div>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Open to all full-time faculty members of the University. Collaborative research between departments or colleges is encouraged. Researchers must have no pending or incomplete research projects from previous calls.
                </p>
              </div>

              {/* Required Sections */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Each proposal must include the following sections:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Title Page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Abstract (150-250 words)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Introduction / Background of the Study</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Statement of the Problem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Objectives of the Study</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Methodology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Expected Output / Impact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Timeline (Gantt Chart)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Budget Breakdown (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>References</span>
                  </li>
                </ul>
              </div>

              {/* Evaluation Criteria */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Proposals will be evaluated based on:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Relevance to institutional and national research priorities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Originality and innovation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Feasibility and clarity of methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Potential for publication or practical application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Ethical compliance</span>
                  </li>
                </ul>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Important Dates:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Call Opens:</strong> October 15, 2025</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Submission Deadline:</strong> November 30, 2025</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Evaluation Period:</strong> December 2025</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Results Announcement:</strong> January 2026</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Template Instructions */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <p className="text-gray-800 mb-4">
                  Use the URDS Research Proposal Template (available for download). Submit your proposal in PDF format only.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Filename format:</strong> Lastname_Firstname_College_Title.pdf
                  </p>
                  <p>
                    Upload through the URDS Research Portal or submit via your College Research Coordinator.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4">For Inquiries:</h3>
                <p className="text-gray-800 font-semibold mb-4">
                  University Research and Development Services (URDS)
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>urds@uep.edu.ph</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>University Research and Development Services Office</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Paperclip className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Attachments: [Download Proposal Template PDF]</span>
                  </div>
                </div>
              </div>

              {/* Clipboard Illustration */}
              <div className="flex justify-center mt-6">
                <div className="relative">
                  <div className="w-48 h-56 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-2xl transform rotate-3 flex items-center justify-center">
                    <div className="w-44 h-52 bg-white rounded-2xl p-4 flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-blue-700 rounded-t-2xl"></div>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleDownloadPDF}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-colors"
                >
                  <span>[Download Guidelines PDF]</span>
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}