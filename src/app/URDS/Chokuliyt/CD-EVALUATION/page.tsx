"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, List, ZoomIn, ZoomOut, FileText } from "lucide-react";

/* ===================== INTERFACES ===================== */

interface DeanInfo {
  id: string;
  name: string;
  role: string;
  college: string;
  university: string;
  profileImage?: string;
}

interface SystemBranding {
  universityName: string;
  universityLogo: string;
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
  approval: "revision" | "disapproved" | "approved" | "";
  comments: string;
  suggestions: string;
}

/* ===================== COMPONENT ===================== */

export default function FacultySubmissionReview() {
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [deanInfo, setDeanInfo] = useState<DeanInfo | null>(null);
  const [branding, setBranding] = useState<SystemBranding | null>(null);
  const [documentContent, setDocumentContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: "",
    approval: "",
    comments: "",
    suggestions: "",
  });

  /* ===================== FETCH DATA ===================== */

  useEffect(() => {
    fetchSubmission();
    fetchDeanInfo();
    fetchBranding();
  }, []);

  const fetchDeanInfo = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error("Failed to fetch dean info");
      setDeanInfo(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBranding = async () => {
    try {
      const res = await fetch("/api/system/branding");
      if (!res.ok) throw new Error("Failed to fetch branding");
      setBranding(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubmission = async () => {
    try {
      const submissionId = "123"; // replace with params
      const res = await fetch(`/api/submissions/${submissionId}`);
      if (!res.ok) throw new Error("Failed to fetch submission");

      const data = await res.json();
      setSubmission(data);

      if (data.documentUrl) {
        fetchDocument(data.documentUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async (url: string) => {
    try {
      const res = await fetch(url);
      setDocumentContent(await res.text());
    } catch {
      setDocumentContent("<p>Document preview unavailable</p>");
    }
  };

  /* ===================== SUBMIT REVIEW ===================== */

  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.approval) return;

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: submission?.id,
        ...reviewData,
      }),
    });

    alert("Review submitted successfully");
    setReviewData({ rating: "", approval: "", comments: "", suggestions: "" });
  };

  /* ===================== LOADING ===================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* HEADER */}
      <header className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={deanInfo?.profileImage || "/default-avatar.png"}
              className="w-20 h-20 rounded-full border object-cover"
              alt="Dean"
            />

            <div>
              <h1 className="text-xs text-gray-500">College Dean</h1>
              <div className="flex items-center gap-2">
                {branding && (
                  <img
                    src={branding.universityLogo}
                    className="w-6 h-6 rounded-full"
                    alt="Logo"
                  />
                )}
                <div>
                  <p className="text-xs text-gray-500">
                    {branding?.universityName}
                  </p>
                  <p className="font-bold">
                    {deanInfo?.name} – {deanInfo?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full"
          >
            <List className="w-4 h-4" />
            Thesis Submission Summary
          </button>

          {/* RIGHT */}
          <div className="text-right">
            <h2 className="font-bold">{submission?.department.course}</h2>
            <p className="text-xs text-gray-500">
              Faculty Submissions – {deanInfo?.college}
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex gap-6">
        {/* LEFT PANEL */}
        <div className="flex-1 space-y-4">
          <textarea
            placeholder="Comments"
            className="w-full h-32 border rounded-xl p-4"
            value={reviewData.comments}
            onChange={(e) =>
              setReviewData({ ...reviewData, comments: e.target.value })
            }
          />

          <textarea
            placeholder="Suggestions"
            className="w-full h-32 border rounded-xl p-4"
            value={reviewData.suggestions}
            onChange={(e) =>
              setReviewData({ ...reviewData, suggestions: e.target.value })
            }
          />

          <div className="flex gap-4 items-center">
            {["revision", "disapproved", "approved"].map((v) => (
              <label key={v} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={reviewData.approval === v}
                  onChange={() =>
                    setReviewData({ ...reviewData, approval: v as any })
                  }
                />
                {v.toUpperCase()}
              </label>
            ))}

            <select
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: e.target.value })
              }
            >
              <option value="">Rating</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>

        {/* DOCUMENT VIEWER */}
        <div className="w-[500px] bg-white rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Document Preview</h3>
            <div className="flex gap-2">
              <ZoomIn />
              <ZoomOut />
            </div>
          </div>

          <div
            className="border rounded-xl p-4 h-[500px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: documentContent }}
          />

          <button
            onClick={handleSubmitReview}
            disabled={!reviewData.rating || !reviewData.approval}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            SUBMIT REVIEW
          </button>
        </div>
      </div>
    </div>
  );
}
