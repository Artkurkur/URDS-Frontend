import React, { useState, useEffect } from "react";
import { X, FileText, Clock, CheckCircle } from "lucide-react";

export type Department = {
  id: string;
  name: string;
  totalSubmissions: number;
  totalOngoing: number;
  totalApproved: number;
};

export type College = {
  id: string | number;
  code?: string;
  name: string;
  logoUrl?: string;
  submissions: number;
  departments?: Department[];
};

type CollegeModalProps = {
  college: College | null;
  onClose: () => void;
  defaultLogo: string;
};

export default function CollegeModal({ college, onClose, defaultLogo }: CollegeModalProps) {
  const [statusFilter, setStatusFilter] = useState<"complete" | "incomplete">("complete");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch departments when college changes
  useEffect(() => {
    
    // If departments are already included in the college object
    if (college?.departments && college.departments.length > 0) {
      setDepartments(college.departments);
      return;
    }

    // Otherwise, fetch from API
    async function fetchDepartments() {
      setLoading(true);
      setError(null);

      // Add null check for college
      if (!college) {
        setError("No college selected");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/colleges/${college.id}/departments`, {
          cache: "no-store",
          method: "GET"
        });

        if (!res.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Unable to load departments");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartments();
  }, [college]);

  // Don't render if no college selected
  if (!college) return null;

  // Calculate totals from departments
  const totalSubmissions = departments.reduce((sum, d) => sum + (d.totalSubmissions || 0), 0);
  const totalOngoing = departments.reduce((sum, d) => sum + (d.totalOngoing || 0), 0);
  const totalApproved = departments.reduce((sum, d) => sum + (d.totalApproved || 0), 0);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 md:p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] flex flex-col shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 border-b bg-gray-50 rounded-t-2xl">
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <img 
              src={college.logoUrl ?? defaultLogo} 
              alt={`${college.name} logo`}
              className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-full border-2 border-gray-200 flex-shrink-0" 
            />
            <h2 className="font-bold text-base md:text-xl text-gray-800 truncate">{college.name}</h2>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="px-4 md:px-6 pt-3 md:pt-4 pb-2">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setStatusFilter("complete")}
              className={`px-3 md:px-6 py-1.5 md:py-2 rounded-md font-medium text-xs md:text-sm transition-all flex items-center gap-1.5 md:gap-2 ${
                statusFilter === "complete" 
                  ? "bg-green-500 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-current"></div>
              COMPLETE
            </button>
            <button
              onClick={() => setStatusFilter("incomplete")}
              className={`px-3 md:px-6 py-1.5 md:py-2 rounded-md font-medium text-xs md:text-sm transition-all flex items-center gap-1.5 md:gap-2 ${
                statusFilter === "incomplete" 
                  ? "bg-red-500 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-current"></div>
              INCOMPLETE
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Sidebar - Horizontal on mobile, vertical on desktop */}
          <div className="md:w-48 bg-gray-50 border-b md:border-b-0 md:border-r p-3 md:p-4">
            <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              <div className="bg-blue-100 border-2 border-blue-400 rounded-[20px] md:rounded-[30px] p-2 md:p-3 flex items-center gap-2 flex-shrink-0 md:flex-shrink">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600 whitespace-nowrap">Total Submission</div>
                  <div className="font-bold text-blue-600 text-sm md:text-base">{totalSubmissions}</div>
                </div>
              </div>

              <div className="bg-orange-100 border-2 border-orange-400 rounded-[20px] md:rounded-[30px] p-2 md:p-3 flex items-center gap-2 flex-shrink-0 md:flex-shrink">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600 whitespace-nowrap">Total Ongoing</div>
                  <div className="font-bold text-orange-600 text-sm md:text-base">{totalOngoing}</div>
                </div>
              </div>

              <div className="bg-green-100 border-2 border-green-400 rounded-[20px] md:rounded-[30px] p-2 md:p-3 flex items-center gap-2 flex-shrink-0 md:flex-shrink">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600 whitespace-nowrap">Total Approved</div>
                  <div className="font-bold text-green-600 text-sm md:text-base">{totalApproved}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Grid */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-red-500 font-semibold mb-2 text-sm md:text-base">{error}</p>
                  <p className="text-xs md:text-sm">Please try again later</p>
                </div>
              </div>
            ) : departments.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-gray-500">
                  <p className="font-semibold mb-2 text-sm md:text-base">No departments found</p>
                  <p className="text-xs md:text-sm">This college has no departments yet</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="bg-gray-50 rounded-xl border-2 border-gray-300 p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <h3 className="font-bold text-xs md:text-sm text-gray-800 mb-2 md:mb-3 text-center line-clamp-2">
                      {dept.name}
                    </h3>
                    <div className="space-y-1.5 md:space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">TOTAL SUBMISSIONS:</span>
                        <span className="font-bold">{dept.totalSubmissions || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">TOTAL ONGOING:</span>
                        <span className="font-bold text-orange-600">{dept.totalOngoing || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">TOTAL APPROVED:</span>
                        <span className="font-bold text-green-600">{dept.totalApproved || 0}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-3 pt-2 border-t border-gray-300 text-center text-xs text-gray-500">
                      KEYWORD
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}