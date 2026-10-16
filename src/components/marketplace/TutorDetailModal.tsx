"use client";

import React, { useState } from "react";
import { X, Check, ArrowUpRight } from "lucide-react";
import { Tutor, Review } from "@/types";
import { formatPKR } from "@/lib/utils";

interface TutorDetailModalProps {
  tutor: Tutor | null;
  distanceKm: number;
  onClose: () => void;
  onHire: (tutor: Tutor) => void;
}

export function TutorDetailModal({
  tutor,
  distanceKm,
  onClose,
  onHire,
}: TutorDetailModalProps) {
  const [reviewTab, setReviewTab] = useState<"parentReviews" | "tutorReviews">("parentReviews");
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<Review[]>(tutor?.reviews || []);

  if (!tutor) return null;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const rev: Review = {
      id: `rev-user-${Date.now()}`,
      authorType: "parent",
      authorName: "Parent (You)",
      rating: newRating,
      comment: newReviewText,
      date: new Date().toISOString().split("T")[0],
      verifiedHire: true,
      criteria: { clarity: newRating, punctuality: 5 },
    };

    setReviewsList([rev, ...reviewsList]);
    setNewReviewText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-ink-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-5 border-b border-ink-200">
          <div className="flex items-start gap-3.5">
            <img
              src={tutor.avatarUrl}
              alt={tutor.name}
              className="w-14 h-14 rounded object-cover border border-ink-200 shrink-0"
            />
            <div className="flex-1 pr-6">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h2 className="text-base font-bold text-ink-900 tracking-tight">{tutor.name}</h2>
                <span className="font-mono text-[10px] text-ink-600 bg-ink-100 px-1.5 py-0.5 rounded border border-ink-200">
                  {distanceKm} km away
                </span>
                {tutor.verifiedCnic && (
                  <span className="font-mono text-[10px] text-accent-blue bg-accent-blue-subtle px-1.5 py-0.5 rounded border border-accent-blue-border">
                    Verified Credentials
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-600 mt-1">{tutor.tagline}</p>
              <p className="text-[11px] font-mono text-ink-500 mt-0.5">{tutor.qualification}</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-ink-100 font-mono text-center">
            <div className="p-2 bg-ink-50 rounded border border-ink-200">
              <div className="text-[10px] text-ink-400 uppercase">Rating</div>
              <div className="text-xs font-bold text-accent-blue mt-0.5">
                ★ {tutor.rating} ({reviewsList.length})
              </div>
            </div>
            <div className="p-2 bg-ink-50 rounded border border-ink-200">
              <div className="text-[10px] text-ink-400 uppercase">Syllabus Rate</div>
              <div className="text-xs font-bold text-ink-900 mt-0.5">
                {tutor.syllabusCompletionRate}% on-time
              </div>
            </div>
            <div className="p-2 bg-ink-50 rounded border border-ink-200">
              <div className="text-[10px] text-ink-400 uppercase">Hourly Rate</div>
              <div className="text-xs font-bold text-ink-900 mt-0.5">
                {formatPKR(tutor.hourlyRatePKR)}/hr
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 text-xs">
          {/* Bio */}
          <div>
            <div className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider mb-1.5">
              Instruction Methodology
            </div>
            <p className="text-ink-700 leading-relaxed bg-ink-50 p-3 rounded border border-ink-200">
              {tutor.bio}
            </p>
          </div>

          {/* Bundles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider">
                Predefined Bundle Packages
              </span>
              <span className="font-mono text-[10px] text-ink-500">Transparent Pricing</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tutor.bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="p-3 rounded border border-accent-red-border bg-accent-red-subtle/40"
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-bold text-ink-900">{bundle.name}</span>
                    <span className="font-mono text-[10px] font-bold text-accent-red">
                      -{bundle.discountPercentage}%
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-600 mt-1">{bundle.description}</p>
                  <div className="mt-2 font-mono font-bold text-ink-900">
                    {formatPKR(bundle.pricePerMonthPKR)}
                    <span className="text-[10px] text-ink-500 font-normal"> /mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Way Reviews Section */}
          <div className="border-t border-ink-200 pt-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider">
                Two-Way Review Accountability
              </span>
              <span className="font-mono text-[10px] text-accent-blue">Mutual Transparency</span>
            </div>

            {/* Tab switch */}
            <div className="flex bg-ink-100 p-0.5 rounded border border-ink-200 font-mono text-[11px] mb-3">
              <button
                onClick={() => setReviewTab("parentReviews")}
                className={`flex-1 py-1 rounded transition-all ${
                  reviewTab === "parentReviews"
                    ? "bg-white text-ink-900 font-bold shadow-2xs border border-ink-200"
                    : "text-ink-500"
                }`}
              >
                Clients on Tutor ({reviewsList.length})
              </button>
              <button
                onClick={() => setReviewTab("tutorReviews")}
                className={`flex-1 py-1 rounded transition-all ${
                  reviewTab === "tutorReviews"
                    ? "bg-white text-ink-900 font-bold shadow-2xs border border-ink-200"
                    : "text-ink-500"
                }`}
              >
                Tutor on Clients ({tutor.studentReviewsGiven.length})
              </button>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {reviewTab === "parentReviews" ? (
                reviewsList.map((rev) => (
                  <div key={rev.id} className="p-2.5 bg-ink-50 rounded border border-ink-200">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-ink-900">{rev.authorName}</span>
                      <span className="font-mono font-semibold text-accent-blue">★ {rev.rating}</span>
                    </div>
                    <p className="text-ink-700 mt-1 leading-relaxed">{rev.comment}</p>
                    <span className="font-mono text-[10px] text-ink-400 mt-1 block">{rev.date}</span>
                  </div>
                ))
              ) : (
                tutor.studentReviewsGiven.length > 0 ? (
                  tutor.studentReviewsGiven.map((trev) => (
                    <div key={trev.id} className="p-2.5 bg-ink-50 rounded border border-ink-200">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-ink-900">Feedback by {trev.authorName}</span>
                        <span className="font-mono font-semibold text-accent-blue">★ {trev.rating}</span>
                      </div>
                      <p className="text-ink-700 mt-1 leading-relaxed">{trev.comment}</p>
                      <span className="font-mono text-[10px] text-ink-400 mt-1 block">{trev.date}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-ink-400 italic">No student evaluations logged yet.</p>
                )
              )}
            </div>

            {/* Add review form */}
            {reviewTab === "parentReviews" && (
              <form onSubmit={handleAddReview} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Leave verified review comment..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-ink-900 text-white rounded text-xs font-semibold hover:bg-black transition-colors"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Action bar */}
        <div className="p-4 bg-ink-50 border-t border-ink-200 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] text-ink-400 uppercase">Standard Monthly Rate</div>
            <div className="font-mono text-base font-bold text-ink-900">
              {formatPKR(tutor.monthlyRatePKR)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onHire(tutor);
              }}
              className="px-4 py-1.5 text-xs font-bold text-white bg-accent-blue hover:bg-accent-blue-dark rounded flex items-center gap-1 transition-colors"
            >
              Hire Tutor
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
