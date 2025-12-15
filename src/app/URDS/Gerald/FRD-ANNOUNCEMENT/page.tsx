"use client";

import React, { useState } from "react";
import Image from "next/image";
import URDSSidebar from "@/components/FacultyResearcher/sidebar"; 
import { FileText, Bell, Search, ChevronDown, Calendar, Clock, Megaphone } from "lucide-react";

const AnnouncementsPage: React.FC = () => {
  // State for 'Need Revision' checkbox
  const [needRevisionChecked, setNeedRevisionChecked] = useState(false);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // All announcements data
  const allAnnouncements = [
    {
      id: 1,
      type: "New Announcement",
      category: "Compliance",
      title: "Mandatory Ethics Training",
      description: "All faculty researchers must complete the mandatory research ethics training by the end of the month. See attached module.",
      date: "Oct 29, 2025",
      time: "Today 10:30",
      color: "purple",
    },
    {
      id: 2,
      type: "Recent Announcement",
      category: "Research",
      title: "Research Proposals for AY 2024-2025",
      description: "The University Research and Development Services (URDS) is now accepting Research Proposals for the Academic Year 2024-2025. Please review the guidelines and submit your proposal before the deadline.",
      date: "Oct 13, 2025",
      time: "Yesterday 11:00",
      color: "blue",
      hasGuidelines: true,
    },
    {
      id: 3,
      type: "Recent Announcement",
      category: "Funding",
      title: "Grant Proposal Submission Window",
      description: "The new grant proposal submission window is now open. Deadline is November 30, 2025.",
      date: "Oct 28, 2025",
      time: "Yesterday 16:00",
      color: "green",
    },
    {
      id: 4,
      type: "Previous Announcement",
      category: "Formatting & References",
      title: "Manuscript Template and APA Format",
      description: "Ensure your manuscript follows the URDS template and APA 7th Edition reference format.",
      date: "Sept 30, 2025",
      time: "Last Week 14:00",
      color: "blue",
      needsRevision: true,
    },
    {
      id: 5,
      type: "Previous Announcement",
      category: "Chapter 1 - Introduction",
      title: "Chapter 1 Revision Notice",
      description: "Please revise your Chapter 1 section to include a clearer statement of the research problem, updated statistics, and a more detailed description of the study's scope and limitations.",
      date: "October 19, 2025",
      time: "Today 11:30",
      color: "orange",
    },
  ];

  // Filter announcements based on search query
  const filteredAnnouncements = allAnnouncements.filter((announcement) => {
    const query = searchQuery.toLowerCase();
    return (
      announcement.title.toLowerCase().includes(query) ||
      announcement.description.toLowerCase().includes(query) ||
      announcement.category.toLowerCase().includes(query) ||
      announcement.type.toLowerCase().includes(query)
    );
  });

  // Handler for back button
  const handleBackClick = () => {
    window.history.back();
  };

  // Handler for guidelines button
  const handleGuidelinesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("Opening Guidelines Interface...\n\nThis will open the URDS guidelines document or interface.");
    console.log("Guidelines button clicked. Implement interface routing here.");
  };

  // Get color classes based on announcement color
  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; badge: string; docBg: string; docBorder: string; megaphone: string } } = {
      purple: {
        bg: "bg-purple-700",
        border: "border-purple-400",
        text: "text-white",
        badge: "bg-purple-300",
        docBg: "bg-blue-200",
        docBorder: "border-blue-400",
        megaphone: "text-purple-500 fill-purple-300 stroke-purple-600",
      },
      blue: {
        bg: "bg-blue-500",
        border: "border-blue-400",
        text: "text-white",
        badge: "bg-blue-500",
        docBg: "bg-blue-100",
        docBorder: "border-blue-500",
        megaphone: "text-blue-500 fill-blue-300 stroke-blue-600",
      },
      green: {
        bg: "bg-green-500",
        border: "border-green-400",
        text: "text-white",
        badge: "bg-green-600",
        docBg: "bg-green-100",
        docBorder: "border-green-500",
        megaphone: "text-green-500 fill-green-300 stroke-green-600",
      },
      orange: {
        bg: "bg-orange-500",
        border: "border-orange-400",
        text: "text-white",
        badge: "bg-orange-600",
        docBg: "bg-orange-100",
        docBorder: "border-orange-500",
        megaphone: "text-orange-500 fill-orange-300 stroke-orange-600",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4">
      {/* SIZE ADJUSTMENT: 
          Changed 'w-full max-w-[1400px] h-[90vh]' to 'w-[85%] h-[85vh]' 
          to match your 85% requirement.
      */}
      <div className="w-[85%] h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        
        <URDSSidebar />

        <div className="flex-1 flex flex-col overflow-y-auto h-full">
          {/* Header */}
          <header className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              {/* Back button and Profile Info */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBackClick}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
                >
                  <ChevronDown size={24} className="text-gray-700 rotate-90" />
                </button>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                </div>
                <div className="border-l-4 border-blue-600 pl-3">
                  <h2 className="font-semibold text-gray-900">Dr. Maria L. Santos</h2>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="w-4 h-4 bg-blue-900 rounded-full flex items-center justify-center text-white text-xs">C</span>
                    College Of Engineering
                  </p>
                </div>
              </div>

              {/* University Logo */}
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/logo/UEPlogo.png" 
                  alt="UEP Logo" 
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center bg-white rounded-full px-4 py-3 border-2 border-blue-400 shadow-sm w-1/2">
                <input
                  type="text"
                  placeholder="Search Announcement"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none flex-grow text-gray-800 text-sm"
                />
                <Search size={20} className="text-gray-400 ml-2" />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm hover:bg-blue-200 transition">
                All inboxes
              </button>
            </div>
          </header>

          {/* Announcements Section */}
          <section className="px-4 space-y-4 pb-6">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No announcements found matching &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-sm mt-2">Try searching with different keywords</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => {
                const colors = getColorClasses(announcement.color);
                return (
                  <div key={announcement.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className={`${colors.bg} ${colors.text} px-4 py-1 font-semibold text-sm flex items-center gap-2`}>
                      <Bell size={16} />
                      {announcement.type}
                    </div>
                    <div className="flex gap-4 p-4 items-start">
                      <div className={`flex flex-col items-center justify-center w-24 h-24 ${colors.bg} ${colors.text} font-bold rounded-lg shadow`}>
                        <Calendar size={20} className="mb-1" />
                        <span className="text-sm">{announcement.time.split(' ')[0]}</span>
                        <span className="text-xl">{announcement.time.split(' ')[1]}</span>
                      </div>
                      <div className="flex-1">
                        {announcement.needsRevision && (
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="checkbox"
                              id={`needRevision-${announcement.id}`}
                              checked={needRevisionChecked}
                              onChange={(e) => setNeedRevisionChecked(e.target.checked)}
                              className="accent-blue-500"
                            />
                            <label htmlFor={`needRevision-${announcement.id}`} className="text-blue-600 font-semibold text-sm">
                              Need Revision
                            </label>
                          </div>
                        )}
                        {announcement.title && (
                          <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                        )}
                        <p className="text-gray-700 text-sm my-2">
                          {announcement.description}
                        </p>
                        <div className="flex gap-2 text-xs text-gray-500 mt-2 items-center flex-wrap">
                          <span className={`px-2 py-1 rounded ${colors.badge} text-white flex items-center gap-1`}>
                            <FileText size={12} />
                            {announcement.category.includes(':') ? announcement.category : `Topic: ${announcement.category}`}
                          </span>
                          <Clock size={12} />
                          <span>{announcement.date}</span>
                          {announcement.hasGuidelines && (
                            <a
                              href="#"
                              onClick={handleGuidelinesClick}
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <FileText size={12} />
                              Guidelines Available
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="w-[100px] h-[100px] relative flex items-center justify-center">
                        <div className={`absolute w-16 h-20 ${colors.docBg} rounded-lg shadow-md left-2 top-1 border-2 ${colors.docBorder}`}>
                          <div className="mt-2 mx-2 space-y-1">
                            <div className={`h-1 ${colors.docBorder.replace('border-', 'bg-')} rounded`}></div>
                            <div className={`h-1 ${colors.docBorder.replace('border-', 'bg-')} rounded`}></div>
                            <div className={`h-1 ${colors.docBorder.replace('border-', 'bg-')} rounded w-3/4`}></div>
                            <div className={`h-1 ${colors.docBorder.replace('border-', 'bg-')} rounded`}></div>
                            <div className={`h-1 ${colors.docBorder.replace('border-', 'bg-')} rounded w-5/6`}></div>
                          </div>
                        </div>
                        <div className="absolute right-2 bottom-2 z-10">
                          <Megaphone size={40} className={colors.megaphone} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;