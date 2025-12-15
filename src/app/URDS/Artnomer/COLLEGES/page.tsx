// ================================================================

// src/app/URDS/SUBMISSIONS/page.tsx
"use client";

import URDSSidebar from '@/components/urds-director/sidebar';
import React, { useEffect, useMemo, useState } from "react";
import SearchHeader from "@/components/CollegeSubmissions/SearchHeader";
import CollegeGrid, { College } from "@/components/CollegeSubmissions/CollegeGrid";
import CollegeModal from "@/components/CollegeSubmissions/CollegeModal";

const UPLOADED_LOGO = "/images/uep-default.png";

export default function SubmissionsPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<College | null>(null);

  const [loading, setLoading] = useState(true);


  // Static fallback (with logos)
  const fallback: College[] = [
    { id: "cba",  code: "CBA",  name: "College of Business Administration", submissions: 0, logoUrl: "/images/logo/CBA-logo.png" },
    { id: "cac",  code: "CAC",  name: "College of Arts and Communication", submissions: 0, logoUrl: "/images/logo/CAC-logo.png" },
    { id: "coe",  code: "COE",  name: "College of Engineering", submissions: 0, logoUrl: "/images/logo/COE-logo.png" },
    { id: "cafnr",code: "CAFNR",name: "College of Agriculture, Fisheries and Natural Resources", submissions: 0, logoUrl: "/images/logo/CAFNR-logo.png" },
    { id: "cs",   code: "CS",   name: "College of Science", submissions: 0, logoUrl: "/images/logo/CS-logo.png" },
    { id: "cl",   code: "CL",   name: "College of Law", submissions: 0, logoUrl: "/images/logo/CL-logo.png" },
    { id: "coed", code: "CoEd", name: "College of Education", submissions: 0, logoUrl: "/images/logo/COED-logo.png" },
    { id: "cnahs",code: "CNAHS",name: "College of Nursing & Allied Health Sciences", submissions: 0, logoUrl: "/images/logo/CNAHS-logo.png" },
    { id: "cvm",  code: "CVM",  name: "College of Veterinary Medicine", submissions: 0, logoUrl: "/images/logo/CVM-logo.png" }
  ];

  async function fetchColleges() {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", { 
        cache: "no-store",
        method: "GET"
      });
      
      if (!res.ok) {
        console.warn("API not available, showing empty counts");
        setColleges(fallback);
        return;
      }
      
      const data = (await res.json()) as College[];
      setColleges(data);
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
      setColleges(fallback);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchColleges();
  }, []);

  const total = useMemo(
    () => colleges.reduce((s, c) => s + (c.submissions || 0), 0),
    [colleges]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return colleges;
    return colleges.filter((c) => 
      (c.name || "").toLowerCase().includes(q) || 
      (c.code || "").toLowerCase().includes(q)
    );
  }, [colleges, query]);

  
  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800">
      {/* Sidebar */}
      <URDSSidebar />

      {/* Search Header */}
      <SearchHeader query={query} setQuery={setQuery} onBack={handleBack} />

      {/* Watermark - Hidden on mobile */}
      <div className="pointer-events-none fixed inset-0 opacity-30 z-0 hidden md:flex justify-center items-start pt-40">
        <img src={UPLOADED_LOGO} alt="UEP logo" className="max-w-lg blur-sm" />
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 relative z-10">
        <div className="relative">
          {/* University Label - Responsive */}
          <div className="mb-3 md:mb-0">
            <span className="inline-block md:absolute md:-top-4 md:left-8 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-sm border border-gray-200 text-xs font-semibold text-gray-700">
              University of Eastern Philippines
            </span>
          </div>

          <section className="mt-0 md:mt-6 bg-white md:bg-transparent rounded-xl md:rounded-2xl shadow-sm md:shadow-md border border-gray-200 p-0 md:p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* Total Badge - Responsive */}
                <div className="flex justify-end px-4 pt-4 pb-3 md:px-0 md:pt-0 md:pb-0 mb-3 md:mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-semibold text-gray-600">
                      TOTAL:
                    </span>
                    <span className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-md text-base shadow">
                      {total}
                    </span>
                  </div>
                </div>

                {/* College Grid */}
                <div className="px-4 pb-4 md:px-0 md:pb-0">
                  <CollegeGrid 
                    colleges={filtered}
                    onSelect={setSelected}
                    defaultLogo={UPLOADED_LOGO}
                  />
                </div>

              </>
            )}
          </section>
        </div>
      </main>

      {/* Modal */}
      <CollegeModal 
        college={selected}
        onClose={() => setSelected(null)}
        defaultLogo={UPLOADED_LOGO}
      />
    </div>
  );
}
