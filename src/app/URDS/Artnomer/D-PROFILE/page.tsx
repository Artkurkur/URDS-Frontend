'use client'

import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Building2, MapPin, Calendar, Edit2, Save, X, Camera, Loader2 } from 'lucide-react';
import URDSSidebar from '@/components/urds-director/sidebar';

interface ProfileData {
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  department: string;
  college: string;
  position: string;
  office: string;
  dateJoined: string;
  profileImage?: string;
}

interface StatsData {
  totalSubmissions: number;
  pendingReview: number;
  approved: number;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    middleName: '',
    username: '',
    department: '',
    college: '',
    position: '',
    office: '',
    dateJoined: '',
    profileImage: ''
  });
  const [stats, setStats] = useState<StatsData>({
    totalSubmissions: 0,
    pendingReview: 0,
    approved: 0
  });

  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
    fetchStatsData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/profile');
      const data = await response.json();
      
      setProfile(data);
      setEditedProfile(data);
      setImagePreview(data.profileImage || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatsData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/profile/stats');
      const data = await response.json();
      
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
    setImagePreview(profile.profileImage || '');
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // If there's a new image, upload it first
      let imageUrl = editedProfile.profileImage;
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        // Replace with your actual image upload endpoint
        const imageResponse = await fetch('/api/profile/upload-image', {
          method: 'POST',
          body: formData
        });
        const imageData = await imageResponse.json();
        imageUrl = imageData.imageUrl;
      }

      // Update profile with new data
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedProfile,
          profileImage: imageUrl
        })
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfile(updatedData);
        setIsEditing(false);
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error appropriately
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setImagePreview(profile.profileImage || '');
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFullName = () => {
    return `${profile.firstName} ${profile.middleName} ${profile.lastName}`.trim();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 text-gray-800 font-sans selection:bg-red-500/20">
      {/* Sidebar */}
      <URDSSidebar />

      {/* Header */}
      <div className="bg-transparent border-b border-stone-200 px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src="/images/logo/URDS-logo.png" alt="URDS Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Profile Settings</h1>
              <p className="text-sm text-slate-500">University of Eastern Philippines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div 
                    className={`w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-4 overflow-hidden ${isEditing ? 'cursor-pointer' : ''}`}
                    onClick={handleImageClick}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity mb-4"
                      onClick={handleImageClick}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {isEditing && (
                  <p className="text-xs text-slate-500 mb-4">Click to change profile picture</p>
                )}
                <h2 className="text-xl font-semibold text-slate-800 mb-1">{getFullName() || 'Loading...'}</h2>
                <p className="text-sm text-slate-500 mb-4">{profile.position}</p>
                <div className="w-full pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <Building2 className="w-4 h-4" />
                    <span>{profile.department}/{profile.college}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {profile.dateJoined}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 space-y-3">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">{stats.totalSubmissions}</div>
                <div className="text-sm text-slate-300">Total Submissions</div>
              </div>
              <div className="bg-blue-500 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">{stats.pendingReview}</div>
                <div className="text-sm text-blue-100">Pending Review</div>
              </div>
              <div className="bg-orange-500 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">{stats.approved}</div>
                <div className="text-sm text-orange-100">Approved</div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
                      <User className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">{profile.firstName}</span>
                    </div>
                  )}
                </div>

                {/* Middle Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Middle Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.middleName}
                      onChange={(e) => handleChange('middleName', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
                      <User className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">{profile.middleName}</span>
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
                      <User className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">{profile.lastName}</span>
                    </div>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">{profile.username}</span>
                    </div>
                  )}
                </div>

                {/* Department/College */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Department/College
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={`${editedProfile.department}/${editedProfile.college}`}
                      onChange={(e) => {
                        const value = e.target.value;
                        const parts = value.split('/');
                        handleChange('department', parts[0] || '');
                        handleChange('college', parts[1] || '');
                      }}
                      placeholder="Department/College"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
                      <Building2 className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">{profile.department}/{profile.college}</span>
                    </div>
                  )}
                </div>

                {/* Office Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Office Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.office}
                      onChange={(e) => handleChange('office', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">{profile.office}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mt-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Security Settings</h3>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition text-slate-700">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition text-slate-700">
                  Login History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}