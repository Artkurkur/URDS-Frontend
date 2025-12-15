"use client";   // <-- ADD THIS LINE

import React, { useState } from 'react';

interface FormData {
  researcherName: string;
  studentId: string;
  email: string;
  yearSection: string;
  researchTitle: string;
  researchCategory: string;
  researchStatus: string;
  dateSubmitted: string;
  description: string;
  attachments: File | null;
}

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
}

const ResearchSubmissionModal: React.FC<ResearchModalProps> = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onFileChange,
  onSubmit,
  onClear
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors z-10"
        >
          <i className="fas fa-times text-gray-600"></i>
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <i className="fas fa-file-alt text-3xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold m-0">Submissions Form</h2>
              <p className="text-sm opacity-90 m-0">Submit your research details</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Student Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Student Information
              </div>
              <div className="bg-yellow-400 p-2 rounded-lg">
                <i className="fas fa-graduation-cap text-xl text-gray-800"></i>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Researcher Name
                </label>
                <input
                  type="text"
                  name="researcherName"
                  value={formData.researcherName}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year & Section
                </label>
                <select
                  name="yearSection"
                  value={formData.yearSection}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>3rd Year - BSIT - A</option>
                  <option>3rd Year - BSIT - B</option>
                  <option>4th Year - BSIT - A</option>
                  <option>4th Year - BSIT - B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Research Details Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Research Details
              </div>
              <div className="bg-blue-400 p-2 rounded-lg">
                <i className="fas fa-clipboard-list text-xl text-white"></i>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Research Title
                </label>
                <input
                  type="text"
                  name="researchTitle"
                  value={formData.researchTitle}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Research Category
                </label>
                <select
                  name="researchCategory"
                  value={formData.researchCategory}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Research Status
                </label>
                <select
                  name="researchStatus"
                  value={formData.researchStatus}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Submitted
                </label>
                <input
                  type="date"
                  name="dateSubmitted"
                  value={formData.dateSubmitted}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description / Abstract:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onFormChange}
                rows={5}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                placeholder="Enter your research abstract here..."
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Attachments (PDF, Guidelines, Forms)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={onFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <i className="fas fa-upload mr-2 text-gray-500"></i>
                  <span className="text-gray-600">
                    {formData.attachments ? formData.attachments.name : 'Choose File'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClear}
              className="px-6 py-2 border-2 border-red-400 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchSubmissionModal;