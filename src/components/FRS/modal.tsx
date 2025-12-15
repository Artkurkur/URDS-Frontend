import React from "react";
import { motion } from "framer-motion";

interface ResearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResearchModal({ open, onClose }: ResearchModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Submissions Form</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        {/* Student Information */}
        <div className="border rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
            Student Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Researcher Name</label>
              <input className="border rounded-xl p-2 mt-1" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Student ID</label>
              <input className="border rounded-xl p-2 mt-1" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Email</label>
              <input className="border rounded-xl p-2 mt-1" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Year & Section</label>
              <select className="border rounded-xl p-2 mt-1">
                <option>3rd Year - BSIT - A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Research Details */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 bg-purple-500 text-white px-4 py-2 rounded-lg inline-block">
            Research Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Research Title</label>
              <input className="border rounded-xl p-2 mt-1" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Research Status</label>
              <select className="border rounded-xl p-2 mt-1">
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Research Category</label>
              <select className="border rounded-xl p-2 mt-1">
                <option>Technology</option>
                <option>Education</option>
                <option>Health</option>
                <option>Engineering</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Date Submitted</label>
              <input type="date" className="border rounded-xl p-2 mt-1" />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="font-medium">Description / Abstract</label>
            <textarea className="border rounded-xl p-3 mt-1 min-h-[120px]" />
          </div>

          <div className="flex flex-col mt-4">
            <label className="font-medium">Attachments (PDF Guidelines, Forms)</label>
            <input type="file" className="mt-2" multiple />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-2 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200">
            Clear Form
          </button>
          <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
}
