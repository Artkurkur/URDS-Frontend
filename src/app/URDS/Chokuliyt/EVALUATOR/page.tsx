"use client";

import React, { useState, useEffect } from 'react';
import { Eye, Megaphone } from 'lucide-react';
import URDSSidebar from '@/components/Evaluator/sidebar';

interface Submission {
  id: number;
  name: string;
  email: string;
  college: string;
  researchTitle: string;
  status: string;
  submittedDate: string;
  statusColor: string;
}

interface Announcement {
  id: number;
  title: string;
  deadline: string;
  time: string;
  date: string;
}

interface DashboardStats {
  totalSubmissions: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

interface UserProfile {
  name: string;
  role: string;
  college: string;
  profilePicture: string;
}

export default function ResearchCoordinator() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmissions: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Loading...',
    role: 'Loading...',
    college: 'Loading...',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch submissions from database
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/submissions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        
        const data = await response.json();
        setSubmissions(data);
        
        // Calculate stats from fetched data
        const total = data.length;
        const pending = data.filter((s: Submission) => s.statusColor === 'pending').length;
        const approved = data.filter((s: Submission) => s.statusColor === 'approved').length;
        const rejected = data.filter((s: Submission) => s.statusColor === 'rejected').length;
        
        setStats({
          totalSubmissions: total,
          pendingCount: pending,
          approvedCount: approved,
          rejectedCount: rejected
        });
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Fetch user profile from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch latest announcement from database
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('/api/announcements/latest');
        
        if (!response.ok) {
          throw new Error('Failed to fetch announcement');
        }
        
        const data = await response.json();
        setAnnouncement(data);
      } catch (err) {
        console.error('Error fetching announcement:', err);
      }
    };

    fetchAnnouncement();
  }, []);

  // Filter submissions based on selected status
  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.statusColor === filterStatus);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800 font-sans selection:bg-red-500/20">
      {/* Sidebar */}
      <URDSSidebar />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden">
                {userProfile.profilePicture ? (
                  <img 
                    src={userProfile.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">👤</span>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">{userProfile.role}</h1>
              <div className="flex items-center gap-2 mt-1">
                <img src="/images/logo/UEPlogo.png" alt="UEP Logo" className="w-8 h-8 object-contain" />
                <div>
                  <p className="text-sm font-medium text-gray-700">UNIVERSITY OF EASTERN PHILIPPINES</p>
                  <p className="text-xs text-gray-500">{userProfile.name} • {userProfile.role}, {userProfile.college}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`bg-gray-900 rounded-2xl p-4 text-center text-white transition-all hover:scale-105 ${
                filterStatus === 'all' ? 'ring-4 ring-gray-400' : ''
              }`}
              disabled={loading}
            >
              <div className="text-3xl font-bold">{stats.totalSubmissions}</div>
              <div className="text-sm mt-1">Total Submissions</div>
            </button>
            <button 
              onClick={() => setFilterStatus('pending')}
              className={`bg-blue-400 rounded-2xl p-4 text-center text-white transition-all hover:scale-105 ${
                filterStatus === 'pending' ? 'ring-4 ring-blue-600' : ''
              }`}
              disabled={loading}
            >
              <div className="text-3xl font-bold">{stats.pendingCount}</div>
              <div className="text-sm mt-1">Pending Evaluator Review</div>
            </button>
            <button 
              onClick={() => setFilterStatus('approved')}
              className={`bg-orange-400 rounded-2xl p-4 text-center text-white transition-all hover:scale-105 ${
                filterStatus === 'approved' ? 'ring-4 ring-orange-600' : ''
              }`}
              disabled={loading}
            >
              <div className="text-3xl font-bold">{stats.approvedCount}</div>
              <div className="text-sm mt-1">Evaluator Approved</div>
            </button>
            <button 
              onClick={() => setFilterStatus('rejected')}
              className={`bg-red-400 rounded-2xl p-4 text-center text-white transition-all hover:scale-105 ${
                filterStatus === 'rejected' ? 'ring-4 ring-red-600' : ''
              }`}
              disabled={loading}
            >
              <div className="text-3xl font-bold">{stats.rejectedCount}</div>
              <div className="text-sm mt-1">Evaluator Rejected</div>
            </button>
          </div>

          {/* Active Indicator Line */}
          <div className="relative h-1 mt-4 bg-gray-200 rounded-full">
            <div 
              className={`absolute h-full rounded-full transition-all duration-300 ${
                filterStatus === 'all' ? 'bg-gray-900 w-1/4 left-0' :
                filterStatus === 'pending' ? 'bg-blue-500 w-1/4 left-1/4' :
                filterStatus === 'approved' ? 'bg-orange-500 w-1/4 left-2/4' :
                'bg-red-500 w-1/4 left-3/4'
              }`}
            ></div>
          </div>
        </div>


        {/* Announcement Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">New Announcement</span>
          </div>
          
          {announcement ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 text-white rounded-lg px-4 py-2">
                  <div className="text-xs">{announcement.time}</div>
                  <div className="text-2xl font-bold">{announcement.date}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {announcement.title}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span>📅 Deadline: {announcement.deadline}</span>
                    <span>📋 Guidelines Available</span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button className="px-4 py-1.5 border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-lg font-medium text-sm transition-colors">
                      View All
                    </button>
                    <button className="px-4 py-1.5 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-6xl">📢</div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
              No announcements available
            </div>
          )}
        </div>

        {/* Faculty Submissions Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Faculty Submissions - College Engineering
              {filterStatus !== 'all' && (
                <span className="ml-2 text-sm font-normal text-gray-600">
                  (Showing {filteredSubmissions.length} {filterStatus} submission{filteredSubmissions.length !== 1 ? 's' : ''})
                </span>
              )}
            </h2>
            {filterStatus !== 'all' && (
              <button 
                onClick={() => setFilterStatus('all')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filter
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading submissions...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No submissions found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Faculty Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">College</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Research Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Call</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Submitted Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{submission.name}</div>
                        <div className="text-sm text-gray-500">{submission.email}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{submission.college}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{submission.researchTitle}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{submission.status}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{submission.submittedDate}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            submission.statusColor === 'pending' ? 'bg-yellow-400' : 
                            submission.statusColor === 'approved' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium capitalize">{submission.statusColor}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}