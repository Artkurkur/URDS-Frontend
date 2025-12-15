'use client';

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import AnnouncementBanner from '@/components/urds-director/AnnouncementBanner';
import URDSSidebar from '@/components/urds-director/sidebar';

export interface Announcement {
  id: string;
  title: string;
  date: string;
  timestamp?: string;
  time?: string;
  deadline?: string;
  hasGuidelines?: boolean;
  displayDate?: string;
}

const AnnouncementInterface = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Research Proposals for Academic Year 2024-2025',
      date: '2025-10-12',
      deadline: '2025-10-13',
      hasGuidelines: true,
      displayDate: 'Oct 12, 2025'
    },
    {
      id: '2',
      title: 'Upcoming URDS Seminar',
      date: '2025-09-25',
      deadline: '2025-09-28',
      hasGuidelines: false,
      displayDate: 'Sep 25, 2025'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Inboxes' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const filterAnnouncements = () => {
    const now = new Date();
    return allAnnouncements
      .filter(a => a && a.date && !isNaN(new Date(a.date).getTime()))
      .filter(a => {
        const d = new Date(a.date);
        switch (selectedFilter) {
          case 'week':
            const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7); return d >= weekAgo;
          case 'month':
            const monthAgo = new Date(now); monthAgo.setMonth(now.getMonth() - 1); return d >= monthAgo;
          case 'year':
            return d.getFullYear() === now.getFullYear();
          case '2024': case '2023': case '2022':
            return d.getFullYear() === Number(selectedFilter);
          default: return true;
        }
      })
      .filter(a => a.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const announcements = filterAnnouncements();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800">
      <URDSSidebar />
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">ANNOUNCEMENTS</h1>
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search Announcement"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-gray-50 w-full sm:w-auto"
              >
                {filterOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
              {allAnnouncements.length}+
            </div>
          </div>
        </div>

        {/* Announcement List */}
        <div className="p-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          {announcements.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-2xl font-semibold mb-2">No Announcements Yet</p>
              <p className="text-base">Announcements will appear here when available</p>
            </div>
          ) : (
            announcements.map((a) => (
              <AnnouncementBanner
                key={a.id}
                title={a.title}
                description={a.title}
                startDate={a.date}
                deadline={a.deadline || a.date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementInterface;
