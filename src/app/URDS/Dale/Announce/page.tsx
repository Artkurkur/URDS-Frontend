'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

interface Announcement {
  id: number;
  category: string;
  categoryColor: string;
  time: string;
  timeColor: string;
  title: string;
  deadline: string;
  status: string;
  date: string;
  type: string;
}

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch announcements from API
  useEffect(() => {
    fetchAnnouncements();
  }, [activeTab]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await fetch(`/api/announcements?tab=${activeTab}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      
      const data = await response.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'all', label: 'All Inboxes' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Announcement"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Post
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-medium">Error loading announcements</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No announcements found</p>
          </div>
        )}

        {/* Announcements List */}
        {!loading && !error && filteredAnnouncements.length > 0 && (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                  index === 0 ? 'border-4 border-green-400' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Category Badge and Time */}
                    <div className="flex flex-col items-center gap-3 flex-shrink-0">
                      <span className={`${announcement.categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap`}>
                        {announcement.category}
                      </span>
                      <div className={`${announcement.timeColor} text-white rounded-2xl px-4 py-3 text-center min-w-[100px]`}>
                        <div className="text-xs font-medium whitespace-pre-line">
                          {announcement.time}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-gray-900 font-medium leading-relaxed mb-2">
                            {announcement.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">📅</span>
                              <span>Deadline: {announcement.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">📋</span>
                              <span>{announcement.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-6xl ml-4">
                          📢
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-500">{announcement.date}</span>
                        <span className="text-sm font-medium text-gray-700">{announcement.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}