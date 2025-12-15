// ============================================================
// File: page.tsx
"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

import URDSSidebar from "@/components/FacultyResearcher/sidebar";
import { Header } from "@/components/FacultyResearcher/header";
import StudyCard from "@/components/FR/FileCard";
import type { Submission } from "@/components/FR/FileCard";

// ---------------------------------------------
// Server-side data with submissions
const announcements: Array<{
  chapter: string;
  title: string;
  historyCount: number;
  submissions: Submission[];
}> = [
  {
    chapter: "Chapter - 4",
    title:
      "The Impact of Social Media Usage on Academic Performance Among College Students",
    historyCount: 5,
    submissions: [
      {
        id: "1",
        studentName: "Juan Dela Cruz",
        submittedDate: "Oct 25, 2025",
        status: "approved",
      },
      {
        id: "2",
        studentName: "Maria Santos",
        submittedDate: "Oct 26, 2025",
        status: "pending",
      },
      {
        id: "3",
        studentName: "Pedro Reyes",
        submittedDate: "Oct 27, 2025",
        status: "submitted",
      },
      {
        id: "4",
        studentName: "Ana Garcia",
        submittedDate: "Oct 28, 2025",
        status: "rejected",
      },
      {
        id: "5",
        studentName: "Carlos Mendoza",
        submittedDate: "Oct 29, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 1",
    title: "Introduction to Research Methodology",
    historyCount: 3,
    submissions: [
      {
        id: "6",
        studentName: "Sofia Reyes",
        submittedDate: "Nov 01, 2025",
        status: "submitted",
      },
      {
        id: "7",
        studentName: "Miguel Torres",
        submittedDate: "Nov 02, 2025",
        status: "pending",
      },
      {
        id: "8",
        studentName: "Isabella Cruz",
        submittedDate: "Nov 03, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 4",
    title:
      "The Impact of Social Media Usage on Academic Performance Among College Students",
    historyCount: 5,
    submissions: [
      {
        id: "1",
        studentName: "Juan Dela Cruz",
        submittedDate: "Oct 25, 2025",
        status: "approved",
      },
      {
        id: "2",
        studentName: "Maria Santos",
        submittedDate: "Oct 26, 2025",
        status: "pending",
      },
      {
        id: "3",
        studentName: "Pedro Reyes",
        submittedDate: "Oct 27, 2025",
        status: "submitted",
      },
      {
        id: "4",
        studentName: "Ana Garcia",
        submittedDate: "Oct 28, 2025",
        status: "rejected",
      },
      {
        id: "5",
        studentName: "Carlos Mendoza",
        submittedDate: "Oct 29, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 1",
    title: "Introduction to Research Methodology",
    historyCount: 3,
    submissions: [
      {
        id: "6",
        studentName: "Sofia Reyes",
        submittedDate: "Nov 01, 2025",
        status: "submitted",
      },
      {
        id: "7",
        studentName: "Miguel Torres",
        submittedDate: "Nov 02, 2025",
        status: "pending",
      },
      {
        id: "8",
        studentName: "Isabella Cruz",
        submittedDate: "Nov 03, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 4",
    title:
      "The Impact of Social Media Usage on Academic Performance Among College Students",
    historyCount: 5,
    submissions: [
      {
        id: "1",
        studentName: "Juan Dela Cruz",
        submittedDate: "Oct 25, 2025",
        status: "approved",
      },
      {
        id: "2",
        studentName: "Maria Santos",
        submittedDate: "Oct 26, 2025",
        status: "pending",
      },
      {
        id: "3",
        studentName: "Pedro Reyes",
        submittedDate: "Oct 27, 2025",
        status: "submitted",
      },
      {
        id: "4",
        studentName: "Ana Garcia",
        submittedDate: "Oct 28, 2025",
        status: "rejected",
      },
      {
        id: "5",
        studentName: "Carlos Mendoza",
        submittedDate: "Oct 29, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 1",
    title: "Introduction to Research Methodology",
    historyCount: 3,
    submissions: [
      {
        id: "6",
        studentName: "Sofia Reyes",
        submittedDate: "Nov 01, 2025",
        status: "submitted",
      },
      {
        id: "7",
        studentName: "Miguel Torres",
        submittedDate: "Nov 02, 2025",
        status: "pending",
      },
      {
        id: "8",
        studentName: "Isabella Cruz",
        submittedDate: "Nov 03, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 4",
    title:
      "The Impact of Social Media Usage on Academic Performance Among College Students",
    historyCount: 5,
    submissions: [
      {
        id: "1",
        studentName: "Juan Dela Cruz",
        submittedDate: "Oct 25, 2025",
        status: "approved",
      },
      {
        id: "2",
        studentName: "Maria Santos",
        submittedDate: "Oct 26, 2025",
        status: "pending",
      },
      {
        id: "3",
        studentName: "Pedro Reyes",
        submittedDate: "Oct 27, 2025",
        status: "submitted",
      },
      {
        id: "4",
        studentName: "Ana Garcia",
        submittedDate: "Oct 28, 2025",
        status: "rejected",
      },
      {
        id: "5",
        studentName: "Carlos Mendoza",
        submittedDate: "Oct 29, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 1",
    title: "Introduction to Research Methodology",
    historyCount: 3,
    submissions: [
      {
        id: "6",
        studentName: "Sofia Reyes",
        submittedDate: "Nov 01, 2025",
        status: "submitted",
      },
      {
        id: "7",
        studentName: "Miguel Torres",
        submittedDate: "Nov 02, 2025",
        status: "pending",
      },
      {
        id: "8",
        studentName: "Isabella Cruz",
        submittedDate: "Nov 03, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 4",
    title:
      "The Impact of Social Media Usage on Academic Performance Among College Students",
    historyCount: 5,
    submissions: [
      {
        id: "1",
        studentName: "Juan Dela Cruz",
        submittedDate: "Oct 25, 2025",
        status: "approved",
      },
      {
        id: "2",
        studentName: "Maria Santos",
        submittedDate: "Oct 26, 2025",
        status: "pending",
      },
      {
        id: "3",
        studentName: "Pedro Reyes",
        submittedDate: "Oct 27, 2025",
        status: "submitted",
      },
      {
        id: "4",
        studentName: "Ana Garcia",
        submittedDate: "Oct 28, 2025",
        status: "rejected",
      },
      {
        id: "5",
        studentName: "Carlos Mendoza",
        submittedDate: "Oct 29, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 1",
    title: "Introduction to Research Methodology",
    historyCount: 3,
    submissions: [
      {
        id: "6",
        studentName: "Sofia Reyes",
        submittedDate: "Nov 01, 2025",
        status: "submitted",
      },
      {
        id: "7",
        studentName: "Miguel Torres",
        submittedDate: "Nov 02, 2025",
        status: "pending",
      },
      {
        id: "8",
        studentName: "Isabella Cruz",
        submittedDate: "Nov 03, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 4",
    title:
      "The Impact of Social Media Usage on Academic Performance Among College Students",
    historyCount: 5,
    submissions: [
      {
        id: "1",
        studentName: "Juan Dela Cruz",
        submittedDate: "Oct 25, 2025",
        status: "approved",
      },
      {
        id: "2",
        studentName: "Maria Santos",
        submittedDate: "Oct 26, 2025",
        status: "pending",
      },
      {
        id: "3",
        studentName: "Pedro Reyes",
        submittedDate: "Oct 27, 2025",
        status: "submitted",
      },
      {
        id: "4",
        studentName: "Ana Garcia",
        submittedDate: "Oct 28, 2025",
        status: "rejected",
      },
      {
        id: "5",
        studentName: "Carlos Mendoza",
        submittedDate: "Oct 29, 2025",
        status: "approved",
      },
    ],
  },
  {
    chapter: "Chapter - 1",
    title: "Introduction to Research Methodology",
    historyCount: 3,
    submissions: [
      {
        id: "6",
        studentName: "Sofia Reyes",
        submittedDate: "Nov 01, 2025",
        status: "submitted",
      },
      {
        id: "7",
        studentName: "Miguel Torres",
        submittedDate: "Nov 02, 2025",
        status: "pending",
      },
      {
        id: "8",
        studentName: "Isabella Cruz",
        submittedDate: "Nov 03, 2025",
        status: "approved",
      },
    ],
  },
];

export default function AnnouncementBoard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.chapter.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800">
      {/* Sidebar */}
      <URDSSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          userName="Dr. Maria L. Santos"
          userDepartment="College Of Engineering"
          searchPlaceholder="Search Announcement"
        />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Overlapping Search Bar */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20">
              <input
                type="text"
                placeholder="Search Announcement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-9 py-2 bg-white shadow-lg rounded-full border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>

            {/* White Content Container */}
            <div className="bg-white rounded-[10px] shadow-sm p-8 min-h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] mt-10 space-y-4 overflow-y-auto">
              {filteredAnnouncements.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">
                    {searchQuery
                      ? "No announcements found matching your search"
                      : "No announcements yet"}
                  </p>
                </div>
              ) : (
                filteredAnnouncements.map((item, index) => (
                  <StudyCard
                    key={index}
                    chapter={item.chapter}
                    title={item.title}
                    historyCount={item.historyCount}
                    submissions={item.submissions}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}