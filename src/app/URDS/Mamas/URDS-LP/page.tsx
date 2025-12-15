'use client';

import URDSSidebar from '@/components/urds-director/sidebar';
import { useState } from 'react';
import {
  Clock, FileText, Plus, Pencil, Eye, Trash2, Megaphone,
  X, Calendar, Search, ChevronDown, Filter
} from 'lucide-react';
import { apiFetch } from "@/lib/api";
import { useEffect } from "react";


const filterOptions = ['All', 'Today', 'This Week', 'This Month', 'This Year', 'Specific Date'];

interface Announcement {
  id: string;
  title: string;
  description: string;
  startDate: string;
  deadline: string;
  guidelines: string;
  status: 'active' | 'upcoming' | 'closed';
  createdAt: string;
}

export default function URDSDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [specificYear, setSpecificYear] = useState(new Date().getFullYear());
  
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    deadline: '',
    guidelines: ''
  });

  const handleFilterSelect = (filter: string) => {
    if (filter === 'Specific Date') setIsDateModalOpen(true);
    else setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const handleSpecificYearSubmit = () => {
    setSelectedFilter(specificYear.toString());
    setIsDateModalOpen(false);
  };

  const handleAnnouncementClick = (id: string) => {
    setSelectedAnnouncementId(selectedAnnouncementId === id ? null : id);
  };

  const handleEdit = (e: React.MouseEvent, announcement: Announcement) => {
    e.stopPropagation();
    setIsEditMode(true);
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      description: announcement.description,
      startDate: announcement.startDate,
      deadline: announcement.deadline,
      guidelines: announcement.guidelines
    });
    setIsModalOpen(true);
    setSelectedAnnouncementId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
      setSelectedAnnouncementId(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!formData.title || !formData.description || !formData.startDate || !formData.deadline) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    if (isEditMode && editingId) {
      // UPDATE
      const updated = await apiFetch(
  `http://192.168.254.142:5000/api/announcements/${editingId}`,
  {
    method: "PUT",
    body: JSON.stringify({
      proposal_title: formData.title,
      description: formData.description,
      start_date: formData.startDate,
      deadline: formData.deadline,
      guidelines_attachment: formData.guidelines
    }),
  }
);

      setAnnouncements(prev =>
        prev.map(ann =>
          ann.id === editingId ? updated : ann
        )
      );
    } else {
      // CREATE
    const created = await apiFetch(
  "http://192.168.254.142:5000/api/announcements",
  {
    method: "POST",
    body: JSON.stringify({
      proposal_title: formData.title,          // ✅ FIX
      description: formData.description,
      start_date: formData.startDate,           // ✅ FIX
      deadline: formData.deadline,
      guidelines_attachment: formData.guidelines
    }),
  }
);

      setAnnouncements(prev => [created, ...prev]);
    }

    // Reset UI
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      deadline: "",
      guidelines: ""
    });

  } catch (error) {
    console.error(error);
    alert("Failed to save announcement");
  }
};


  const getStatusBadge = (announcement: Announcement) => {
    const today = new Date();
    const start = new Date(announcement.startDate);
    const end = new Date(announcement.deadline);
    
    if (today < start) return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700' };
    if (today > end) return { label: 'Closed', color: 'bg-gray-100 text-gray-700' };
    return { label: 'Active', color: 'bg-green-100 text-green-700' };
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ann.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (selectedFilter === 'All') return true;
    
    const today = new Date();
    const startDate = new Date(ann.startDate);
    
    switch (selectedFilter) {
      case 'Today':
        return startDate.toDateString() === today.toDateString();
      case 'This Week': {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return startDate >= weekAgo;
      }
      case 'This Month':
        return startDate.getMonth() === today.getMonth() && 
               startDate.getFullYear() === today.getFullYear();
      case 'This Year':
        return startDate.getFullYear() === today.getFullYear();
      default:
        return startDate.getFullYear().toString() === selectedFilter;
    }
  });

  const latestAnnouncement = announcements.length > 0 
    ? announcements.reduce((latest, current) => 
        new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
      )
    : null;

