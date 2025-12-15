'use client';

import URDSSidebar from '@/components/FacultyResearcher/sidebar';
import React, { useEffect } from 'react';
import Image from 'next/image';
import ResearchModal from '@/components/FRS/modal';
import { useRouter } from 'next/navigation';

interface ResearchRecord {
  id: string;
  title: string;
  department: string;
  status: 'ongoing' | 'approved';
  date: string;
}

const FacultyDashboard: React.FC = () => {
  const router = useRouter();
  const [showSubmissionForm, setShowSubmissionForm] = React.useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }, []);

  const researchRecords: ResearchRecord[] = [
    {
      id: '1',
      title: 'AI in Climate Prediction',
      department: 'Computer Science',
      status: 'ongoing',
      date: '2024-02-15',
    },
    {
      id: '2',
      title: 'IoT-Enabled Smart Farming System',
      department: 'Mechanical Engineering',
      status: 'ongoing',
      date: '2024-02-15',
    },
    {
      id: '3',
      title: 'Blockchain for Medical Records',
      department: 'Civil Engineering',
      status: 'approved',
      date: '2024-02-15',
    },
    {
      id: '4',
      title: 'Virtual Reality in Education',
      department: 'Electrical Engineering',
      status: 'ongoing',
      date: '2024-02-15',
    },
  ];

  const handleShowSubmissionForm = () => setShowSubmissionForm(true);
  const handleCloseForm = () => setShowSubmissionForm(false);

  const handleAnnouncementsClick = () => {
    router.push('/URDS/Gerald/FRD-ANNOUNCEMENT');
  };

  const handleMyFilesClick = () => {
    router.push('/URDS/Gerald/FRD-FILES');
  };

  const handleFeedbackClick = () => {
    router.push('/URDS/Artnomer/FEEDBACK');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6fa] to-[#e0e8f3] flex">
      
      {/* Modal */}
      {showSubmissionForm && (
        <ResearchModal open={showSubmissionForm} onClose={handleCloseForm} />
      )}

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
                    src="/images/sampleprofile.png"
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover flex-shrink-0"
                  />

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Dr. Maria L. Santos</h1>
                    <p className="text-xs text-purple-600 font-semibold mb-4">
                      UNIVERSITY OF EASTERN PHILIPPINES
                    </p>

                    <div className="flex gap-8 text-sm flex-wrap">
                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          <i className="fas fa-id-badge mr-1"></i>Role
                        </span>
                        <span className="font-semibold text-gray-800">Faculty Researcher</span>
                      </div>

                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          <i className="fas fa-building mr-1"></i>Department
                        </span>
                        <span className="font-semibold text-gray-800">College Of Engineering</span>
                      </div>

                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          <i className="fas fa-envelope mr-1"></i>Email
                        </span>
                        <span className="font-semibold text-gray-800">maria.santos@university.edu</span>
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
                    <span className="text-2xl font-bold text-gray-800 block">6</span>
                    <span className="text-sm text-gray-600">Announcements</span>
                  </div>
                </div>

                <div 
                  onClick={handleMyFilesClick}
                  className="flex items-center flex-1 p-4 px-6 bg-white border-l-4 border-l-orange-400 border border-gray-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <i className="fas fa-folder text-4xl text-orange-400 mr-4"></i>
                  <div>
                    <span className="text-2xl font-bold text-gray-800 block">20</span>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="inline-block bg-gradient-to-r from-[#c7d2fe] to-[#fbcfe8] py-2 px-6 rounded-2xl text-xl font-semibold text-gray-800">
                Submitted Research Records
              </h2>

              <button
                onClick={handleShowSubmissionForm}
                className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium shadow-sm"
              >
                <i className="fas fa-plus"></i>
                Research Submission Form
              </button>
            </div>

            <div className="rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 bg-gray-50 border-b-2 border-gray-200 font-semibold text-gray-700 text-sm">
                <div>Research Title</div>
                <div>Department</div>
                <div className="text-center">Status</div>
                <div className="text-center">Date Submitted</div>
              </div>

              {/* Table Body */}
              <div className="max-h-[350px] overflow-y-auto">
                {researchRecords.map((record) => (
                  <div
                    key={record.id}
                    className="grid grid-cols-[3fr_1.5fr_1fr_1fr] gap-4 items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="font-semibold flex items-center gap-3 text-gray-800">
                      <i className="fas fa-folder text-2xl text-orange-400"></i>
                      <span className="truncate">{record.title}</span>
                    </div>

                    <div className="text-gray-600 flex items-center gap-2 text-sm">
                      <i className="fas fa-building text-gray-400"></i>
                      <span className="truncate">{record.department}</span>
                    </div>

                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full font-medium text-sm inline-flex items-center ${
                          record.status === 'ongoing'
                            ? 'bg-orange-100 text-orange-600'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        <i className={`fas ${record.status === 'ongoing' ? 'fa-clock' : 'fa-check-circle'} mr-1.5 text-xs`}></i>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>

                    <div className="text-gray-600 flex justify-center items-center gap-2 text-sm">
                      <i className="fas fa-calendar-alt text-gray-400"></i>
                      {record.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default FacultyDashboard;