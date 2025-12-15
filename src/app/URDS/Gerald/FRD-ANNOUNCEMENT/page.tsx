"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import URDSSidebar from "@/components/FacultyResearcher/sidebar";
import { 
  FileText, 
  Bell, 
  Search, 
  ChevronDown, 
  Calendar, 
  Clock, 
  Megaphone, 
  Loader2 
} from "lucide-react";

// --- INTERFACES ---

// 1. Interface for the CLEAN data used in your UI
interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  color: string;
  time: string;
  date: string;
  displayDate?: string;
  deadline?: string;
  needsRevision?: boolean;
  hasGuidelines?: boolean;
}

// 2. Interface for the RAW data from the API (Types the 'item' parameter)
interface RawAnnouncement {
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
  startDate?: string;
  start_date?: string;
  date?: string;
  created_at?: string;
  deadline?: string;
  end_date?: string;
  endDate?: string;
  displayDate?: string;
  hasGuidelines?: boolean;
  has_guidelines?: boolean;
  needs_revision?: boolean;
}

// --- HELPER: Auth Headers ---
const getAuthHeaders = () => {
  // ⚠️ CHECK THIS KEY: Inspect your Local Storage (F12 -> Application)
  // It might be 'accessToken', 'authToken', or just 'token'.
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || ''}`,
  };
};

const AnnouncementsPage: React.FC = () => {
  const [needRevisionChecked, setNeedRevisionChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = 'http://192.168.254.142:5000/api/announcements';
        console.log('Fetching announcements from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
  
        // 🟢 HANDLE 401 UNAUTHORIZED
        if (response.status === 401) {
            console.error("⛔ Session expired or invalid token. Redirecting...");
            // Optional: Clear bad token
            localStorage.removeItem('token'); 
            // Redirect to login page (adjust path if needed)
            window.location.href = '/login'; 
            return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        const transformedData: Announcement[] = Array.isArray(data)
          ? data.map((item: RawAnnouncement) => {
              // Create a date object safely
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
                deadline: item.deadline || item.end_date || item.endDate || item.date || new Date().toISOString(),
                displayDate: item.displayDate || dateObj.toLocaleDateString(),
                time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                
                hasGuidelines: item.hasGuidelines || item.has_guidelines || false,
                needsRevision: item.needs_revision || false
              };
            })
          : [];

        setAllAnnouncements(transformedData);
      } catch (err) {
        console.error('FETCH ERROR:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch announcements'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    const query = searchQuery.toLowerCase();
    
    const title = announcement.title?.toLowerCase() || '';
    const description = announcement.description?.toLowerCase() || '';
    const category = announcement.category?.toLowerCase() || '';
    const type = announcement.type?.toLowerCase() || '';
    
    const matchesSearch = 
      title.includes(query) ||
      description.includes(query) ||
      category.includes(query) ||
      type.includes(query);

    if (needRevisionChecked) {
        return matchesSearch && announcement.needsRevision === true;
    }

    return matchesSearch;
  });

  const handleBackClick = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/dashboard'; 
    }
  };

  const handleGuidelinesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("Opening Guidelines Interface...");
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; badge: string; docBg: string; docBorder: string; megaphone: string } } = {
      purple: {
        bg: "bg-purple-700",
        border: "border-purple-400",
        text: "text-white",
        badge: "bg-purple-500",
        docBg: "bg-purple-100",
        docBorder: "border-purple-300",
        megaphone: "text-purple-500 fill-purple-300 stroke-purple-600",
      },
      blue: {
        bg: "bg-blue-600",
        border: "border-blue-400",
        text: "text-white",
        badge: "bg-blue-500",
        docBg: "bg-blue-100",
        docBorder: "border-blue-300",
        megaphone: "text-blue-500 fill-blue-300 stroke-blue-600",
      },
      green: {
        bg: "bg-green-600",
        border: "border-green-400",
        text: "text-white",
        badge: "bg-green-600",
        docBg: "bg-green-100",
        docBorder: "border-green-300",
        megaphone: "text-green-500 fill-green-300 stroke-green-600",
      },
      orange: {
        bg: "bg-orange-500",
        border: "border-orange-400",
        text: "text-white",
        badge: "bg-orange-600",
        docBg: "bg-orange-100",
        docBorder: "border-orange-300",
        megaphone: "text-orange-500 fill-orange-300 stroke-orange-600",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4">
      <div className="w-[95%] xl:w-[85%] h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        
        <URDSSidebar />

        <div className="flex-1 flex flex-col overflow-y-auto h-full">
          {/* Header */}
          <header className="p-6 border-b border-gray-200">
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
                <p className="text-sm mt-2 text-gray-500">Please log in again or check your connection.</p>
              </div>
            ) : filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No announcements found matching &ldquo;{searchQuery}&rdquo;</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => {
                const colors = getColorClasses(announcement.color);
                return (
                  <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    
                    <div className={`${colors.bg} ${colors.text} px-4 py-2 font-semibold text-sm flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <Bell size={16} />
                        {announcement.type}
                      </div>
                      {announcement.needsRevision && (
                         <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Action Required</span>
                      )}
                    </div>

                    <div className="flex gap-6 p-5 items-start">
                      <div className={`flex flex-col items-center justify-center w-24 h-24 ${colors.bg} text-white font-bold rounded-xl shadow-inner shrink-0`}>
                        <Calendar size={20} className="mb-1 opacity-80" />
                        {/* Safe date parsing display */}
                        <span className="text-xs uppercase opacity-90">
                            {new Date(announcement.date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-2xl">
                            {new Date(announcement.date).getDate()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                {announcement.title && (
                                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{announcement.title}</h3>
                                )}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                {announcement.description}
                                </p>
                            </div>
                            
                            {announcement.needsRevision && (
                                <div className="flex items-center gap-2 ml-4 shrink-0 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                                    <input
                                    type="checkbox"
                                    id={`needRevision-${announcement.id}`}
                                    checked={needRevisionChecked}
                                    onChange={(e) => setNeedRevisionChecked(e.target.checked)}
                                    className="accent-red-500 w-4 h-4 cursor-pointer"
                                    />
                                    <label htmlFor={`needRevision-${announcement.id}`} className="text-red-600 font-bold text-xs cursor-pointer">
                                    NEEDS REVISION
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 text-xs text-gray-500 mt-4 items-center flex-wrap">
                          <span className={`px-2 py-1 rounded-md ${colors.badge} text-white flex items-center gap-1 font-medium`}>
                            <FileText size={12} />
                            {announcement.category}
                          </span>
                          
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{announcement.time}</span>
                          </div>

                          {announcement.hasGuidelines && (
                            <a
                              href="#"
                              onClick={handleGuidelinesClick}
                              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center gap-1 ml-auto"
                            >
                              <FileText size={12} />
                              View Guidelines
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="hidden md:flex w-[80px] h-[80px] relative items-center justify-center shrink-0">
                        <div className={`absolute inset-0 ${colors.docBg} rounded-xl border-2 ${colors.docBorder} rotate-3`}></div>
                        <div className={`absolute inset-0 ${colors.docBg} rounded-xl border-2 ${colors.docBorder} -rotate-2 bg-opacity-50`}></div>
                        <div className="relative z-10">
                          <Megaphone size={32} className={colors.megaphone} />
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