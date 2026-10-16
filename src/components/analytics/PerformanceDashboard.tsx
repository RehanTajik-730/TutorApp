"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FileDown } from "lucide-react";
import { MOCK_STUDENT_ANALYTICS } from "@/data/mockAnalytics";

export function PerformanceDashboard() {
  const [data, setData] = useState(MOCK_STUDENT_ANALYTICS);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.analytics) {
          setData(resData.analytics);
        }
      })
      .catch((err) => console.error("Error loading analytics from DB:", err));
  }, []);

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] mb-1">
              <span className="font-bold text-accent-red uppercase tracking-wider">
                Academic Progress Audit
              </span>
              <span className="text-ink-400">•</span>
              <span className="text-ink-500">Verified Improvement Trajectory</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-ink-900">
              Student Improvement Analytics
            </h1>
            <p className="text-xs text-ink-600 mt-0.5 font-mono">
              Student: <span className="font-bold text-ink-900">{data.studentName}</span> | Subject: <span className="font-bold text-ink-900">{data.subject}</span> | Tutor: <span className="font-bold text-ink-900">{data.tutorName}</span>
            </p>
          </div>

          <button
            onClick={handleDownloadReport}
            className="px-3.5 py-2 bg-ink-900 hover:bg-black text-white rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <FileDown className="w-3.5 h-3.5 text-accent-blue" />
            Export Monthly PDF Audit
          </button>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-2 bg-ink-50 border border-ink-200 rounded font-mono text-xs text-accent-blue font-semibold">
            ✓ Report compiled: Hamza Shah — Physics 5054 performance transcript exported.
          </div>
        )}

        {/* 4 Clean Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-5 border-t border-ink-100 font-mono">
          <div className="p-3 bg-ink-50 rounded border border-ink-200">
            <span className="text-[10px] text-ink-400 uppercase">Baseline at Hire ({data.hireDate})</span>
            <div className="text-xl font-bold text-ink-700 mt-0.5">{data.baselineScore}%</div>
            <span className="text-[10px] text-ink-500">Diagnostic grade C</span>
          </div>

          <div className="p-3 bg-ink-50 rounded border border-ink-200">
            <span className="text-[10px] text-ink-400 uppercase">Current Score</span>
            <div className="text-xl font-bold text-accent-blue mt-0.5">{data.currentScore}%</div>
            <span className="text-[10px] text-ink-500">Top quartile (Grade A)</span>
          </div>

          <div className="p-3 bg-accent-red-subtle/50 rounded border border-accent-red-border">
            <span className="text-[10px] text-accent-red uppercase font-bold">Net Academic Delta</span>
            <div className="text-xl font-bold text-accent-red mt-0.5">+{data.improvementDelta}%</div>
            <span className="text-[10px] text-ink-500">Measurable gain</span>
          </div>

          <div className="p-3 bg-ink-50 rounded border border-ink-200">
            <span className="text-[10px] text-ink-400 uppercase">Target Board Grade</span>
            <div className="text-xl font-bold text-ink-900 mt-0.5">{data.targetExamScore}%</div>
            <span className="text-[10px] text-ink-500">CAIE May/June 2025</span>
          </div>
        </div>
      </div>

      {/* Trajectory Graph */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="font-bold text-sm text-ink-900 tracking-tight">
              Score Progression from Baseline (Jun 2024 — Present)
            </h2>
            <p className="text-xs text-ink-500 mt-0.5 font-mono">
              Aggregated across school midterms, tutor mock papers, and in-app quizzes
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-ink-900" />
              <span className="text-ink-800 font-bold">Student Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-accent-red" />
              <span className="text-ink-500">Cohort Baseline</span>
            </div>
          </div>
        </div>

        {/* Recharts Area */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="inkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 2" stroke="#e4e4e7" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#71717a", fontFamily: "monospace" }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: "#71717a", fontFamily: "monospace" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-ink-900 text-white p-2.5 rounded border border-ink-700 text-xs font-mono space-y-0.5 shadow-md">
                        <p className="font-bold text-accent-blue">{label}</p>
                        <p className="text-ink-300 text-[11px]">{item.stage}</p>
                        <p className="font-bold">Score: {item.score}%</p>
                        <p className="text-ink-400 text-[10px]">Benchmark: {item.benchmark}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#09090b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#inkGradient)"
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#dc2626"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Columns: Diagnostics & Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic Diagnostics */}
        <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-2">
            <h3 className="font-bold text-xs uppercase font-mono tracking-wider text-ink-500">
              Topical Mastery Diagnostics
            </h3>
            <span className="font-mono text-[10px] text-ink-400">Physics 5054</span>
          </div>

          <div className="space-y-2.5">
            {data.topicStrengths.map((item, idx) => {
              const isMastered = item.status === "mastered";
              const isProficient = item.status === "proficient";
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-ink-800 font-medium">{item.topic}</span>
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        isMastered
                          ? "text-ink-900"
                          : isProficient
                          ? "text-accent-blue"
                          : "text-accent-red"
                      }`}
                    >
                      {item.masteryPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-ink-100 rounded-xs h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-xs transition-all duration-300 ${
                        isMastered
                          ? "bg-ink-900"
                          : isProficient
                          ? "bg-accent-blue"
                          : "bg-accent-red"
                      }`}
                      style={{ width: `${item.masteryPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Log */}
        <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-2">
            <h3 className="font-bold text-xs uppercase font-mono tracking-wider text-ink-500">
              Verified Assessment Log
            </h3>
            <span className="font-mono text-[10px] text-ink-400">Score Register</span>
          </div>

          <div className="space-y-2">
            {data.recentAssessments.map((as) => (
              <div
                key={as.id}
                className="p-3 rounded border border-ink-200 bg-ink-50 flex justify-between items-start text-xs"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-ink-600 bg-white border border-ink-200 px-1.5 py-0.2 rounded">
                    {as.assessmentType === "in_app_ai_quiz"
                      ? "In-App Quiz"
                      : as.assessmentType === "tutor_mock"
                      ? "Tutor Mock"
                      : "School Exam"}
                  </span>
                  <h4 className="font-bold text-ink-900 mt-1">{as.title}</h4>
                  <span className="font-mono text-[10px] text-ink-400">{as.date}</span>
                </div>

                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-ink-900">{as.scorePercentage}%</div>
                  {as.classAveragePercentage && (
                    <span className="text-[10px] text-ink-400 block">
                      Avg: {as.classAveragePercentage}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
