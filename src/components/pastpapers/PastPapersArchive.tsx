"use client";

import React, { useState } from "react";
import { Search, Download, Eye, X, Check } from "lucide-react";
import { PastPaper, PastPaperCountry } from "@/types";
import { MOCK_PAST_PAPERS } from "@/data/mockPastPapers";

export function PastPapersArchive() {
  const [activeCountry, setActiveCountry] = useState<PastPaperCountry>("pakistan");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewPaper, setPreviewPaper] = useState<PastPaper | null>(null);

  const countryCategories: Record<PastPaperCountry, string[]> = {
    pakistan: ["all", "GCE O Level", "GCE A Level", "MDCAT", "FSC", "Matric"],
    usa: ["all", "SAT", "ACT", "AP (Advanced Placement)"],
    uk: ["all", "IGCSE", "GCSE", "GCE A Level"],
  };

  const filteredPapers = MOCK_PAST_PAPERS.filter((paper) => {
    if (paper.country !== activeCountry) return false;
    if (activeCategory !== "all" && paper.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSubject = paper.subject.toLowerCase().includes(q);
      const matchCode = paper.paperCode.toLowerCase().includes(q);
      const matchSubCat = paper.subCategory?.toLowerCase().includes(q);
      if (!matchSubject && !matchCode && !matchSubCat) return false;
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2 font-mono text-[11px] mb-1">
          <span className="font-bold text-accent-red uppercase tracking-wider">
            Repository
          </span>
          <span className="text-ink-400">•</span>
          <span className="text-ink-500">Official Past Examination Papers</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-ink-900">
          Curriculum Past Papers Archive
        </h1>
        <p className="text-xs text-ink-600 mt-1 max-w-2xl leading-relaxed">
          Topical and annual question papers, official marking keys, and syllabus specifications for Pakistan boards, Cambridge CAIE, US College Board, and UK domestic exams.
        </p>

        {/* 3 Country Selectors */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-ink-100 font-mono text-xs">
          {[
            { id: "pakistan" as PastPaperCountry, label: "Pakistan", sub: "FSc • Matric • MDCAT • O/A" },
            { id: "usa" as PastPaperCountry, label: "United States", sub: "SAT • ACT • AP" },
            { id: "uk" as PastPaperCountry, label: "United Kingdom", sub: "GCSE • IGCSE • A Levels" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCountry(c.id);
                setActiveCategory("all");
              }}
              className={`px-3 py-1.5 rounded border transition-all text-left ${
                activeCountry === c.id
                  ? "bg-ink-900 text-white border-ink-900 font-bold"
                  : "bg-ink-50 text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
            >
              <span className="block font-bold">{c.label}</span>
              <span className={`text-[10px] block ${activeCountry === c.id ? "text-ink-300" : "text-ink-400"}`}>
                {c.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-lg border border-ink-200 p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 font-mono text-[11px]">
            {countryCategories[activeCountry].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-accent-blue text-white font-bold"
                    : "bg-ink-50 text-ink-600 hover:text-ink-900 border border-ink-200"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Paper Listing Cards */}
      <div className="space-y-2">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-lg border border-ink-200 p-3.5 sm:p-4 hover:border-ink-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-ink-100 border border-ink-200 text-ink-800 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  PDF
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap font-mono text-[10px]">
                    <span className="font-bold uppercase text-ink-900 bg-ink-100 px-1.5 py-0.2 rounded border border-ink-200">
                      {paper.category}
                    </span>
                    {paper.subCategory && (
                      <span className="text-accent-blue font-semibold">
                        {paper.subCategory}
                      </span>
                    )}
                    <span className="text-ink-400">
                      {paper.year} • {paper.session}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-ink-900 mt-0.5">
                    {paper.subject}
                  </h3>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-ink-500 mt-1">
                    <span className="text-ink-700 font-semibold">{paper.paperCode}</span>
                    <span>•</span>
                    {paper.hasMarkScheme && (
                      <span className="text-accent-blue flex items-center gap-1 font-semibold">
                        <Check className="w-3 h-3 text-accent-blue" /> Mark Scheme
                      </span>
                    )}
                    <span>•</span>
                    <span>{paper.fileSizeMb} MB</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 sm:self-center shrink-0 font-mono">
                <button
                  onClick={() => setPreviewPaper(paper)}
                  className="px-2.5 py-1 text-xs text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
                <a
                  href={`#download-${paper.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading ${paper.paperCode} (${paper.fileSizeMb} MB)...`);
                  }}
                  className="px-3 py-1 text-xs font-bold text-white bg-ink-900 hover:bg-black rounded flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3 h-3 text-accent-blue" />
                  Download
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-ink-200 p-8 text-center text-ink-500 font-mono text-xs">
            No papers found for the selected query.
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewPaper && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg max-w-xl w-full shadow-xl border border-ink-200 overflow-hidden relative">
            <div className="p-3 bg-ink-900 text-white flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-accent-blue font-bold uppercase tracking-wider block">
                  Paper Inspection
                </span>
                <h3 className="text-xs font-bold text-white truncate max-w-md">{previewPaper.subject}</h3>
              </div>
              <button
                onClick={() => setPreviewPaper(null)}
                className="p-1 rounded text-ink-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 bg-ink-50 border-b border-ink-200">
              <div className="bg-white rounded border border-ink-200 p-5 font-mono text-xs text-ink-800 space-y-3">
                <div className="text-center border-b border-ink-200 pb-3">
                  <div className="font-bold text-sm uppercase text-ink-900">
                    {previewPaper.category} EXAMINATION
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    {previewPaper.subCategory} • {previewPaper.session} {previewPaper.year}
                  </div>
                  <div className="font-bold text-accent-red mt-1">{previewPaper.paperCode}</div>
                </div>

                <div className="space-y-2 text-[11px] text-ink-600 font-sans">
                  <p className="italic">
                    <strong>Instructions to Candidates:</strong> Answer all questions. Write your candidate number and examination centre details in the spaces provided.
                  </p>
                  <div className="p-2.5 bg-ink-50 border border-ink-200 rounded font-mono text-[11px]">
                    <strong>Q1 [Structured]:</strong> An experimental apparatus measures the extension of a helical spring under variable suspended load. Evaluate the linear elastic limit...
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white flex items-center justify-between font-mono text-xs">
              <span className="text-[11px] text-ink-500">
                Size: {previewPaper.fileSizeMb} MB
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewPaper(null)}
                  className="px-3 py-1 text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading ${previewPaper.paperCode}...`);
                    setPreviewPaper(null);
                  }}
                  className="px-3.5 py-1 font-bold text-white bg-ink-900 hover:bg-black rounded flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-accent-blue" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
