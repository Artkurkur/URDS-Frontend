// ================================================================
// src/app/URDS/SUBMISSIONS/FACULTY/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/urds-director/Header";
import URDSSidebar from '@/components/urds-director/sidebar';
import { SubmissionRow } from "@/components/urds-director/SubmissionRow";
import Link from "next/link";

// Types defined inline
export interface College {
  id: string;
  name: string;
  code: string;
  logoUrl: string;
}

export interface Faculty {
  leader: string;
  email: string;
  college: string;
}

export interface Submission {
  id: string;
  faculty: Faculty;
  researchTitle: string;
  call: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// API Response Types
interface APISubmission {
  submission_id: number;
  research_id: number;
  budget_id: number;
  workplan_id: number;
  status: string;
  version_number: number;
  timestamp: string;
  research_title: string;
  research_type: string;
  leader: string;
  college:string;
  members: string;
  location: string;
  duration: string;
  annual_budget: string;
  rationale: string;
  objectives: string;
  rrl: string;
  methodology: string;
  prepared_by: string;
  endorsed_by: string;
  recommending_approval: string;
}

export default function FacultySubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // State for selected college
  const [selectedCollege, setSelectedCollege] = useState<College>({
    id: 'cvm',
    name: 'College of Veterinary Medicine',
    code: 'CVM',
    logoUrl: '/images/logo/CVM-logo.png',
  });

  // Function to transform API data to component format
  const transformAPIData = (apiData: APISubmission[]): Submission[] => {
    return apiData.map((item) => {
      console.log("Transforming item:", item);
      
      // Safely handle leader name with fallback
      const leaderName = item.leader || item.prepared_by || "Unknown Researcher";
      
      // Generate email from leader name
      const emailUsername = leaderName
        .toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^a-z.]/g, '');

      return {
        id: item.submission_id?.toString() || "0",
        faculty: {
          leader: leaderName,
          email: `${emailUsername}@uep.edu.ph`,
          college: item.college || "Unknown College"
        },
        researchTitle: item.research_title || "Untitled Research",
        call: item.research_type || "Not Specified",
        submittedDate: item.timestamp 
          ? new Date(item.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          : "N/A",
        status: (item.status as 'Pending' | 'Approved' | 'Rejected') || 'Pending',
      };
    });
  };

  // Fetch submissions from API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("=== FETCHING SUBMISSIONS ===");
        console.log("API URL: http://192.168.254.142:5000/api/submissions");
        
        // Add timeout to detect hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch("http://192.168.254.142:5000/api/submissions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors', // Explicitly set CORS mode
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        console.log("Response Status:", response.status);
        console.log("Response OK:", response.ok);
        console.log("Response Headers:", response.headers);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawText = await response.text();
        console.log("Raw Response Text:", rawText);
        
        const data = JSON.parse(rawText);
        console.log("Parsed JSON Data:", data);
        console.log("Data type:", typeof data);
        console.log("Is Array:", Array.isArray(data));
        console.log("Data length:", data?.length);

        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          throw new Error("Invalid data format from API");
        }

        if (data.length === 0) {
          console.warn("API returned empty array");
          setSubmissions([]);
          return;
        }

        // Transform API data to match component format
        const transformedData = transformAPIData(data);
        console.log("Transformed Data:", transformedData);
        console.log("Transformed Data length:", transformedData.length);
        
        setSubmissions(transformedData);
        console.log("=== FETCH COMPLETE ===");

      } catch (err) {
        console.error("=== FETCH ERROR ===");
        console.error("Error name:", err instanceof Error ? err.name : 'Unknown');
        console.error("Error message:", err instanceof Error ? err.message : err);
        console.error("Full error:", err);
        
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError("Request timeout - Server is not responding.");
          } else if (err.message.includes('CORS')) {
            setError("CORS Error - Backend needs to allow requests from this domain");
          } else if (err.message.includes('Failed to fetch')) {
            setError("Network Error - Cannot reach API. Check CORS settings or network connection.");
          } else {
            setError(err.message);
          }
        } else {
          setError("An error occurred while fetching submissions");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [selectedCollege]); // Refetch when college changes

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800 font-sans selection:bg-red-500/20">

      {/* Decorative Background Elements - Hidden on mobile */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-2 bg-red-500 z-0"></div>
      <div className="hidden md:block fixed top-0 right-0 h-full w-2 bg-red-500 z-0"></div>

      {/* Sidebar */}
      <URDSSidebar />

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:pl-24 relative">
        <Header selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege} />

        {/* Main Content Card */}
        <div className="w-full md:w-[98%] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12 relative mx-auto">

          {/* Red Header Bar */}
          <div className="bg-red-500 text-white py-3 px-4 md:px-6 rounded-t-lg mx-2 md:mx-4 mt-2 md:mt-4 shadow-md relative z-10">
            <h2 className="text-sm md:text-lg font-bold tracking-wide uppercase">
              Faculty Submissions - {selectedCollege.code}
            </h2>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6 pt-6 md:pt-8 pb-8 md:pb-12 relative">

            {/* Total Submissions Badge */}
            <div className="absolute -top-12 md:-top-16 right-4 md:right-8 bg-white border border-gray-300 shadow-sm rounded-lg px-3 md:px-4 py-1 z-20 flex items-center gap-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Total:</span>
              <span className="text-lg md:text-xl font-bold text-gray-800">
                {loading ? '...' : submissions.length}
              </span>
            </div>

 
        

            {/* Table Header - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block w-full px-4 mb-2">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 tracking-wider">
                <div className="col-span-2 text-left">Faculty Researcher/Leader</div>
                <div className="col-span-2 text-left">College/Department</div>
                <div className="col-span-3 text-left">Research Title</div>
                <div className="col-span-2 text-left">Research Type</div>
                <div className="col-span-1 text-center">Date of Submission</div>
                <div className="col-span-1 text-left pl-2">Status</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>
            </div>

            {/* Scrollable List Area */}
            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">

              {loading ? (
                // Skeleton Loaders
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="h-20 md:h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"
                    ></div>
                  ))}
                </div>

              ) : error ? (
                // Error State
                <div className="w-full py-12 md:py-20 flex justify-center items-center">
                  <div className="text-center max-w-md px-4">
                    <p className="text-red-500 text-base md:text-lg font-semibold tracking-wide">
                      Error loading submissions
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm mt-2">
                      {error}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Retry
                    </button>
                  </div>
                </div>

              ) : submissions.length === 0 ? (

                // NO SUBMISSION YET — with clickable text link
                <div className="w-full py-12 md:py-20 flex justify-center items-center">
                  <div className="text-center max-w-md px-4">
                    <p className="text-gray-500 text-base md:text-lg font-semibold tracking-wide">
                      No submissions yet
                    </p>

                    <p className="text-gray-400 text-xs md:text-sm mt-1">
                      Click{" "}
                      <Link
                        href="/URDS/Mamas/URDS-LP"
                        className="text-green-500 font-semibold hover:underline hover:text-green-600"
                      >
                        Create New Call
                      </Link>{" "}
                      to notify researchers of the submission.
                    </p>
                  </div>
                </div>

              ) : (

                // Rows
                submissions.map((submission) => (
                  <SubmissionRow key={submission.id} data={submission} />
                ))
              )}
            </div>

            {/* Custom Scrollbar */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
              }
            `}</style>
          </div>

          {/* Bottom Decoration */}
          <div className="h-2 w-full bg-gray-100"></div>
        </div>
      </main>
    </div>
  );
}