useEffect(() => {
  async function loadAnnouncements() {
    try {
      const data = await apiFetch(
        "http://192.168.254.142:5000/api/announcements"
      );

      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.proposal_title,          // ✅ FIX
        description: item.description,
        startDate: item.start_date,           // ✅ FIX
        deadline: item.deadline,
        guidelines: item.guidelines_attachment,
        status: item.status,
        createdAt: item.timestamp,
      }));

      setAnnouncements(mapped);
    } catch (err) {
      console.error(err);
    }
  }

  loadAnnouncements();
}, []);
  return (
    <>
      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col md:flex-row">
        <URDSSidebar />

        <div className="flex-1 w-full md:ml-28 p-4 md:p-6">
          <div className="max-w-full md:max-w-6xl mx-auto">

            {/* Header */}
            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  University Research & Development Services
                </h1>

                <div className="w-16 h-16 rounded-full bg-gradient-to-br hidden md:flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/logo/UEPlogo.png"
                    alt="UEP Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>

              {/* Announcement Banner */}
              {latestAnnouncement && (
                <div className="relative">
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                    New Announcement
                  </span>

                  <div
                    onClick={() => handleAnnouncementClick(latestAnnouncement.id)}
                    className={`relative bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-100 cursor-pointer transition-all duration-300 ${
                      selectedAnnouncementId === latestAnnouncement.id
                        ? 'brightness-90 ring-2 ring-blue-400'
                        : 'hover:brightness-95'
                    }`}
                  >
                    {selectedAnnouncementId === latestAnnouncement.id && (
                      <>
                        <div
                          onClick={(e) => handleEdit(e, latestAnnouncement)}
                          className="absolute -top-3 right-20 bg-white rounded-xl shadow-lg p-3 z-20 hover:bg-blue-50 hover:scale-110 transition-all duration-200 cursor-pointer border border-gray-100"
                        >
                          <Pencil className="w-5 h-5 text-blue-500" />
                        </div>

                        <div
                          onClick={(e) => handleDelete(e, latestAnnouncement.id)}
                          className="absolute -top-3 right-6 bg-white rounded-xl shadow-lg p-3 z-20 hover:bg-red-50 hover:scale-110 transition-all duration-200 cursor-pointer border border-gray-100"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </div>
                      </>
                    )}

                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center min-w-16 flex-shrink-0">
                      <div className="text-xs">
                        {new Date(latestAnnouncement.startDate).toDateString() === new Date().toDateString() 
                          ? 'TODAY' 
                          : new Date(latestAnnouncement.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xl font-bold">
                        {new Date(latestAnnouncement.createdAt).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: false 
                        })}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{latestAnnouncement.title}</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        {latestAnnouncement.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Deadline: {new Date(latestAnnouncement.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Guidelines Available
                        </span>
                      </div>
                    </div>

                    <button className="text-blue-600 text-sm hover:underline whitespace-nowrap mt-2 sm:mt-0">
                      View All
                    </button>

                    <div className="hidden md:block">
                      <Megaphone className="w-16 h-16 text-orange-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Director Dashboard */}
            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  URDS DIRECTOR DASHBOARD
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm transition-colors">
                    Submissions
                  </button>

                  <button
                    onClick={() => {
                      setIsEditMode(false);
                      setFormData({
                        title: '',
                        description: '',
                        startDate: '',
                        deadline: '',
                        guidelines: ''
                      });
                      setIsModalOpen(true);
                    }}
                    className="group flex items-center gap-2 text-gray-600 hover:text-white bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 px-4 py-2 rounded-full transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    <span className="text-sm">Create New Call For Proposals</span>
                  </button>
                </div>
              </div>

              {/* Search + Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search Announcements..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors min-w-48"
                  >
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm flex-1 text-left">
                      {selectedFilter}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        isFilterOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isFilterOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                      {filterOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => handleFilterSelect(option)}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${
                            selectedFilter === option
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700'
                          }`}
                        >
                          {option === 'Specific Date' && <Calendar className="w-4 h-4" />}
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* TABLE */}
              <div className="border border-gray-200 rounded-2xl overflow-x-auto">
                <table className="w-full min-w-[600px] md:min-w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                        Title
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Start Date
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Deadline
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnnouncements.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-gray-400"
                        >
                          No proposals yet. Click "Create New Call For Proposals" to add one.
                        </td>
                      </tr>
                    ) : (
                      filteredAnnouncements.map((announcement) => {
                        const status = getStatusBadge(announcement);
                        return (
                          <tr key={announcement.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">
                              {announcement.title}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600">
                              {new Date(announcement.startDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600">
                              {new Date(announcement.deadline).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                {status.label}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => handleEdit(e, announcement)}
                                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4 text-blue-600" />
                                </button>
                                <button
                                  onClick={(e) => handleDelete(e, announcement.id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                                <button
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------- */}
      {/*     MODAL (Create New Call for Proposal)  */}
      {/* ---------------------------------------- */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditMode ? "Edit Call for Proposal" : "Create New Call for Proposal"}
            </h2>

            {/* FORM */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title of Call <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Research Proposals for Academic Year 2024-2025"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description / Guidelines <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl h-40 focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Provide detailed information about the call for proposals..."
                ></textarea>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Attachments (PDF Guidelines, Forms)
                </label>
                <input
                  type="file"
                  name="guidelines"
                  className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                {isEditMode ? "Save Changes" : "Post Announcement"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Year</h3>
            
            <input
              type="number"
              value={specificYear}
              onChange={(e) => setSpecificYear(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              min="2000"
              max="2100"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsDateModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSpecificYearSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}