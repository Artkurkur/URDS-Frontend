// ================================================================
// src/app/URDS/SUBMISSIONS/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import URDSSidebar from "@/components/urds-director/sidebar";
import SearchHeader from "@/components/CollegeSubmissions/SearchHeader";
import CollegeGrid, { College } from "@/components/CollegeSubmissions/CollegeGrid";
import CollegeModal from "@/components/CollegeSubmissions/CollegeModal";

const UPLOADED_LOGO = "/mnt/data/bd78d472-b831-4539-9927-2bfbf2621703.png";

export default function SubmissionsPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<College | null>(null);
  const [loadedAll, setLoadedAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  // Static list of colleges - submissions will be fetched from database
  const fallback: College[] = [
    { id: "coa", code: "COA", name: "College of Accountancy", submissions: 0 },
    { id: "cba", code: "CBA", name: "College of Business Administration", submissions: 0 },
    { id: "ccj", code: "CCJ", name: "College of Criminal Justice", submissions: 0 },
    { id: "ccs", code: "CCS", name: "College of Computer Studies", submissions: 0 },
    { id: "cet", code: "CET", name: "College of Engineering and Technology", submissions: 0 },
    { id: "chs", code: "CHS", name: "College of Health Sciences", submissions: 0 },
  ];

  // Fetch real submission counts from database API
  async function fetchColleges() {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", { cache: "no-store", method: "GET" });
      if (!res.ok) {
        console.warn("API not available, showing fallback counts");
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

  const total = useMemo(() => colleges.reduce((s, c) => s + (c.submissions || 0), 0), [colleges]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return colleges;
    return colleges.filter(
      (c) => (c.name || "").toLowerCase().includes(q) || (c.code || "").toLowerCase().includes(q)
    );
  }, [colleges, query]);

  const activeCollegesCount = useMemo(() => colleges.filter((c) => c.submissions > 0).length, [colleges]);

  function loadMore() {
    if (loadedAll) return;
    setLoadedAll(true);
  }

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-800">
      {/* Sidebar Component */}
      <URDSSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 ml-28 relative">
        {/* Header Component */}
        <SearchHeader query={query} setQuery={setQuery} onBack={handleBack} />

        {/* Watermarked background logo */}
        <div className="pointer-events-none fixed inset-0 opacity-30 z-0 flex justify-center items-start pt-40">
          <img src={UPLOADED_LOGO} alt="UEP logo" className="max-w-lg blur-sm" />
        </div>

        {/* Content card */}
        <main className="max-w-6xl mx-auto px-6 py-6 relative z-10">
          <div className="relative">
            <span className="absolute -top-4 left-8 bg-white px-4 py-2 rounded-lg shadow border text-xs font-semibold">
              University of Eastern Philippines Colleges Department
            </span>
            <section className="mt-6 bg-transparent rounded-2xl shadow-md border border-gray-200 p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase font-semibold text-gray-700">
                        Total College Submissions
                      </span>
                      <span className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md text-lg shadow">
                        {total}
                      </span>
                    </div>
                  </div>

                  {/* College Grid Component */}
                  <CollegeGrid colleges={filtered} onSelect={setSelected} defaultLogo={UPLOADED_LOGO} />

                  <div className="mt-6 text-center">
                    <button
                      onClick={loadMore}
                      className="px-6 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {loadedAll ? "All submissions loaded" : "Load More"}
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        </main>

        {/* Modal Component */}
        <CollegeModal college={selected} onClose={() => setSelected(null)} defaultLogo={UPLOADED_LOGO} />
      </div>
    </div>
  );
}
