"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import URDSSidebar from "@/components/FacultyResearcher/sidebar";
import { Search, ChevronDown, Loader2 } from "lucide-react";

import AnnouncementCard, { AnnouncementData } from "@/components/FR/AnnouncementCard"; 
import ResearchGuidelinesModal from "@/components/FR/ResearchGuidelinesModal"; 
// 🆕 Import the new details modal
import AnnouncementDetailsModal from "@/components/FR/AnnouncementDetailsModal";

// ... (Existing Interfaces and Auth Helper remain the same) ...
interface RawAnnouncement {
  // ... (same as before) ...
  id?: string | number;
  _id?: string | number;
  announcement_id?: string | number;
  title?: string;
  announcement_title?: string;
  description?: string;
  content?: string;
  category?: string;
  type?: string;
  color?: string;
  start_date?: string;
  date?: string;
  created_at?: string;
  deadline?: string;
  end_date?: string;
  endDate?: string;
  hasGuidelines?: boolean;
  has_guidelines?: boolean;
  needs_revision?: boolean;
}

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || ''}`,
  };
};

const AnnouncementsPage: React.FC = () => {
  const [needRevisionChecked, setNeedRevisionChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAllAnnouncements] = useState<AnnouncementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal States
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  // 🆕 State for the currently selected announcement
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementData | null>(null);

  // ... (Fetch Data useEffect remains exactly the same) ...
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = 'http://192.168.254.142:5000/api/announcements';
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
  
        if (response.status === 401) {
            // window.location.href = '/login'; 
            return;
        }

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        
        const transformedData: AnnouncementData[] = Array.isArray(data)
          ? data.map((item: RawAnnouncement) => {
              const dateSource = item.start_date || item.date || item.created_at || new Date().toISOString();
              const dateObj = new Date(dateSource);
              
              return {
                id: String(item.id || item._id || item.announcement_id || Math.random()),
                title: item.title || item.announcement_title || 'Untitled',
                description: item.description || item.content || "No details provided.",
                category: item.category || "General",
                type: item.type || "Announcement",
                color: item.color || "blue",
                date: dateSource,
                time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                hasGuidelines: item.hasGuidelines || item.has_guidelines || false,
                needsRevision: item.needs_revision || false
              };
            })
          : [];

        setAllAnnouncements(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter((announcement) => {
    // ... (Filter logic remains the same) ...
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      (announcement.title?.toLowerCase() || '').includes(query) ||
      (announcement.description?.toLowerCase() || '').includes(query);

    if (needRevisionChecked) {
        return matchesSearch && announcement.needsRevision === true;
    }
    return matchesSearch;
  });

  const handleBackClick = () => {
    if (window.history.length > 1) {
        window.history.back();
    }
  };

  const handleGuidelinesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsGuidelinesModalOpen(true);
  };

  // 🆕 Handler for opening the details modal
  const handleAnnouncementClick = (announcement: AnnouncementData) => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4">
      <div className="w-[95%] xl:w-[85%] h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        
        <URDSSidebar />

        <div className="flex-1 flex flex-col overflow-y-auto h-full">
          {/* Header */}
          <header className="p-6 border-b border-gray-200">
            {/* ... (Header content remains same) ... */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBackClick}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
                >
                  <ChevronDown size={24} className="text-gray-700 rotate-90" />
                </button>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MS</span>
                </div>
                <div className="border-l-4 border-blue-600 pl-3">
                  <h2 className="font-semibold text-gray-900">Dr. Maria L. Santos</h2>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="w-4 h-4 bg-blue-900 rounded-full flex items-center justify-center text-white text-[10px]">C</span>
                    College Of Engineering
                  </p>
                </div>
              </div>

              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border border-gray-100">
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

            <div className="flex justify-center mb-4">
              <div className="flex items-center bg-white rounded-full px-4 py-3 border-2 border-blue-400 shadow-sm w-full max-w-2xl focus-within:border-blue-600 transition-colors">
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

            <div className="flex gap-2">
              <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm hover:bg-blue-200 transition">
                All inboxes
              </button>
            </div>
          </header>

          {/* Announcements Section */}
          <section className="px-6 space-y-4 pb-6 pt-4 flex-1 bg-gray-50/50">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin mb-2 text-blue-500" />
                <p>Loading announcements...</p>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center text-red-500">
                <p>Error: {error}</p>
              </div>
            ) : filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No announcements found.</p>
              </div>
            ) : (
              // 🆕 PASS THE CLICK HANDLER
              filteredAnnouncements.map((announcement) => (
                <AnnouncementCard 
                  key={announcement.id}
                  data={announcement}
                  isChecked={needRevisionChecked}
                  onCheckChange={setNeedRevisionChecked}
                  onViewGuidelines={handleGuidelinesClick}
                  // This opens the new details modal
                  onClick={() => handleAnnouncementClick(announcement)}
                />
              ))
            )}
          </section>
        </div>
      </div>

      {/* Guidelines Modal */}
      <ResearchGuidelinesModal 
        isOpen={isGuidelinesModalOpen} 
        onClose={() => setIsGuidelinesModalOpen(false)} 
      />

      {/* 🆕 Announcement Details Modal */}
      <AnnouncementDetailsModal
        isOpen={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        data={selectedAnnouncement}
      />
    </div>
  );
};

export default AnnouncementsPage;