"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Plus,
  Clock,
  FileText,
  BookOpen,
  Download,
  Eye,
  Trash2,
  Calendar,
  Award,
  Users,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  AlertCircle,
  FileCheck,
  BookMarked,
  X,
} from "lucide-react";
import { SyllabusRoadmap, SyllabusTopic, TopicAttachment, AttachmentType } from "@/types";
import { MOCK_SYLLABUS_ROADMAPS } from "@/data/mockSyllabus";

export function SyllabusTracker() {
  const [viewMode, setViewMode] = useState<"teacher" | "student">("teacher");
  const [roadmaps, setRoadmaps] = useState<SyllabusRoadmap[]>(MOCK_SYLLABUS_ROADMAPS);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(MOCK_SYLLABUS_ROADMAPS[0].id);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in_progress" | "upcoming">("all");

  // Modals state
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [showCreateSyllabusModal, setShowCreateSyllabusModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [targetTopicForAttach, setTargetTopicForAttach] = useState<SyllabusTopic | null>(null);
  const [activeAttachmentView, setActiveAttachmentView] = useState<{
    attachment: TopicAttachment;
    topicName: string;
    chapterName: string;
    tutorName: string;
  } | null>(null);

  // Form states for Add Topic
  const [newTopicName, setNewTopicName] = useState("");
  const [newChapterName, setNewChapterName] = useState("");
  const [newHours, setNewHours] = useState(3);

  // Form states for Create Syllabus
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newTutorName, setNewTutorName] = useState("Sir Khurram Hussain");
  const [newInstituteName, setNewInstituteName] = useState("SKH Solutions");
  const [newSubject, setNewSubject] = useState("Cambridge O Level Islamiyat");
  const [newCurriculum, setNewCurriculum] = useState<any>("CAIE O Level");
  const [newBatchSchedule, setNewBatchSchedule] = useState("Mon, Wed, Fri • 4:00 PM – 5:30 PM");
  const [newTargetExamDate, setNewTargetExamDate] = useState("May/June 2025");
  const [newEnrolledStudents, setNewEnrolledStudents] = useState("Mustafa Tariq, Hamza Shah, Ayesha Siddiqui");
  const [newInitialTopic, setNewInitialTopic] = useState("Major Themes of the Holy Quran");

  // Form states for Attach Resource
  const [attachType, setAttachType] = useState<AttachmentType>("note");
  const [attachTitle, setAttachTitle] = useState("");
  const [attachDescription, setAttachDescription] = useState("");
  const [attachFileName, setAttachFileName] = useState("");
  const [attachDueDate, setAttachDueDate] = useState("");
  const [attachMaxMarks, setAttachMaxMarks] = useState<number | "">(25);
  const [attachContent, setAttachContent] = useState("");

  // Student mode filter
  const [studentFilter, setStudentFilter] = useState<string>("all");

  // Fetch live roadmaps from database on mount
  const refreshRoadmaps = () => {
    fetch("/api/syllabus")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.roadmaps && data.roadmaps.length > 0) {
          setRoadmaps(data.roadmaps);
          if (!data.roadmaps.some((r: any) => r.id === selectedRoadmapId)) {
            setSelectedRoadmapId(data.roadmaps[0].id);
          }
        }
      })
      .catch((err) => console.error("Error loading syllabus roadmaps from DB:", err));
  };

  useEffect(() => {
    refreshRoadmaps();
  }, []);

  const activeRoadmap =
    roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0] || MOCK_SYLLABUS_ROADMAPS[0];

  const totalTopics = activeRoadmap.topics?.length || 0;
  const completedTopics = activeRoadmap.topics?.filter((t) => t.status === "completed").length || 0;
  const inProgressTopics = activeRoadmap.topics?.filter((t) => t.status === "in_progress").length || 0;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Toggle topic status (Teacher action)
  const toggleTopicStatus = async (topicId: string) => {
    if (viewMode !== "teacher") return;

    let nextStatus: "completed" | "in_progress" | "upcoming" = "upcoming";
    let nextDate: string | undefined = undefined;

    const currentTopic = activeRoadmap.topics.find((t) => t.id === topicId);
    if (!currentTopic) return;

    if (currentTopic.status === "upcoming") {
      nextStatus = "in_progress";
    } else if (currentTopic.status === "in_progress") {
      nextStatus = "completed";
      nextDate = new Date().toISOString().split("T")[0];
    } else {
      nextStatus = "upcoming";
      nextDate = undefined;
    }

    // Optimistic update
    const updated = roadmaps.map((rm) => {
      if (rm.id !== activeRoadmap.id) return rm;
      const updatedTopics = rm.topics.map((t) => {
        if (t.id !== topicId) return t;
        return { ...t, status: nextStatus, completedDate: nextDate };
      });
      return {
        ...rm,
        topics: updatedTopics,
        completedTopics: updatedTopics.filter((t) => t.status === "completed").length,
      };
    });
    setRoadmaps(updated);

    try {
      await fetch("/api/syllabus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId,
          status: nextStatus,
          completedDate: nextDate,
        }),
      });
    } catch (err) {
      console.error("Error updating topic status:", err);
    }
  };

  // Add new topic
  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    try {
      const res = await fetch("/api/syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmapId: activeRoadmap.id,
          chapterName: newChapterName || `Chapter ${(activeRoadmap.topics?.length || 0) + 1}`,
          topicName: newTopicName,
          estimatedHours: Number(newHours) || 2,
        }),
      });
      const data = await res.json();
      if (data.success && data.topic) {
        const updated = roadmaps.map((rm) => {
          if (rm.id !== activeRoadmap.id) return rm;
          return {
            ...rm,
            totalTopics: (rm.totalTopics || 0) + 1,
            topics: [...rm.topics, { ...data.topic, attachments: [] }],
          };
        });
        setRoadmaps(updated);
      }
    } catch (err) {
      console.error("Error adding topic:", err);
    }

    setNewTopicName("");
    setNewChapterName("");
    setShowAddTopicModal(false);
  };

  // Create new course syllabus
  const handleCreateSyllabus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim() || !newTutorName.trim()) return;

    const enrolledList = newEnrolledStudents
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_roadmap",
          tutorName: newTutorName,
          instituteName: newInstituteName,
          courseTitle: newCourseTitle,
          subject: newSubject,
          curriculum: newCurriculum,
          batchSchedule: newBatchSchedule,
          targetExamDate: newTargetExamDate,
          enrolledStudents: enrolledList,
          initialTopic: newInitialTopic
            ? {
                chapterName: "Chapter 1: Foundations",
                topicName: newInitialTopic,
                estimatedHours: 4,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.roadmap) {
        const created: SyllabusRoadmap = {
          ...data.roadmap,
          enrolledStudents: enrolledList,
          topics: (data.roadmap.topics || []).map((t: any) => ({
            ...t,
            attachments: [],
          })),
        };
        setRoadmaps([created, ...roadmaps]);
        setSelectedRoadmapId(created.id);
        setShowCreateSyllabusModal(false);
        setNewCourseTitle("");
      }
    } catch (err) {
      console.error("Error creating syllabus:", err);
    }
  };

  // Open attach resource modal
  const openAttachModal = (topic: SyllabusTopic) => {
    setTargetTopicForAttach(topic);
    setAttachType("note");
    setAttachTitle("");
    setAttachDescription("");
    setAttachFileName("");
    setAttachDueDate("");
    setAttachMaxMarks(25);
    setAttachContent("");
    setShowAttachModal(true);
  };

  // Save new attachment
  const handleSaveAttachment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTopicForAttach || !attachTitle.trim()) return;

    const fallbackFileName = `${attachTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}.${
      attachType === "note" ? "pdf" : attachType === "homework" ? "pdf" : "pdf"
    }`;

    const attachmentPayload: Partial<TopicAttachment> = {
      type: attachType,
      title: attachTitle,
      description: attachDescription,
      fileName: attachFileName.trim() || fallbackFileName,
      dueDate: attachDueDate || undefined,
      maxMarks: attachType === "assignment" && attachMaxMarks ? Number(attachMaxMarks) : undefined,
      downloadContent:
        attachContent.trim() ||
        `OFFICIAL COURSE RESOURCE\nINSTITUTE: ${activeRoadmap.instituteName}\nFACULTY: ${activeRoadmap.tutorName}\nCOURSE: ${activeRoadmap.courseTitle}\nTOPIC: ${targetTopicForAttach.topicName}\nRESOURCE: ${attachTitle} (${attachType.toUpperCase()})\n\nDESCRIPTION:\n${attachDescription || "Complete according to teacher instructions."}\n\nDATE ISSUED: ${new Date().toLocaleDateString()}`,
    };

    try {
      const res = await fetch("/api/syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_attachment",
          topicId: targetTopicForAttach.id,
          attachment: attachmentPayload,
        }),
      });

      const data = await res.json();
      if (data.success && data.attachment) {
        const updated = roadmaps.map((rm) => {
          if (rm.id !== activeRoadmap.id) return rm;
          const updatedTopics = rm.topics.map((t) => {
            if (t.id !== targetTopicForAttach.id) return t;
            return {
              ...t,
              attachments: [...(t.attachments || []), data.attachment],
            };
          });
          return { ...rm, topics: updatedTopics };
        });
        setRoadmaps(updated);
        setShowAttachModal(false);
      }
    } catch (err) {
      console.error("Error attaching resource:", err);
    }
  };

  // Delete attachment (Teacher action)
  const handleDeleteAttachment = async (topicId: string, attachmentId: string) => {
    if (!confirm("Are you sure you want to remove this attached resource?")) return;

    try {
      const res = await fetch("/api/syllabus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove_attachment",
          topicId,
          attachmentId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const updated = roadmaps.map((rm) => {
          if (rm.id !== activeRoadmap.id) return rm;
          const updatedTopics = rm.topics.map((t) => {
            if (t.id !== topicId) return t;
            return {
              ...t,
              attachments: (t.attachments || []).filter((a) => a.id !== attachmentId),
            };
          });
          return { ...rm, topics: updatedTopics };
        });
        setRoadmaps(updated);
      }
    } catch (err) {
      console.error("Error removing attachment:", err);
    }
  };

  // View attachment modal
  const handleOpenViewModal = (attachment: TopicAttachment, topic: SyllabusTopic) => {
    setActiveAttachmentView({
      attachment,
      topicName: topic.topicName,
      chapterName: topic.chapterName,
      tutorName: activeRoadmap.tutorName,
    });
    setShowViewModal(true);
  };

  // Download resource file
  const handleDownloadAttachment = (attachment: TopicAttachment) => {
    const content =
      attachment.downloadContent ||
      `COURSE RESOURCE: ${attachment.title}\nCOURSE: ${activeRoadmap.courseTitle}\nINSTRUCTOR: ${activeRoadmap.tutorName}\nINSTITUTE: ${activeRoadmap.instituteName}\n\n${attachment.description || ""}`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.fileName || `${attachment.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter topics
  const filteredTopics = (activeRoadmap.topics || []).filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  // Extract all unique enrolled students across all roadmaps for student filter
  const allEnrolledStudents = Array.from(
    new Set(roadmaps.flatMap((r) => r.enrolledStudents || []))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ===================== VIEW MODE SWITCHER BANNER ===================== */}
      <div className="bg-white rounded-lg border border-ink-200 p-3 sm:p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-ink-900 text-white flex items-center justify-center font-bold text-xs">
              TB
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="font-bold text-accent-red uppercase tracking-wider">
                  Post-Hire Academic Hub
                </span>
                <span className="text-ink-400">•</span>
                <span className="text-ink-500">Teacher & Student Interactive View</span>
              </div>
              <h2 className="text-sm font-bold text-ink-900 leading-tight">
                Syllabus Tracker & Learning Resource Repository
              </h2>
            </div>
          </div>

          {/* Teacher vs Student Toggle */}
          <div className="flex items-center bg-ink-100 p-1 rounded-md border border-ink-200 text-xs font-mono">
            <button
              onClick={() => setViewMode("teacher")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all font-bold ${
                viewMode === "teacher"
                  ? "bg-ink-900 text-white shadow-2xs"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Teacher Mode
            </button>
            <button
              onClick={() => setViewMode("student")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all font-bold ${
                viewMode === "student"
                  ? "bg-accent-blue text-white shadow-2xs"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student Mode
            </button>
          </div>
        </div>
      </div>

      {/* ===================== TOP HEADER / COURSE CONTEXT CARD ===================== */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-ink-100 border border-ink-200 text-ink-900 font-bold uppercase tracking-wider">
                {activeRoadmap.instituteName}
              </span>
              <span className="text-ink-400">•</span>
              <span className="text-accent-blue font-semibold">{activeRoadmap.curriculum}</span>
              <span className="text-ink-400">•</span>
              <span className="text-ink-600">{activeRoadmap.subject}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-900">
              {activeRoadmap.courseTitle}
            </h1>

            <div className="flex items-center gap-4 flex-wrap text-xs text-ink-600 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-ink-400">Teacher:</span>
                <span className="font-bold text-ink-900">{activeRoadmap.tutorName}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="text-ink-400">Batch Schedule:</span>
                <span className="text-ink-800 font-medium">
                  {activeRoadmap.batchSchedule || "Mon, Wed, Fri (Live Sessions)"}
                </span>
              </span>
            </div>

            {/* Enrolled Students Roster */}
            <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-ink-600 flex-wrap">
              <Users className="w-3.5 h-3.5 text-ink-400 shrink-0" />
              <span className="text-ink-400 font-bold">Enrolled Students ({activeRoadmap.enrolledStudents?.length || 0}):</span>
              {(activeRoadmap.enrolledStudents || []).map((student, idx) => (
                <span
                  key={idx}
                  className="bg-ink-50 px-2 py-0.5 rounded border border-ink-200 text-[11px] text-ink-800"
                >
                  {student}
                </span>
              ))}
            </div>
          </div>

          {/* Right Action Stack / Course Switcher */}
          <div className="flex flex-col gap-2 shrink-0 sm:min-w-[260px]">
            <label className="text-[10px] font-mono uppercase font-bold text-ink-400">
              Select Course Syllabus
            </label>
            <select
              value={selectedRoadmapId}
              onChange={(e) => setSelectedRoadmapId(e.target.value)}
              className="px-3 py-2 text-xs bg-ink-50 border border-ink-200 rounded font-mono font-bold text-ink-900 focus:outline-none focus:border-ink-900"
            >
              {roadmaps.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.tutorName} — {r.courseTitle}
                </option>
              ))}
            </select>

            {viewMode === "teacher" && (
              <button
                onClick={() => setShowCreateSyllabusModal(true)}
                className="mt-1 w-full px-3 py-2 bg-ink-900 hover:bg-black text-white text-xs font-bold font-mono rounded flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Create New Course Syllabus
              </button>
            )}

            {viewMode === "student" && (
              <div className="mt-1 p-2 bg-accent-blue-subtle/40 border border-accent-blue-border rounded text-[11px] text-accent-blue font-mono">
                <span className="font-bold">Student View Active:</span> You can view course pace and download teacher handouts, homework & assignments.
              </div>
            )}
          </div>
        </div>

        {/* Progress Statistics Bar */}
        <div className="mt-6 pt-5 border-t border-ink-100">
          <div className="flex items-center justify-between font-mono mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-ink-900">{progressPercent}%</span>
              <span className="text-xs text-ink-500">
                syllabus completed ({completedTopics}/{totalTopics} topics)
              </span>
            </div>
            <span className="text-[11px] font-semibold text-accent-blue bg-accent-blue-subtle px-2.5 py-0.5 rounded border border-accent-blue-border">
              Target Exam: {activeRoadmap.targetExamDate}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-ink-100 rounded-xs h-2 overflow-hidden flex">
            <div
              className="bg-ink-900 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            {inProgressTopics > 0 && totalTopics > 0 && (
              <div
                className="bg-accent-blue h-full transition-all duration-300"
                style={{ width: `${Math.round((inProgressTopics / totalTopics) * 100)}%` }}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-ink-500 mt-2.5">
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs bg-ink-900" /> {completedTopics} Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs bg-accent-blue" /> {inProgressTopics} In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs bg-ink-200" />{" "}
                {Math.max(0, totalTopics - completedTopics - inProgressTopics)} Upcoming
              </span>
            </div>
            {viewMode === "teacher" && (
              <span className="text-[10px] text-ink-400 hidden sm:inline">
                * Click checkbox to update topic completion status
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ===================== CONTROL & FILTER BAR ===================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-ink-200">
        <div className="flex items-center gap-1 bg-ink-100 p-0.5 rounded border border-ink-200 text-xs font-mono overflow-x-auto">
          {[
            { id: "all", label: "All Topics" },
            { id: "completed", label: `Completed (${completedTopics})` },
            { id: "in_progress", label: `In Progress (${inProgressTopics})` },
            { id: "upcoming", label: "Upcoming" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3 py-1 rounded transition-all whitespace-nowrap ${
                filterStatus === tab.id
                  ? "bg-white text-ink-900 font-bold shadow-2xs border border-ink-200"
                  : "text-ink-500 hover:text-ink-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {viewMode === "teacher" ? (
          <button
            onClick={() => setShowAddTopicModal(true)}
            className="px-3 py-1.5 bg-ink-900 hover:bg-black text-white rounded text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Chapter / Topic
          </button>
        ) : (
          <div className="text-xs font-mono text-ink-500 flex items-center gap-1.5 px-2">
            <BookMarked className="w-3.5 h-3.5 text-accent-blue" />
            <span>All lecture notes, worksheets & assignments are live</span>
          </div>
        )}
      </div>

      {/* ===================== SYLLABUS TOPICS ROADMAP LIST ===================== */}
      <div className="space-y-3">
        {filteredTopics.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border border-ink-200 text-center font-mono text-xs text-ink-500 space-y-2">
            <p>No topics match the selected status filter ({filterStatus}).</p>
            {viewMode === "teacher" && (
              <button
                onClick={() => setShowAddTopicModal(true)}
                className="inline-flex items-center gap-1.5 text-ink-900 font-bold underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add a new topic now
              </button>
            )}
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isDone = topic.status === "completed";
            const isInProgress = topic.status === "in_progress";
            const attachments = topic.attachments || [];

            const notesCount = attachments.filter((a) => a.type === "note").length;
            const hwCount = attachments.filter((a) => a.type === "homework").length;
            const assignCount = attachments.filter((a) => a.type === "assignment").length;

            return (
              <div
                key={topic.id}
                className={`p-4 sm:p-5 rounded-lg border transition-all ${
                  isDone
                    ? "bg-white border-ink-200"
                    : isInProgress
                    ? "bg-accent-blue-subtle/20 border-accent-blue-border shadow-2xs"
                    : "bg-white border-ink-200 opacity-90"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Status Toggle Box */}
                    <button
                      onClick={() => toggleTopicStatus(topic.id)}
                      disabled={viewMode !== "teacher"}
                      className={`mt-1 shrink-0 ${
                        viewMode === "teacher" ? "cursor-pointer" : "cursor-default"
                      }`}
                      title={
                        viewMode === "teacher"
                          ? "Teacher action: Click to cycle topic status (Upcoming -> In Progress -> Completed)"
                          : "Status set by teacher"
                      }
                    >
                      {isDone ? (
                        <div className="w-5 h-5 rounded-xs bg-ink-900 text-white flex items-center justify-center hover:bg-black transition-colors">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : isInProgress ? (
                        <div className="w-5 h-5 rounded-xs bg-accent-blue text-white flex items-center justify-center animate-pulse">
                          <Clock className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-xs border border-ink-300 hover:border-ink-600 bg-white" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Chapter Metadata */}
                      <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                        <span className="font-semibold text-ink-500">
                          Ch {topic.chapterNumber}: {topic.chapterName}
                        </span>
                        <span className="text-ink-400">•</span>
                        <span className="text-ink-400 font-mono">~{topic.estimatedHours} hrs</span>
                        {topic.completedDate && (
                          <span className="text-accent-blue font-semibold">
                            (Completed {topic.completedDate})
                          </span>
                        )}
                      </div>

                      {/* Topic Title */}
                      <h3
                        className={`text-base font-bold mt-0.5 leading-snug ${
                          isDone ? "text-ink-900" : "text-ink-900"
                        }`}
                      >
                        {topic.topicName}
                      </h3>

                      {/* Tutor Notes & Assigned Task Box */}
                      {(topic.tutorNotes || topic.homeworkAssigned) && (
                        <div className="mt-3 space-y-2 pt-2 border-t border-ink-100 text-xs">
                          {topic.tutorNotes && (
                            <div className="border-l-2 border-accent-blue pl-2.5 py-1 text-ink-700 bg-accent-blue-subtle/30 rounded-r">
                              <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                                Teacher Directive / Concept Focus
                              </span>
                              {topic.tutorNotes}
                            </div>
                          )}
                          {topic.homeworkAssigned && (
                            <div className="border-l-2 border-accent-red pl-2.5 py-1 text-ink-800 bg-accent-red-subtle/40 rounded-r">
                              <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                                Assigned Action Item
                              </span>
                              {topic.homeworkAssigned}
                            </div>
                          )}
                        </div>
                      )}

                      {/* ===================== ATTACHED RESOURCES SECTION ===================== */}
                      <div className="mt-3.5 pt-3 border-t border-dashed border-ink-200">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink-700">
                            <BookOpen className="w-3.5 h-3.5 text-ink-500" />
                            <span>Attached Course Materials ({attachments.length}):</span>
                            {notesCount > 0 && (
                              <span className="text-[10px] text-accent-blue font-semibold">
                                {notesCount} Notes
                              </span>
                            )}
                            {hwCount > 0 && (
                              <span className="text-[10px] text-ink-600 font-semibold">
                                {hwCount} Worksheets
                              </span>
                            )}
                            {assignCount > 0 && (
                              <span className="text-[10px] text-accent-red font-semibold">
                                {assignCount} Graded Assignments
                              </span>
                            )}
                          </div>

                          {/* Teacher "+ Attach Resource" Button */}
                          {viewMode === "teacher" && (
                            <button
                              onClick={() => openAttachModal(topic)}
                              className="px-2.5 py-1 bg-ink-100 hover:bg-ink-200 text-ink-900 border border-ink-200 rounded font-mono text-[11px] font-bold flex items-center gap-1 transition-colors"
                            >
                              <Plus className="w-3 h-3 text-ink-700" />
                              Attach Resource
                            </button>
                          )}
                        </div>

                        {/* List of Attachments */}
                        {attachments.length === 0 ? (
                          <div className="text-[11px] font-mono text-ink-400 italic py-1">
                            No notes, worksheets, or assignments attached to this topic yet.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {attachments.map((att) => {
                              const isNote = att.type === "note";
                              const isHw = att.type === "homework";
                              const isAssignment = att.type === "assignment";

                              return (
                                <div
                                  key={att.id}
                                  className={`p-2.5 rounded border transition-all flex flex-col justify-between ${
                                    isNote
                                      ? "bg-accent-blue-subtle/30 border-accent-blue-border"
                                      : isAssignment
                                      ? "bg-accent-red-subtle/30 border-accent-red-border"
                                      : "bg-ink-50/70 border-ink-200"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1 font-mono text-[10px]">
                                      <span
                                        className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                                          isNote
                                            ? "bg-accent-blue text-white"
                                            : isAssignment
                                            ? "bg-accent-red text-white"
                                            : "bg-ink-800 text-white"
                                        }`}
                                      >
                                        {isNote
                                          ? "Lecture Note"
                                          : isAssignment
                                          ? "Graded Assignment"
                                          : "Homework Worksheet"}
                                      </span>
                                      {att.fileSize && (
                                        <span className="text-ink-400">{att.fileSize}</span>
                                      )}
                                    </div>

                                    <h4 className="text-xs font-bold text-ink-900 line-clamp-1">
                                      {att.title}
                                    </h4>

                                    {att.description && (
                                      <p className="text-[11px] text-ink-600 line-clamp-2 mt-0.5">
                                        {att.description}
                                      </p>
                                    )}

                                    {/* Due date & Max marks badge */}
                                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-ink-500">
                                      {att.dueDate && (
                                        <span className="flex items-center gap-1 text-ink-700">
                                          <Calendar className="w-3 h-3 text-ink-400" />
                                          Due: {att.dueDate}
                                        </span>
                                      )}
                                      {att.maxMarks && (
                                        <span className="flex items-center gap-1 text-accent-red font-bold">
                                          <Award className="w-3 h-3" />
                                          Max Marks: {att.maxMarks}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Action Buttons: View & Download */}
                                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-ink-200/60 font-mono text-[11px]">
                                    <button
                                      onClick={() => handleOpenViewModal(att, topic)}
                                      className="flex items-center gap-1 text-ink-700 hover:text-ink-900 font-bold"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      View & Read
                                    </button>

                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleDownloadAttachment(att)}
                                        className="flex items-center gap-1 text-accent-blue hover:text-accent-blue-hover font-bold"
                                        title="Download file"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                        Download
                                      </button>

                                      {viewMode === "teacher" && (
                                        <button
                                          onClick={() => handleDeleteAttachment(topic.id, att.id)}
                                          className="text-ink-400 hover:text-accent-red transition-colors"
                                          title="Delete attachment"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 font-mono text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded border uppercase font-bold ${
                        isDone
                          ? "bg-ink-100 text-ink-900 border-ink-200"
                          : isInProgress
                          ? "bg-accent-blue-subtle text-accent-blue border-accent-blue-border"
                          : "bg-white text-ink-400 border-ink-200"
                      }`}
                    >
                      {isDone ? "Completed" : isInProgress ? "Active Pace" : "Upcoming"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ===================== MODAL: CREATE COURSE SYLLABUS ===================== */}
      {showCreateSyllabusModal && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl border border-ink-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-ink-900">Create New Course Syllabus</h3>
                <p className="text-xs text-ink-500 font-mono">
                  Syllabus will be created by teacher and visible to all enrolled students
                </p>
              </div>
              <button
                onClick={() => setShowCreateSyllabusModal(false)}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSyllabus} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CAIE O Level Islamiyat (2058) — Comprehensive Syllabus"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Teacher Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTutorName}
                    onChange={(e) => setNewTutorName(e.target.value)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    value={newInstituteName}
                    onChange={(e) => setNewInstituteName(e.target.value)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Curriculum
                  </label>
                  <select
                    value={newCurriculum}
                    onChange={(e) => setNewCurriculum(e.target.value as any)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                  >
                    <option value="CAIE O Level">CAIE O Level</option>
                    <option value="CAIE A Level">CAIE A Level</option>
                    <option value="Matric (Federal)">Matric (Federal)</option>
                    <option value="Matric (Sindh)">Matric (Sindh)</option>
                    <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                    <option value="MDCAT">MDCAT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Batch Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mon, Wed, Fri • 4:00 PM – 5:30 PM"
                    value={newBatchSchedule}
                    onChange={(e) => setNewBatchSchedule(e.target.value)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Target Exam Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. May/June 2025"
                    value={newTargetExamDate}
                    onChange={(e) => setNewTargetExamDate(e.target.value)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Enrolled Students (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Mustafa Tariq, Hamza Shah, Ayesha Siddiqui"
                  value={newEnrolledStudents}
                  onChange={(e) => setNewEnrolledStudents(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
                <p className="text-[10px] text-ink-400 font-mono mt-1">
                  These students will have full visibility and access to all topics & resources.
                </p>
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Initial Topic Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Major Themes of the Holy Quran"
                  value={newInitialTopic}
                  onChange={(e) => setNewInitialTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setShowCreateSyllabusModal(false)}
                  className="flex-1 py-2 font-medium text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 font-bold text-white bg-ink-900 hover:bg-black rounded transition-colors shadow-2xs font-mono"
                >
                  Save & Publish Syllabus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: ADD TOPIC ===================== */}
      {showAddTopicModal && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl border border-ink-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-ink-100 pb-2">
              <h3 className="font-bold text-sm text-ink-900">Add Chapter / Topic to Course</h3>
              <button onClick={() => setShowAddTopicModal(false)} className="text-ink-400 hover:text-ink-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTopic} className="space-y-3">
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Chapter Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coordinate Geometry & Functions"
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Perpendicular Bisectors & Midpoint"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Estimated Teaching Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  step="0.5"
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTopicModal(false)}
                  className="flex-1 py-1.5 font-medium text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 font-bold text-white bg-ink-900 hover:bg-black rounded font-mono"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: ATTACH RESOURCE ===================== */}
      {showAttachModal && targetTopicForAttach && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl border border-ink-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-ink-900">Attach Academic Resource</h3>
                <p className="text-xs text-ink-500 font-mono">
                  Attaching under: <span className="text-ink-900 font-bold">{targetTopicForAttach.topicName}</span>
                </p>
              </div>
              <button onClick={() => setShowAttachModal(false)} className="text-ink-400 hover:text-ink-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAttachment} className="space-y-3.5 text-xs">
              {/* Type selector */}
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Resource Category *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "note", label: "📄 Lecture Note", desc: "Handout / Guide" },
                    { id: "homework", label: "📝 Homework", desc: "Worksheet drill" },
                    { id: "assignment", label: "📋 Assignment", desc: "Graded test" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setAttachType(cat.id as any)}
                      className={`p-2.5 rounded border text-left transition-all font-mono ${
                        attachType === cat.id
                          ? "bg-ink-900 text-white border-ink-900 shadow-2xs"
                          : "bg-ink-50 border-ink-200 text-ink-800 hover:bg-ink-100"
                      }`}
                    >
                      <div className="font-bold text-xs">{cat.label}</div>
                      <div
                        className={`text-[10px] ${
                          attachType === cat.id ? "text-ink-200" : "text-ink-500"
                        }`}
                      >
                        {cat.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    attachType === "note"
                      ? "e.g. 14-Mark Question Breakdown & Tafseer Model Answers"
                      : attachType === "homework"
                      ? "e.g. Topical Past Papers 2019-2024 Question 1 Drill"
                      : "e.g. Mid-Term Examination: Paper 1 Passages Mock Exam"
                  }
                  value={attachTitle}
                  onChange={(e) => setAttachTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    File Name (Download Identifier)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SKH_Islamiyat_ModelAnswers.pdf"
                    value={attachFileName}
                    onChange={(e) => setAttachFileName(e.target.value)}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                  />
                </div>

                {attachType !== "note" ? (
                  <div>
                    <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={attachDueDate}
                      onChange={(e) => setAttachDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15 mins reading"
                      className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                    />
                  </div>
                )}
              </div>

              {attachType === "assignment" && (
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                    Maximum Graded Marks
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={attachMaxMarks}
                    onChange={(e) => setAttachMaxMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Teacher Instructions / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Instructions for students regarding this document..."
                  value={attachDescription}
                  onChange={(e) => setAttachDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-500 mb-1">
                  Document Content (Full text available for preview & download)
                </label>
                <textarea
                  rows={5}
                  placeholder="Type or paste the lecture handout content, worksheet questions, or assignment rubric here..."
                  value={attachContent}
                  onChange={(e) => setAttachContent(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono text-[11px]"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setShowAttachModal(false)}
                  className="flex-1 py-2 font-medium text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 font-bold text-white bg-ink-900 hover:bg-black rounded font-mono shadow-2xs"
                >
                  Attach to Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: VIEW & DOWNLOAD RESOURCE ===================== */}
      {showViewModal && activeAttachmentView && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl border border-ink-200 overflow-hidden my-6">
            {/* Modal Header */}
            <div className="bg-ink-50 p-5 border-b border-ink-200 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] mb-1">
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      activeAttachmentView.attachment.type === "note"
                        ? "bg-accent-blue text-white"
                        : activeAttachmentView.attachment.type === "assignment"
                        ? "bg-accent-red text-white"
                        : "bg-ink-900 text-white"
                    }`}
                  >
                    {activeAttachmentView.attachment.type.toUpperCase()}
                  </span>
                  <span className="text-ink-400">•</span>
                  <span className="text-ink-600 font-bold">
                    Teacher: {activeAttachmentView.tutorName}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink-900">
                  {activeAttachmentView.attachment.title}
                </h3>
                <p className="text-xs text-ink-500 font-mono mt-0.5">
                  Chapter: {activeAttachmentView.chapterName} • Topic: {activeAttachmentView.topicName}
                </p>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-ink-400 hover:text-ink-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
              {/* Metadata strip */}
              <div className="flex items-center justify-between gap-2 p-3 bg-ink-50 rounded border border-ink-200 font-mono text-[11px] flex-wrap">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-ink-400" />
                  <span className="font-bold text-ink-800">
                    {activeAttachmentView.attachment.fileName}
                  </span>
                  {activeAttachmentView.attachment.fileSize && (
                    <span className="text-ink-400">
                      ({activeAttachmentView.attachment.fileSize})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {activeAttachmentView.attachment.dueDate && (
                    <span className="text-ink-700 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ink-400" />
                      Due: {activeAttachmentView.attachment.dueDate}
                    </span>
                  )}
                  {activeAttachmentView.attachment.maxMarks && (
                    <span className="text-accent-red font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Max Marks: {activeAttachmentView.attachment.maxMarks}
                    </span>
                  )}
                </div>
              </div>

              {/* Instructions if present */}
              {activeAttachmentView.attachment.description && (
                <div className="p-3 bg-accent-blue-subtle/30 rounded border border-accent-blue-border text-ink-800 text-xs">
                  <span className="font-mono text-[10px] font-bold text-accent-blue block uppercase mb-0.5">
                    Teacher Instructions
                  </span>
                  {activeAttachmentView.attachment.description}
                </div>
              )}

              {/* Document Text Box */}
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Document Content Preview
                </label>
                <div className="bg-ink-900 text-ink-100 p-4 rounded font-mono text-[11px] leading-relaxed whitespace-pre-wrap select-text max-h-[350px] overflow-y-auto border border-ink-800 shadow-inner">
                  {activeAttachmentView.attachment.downloadContent || "No preview content available."}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-ink-50 border-t border-ink-200 flex items-center justify-between gap-3 font-mono text-xs">
              <span className="text-[11px] text-ink-500">
                Official document issued by {activeRoadmap.tutorName}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-3 py-1.5 bg-white border border-ink-200 text-ink-700 hover:border-ink-400 rounded font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadAttachment(activeAttachmentView.attachment)}
                  className="px-4 py-1.5 bg-ink-900 hover:bg-black text-white rounded font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
