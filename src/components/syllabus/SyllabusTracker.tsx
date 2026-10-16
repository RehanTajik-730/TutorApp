"use client";

import React, { useState, useEffect } from "react";
import { Check, Plus, Clock, Circle } from "lucide-react";
import { SyllabusRoadmap, SyllabusTopic } from "@/types";
import { MOCK_SYLLABUS_ROADMAPS } from "@/data/mockSyllabus";

export function SyllabusTracker() {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(MOCK_SYLLABUS_ROADMAPS[0].id);
  const [roadmaps, setRoadmaps] = useState<SyllabusRoadmap[]>(MOCK_SYLLABUS_ROADMAPS);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in_progress" | "upcoming">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newChapterName, setNewChapterName] = useState("");
  const [newHours, setNewHours] = useState(3);

  // Fetch live roadmaps from database on mount
  useEffect(() => {
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
  }, []);

  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];

  const totalTopics = activeRoadmap.topics.length;
  const completedTopics = activeRoadmap.topics.filter((t) => t.status === "completed").length;
  const inProgressTopics = activeRoadmap.topics.filter((t) => t.status === "in_progress").length;
  const progressPercent = Math.round((completedTopics / (totalTopics || 1)) * 100);

  const toggleTopicStatus = async (topicId: string) => {
    let nextStatus: "completed" | "in_progress" | "upcoming" = "upcoming";
    let nextDate: string | undefined = undefined;

    const updated = roadmaps.map((rm) => {
      if (rm.id !== activeRoadmap.id) return rm;
      const updatedTopics = rm.topics.map((t) => {
        if (t.id !== topicId) return t;
        if (t.status === "upcoming") {
          nextStatus = "in_progress";
        } else if (t.status === "in_progress") {
          nextStatus = "completed";
          nextDate = new Date().toISOString().split("T")[0];
        } else {
          nextStatus = "upcoming";
          nextDate = undefined;
        }
        return { ...t, status: nextStatus, completedDate: nextDate };
      });
      return { ...rm, topics: updatedTopics };
    });
    setRoadmaps(updated);

    // Persist to database
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
      console.error("Error saving topic status to DB:", err);
    }
  };

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    try {
      const res = await fetch("/api/syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmapId: activeRoadmap.id,
          chapterName: newChapterName || "General Topic",
          topicName: newTopicName,
          estimatedHours: Number(newHours) || 2,
        }),
      });
      const data = await res.json();
      if (data.success && data.topic) {
        const updated = roadmaps.map((rm) => {
          if (rm.id !== activeRoadmap.id) return rm;
          return { ...rm, topics: [...rm.topics, data.topic] };
        });
        setRoadmaps(updated);
      }
    } catch (err) {
      console.error("Error adding topic to DB:", err);
    }

    setNewTopicName("");
    setNewChapterName("");
    setShowAddModal(false);
  };

  const filteredTopics = activeRoadmap.topics.filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="font-bold text-accent-red uppercase tracking-wider">
                Post-Hire Tracking
              </span>
              <span className="text-ink-400">•</span>
              <span className="text-ink-500">Parent & Tutor Shared View</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-ink-900 mt-1">
              Live Syllabus Roadmap
            </h1>
            <p className="text-xs text-ink-600 mt-0.5 font-mono">
              Tutor: <span className="text-ink-900 font-bold">{activeRoadmap.tutorName}</span> | Student: <span className="text-ink-900 font-bold">{activeRoadmap.studentName}</span>
            </p>
          </div>

          {/* Student / Curriculum Switcher */}
          <div className="flex items-center gap-2">
            <select
              value={selectedRoadmapId}
              onChange={(e) => setSelectedRoadmapId(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-ink-50 border border-ink-200 rounded font-mono font-bold text-ink-900 focus:outline-none focus:border-ink-900"
            >
              {roadmaps.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.studentName} — {r.subject} ({r.curriculum})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress statistics bar */}
        <div className="mt-5 pt-5 border-t border-ink-100">
          <div className="flex items-center justify-between font-mono mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-ink-900">{progressPercent}%</span>
              <span className="text-xs text-ink-500">
                completed ({completedTopics}/{totalTopics} topics)
              </span>
            </div>
            <span className="text-[11px] font-semibold text-accent-blue bg-accent-blue-subtle px-2 py-0.5 rounded border border-accent-blue-border">
              Target: {activeRoadmap.targetExamDate}
            </span>
          </div>

          {/* Clean Progress Meter */}
          <div className="w-full bg-ink-100 rounded-xs h-2 overflow-hidden flex">
            <div
              className="bg-ink-900 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            {inProgressTopics > 0 && (
              <div
                className="bg-accent-blue h-full transition-all duration-300"
                style={{ width: `${Math.round((inProgressTopics / totalTopics) * 100)}%` }}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-ink-500 mt-2">
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs bg-ink-900" /> {completedTopics} Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs bg-accent-blue" /> {inProgressTopics} In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs bg-ink-200" /> {totalTopics - completedTopics - inProgressTopics} Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-ink-200">
        <div className="flex items-center gap-1 bg-ink-100 p-0.5 rounded border border-ink-200 text-xs font-mono">
          {[
            { id: "all", label: "All" },
            { id: "completed", label: `Completed (${completedTopics})` },
            { id: "in_progress", label: `In Progress (${inProgressTopics})` },
            { id: "upcoming", label: "Upcoming" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-2.5 py-1 rounded transition-all whitespace-nowrap ${
                filterStatus === tab.id
                  ? "bg-white text-ink-900 font-bold shadow-2xs border border-ink-200"
                  : "text-ink-500 hover:text-ink-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 bg-ink-900 hover:bg-black text-white rounded text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Topic
        </button>
      </div>

      {/* Topics Roadmap List */}
      <div className="space-y-2">
        {filteredTopics.map((topic) => {
          const isDone = topic.status === "completed";
          const isInProgress = topic.status === "in_progress";

          return (
            <div
              key={topic.id}
              className={`p-3.5 sm:p-4 rounded-lg border transition-all ${
                isDone
                  ? "bg-white border-ink-200"
                  : isInProgress
                  ? "bg-accent-blue-subtle/30 border-accent-blue-border"
                  : "bg-white border-ink-200 opacity-80"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Status Toggle Box */}
                  <button
                    onClick={() => toggleTopicStatus(topic.id)}
                    className="mt-0.5 shrink-0"
                    title="Click to toggle topic status"
                  >
                    {isDone ? (
                      <div className="w-5 h-5 rounded-xs bg-ink-900 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-5 h-5 rounded-xs bg-accent-blue text-white flex items-center justify-center">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-xs border border-ink-300 hover:border-ink-600 bg-white" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                      <span className="font-semibold text-ink-500">
                        Ch {topic.chapterNumber}: {topic.chapterName}
                      </span>
                      <span className="text-ink-400">•</span>
                      <span className="text-ink-400">~{topic.estimatedHours} hrs</span>
                      {topic.completedDate && (
                        <span className="text-accent-blue font-semibold">
                          (Verified {topic.completedDate})
                        </span>
                      )}
                    </div>

                    <h3 className={`text-sm font-bold mt-0.5 ${isDone ? "text-ink-900" : "text-ink-800"}`}>
                      {topic.topicName}
                    </h3>

                    {/* Tutor Notes & Homework with Clean Editorial Left Borders */}
                    {(topic.tutorNotes || topic.homeworkAssigned) && (
                      <div className="mt-2.5 space-y-1.5 pt-2 border-t border-ink-100 text-xs">
                        {topic.tutorNotes && (
                          <div className="border-l-2 border-accent-blue pl-2.5 py-0.5 text-ink-700">
                            <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                              Tutor Note
                            </span>
                            {topic.tutorNotes}
                          </div>
                        )}
                        {topic.homeworkAssigned && (
                          <div className="border-l-2 border-accent-red pl-2.5 py-0.5 text-ink-800 bg-accent-red-subtle/50 p-2 rounded-r">
                            <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                              Assigned Task
                            </span>
                            {topic.homeworkAssigned}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

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
                    {isDone ? "Completed" : isInProgress ? "Active" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl border border-ink-200 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-ink-900">Add Topic to Syllabus</h3>
            <form onSubmit={handleAddTopic} className="space-y-3">
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Chapter
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electromagnetism"
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Topic Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Transformers & Power"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
              </div>
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-1.5 font-medium text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 font-bold text-white bg-ink-900 hover:bg-black rounded"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
