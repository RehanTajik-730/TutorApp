"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Check,
  Building2,
  GraduationCap,
  Star,
  Users,
  Phone,
  Globe,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { Tutor } from "@/types";
import { formatPKR } from "@/lib/utils";
import { HireBookingModal } from "@/components/marketplace/HireBookingModal";

export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "bundles" | "reviews">("overview");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tutor) {
          setTutor(data.tutor);
        }
      })
      .catch((err) => console.error("Error loading tutor profile:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center font-mono text-xs text-ink-500">
        Loading verified faculty profile...
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center font-mono text-xs text-ink-500 space-y-3">
        <p>Tutor profile not found.</p>
        <Link
          href="/"
          className="inline-block px-3 py-1.5 bg-ink-900 text-white rounded text-xs font-semibold"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const hasInstitute = tutor.instituteName && tutor.instituteName !== "Independent";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Faculty & Tutors Directory
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-lg border border-ink-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <img
            src={tutor.avatarUrl}
            alt={tutor.name}
            className="w-20 h-20 rounded-md object-cover border border-ink-200 shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                  hasInstitute
                    ? "bg-accent-blue-subtle text-accent-blue border-accent-blue-border"
                    : "bg-ink-100 text-ink-900 border-ink-200"
                }`}
              >
                {hasInstitute ? `🏫 Faculty at ${tutor.instituteName}` : "👤 Independent Senior Educator"}
              </span>

              {tutor.verifiedCnic && (
                <span className="font-mono text-[10px] text-ink-700 bg-ink-50 px-2 py-0.5 rounded border border-ink-200 flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3 text-accent-blue" /> Verified Credentials
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-900">
              {tutor.name}
            </h1>

            <p className="text-xs font-mono text-accent-blue font-semibold mt-0.5">
              {tutor.qualification}
            </p>

            <p className="text-xs text-ink-600 mt-2 leading-relaxed">{tutor.tagline}</p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-ink-500">
              <span className="flex items-center gap-1 text-ink-700">
                <MapPin className="w-3.5 h-3.5 text-accent-red" />
                {tutor.location.area}, {tutor.location.city}
              </span>

              <span className="flex items-center gap-1 text-accent-blue font-bold">
                ★ {tutor.rating.toFixed(1)} ({tutor.reviews.length} reviews)
              </span>

              <span>{tutor.totalStudentsTaught}+ students coached</span>

              <span className="text-ink-700 font-semibold">
                {tutor.syllabusCompletionRate}% syllabus completion
              </span>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="sm:self-center shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-ink-100">
            <div className="text-right sm:text-right mb-2 font-mono">
              <div className="text-[10px] text-ink-400 uppercase">Monthly Tuition</div>
              <div className="text-lg font-bold text-ink-900">{formatPKR(tutor.monthlyRatePKR)}/mo</div>
              <div className="text-[10px] text-ink-500">{formatPKR(tutor.hourlyRatePKR)}/hr session</div>
            </div>
            <button
              onClick={() => setIsHireOpen(true)}
              className="w-full sm:w-auto px-5 py-2 text-xs font-bold font-mono text-white bg-ink-900 hover:bg-black rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              Hire & Start Roadmap
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-blue" />
            </button>
          </div>
        </div>

        {/* Contact links if available */}
        {(tutor.phone || tutor.website) && (
          <div className="mt-4 pt-4 border-t border-ink-100 flex flex-wrap gap-4 font-mono text-xs text-ink-600">
            {tutor.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-ink-400" />
                Inquiries / WhatsApp: <strong>{tutor.phone}</strong>
              </span>
            )}
            {tutor.website && (
              <a
                href={tutor.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-accent-blue hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                Institute Portal ({tutor.instituteName})
              </a>
            )}
          </div>
        )}
      </div>

      {/* Teaching Modes Offered */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 shadow-2xs">
        <h2 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider mb-3">
          Instruction Modes Offered
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div
            className={`p-3 rounded border ${
              tutor.teachingModes.includes("home_visit")
                ? "border-ink-900 bg-ink-50 text-ink-900 font-bold"
                : "border-ink-200 text-ink-300 opacity-60"
            }`}
          >
            <div className="text-base mb-1">🏠</div>
            <div>Home Visit Tutoring</div>
            <span className="text-[10px] font-normal text-ink-500 block">
              {tutor.teachingModes.includes("home_visit") ? "Available in locality" : "Not offered"}
            </span>
          </div>

          <div
            className={`p-3 rounded border ${
              tutor.teachingModes.includes("in_center")
                ? "border-accent-blue bg-accent-blue-subtle text-accent-blue font-bold"
                : "border-ink-200 text-ink-300 opacity-60"
            }`}
          >
            <div className="text-base mb-1">🏫</div>
            <div>In-Center / Academy</div>
            <span className="text-[10px] font-normal text-ink-500 block">
              {tutor.teachingModes.includes("in_center") ? `${tutor.instituteName} Campus` : "Not offered"}
            </span>
          </div>

          <div
            className={`p-3 rounded border ${
              tutor.teachingModes.includes("online")
                ? "border-ink-900 bg-ink-50 text-ink-900 font-bold"
                : "border-ink-200 text-ink-300 opacity-60"
            }`}
          >
            <div className="text-base mb-1">💻</div>
            <div>Live 1-on-1 Online</div>
            <span className="text-[10px] font-normal text-ink-500 block">
              {tutor.teachingModes.includes("online") ? "Zoom / Google Meet" : "Not offered"}
            </span>
          </div>

          <div
            className={`p-3 rounded border ${
              tutor.teachingModes.includes("hybrid")
                ? "border-accent-red bg-accent-red-subtle text-accent-red font-bold"
                : "border-ink-200 text-ink-300 opacity-60"
            }`}
          >
            <div className="text-base mb-1">👥</div>
            <div>Hybrid Batch</div>
            <span className="text-[10px] font-normal text-ink-500 block">
              {tutor.teachingModes.includes("hybrid") ? "In-Center + Portal" : "Not offered"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-ink-200 font-mono text-xs">
        {[
          { id: "overview", label: "Overview & Bio" },
          { id: "curriculum", label: "Curricula & Subjects" },
          { id: "bundles", label: `Fee Packages (${tutor.bundles.length})` },
          { id: "reviews", label: `Verified Reviews (${tutor.reviews.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-bold transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-ink-900 text-ink-900"
                : "border-transparent text-ink-400 hover:text-ink-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-4">
            <h3 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider">
              About {tutor.name}
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed bg-ink-50 p-4 rounded border border-ink-200">
              {tutor.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ink-100 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400">Institutional Affiliation</span>
                <p className="text-ink-900 font-bold">{tutor.instituteName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400">Response Speed</span>
                <p className="text-ink-900 font-bold">{tutor.responseSpeed}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Curriculum & Subjects */}
      {activeTab === "curriculum" && (
        <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-5">
          <div>
            <h4 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider mb-2">
              Curricula & Exam Boards
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tutor.curricula.map((curr) => (
                <span
                  key={curr}
                  className="font-mono text-[11px] font-bold bg-accent-blue-subtle text-accent-blue border border-accent-blue-border px-2.5 py-1 rounded"
                >
                  {curr}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink-100">
            <h4 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider mb-2">
              Subjects Taught
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tutor.subjects.map((subj) => (
                <span
                  key={subj}
                  className="font-mono text-[11px] bg-ink-100 text-ink-800 border border-ink-200 px-2.5 py-1 rounded font-semibold"
                >
                  {subj}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink-100">
            <h4 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider mb-2">
              Eligible Student Grades
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tutor.grades.map((gr) => (
                <span
                  key={gr}
                  className="font-mono text-[10px] bg-ink-50 text-ink-600 border border-ink-200 px-2 py-0.5 rounded"
                >
                  {gr}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bundles & Packages */}
      {activeTab === "bundles" && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider">
                Transparent Fee Packages & Sibling Discounts
              </h3>
              <span className="font-mono text-[11px] text-accent-red font-bold">
                Guaranteed Predefined Savings
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tutor.bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="p-4 rounded border border-accent-red-border bg-accent-red-subtle/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-bold text-sm text-ink-900">{bundle.name}</span>
                      <span className="font-mono text-[10px] font-bold text-white bg-accent-red px-1.5 py-0.5 rounded shrink-0">
                        -{bundle.discountPercentage}%
                      </span>
                    </div>
                    <p className="text-xs text-ink-600 mt-1 leading-relaxed">{bundle.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-accent-red-border/40 flex items-center justify-between">
                    <div className="font-mono font-bold text-base text-ink-900">
                      {formatPKR(bundle.pricePerMonthPKR)}
                      <span className="text-[10px] text-ink-500 font-normal"> /mo</span>
                    </div>

                    <button
                      onClick={() => setIsHireOpen(true)}
                      className="px-3 py-1 bg-ink-900 hover:bg-black text-white text-xs font-mono font-bold rounded"
                    >
                      Select Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Reviews */}
      {activeTab === "reviews" && (
        <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-3">
          <h3 className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider">
            Verified Student & Parent Feedback
          </h3>

          <div className="space-y-2.5">
            {tutor.reviews.map((rev) => (
              <div key={rev.id} className="p-3 bg-ink-50 rounded border border-ink-200 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-ink-900">{rev.authorName}</span>
                  <span className="text-accent-blue font-bold">★ {rev.rating}</span>
                </div>
                <p className="text-ink-700 mt-1 leading-relaxed font-sans">{rev.comment}</p>
                <span className="font-mono text-[10px] text-ink-400 mt-1 block">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hire Modal */}
      {isHireOpen && (
        <HireBookingModal
          tutor={tutor}
          onClose={() => setIsHireOpen(false)}
        />
      )}
    </div>
  );
}
