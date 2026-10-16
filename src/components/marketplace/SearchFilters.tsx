"use client";

import React from "react";
import { Search, MapPin, Compass, SlidersHorizontal } from "lucide-react";
import { PAKISTAN_LOCATIONS } from "@/lib/utils";

interface SearchFiltersProps {
  userLocation: { city: string; area: string; lat: number; lng: number };
  setUserLocation: (loc: { city: string; area: string; lat: number; lng: number }) => void;
  radiusKm: number;
  setRadiusKm: (radius: number) => void;
  selectedCurriculum: string;
  setSelectedCurriculum: (curriculum: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  modeFilter: string;
  setModeFilter: (mode: string) => void;
}

export function SearchFilters({
  userLocation,
  setUserLocation,
  radiusKm,
  setRadiusKm,
  selectedCurriculum,
  setSelectedCurriculum,
  selectedSubject,
  setSelectedSubject,
  searchQuery,
  setSearchQuery,
  modeFilter,
  setModeFilter,
}: SearchFiltersProps) {
  const curriculaList = [
    "All Curricula",
    "CAIE O Level",
    "CAIE A Level",
    "Matric (Federal)",
    "Matric (Punjab)",
    "FSc Pre-Engineering",
    "FSc Pre-Medical",
    "MDCAT",
    "ECAT",
    "SAT / ACT",
    "Junior School (Grade 1-8)",
  ];

  const subjectsList = [
    "All Subjects",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English Language",
    "Urdu",
  ];

  return (
    <div className="bg-white rounded-lg border border-ink-200 p-4 sm:p-5 shadow-2xs">
      {/* Primary search row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Keyword Search */}
        <div className="md:col-span-5">
          <label className="block text-[11px] font-mono uppercase font-bold text-ink-500 mb-1 tracking-wider">
            Search Tutor / Institution
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. NUST, Dow, Physics, Calculus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 focus:bg-white text-ink-900 placeholder:text-ink-400"
            />
          </div>
        </div>

        {/* Location Selector */}
        <div className="md:col-span-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-mono uppercase font-bold text-ink-500 tracking-wider">
              Client Location
            </label>
            <span className="text-[10px] font-mono font-semibold text-accent-blue bg-accent-blue-subtle px-1.5 py-0.2 rounded border border-accent-blue-border">
              {userLocation.city}
            </span>
          </div>
          <select
            value={`${userLocation.lat},${userLocation.lng}`}
            onChange={(e) => {
              const [lat, lng] = e.target.value.split(",").map(Number);
              const found = PAKISTAN_LOCATIONS.find(
                (l) => Math.abs(l.lat - lat) < 0.001 && Math.abs(l.lng - lng) < 0.001
              );
              if (found) setUserLocation(found);
            }}
            className="w-full px-2.5 py-2 text-xs bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 focus:bg-white text-ink-900"
          >
            {PAKISTAN_LOCATIONS.map((loc) => (
              <option key={`${loc.lat},${loc.lng}`} value={`${loc.lat},${loc.lng}`}>
                {loc.city}: {loc.area}
              </option>
            ))}
          </select>
        </div>

        {/* Proximity Slider */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-mono uppercase font-bold text-ink-500 tracking-wider">
              Max Radius
            </label>
            <span className="text-[11px] font-mono font-bold text-accent-red">
              {radiusKm} km
            </span>
          </div>
          <div className="py-2">
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full accent-ink-900 h-1.5 bg-ink-200 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Secondary filter parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 mt-3 border-t border-ink-100">
        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-ink-400 mb-1 tracking-wider">
            Curriculum
          </label>
          <select
            value={selectedCurriculum}
            onChange={(e) => setSelectedCurriculum(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-800"
          >
            {curriculaList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-ink-400 mb-1 tracking-wider">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-800"
          >
            {subjectsList.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-ink-400 mb-1 tracking-wider">
            Teaching Mode
          </label>
          <div className="flex bg-ink-100 p-0.5 rounded border border-ink-200">
            {[
              { id: "all", label: "All" },
              { id: "in_person", label: "In-Person" },
              { id: "online", label: "Online" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setModeFilter(m.id)}
                className={`flex-1 py-1 text-[11px] font-medium rounded transition-all ${
                  modeFilter === m.id
                    ? "bg-white text-ink-900 font-bold shadow-2xs border border-ink-200"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
