"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, List, ZoomIn, ZoomOut, FileText } from 'lucide-react';

interface DeanInfo {
  name: string;
  role: string;
  college: string;
  profileImage?: string;
}

interface Researcher {
  name: string;
  email: string;
}

interface Department {
  college: string;
  course: string;
}

interface Submission {
  id: string;
  researcher: Researcher;
  department: Department;
  researchTitle: string;
  dateSubmitted: string;
  documentUrl?: string;
  adviser?: {
    name: string;
    title: string;
  };
  proponents?: string[];
  panelists?: string[];
}

interface ReviewData {
  rating: string;
  approval: 'revision' | 'disapproved' | 'approved' | '';
  comments: string;
  suggestions: string;
}

export default function FacultySubmissionReview() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [deanInfo, setDeanInfo] = useState<DeanInfo>({
    name: 'Dr. Maria L. Santos',
    role: 'Dean, College of Engineering',
    college: 'College of Engineering',
    profileImage: '/api/placeholder/80/80'
  });
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: '',
    approval: '',
    comments: '',
    suggestions: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [documentContent, setDocumentContent] = useState<string>('');

  // Fetch submission data
  useEffect(() => {
    fetchSubmission();
    fetchDeanInfo();
  }, []);

  const fetchDeanInfo = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setDeanInfo(data);
      }
    } catch (error) {
      console.error('Error fetching dean info:', error);
    }
  };

  const fetchSubmission = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint and submission ID
      const submissionId = '123'; // Get this from URL params or props
      const response = await fetch(`/api/submissions/${submissionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch submission');
      }
      
      const data = await response.json();
      setSubmission(data);
      
      // Fetch document content if URL exists
      if (data.documentUrl) {
        fetchDocument(data.documentUrl);
      }
    } catch (error) {
      console.error('Error fetching submission:', error);
      setSubmission(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async (url: string) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      setDocumentContent(content);
    } catch (error) {
      console.error('Error fetching document:', error);
      setDocumentContent('Document preview unavailable');
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewData.approval || !reviewData.rating) {
      alert('Please complete all required fields (Approval status and Rating)');
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: submission?.id,
          ...reviewData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      alert('Review submitted successfully!');
      // Optionally redirect or reset form
      setReviewData({
        rating: '',
        approval: '',
        comments: '',
        suggestions: ''
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submission...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Header */}
      <header className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Left - Dean Info */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <img 
              src={deanInfo.profileImage || '/api/placeholder/80/80'}
              alt="Dean Profile" 
              className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
            />
            <div>
              <h1 className="text-base font-bold text-gray-600">College Dean</h1>
              <div className="flex items-center gap-2 mt-1">
                <img src="/api/placeholder/30/30" alt="UEP Logo" className="w-6 h-6 rounded-full" />
                <div className="text-sm text-gray-700">
                  <p className="text-xs text-gray-500">University of Eastern Philippines</p>
                  <p className="font-bold">{deanInfo.name} - {deanInfo.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle - Summary Button */}
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <List className="w-4 h-4" />
            Thesis Submission Summary
          </button>

          {/* Right - Course Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-base font-bold text-gray-800">{submission?.department.course || ''}</h2>
              <p className="text-xs text-gray-500 mt-1">Faculty Submissions - {deanInfo.college}</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 leading-tight">No<br/>Image</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          {/* Researcher & Department */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Researcher - College of Engineering</h3>
              <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                <p className="font-bold text-gray-800 mb-1">{submission?.researcher.name || ''}</p>
                <p className="text-sm text-gray-600">{submission?.researcher.email || ''}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Department</h3>
              <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                <p className="font-bold text-gray-800 mb-1">{submission?.department.college || ''}</p>
                <p className="text-sm text-gray-600">{submission?.department.course || ''}</p>
              </div>
            </div>
          </div>

          {/* Research Title & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Research Title</h3>
              <div className="bg-white border border-gray-300 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-gray-800 leading-snug">{submission?.researchTitle || ''}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Date Submitted</h3>
              <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                <p className="font-bold text-gray-800">{submission?.dateSubmitted || ''}</p>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">Comments</h3>
            <textarea
              value={reviewData.comments}
              onChange={(e) => setReviewData({...reviewData, comments: e.target.value})}
              placeholder="Enter your general comments about the research..."
              className="w-full h-32 bg-white border border-gray-300 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Specific Suggestions */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">Specific Suggestions</h3>
            <textarea
              value={reviewData.suggestions}
              onChange={(e) => setReviewData({...reviewData, suggestions: e.target.value})}
              placeholder="Provide specific suggestions for improvement..."
              className="w-full h-32 bg-white border border-gray-300 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Rating Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-md p-6 border-2 border-gray-300">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Evaluation</h3>
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Radio Options */}
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="revision"
                  checked={reviewData.approval === 'revision'}
                  onChange={() => setReviewData({...reviewData, approval: 'revision'})}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="revision" className="text-sm font-medium cursor-pointer">Need Revisions</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="disapproved"
                  checked={reviewData.approval === 'disapproved'}
                  onChange={() => setReviewData({...reviewData, approval: 'disapproved'})}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="disapproved" className="text-sm font-medium cursor-pointer">Disapproved</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="approved"
                  checked={reviewData.approval === 'approved'}
                  onChange={() => setReviewData({...reviewData, approval: 'approved'})}
                  className="w-4 h-4 cursor-pointer accent-blue-600"
                />
                <label htmlFor="approved" className="text-sm font-medium cursor-pointer">Approved</label>
              </div>

              <div className="h-8 w-px bg-gray-400" />

              {/* Rating Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">Overall Rating:</label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">[ 1 - 10 ]</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Document Viewer */}
        <div className="w-[500px] bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col h-full">
            {/* Document Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-700">Document Preview</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl p-6 overflow-y-auto">
              {documentContent ? (
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: documentContent }} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No document preview available</p>
                    <p className="text-xs mt-2">Upload a document to view it here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReview}
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!reviewData.approval || !reviewData.rating}
            >
              SUBMIT REVIEW
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Thesis Evaluation Summary</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Researcher - College of Engineering</h3>
                <p><strong>{submission.researcher.name}</strong><br />{submission.researcher.email}</p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Department</h3>
                <p>{submission.department.course}<br />{submission.department.college}</p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Research Title</h3>
                <p>{submission.researchTitle}</p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Date Submitted</h3>
                <p>{submission.dateSubmitted}</p>
              </div>

              {submission.adviser && (
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Adviser</h3>
                  <p>{submission.adviser.name}<br />{submission.adviser.title}</p>
                </div>
              )}

              {submission.proponents && submission.proponents.length > 0 && (
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Proponents</h3>
                  <ul className="list-disc list-inside text-sm">
                    {submission.proponents.map((proponent, index) => (
                      <li key={index}>{proponent}</li>
                    ))}
                  </ul>
                </div>
              )}

              {submission.panelists && submission.panelists.length > 0 && (
                <div className="col-span-2">
                  <h3 className="font-semibold text-blue-700 mb-2 border-b pb-1">Panelists</h3>
                  <ul className="list-disc list-inside text-sm grid grid-cols-2 gap-2">
                    {submission.panelists.map((panelist, index) => (
                      <li key={index}>{panelist}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}