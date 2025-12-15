'use client';

import URDSSidebar from '@/components/urds-director/sidebar';
import ResearchRecordItem from '@/components/ResearchRecordItem';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ResearchRecord {
  id: string;
  title: string;
  department: string;
  status: 'ongoing' | 'approved';
  date: string;
}

interface UserProfile {
  name: string;
  university: string;
  role: string;
  department: string;
  email: string;
  profileImage: string;
}

interface DashboardMetrics {
  announcements: number;
  myFiles: number;
}

interface FacultyDashboardProps {
  userProfile?: UserProfile;
  metrics?: DashboardMetrics;
  researchRecords?: ResearchRecord[];
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({
  userProfile,
  metrics,
  researchRecords: initialResearchRecords
}) => {
  const router = useRouter();
  const [profile] = useState<UserProfile>(userProfile || {
    name: '',
    university: '',
    role: '',
    department: '',
    email: '',
    profileImage: '/images/sampleprofile.png'
  });
  const [dashboardMetrics] = useState<DashboardMetrics>(metrics || {
    announcements: 0,
    myFiles: 0
  });
  const [researchRecords] = useState<ResearchRecord[]>(initialResearchRecords || []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    // Fetch user profile data
    // fetchUserProfile();
    
    // Fetch dashboard metrics
    // fetchDashboardMetrics();
    
    // Fetch research records
    // fetchResearchRecords();
  }, []);

  const handleAnnouncementsClick = () => {
    router.push('/URDS/Gerald/FRD-ANNOUNCEMENT');
  };

  const handleMyFilesClick = () => {
    router.push('/URDS/Gerald/FRD-FILES');
  };

  const handleFeedbackClick = () => {
    router.push('/feed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6fa] to-[#e0e8f3] flex">
      
      {/* Sidebar - Fixed position */}
      <div className="fixed left-0 top-0 h-screen z-10">
        <URDSSidebar />
      </div>

      {/* MAIN CONTENT - With left margin to account for sidebar */}
      <main className="flex-1 ml-[100px] p-5">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-8 min-h-[calc(100vh-40px)] max-w-[1600px] mx-auto">

          {/* HEADER */}
          <header className="mb-6">
            <div className="text-sm font-extrabold text-gray-600 mb-3">Faculty Researcher</div>

            <div className="bg-white rounded-[2rem] shadow-md py-6 border border-gray-100">

              {/* Profile Section */}
              <div className="px-8 pb-6 border-b border-gray-200 mb-6 relative">
                <div className="flex gap-5 items-start">

                  <Image
                    src={profile.profileImage}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover flex-shrink-0"
                  />

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">{profile.name}</h1>
                    <p className="text-xs text-purple-600 font-semibold mb-4">
                      {profile.university}
                    </p>

                    <div className="flex gap-8 text-sm flex-wrap">
                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          <i className="fas fa-id-badge mr-1"></i>Role
                        </span>
                        <span className="font-semibold text-gray-800">{profile.role}</span>
                      </div>

                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          <i className="fas fa-building mr-1"></i>Department
                        </span>
                        <span className="font-semibold text-gray-800">{profile.department}</span>
                      </div>

                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          <i className="fas fa-envelope mr-1"></i>Email
                        </span>
                        <span className="font-semibold text-gray-800">{profile.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings + Logo */}
                <div className="absolute top-0 right-8 flex flex-col items-end gap-4">
                  <div className="flex gap-4">
                    <i className="fas fa-cog text-2xl text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"></i>
                    <i className="fas fa-sign-out-alt text-2xl text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"></i>
                  </div>

                  <Image
                    src="/images/logo/UEPlogo.png"
                    width={50}
                    height={50}
                    alt="UEP Logo"
                    className="w-12 h-12 rounded-full mt-4 shadow-md object-cover"
                  />
                </div>
              </div>

              {/* METRICS */}
              <section className="flex gap-4 px-8">
                <div 
                  onClick={handleAnnouncementsClick}
                  className="flex items-center flex-1 p-4 px-6 bg-white border-l-4 border-l-blue-500 border border-gray-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <i className="fas fa-bullhorn text-4xl text-blue-500 mr-4"></i>
                  <div>
                    <span className="text-2xl font-bold text-gray-800 block">{dashboardMetrics.announcements}</span>
                    <span className="text-sm text-gray-600">Announcements</span>
                  </div>
                </div>

                <div 
                  onClick={handleMyFilesClick}
                  className="flex items-center flex-1 p-4 px-6 bg-white border-l-4 border-l-orange-400 border border-gray-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <i className="fas fa-folder text-4xl text-orange-400 mr-4"></i>
                  <div>
                    <span className="text-2xl font-bold text-gray-800 block">{dashboardMetrics.myFiles}</span>
                    <span className="text-sm text-gray-600">My Files</span>
                  </div>
                </div>

                <div 
                  onClick={handleFeedbackClick}
                  className="flex items-center flex-1 p-4 px-6 bg-white border-l-4 border-l-purple-600 border border-gray-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <i className="fas fa-comments text-4xl text-purple-600 mr-4"></i>
                  <div>
                    <span className="text-sm text-gray-600">Feedback</span>
                  </div>
                </div>
              </section>
            </div>
          </header>

          {/* RESEARCH RECORDS */}
          <section className="bg-white rounded-[2rem] p-6 shadow-md border border-gray-100">
            <div className="mb-6">
              <h2 className="inline-block bg-gradient-to-r from-[#c7d2fe] to-[#fbcfe8] py-2 px-6 rounded-2xl text-xl font-semibold text-gray-800">
                Submitted Research Records
              </h2>
            </div>

            <div className="space-y-4">
              {researchRecords.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No research records found
                </div>
              ) : (
                researchRecords.map((record) => (
                  <ResearchRecordItem
                    key={record.id}
                    title={record.title}
                    department={record.department}
                    status={record.status}
                    dateSubmitted={record.date}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default FacultyDashboard;