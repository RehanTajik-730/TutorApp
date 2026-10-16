"use client";

import React from "react";
import { Star, MapPin, Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Tutor } from "@/types";
import { formatPKR } from "@/lib/utils";

interface TutorCardProps {
  tutor: Tutor;
  distanceKm: number;
  onSelect: (tutor: Tutor) => void;
  onHire: (tutor: Tutor) => void;
}

export function TutorCard({ tutor, distanceKm, onSelect, onHire }: TutorCardProps) {
  const topBundle = tutor.bundles[0];

  return (
    <div className="bg-white rounded-lg border border-ink-200 hover:border-ink-900 transition-colors duration-150 flex flex-col justify-between overflow-hidden group">
      <div className="p-4 sm:p-5">
        {/* Header: Avatar, Name, Distance */}
        <div className="flex items-start gap-3.5">
          <img
            src={tutor.avatarUrl}
            alt={tutor.name}
            className="w-13 h-13 rounded object-cover border border-ink-200 grayscale-30 group-hover:grayscale-0 transition-all shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div>
                <h3 className="font-bold text-sm text-ink-900 truncate tracking-tight">
                  {tutor.name}
                </h3>
                <p className="text-[11px] font-mono text-ink-500 line-clamp-1 mt-0.5">
                  {tutor.qualification}
                </p>
              </div>

              {/* Distance Indicator */}
              <span className="font-mono text-[10px] font-bold text-ink-900 bg-ink-100 border border-ink-200 px-1.5 py-0.5 rounded shrink-0">
                {distanceKm} km
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-ink-500">
              <span>{tutor.location.area}</span>
              <span>•</span>
              <span className="text-accent-blue font-semibold">
                ★ {tutor.rating.toFixed(1)} ({tutor.reviews.length})
              </span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-ink-700 mt-3 line-clamp-2 leading-relaxed">
          {tutor.tagline}
        </p>

        {/* Badges / Metrics row */}
        <div className="mt-3.5 pt-3 border-t border-ink-100 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-ink-600">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <span>{tutor.syllabusCompletionRate}% syllabus completion</span>
          </div>

          {tutor.verifiedCnic && (
            <span className="text-ink-700 flex items-center gap-1 font-semibold">
              <Check className="w-3 h-3 text-accent-blue" /> Verified
            </span>
          )}
        </div>

        {/* Subjects list */}
        <div className="mt-3 flex flex-wrap gap-1">
          {tutor.subjects.slice(0, 3).map((subj) => (
            <span
              key={subj}
              className="font-mono text-[10px] bg-ink-100 text-ink-800 px-1.5 py-0.5 rounded border border-ink-200"
            >
              {subj}
            </span>
          ))}
          {tutor.curricula.slice(0, 2).map((curr) => (
            <span
              key={curr}
              className="font-mono text-[10px] bg-accent-blue-subtle text-accent-blue border border-accent-blue-border px-1.5 py-0.5 rounded"
            >
              {curr}
            </span>
          ))}
        </div>

        {/* Bundle highlight */}
        {topBundle && (
          <div className="mt-3 bg-accent-red-subtle border border-accent-red-border rounded p-2 flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] font-medium text-accent-red truncate">
              {topBundle.name}
            </span>
            <span className="font-mono text-[10px] font-bold text-white bg-accent-red px-1.5 py-0.2 rounded shrink-0">
              -{topBundle.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Footer / Action */}
      <div className="bg-ink-50 border-t border-ink-200 px-4 py-3 flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-bold font-mono text-ink-900 tracking-tight">
            {formatPKR(tutor.monthlyRatePKR)}
            <span className="text-[10px] text-ink-500 font-normal"> /mo</span>
          </div>
          <div className="text-[10px] font-mono text-ink-500">
            {formatPKR(tutor.hourlyRatePKR)}/hr
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelect(tutor)}
            className="px-2.5 py-1.5 text-xs font-medium text-ink-800 bg-white border border-ink-200 hover:border-ink-400 rounded transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onHire(tutor)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-ink-900 hover:bg-black rounded transition-colors flex items-center gap-1"
          >
            Hire
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
