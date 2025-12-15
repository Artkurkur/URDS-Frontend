"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

import URDSSidebar from "@/components/FacultyResearcher/sidebar";
import StudyCard, { Study, Submission } from "@/components/FR/StudyCard";
import UnifiedAddStudyModal from "@/components/FR/UnifiedAddStudyModal";

/* ---------- TYPES ---------- */
interface StudyState {
  title: string;
  chapter: number;
  natureOfResearch: string;
  leader: string;
  personnel: string;
  location: string;
  duration: string;
  budget: string;
  college: string;
  rationale: string;
  objectives: string;
  literature: string;
  methodology: string;
  budgetaryRequirements: string;
  formType?: "Research Proposal" | "Work Plan Activities" | "Budget Summary";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function Page() {
  const router = useRouter();

  /* ---------- STATE ---------- */
  const [studies, setStudies] = useState<Study[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [targetStudy, setTargetStudy] = useState<Study | null>(null);
  const [editingSub, setEditingSub] = useState<Submission | null>(null);

  const [form, setForm] = useState<StudyState>({
    title: "",
    chapter: 1,
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

  /* ---------- HELPERS ---------- */
  const resetForm = () => {
    setForm({
      title: "",
      chapter: studies.length + 1,
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
  const openNewStudy = () => {
    resetForm();
    setShowModal(true);
  };

  const openAddSubmission = (study: Study) => {
    setTargetStudy(study);
    setEditingSub(null);
    setForm({
      ...form,
      title: study.title,
      chapter: study.chapter,
      natureOfResearch: study.natureOfResearch as string,
      leader: study.leader as string,
      college: study.college as string,
      formType: "Research Proposal"
    });
    setShowModal(true);
  };

  const openEditSubmission = (study: Study, sub: Submission) => {
    setTargetStudy(study);
    setEditingSub(sub);
    setForm({
      ...(sub.data as StudyState),
      title: study.title,
      chapter: study.chapter,
      formType: sub.formType
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

  /* ---------- VIEW FILE HANDLER (UPDATED) ---------- */
  const viewSubmission = (study: Study, sub: Submission) => {
    // 1. Merge parent study info with specific submission data
    const mergedData = {
      ...study,            // Basic info (Leader, College, etc.)
      ...(sub.data || {}), // Specific form inputs
      formType: sub.formType, // Ensure correct form type is used
      title: sub.data?.title || study.title // Use specific title if available
    };

    // 2. Save to localStorage for the View page to read
    localStorage.setItem("viewStudyData", JSON.stringify(mergedData));

    // 3. Navigate to the fixed View page
    router.push("/URDS/Gerald/FRD-FILES/view/file");
  };

  /* ---------- SAVE HANDLER ---------- */
  const saveHandler = (isDraft: boolean) => {
    const status: "draft" | "submitted" = isDraft ? "draft" : "submitted";
    const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    /* A. ADD / EDIT SUBMISSION */
    if (targetStudy) {
      setStudies(studies.map(study => {
        if (study.chapter !== targetStudy.chapter) return study;

        if (editingSub) {
          // Edit existing
          return {
            ...study,
            submissions: study.submissions.map(s =>
              s.id === editingSub.id
                ? { ...s, status, date: now, formType: form.formType!, data: form, title: `${form.formType} - ${study.title}` }
                : s
            )
          };
        }

        // Add new
        const newSub: Submission = {
          id: Date.now(),
          title: `${form.formType} - ${study.title}`,
          date: now,
          formType: form.formType!,
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

    /* B. NEW STUDY */
    if (!form.title.trim()) {
      alert("Please input title");
      return;
    }
    const initialSub: Submission = {
      id: Date.now(),
      title: `${form.formType} - ${form.title}`,
      date: now,
      formType: form.formType!,
      status,
      data: form
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newStudy: any = {
      ...form,
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
                  className="text-gray-600 cursor-pointer"
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
            <div className="flex justify-between mb-5">
              <div className="flex items-center flex-grow">
                <span className="border-b-2 border-yellow-400 mr-5 font-semibold">My Uploads</span>
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
              <button onClick={openNewStudy} className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md font-semibold">
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
        existingStudy={
          targetStudy
            ? {
                title: targetStudy.title,
                chapter: targetStudy.chapter,
                natureOfResearch: targetStudy.natureOfResearch as string,
                leader: targetStudy.leader as string,
                personnel: "",
                location: "",
                duration: "",
                budget: "",
                college: targetStudy.college as string,
                rationale: "",
                objectives: "",
                literature: "",
                methodology: "",
                budgetaryRequirements: "",
                formType: form.formType
              } as StudyState
            : null
        }
      />
    </div>
  );
}