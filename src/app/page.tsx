"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ArrowUpRight, Compass, Shield, Users, ListChecks } from "lucide-react";
import { Tutor } from "@/types";
import { MOCK_TUTORS } from "@/data/mockTutors";
import { PAKISTAN_LOCATIONS, calculateDistanceKm } from "@/lib/utils";
import { SearchFilters } from "@/components/marketplace/SearchFilters";
import { TutorCard } from "@/components/marketplace/TutorCard";
import { TutorDetailModal } from "@/components/marketplace/TutorDetailModal";
import { HireBookingModal } from "@/components/marketplace/HireBookingModal";

export default function MarketplacePage() {
  const [tutorsList, setTutorsList] = useState<Tutor[]>(MOCK_TUTORS);
  const [userLocation, setUserLocation] = useState(PAKISTAN_LOCATIONS[0]);
  const [radiusKm, setRadiusKm] = useState(15);
  const [selectedCurriculum, setSelectedCurriculum] = useState("All Curricula");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("all");

  const [selectedTutorForDetail, setSelectedTutorForDetail] = useState<Tutor | null>(null);
  const [tutorToHire, setTutorToHire] = useState<Tutor | null>(null);

  useEffect(() => {
    fetch("/api/tutors")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tutors && data.tutors.length > 0) {
          setTutorsList(data.tutors);
        }
      })
      .catch((err) => console.error("Error loading tutors from DB:", err));
  }, []);

  const rankedTutors = useMemo(() => {
    return tutorsList.map((tutor) => {
      const distance = calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        tutor.location.lat,
        tutor.location.lng
      );
      return { tutor, distance };
    })
      .filter(({ tutor, distance }) => {
        if (distance > radiusKm) return false;
        if (
          selectedCurriculum !== "All Curricula" &&
          !tutor.curricula.includes(selectedCurriculum as any)
        ) {
          return false;
        }
        if (
          selectedSubject !== "All Subjects" &&
          !tutor.subjects.includes(selectedSubject)
        ) {
          return false;
        }
        if (modeFilter !== "all") {
          if (!tutor.teachingModes.includes(modeFilter as any)) {
            return false;
          }
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = tutor.name.toLowerCase().includes(q);
          const matchQual = tutor.qualification.toLowerCase().includes(q);
          const matchSubj = tutor.subjects.some((s) => s.toLowerCase().includes(q));
          const matchBio = tutor.bio.toLowerCase().includes(q);
          if (!matchName && !matchQual && !matchSubj && !matchBio) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (Math.abs(a.distance - b.distance) < 0.5) {
          return b.tutor.rating - a.tutor.rating;
        }
        return a.distance - b.distance;
      });
  }, [
    userLocation,
    radiusKm,
    selectedCurriculum,
    selectedSubject,
    modeFilter,
    searchQuery,
  ]);

  return (
    <div className="space-y-6">
      {/* Editorial Hero Section */}
      <section className="bg-white rounded-lg border border-ink-200 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="font-bold text-accent-red uppercase tracking-wider">
              TutorBridge Platform
            </span>
            <span className="text-ink-400">•</span>
            <span className="text-accent-blue font-semibold">Proximity & Academic Verification</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink-900 leading-tight">
            Verified Tutors Nearby. <br className="hidden sm:block" />
            <span className="text-ink-500 font-normal">Accountability from Day One.</span>
          </h1>

          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed max-w-2xl">
            Locate verified educators across Karachi, Lahore, and Islamabad filtered by proximity and curriculum. Post-hire visibility includes a shared syllabus roadmap, weekly diagnostic quizzes, and score improvement curves.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[11px] text-ink-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-900" />
              CNIC & Degree Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
              Transparent Sibling Bundles
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
              Post-Hire Syllabus Tracking
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <SearchFilters
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        radiusKm={radiusKm}
        setRadiusKm={setRadiusKm}
        selectedCurriculum={selectedCurriculum}
        setSelectedCurriculum={setSelectedCurriculum}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        modeFilter={modeFilter}
        setModeFilter={setModeFilter}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between font-mono text-xs">
        <div>
          <span className="font-bold text-ink-900">{rankedTutors.length} Tutors</span>
          <span className="text-ink-500"> within {radiusKm} km of {userLocation.area}</span>
        </div>
        <div className="text-ink-400 text-[11px]">
          Order: Distance ascending
        </div>
      </div>

      {/* Grid */}
      {rankedTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rankedTutors.map(({ tutor, distance }) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              distanceKm={distance}
              onSelect={(tut) => setSelectedTutorForDetail(tut)}
              onHire={(tut) => setTutorToHire(tut)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-ink-200 p-12 text-center text-ink-500 font-mono text-xs space-y-2">
          <Compass className="w-8 h-8 text-ink-400 mx-auto" />
          <div className="font-bold text-ink-800">
            No tutors found within {radiusKm} km of {userLocation.area}
          </div>
          <p className="text-[11px]">
            Expand your radius or clear subject filters to search broader areas in {userLocation.city}.
          </p>
          <button
            onClick={() => {
              setRadiusKm(25);
              setSelectedCurriculum("All Curricula");
              setSelectedSubject("All Subjects");
            }}
            className="mt-2 px-3 py-1.5 bg-ink-900 text-white rounded text-xs font-semibold hover:bg-black transition-colors"
          >
            Reset Filters (25 km)
          </button>
        </div>
      )}

      {/* Modals */}
      {selectedTutorForDetail && (
        <TutorDetailModal
          tutor={selectedTutorForDetail}
          distanceKm={
            calculateDistanceKm(
              userLocation.lat,
              userLocation.lng,
              selectedTutorForDetail.location.lat,
              selectedTutorForDetail.location.lng
            )
          }
          onClose={() => setSelectedTutorForDetail(null)}
          onHire={(tut) => {
            setSelectedTutorForDetail(null);
            setTutorToHire(tut);
          }}
        />
      )}

      {tutorToHire && (
        <HireBookingModal
          tutor={tutorToHire}
          onClose={() => setTutorToHire(null)}
        />
      )}
    </div>
  );
}
