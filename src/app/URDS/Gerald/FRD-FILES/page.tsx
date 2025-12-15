"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

import URDSSidebar from "@/components/FacultyResearcher/sidebar";
import StudyCard, { Study, Submission } from "@/components/FR/StudyCard";
// Make sure this path matches where you saved the new modal
import UnifiedAddStudyModal, { StudyState } from "@/components/FR/UnifiedAddStudyModal";

export default function Page() {
  const router = useRouter();

  /* ---------- STATE ---------- */
  const [studies, setStudies] = useState<Study[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  // Track which study we are adding a submission to (null if creating a new study)
  const [targetStudy, setTargetStudy] = useState<Study | null>(null);
  // Track if we are editing a specific file/submission
  const [editingSub, setEditingSub] = useState<Submission | null>(null);

  // The single form state that handles Proposal, Work Plan, and Budget data
  const [form, setForm] = useState<StudyState>({
    title: "",
    // 🟢 UPDATED: Changed from 1 to 0 to prevent "Chapter 1" default
    chapter: 0,
    // 🟢 RESTORED: natureOfResearch
    natureOfResearch: "",
    leader: "",
    personnel: "",
    location: "",
    duration: "",
    budget: "",
    college: "",
    rationale: "",
    objectives: "",
    literature: "",
    methodology: "",
    budgetaryRequirements: "",
    formType: "Research Proposal" // Default tab
  });

  /* ---------- HELPERS ---------- */
  const resetForm = () => {
    setForm({
      title: "",
      // 🟢 UPDATED: Changed to 0
      chapter: 0,
      // 🟢 RESTORED: natureOfResearch
      natureOfResearch: "",
      leader: "",
      personnel: "",
      location: "",
      duration: "",
      budget: "",
      college: "",
      rationale: "",
      objectives: "",
      literature: "",
      methodology: "",
      budgetaryRequirements: "",
      formType: "Research Proposal"
    });
    setTargetStudy(null);
    setEditingSub(null);
  };

  /* ---------- ACTIONS ---------- */
  
  // 1. Open Modal for a BRAND NEW Study
  const openNewStudy = () => {
    resetForm();
    setShowModal(true);
  };

  // 2. Open Modal to ADD A FILE to an existing Study
  const openAddSubmission = (study: Study) => {
    setTargetStudy(study);
    setEditingSub(null);
    
    // Pre-fill the form with the Parent Study's basic info
    setForm({
      ...form, // keep defaults
      title: study.title,
      chapter: study.chapter,
      // 🟢 RESTORED: natureOfResearch mapping
      natureOfResearch: (study.natureOfResearch as string) || "",
      leader: (study.leader as string) || "",
      college: (study.college as string) || "",
      formType: "Research Proposal" // Default starting tab
    });
    
    setShowModal(true);
  };

  // 3. Open Modal to EDIT an existing file
  const openEditSubmission = (study: Study, sub: Submission) => {
    setTargetStudy(study);
    setEditingSub(sub);
    
    // Load the saved data into the form
    setForm({
      ...(sub.data as StudyState),
      title: study.title, // Ensure title stays locked to parent
      chapter: study.chapter,
      formType: sub.formType // Open the modal on the correct tab
    });
    
    setShowModal(true);
  };

  const deleteSubmission = (chapter: number, subId: number) => {
    if (!confirm("Delete this file?")) return;
    setStudies(studies.map(s =>
      s.chapter === chapter
        ? { ...s, submissions: s.submissions.filter(f => f.id !== subId), historyCount: s.historyCount - 1 }
        : s
    ));
  };

  const submitDraft = (chapter: number, subId: number) => {
    if (!confirm("Submit this file?")) return;
    setStudies(studies.map(s =>
      s.chapter === chapter
        ? {
            ...s,
            submissions: s.submissions.map(f =>
              f.id === subId ? { ...f, status: "submitted" } : f
            )
          }
        : s
    ));
  };

  /* ---------- VIEW FILE HANDLER ---------- */
  const viewSubmission = (study: Study, sub: Submission) => {
    const mergedData = {
      ...study,
      ...(sub.data || {}),
      formType: sub.formType,
      title: (sub.data as StudyState)?.title || study.title
    };

    localStorage.setItem("viewStudyData", JSON.stringify(mergedData));
    router.push("/URDS/Gerald/FRD-FILES/view/file");
  };

  /* ---------- SAVE HANDLER (The Brain) ---------- */
  const saveHandler = (isDraft: boolean) => {
    const status: "draft" | "submitted" = isDraft ? "draft" : "submitted";
    const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    
    // Get the current form type directly from the form state (controlled by Modal Tabs)
    const safeFormType = form.formType || "Research Proposal";

    /* A. ADDING OR EDITING A SUBMISSION (Inside a Study) */
    if (targetStudy) {
      setStudies(prevStudies => prevStudies.map(study => {
        if (study.chapter !== targetStudy.chapter) return study;

        if (editingSub) {
          // UPDATE EXISTING SUBMISSION
          return {
            ...study,
            submissions: study.submissions.map(s =>
              s.id === editingSub.id
                ? { 
                    ...s, 
                    status, 
                    date: now, 
                    formType: safeFormType, 
                    data: form, 
                    title: `${safeFormType} - ${study.title}` 
                  }
                : s
            )
          };
        }

        // CREATE NEW SUBMISSION
        const newSub: Submission = {
          id: Date.now(),
          title: `${safeFormType} - ${study.title}`,
          date: now,
          formType: safeFormType,
          status,
          data: form
        };
        
        return {
          ...study,
          submissions: [...study.submissions, newSub],
          historyCount: study.historyCount + 1
        };
      }));
      
      setShowModal(false);
      resetForm();
      return;
    }

    /* B. CREATING A BRAND NEW STUDY CONTAINER */
    if (!form.title.trim()) {
      alert("Please input title");
      return;
    }
    
    const initialSub: Submission = {
      id: Date.now(),
      title: `${safeFormType} - ${form.title}`,
      date: now,
      formType: safeFormType,
      status,
      data: form
    };
    
    const newStudy: Study = {
      title: form.title,
      // 🟢 UPDATED: Logic to avoid chapter numbering
      chapter: form.chapter || (studies.length > 0 ? Math.max(...studies.map(s => s.chapter)) + 1 : 1),
      leader: form.leader,
      duration: form.duration,
      college: form.college,
      // 🟢 RESTORED: natureOfResearch
      natureOfResearch: form.natureOfResearch,
      formType: safeFormType,
      historyCount: 1,
      submissions: [initialSub]
    };
    
    setStudies([...studies, newStudy]);
    setShowModal(false);
    resetForm();
  };

  const filtered = studies.filter(
    s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `chapter ${s.chapter}`.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 text-gray-800">
      <div className="fixed left-0 top-0 h-screen z-10">
        <URDSSidebar />
      </div>

      <div className="flex-1 ml-[100px] p-5">
        <div className="w-full max-w-[1400px] mx-auto h-[90vh] bg-gray-50 rounded-2xl shadow-md overflow-hidden">
          <main className="flex flex-col p-8 h-full overflow-hidden">
            {/* HEADER */}
            <header className="flex justify-between pb-5">
              <div className="flex items-center gap-6">
                <FaArrowLeft
                  size={24}
                  className="text-gray-600 cursor-pointer hover:text-gray-800 transition"
                  onClick={() => router.push("/URDS/Gerald/FRD-MAIN")}
                />
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image src="/images/sampleprofile.png" alt="" fill />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">Dr. Maria L. Santos</h1>
                    <p className="text-sm text-gray-500">College of Engineering</p>
                  </div>
                </div>
              </div>
              <Image
                src="/images/logo/UEPlogo.png"
                alt=""
                width={56}
                height={56}
                className="rounded-sm border-2 border-yellow-400"
              />
            </header>

            {/* CONTROLS */}
            <div className="flex justify-between mb-5 gap-4">
              <div className="flex items-center flex-grow gap-4">
                <span className="border-b-2 border-yellow-400 font-semibold whitespace-nowrap">My Uploads</span>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg flex-grow max-w-md">
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by chapter or title..."
                    className="flex-grow bg-transparent outline-none"
                  />
                  <FaSearch className="text-gray-500" />
                </div>
              </div>
              <button 
                onClick={openNewStudy} 
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md font-semibold transition whitespace-nowrap"
              >
                + Add Study
              </button>
            </div>

            {/* LIST */}
            <div className="flex flex-col overflow-y-auto pr-4 flex-grow">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p className="text-lg font-semibold">No submissions yet</p>
                  <p className="text-sm">Click + Add Study to start</p>
                </div>
              ) : (
                filtered.map(study => (
                  <StudyCard
                    key={study.chapter}
                    study={study}
                    onAddSubmission={openAddSubmission}
                    onEditSubmission={openEditSubmission}
                    onDeleteSubmission={deleteSubmission}
                    onSubmitSubmission={submitDraft}
                    onViewSubmission={viewSubmission}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* UNIFIED MODAL */}
      <UnifiedAddStudyModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        onSaveDraft={() => saveHandler(true)}
        onSubmit={() => saveHandler(false)}
        newStudy={form}
        setNewStudy={setForm}
        // This converts the targetStudy object into the format the modal expects for locking fields
        existingStudy={
          targetStudy
            ? {
                title: targetStudy.title,
                chapter: targetStudy.chapter,
                // 🟢 RESTORED: natureOfResearch mapping
                natureOfResearch: (targetStudy.natureOfResearch as string) || "",
                leader: (targetStudy.leader as string) || "",
                college: (targetStudy.college as string) || "",
                // We fill the required fields with empty strings or current form values
                personnel: "", location: "", duration: "", budget: "", 
                rationale: "", objectives: "", literature: "", 
                methodology: "", budgetaryRequirements: "",
                formType: form.formType
              }
            : null
        }
      />
    </div>
  );
}