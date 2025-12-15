'use client';
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, RefreshCw, X } from 'lucide-react';
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
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    deadline: '',
  });
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState<Announcement | null>(null);

  const filterOptions = [
    { value: 'all', label: 'All Inboxes' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ];

  // Helper function to get auth headers
  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  /* ===================== FETCH ANNOUNCEMENTS ===================== */
  const fetchAnnouncements = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = 'http://192.168.254.142:5000/api/announcements';
      console.log('🔄 Fetching announcements from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const transformedData: Announcement[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id:
              item.id ||
              item._id ||
              String(item.announcement_id || Math.random()),
            title: item.title || item.announcement_title || 'Untitled',
            date:
              item.startDate ||
              item.start_date ||
              item.date ||
              item.created_at ||
              new Date().toISOString(),
            deadline:
              item.deadline ||
              item.end_date ||
              item.endDate ||
              item.date ||
              new Date().toISOString(),
            hasGuidelines:
              item.hasGuidelines || item.has_guidelines || false,
            displayDate: item.displayDate,
          }))
        : [];
      setAllAnnouncements(transformedData);
    } catch (err) {
      console.error('💥 FETCH ERROR:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch announcements'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ===================== POST ANNOUNCEMENT ===================== */
  const handlePostAnnouncement = async (announcementData: any) => {
    try {
      const response = await fetch(
        'http://192.168.254.142:5000/api/announcements',
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(announcementData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to post announcement');
      }
      console.log('✅ Announcement posted successfully');
      await fetchAnnouncements();
      return true;
    } catch (err) {
      console.error('❌ Post error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to post announcement'
      );
      return false;
    }
  };

  /* ===================== UPDATE ANNOUNCEMENT ===================== */
  const handleUpdateAnnouncement = async () => {
    if (!editingAnnouncement) return;
    try {
      const response = await fetch(
        `http://192.168.254.142:5000/api/announcements/${editingAnnouncement.id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            title: editForm.title,
            startDate: editForm.date,
            deadline: editForm.deadline,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update announcement');
      }
      console.log('✅ Announcement updated successfully');
      setIsEditModalOpen(false);
      setEditingAnnouncement(null);
      await fetchAnnouncements();
    } catch (err) {
      console.error('❌ Update error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update announcement'
      );
    }
  };

  /* ===================== DELETE ANNOUNCEMENT ===================== */
  const handleDeleteAnnouncement = async () => {
    if (!deletingAnnouncement) return;
    try {
      const response = await fetch(
        `http://192.168.254.142:5000/api/announcements/${deletingAnnouncement.id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete announcement');
      }
      console.log('✅ Announcement deleted successfully');
      setIsDeleteModalOpen(false);
      setDeletingAnnouncement(null);
      await fetchAnnouncements();
    } catch (err) {
      console.error('❌ Delete error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete announcement'
      );
    }
  };

  /* ===================== FETCH ON MOUNT ===================== */
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  /* ===================== FILTER LOGIC ===================== */
  const filterAnnouncements = () => {
    const now = new Date();
    return allAnnouncements
      .filter(
        (a) => a && a.date && !isNaN(new Date(a.date).getTime())
      )
      .filter((a) => {
        const d = new Date(a.date);
        switch (selectedFilter) {
          case 'week': {
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            return d >= weekAgo;
          }
          case 'month': {
            const monthAgo = new Date(now);
            monthAgo.setMonth(now.getMonth() - 1);
            return d >= monthAgo;
          }
          case 'year':
            return d.getFullYear() === now.getFullYear();
          case '2024':
          case '2023':
          case '2022':
            return d.getFullYear() === Number(selectedFilter);
          default:
            return true;
        }
      })
      .filter((a) =>
        a.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const announcements = filterAnnouncements();

  /* ===================== RENDER ===================== */
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800">
      <URDSSidebar />
      <div className="flex-1 w-full md:ml-28 p-4 md:p-6">
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* HEADER */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">ANNOUNCEMENTS</h1>
              <div className="flex gap-2">
                <div className="relative w-80">
                  <input
                    type="text"
                    placeholder="Search Announcement"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                <button
                  onClick={fetchAnnouncements}
                  disabled={isLoading}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${
                      isLoading ? 'animate-spin' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                {filterOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                {allAnnouncements.length}+
              </div>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 border p-4 rounded-lg text-red-600">
                {error}
              </div>
            )}
          </div>
          {/* LIST */}
          <div className="p-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-20">
                <RefreshCw className="animate-spin mx-auto mb-4" />
                Loading announcements...
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No Announcements Yet
              </div>
            ) : (
              announcements.map((a) => (
                <AnnouncementBanner
                  key={a.id}
                  title={a.title}
                  description={a.title}
                  startDate={a.date}
                  deadline={a.deadline || a.date}
                  onEdit={() => {
                    setEditingAnnouncement(a);
                    setEditForm({
                      title: a.title,
                      date: a.date,
                      deadline: a.deadline || a.date,
                    });
                    setIsEditModalOpen(true);
                  }}
                  onDelete={() => {
                    setDeletingAnnouncement(a);
                    setIsDeleteModalOpen(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ===================== EDIT MODAL ===================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-translate bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Edit Announcement</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={editForm.date.split('T')[0]}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={editForm.deadline.split('T')[0]}
                  onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateAnnouncement}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DELETE MODAL ===================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-red-600">Delete Announcement</h2>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Are you sure you want to delete this announcement?
              </p>
              <p className="font-semibold mt-2 text-gray-900">
                "{deletingAnnouncement?.title}"
              </p>
              <p className="text-sm text-gray-500 mt-4">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAnnouncement}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementInterface;