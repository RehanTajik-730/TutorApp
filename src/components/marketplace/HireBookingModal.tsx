"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, ArrowRight } from "lucide-react";
import { Tutor } from "@/types";
import { formatPKR } from "@/lib/utils";

interface HireBookingModalProps {
  tutor: Tutor | null;
  onClose: () => void;
}

export function HireBookingModal({ tutor, onClose }: HireBookingModalProps) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string>("standard");
  const [studentName, setStudentName] = useState("Hamza Shah");
  const [sessionDays, setSessionDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!tutor) return null;

  const standardPrice = tutor.monthlyRatePKR;
  const bundle = tutor.bundles.find((b) => b.id === selectedPackage);
  const activePrice = bundle ? bundle.pricePerMonthPKR : standardPrice;

  const toggleDay = (day: string) => {
    if (sessionDays.includes(day)) {
      setSessionDays(sessionDays.filter((d) => d !== day));
    } else {
      setSessionDays([...sessionDays, day]);
    }
  };

  const handleConfirmHire = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorId: tutor.id,
          studentName,
          packageName: bundle ? bundle.name : "Standard Individual Package",
          pricePerMonthPKR: activePrice,
          scheduleDays: sessionDays,
        }),
      });
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        router.push("/syllabus");
      }, 1400);
    } catch (err) {
      console.error("Error creating hire contract:", err);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        router.push("/syllabus");
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl border border-ink-200 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3 font-mono">
            <div className="w-10 h-10 bg-ink-900 text-white rounded flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 text-accent-blue" />
            </div>
            <h2 className="text-base font-bold text-ink-900">Engagement Confirmed</h2>
            <p className="text-xs text-ink-600 font-sans">
              Linked with <strong>{tutor.name}</strong>. Opening live syllabus roadmap...
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmHire}>
            <div className="p-5 border-b border-ink-200">
              <div className="flex items-center gap-3">
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-10 h-10 rounded object-cover border border-ink-200"
                />
                <div>
                  <h2 className="text-sm font-bold text-ink-900">Hire {tutor.name}</h2>
                  <p className="text-[11px] font-mono text-accent-blue">
                    Verified Engagement Agreement
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1.5">
                  Package Selection
                </label>
                <div className="space-y-1.5">
                  <label
                    className={`block p-2.5 rounded border cursor-pointer transition-all ${
                      selectedPackage === "standard"
                        ? "border-ink-900 bg-ink-50 font-semibold"
                        : "border-ink-200 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="package"
                      value="standard"
                      checked={selectedPackage === "standard"}
                      onChange={() => setSelectedPackage("standard")}
                      className="hidden"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-ink-900">Standard Individual Package</div>
                        <div className="text-[10px] text-ink-500 font-normal">
                          Full monthly coverage with syllabus roadmap & weekly assessments
                        </div>
                      </div>
                      <div className="font-mono font-bold text-ink-900">{formatPKR(standardPrice)}</div>
                    </div>
                  </label>

                  {tutor.bundles.map((b) => (
                    <label
                      key={b.id}
                      className={`block p-2.5 rounded border cursor-pointer transition-all ${
                        selectedPackage === b.id
                          ? "border-accent-red bg-accent-red-subtle/50 font-semibold"
                          : "border-ink-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={b.id}
                        checked={selectedPackage === b.id}
                        onChange={() => setSelectedPackage(b.id)}
                        className="hidden"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-ink-900 flex items-center gap-1.5">
                            {b.name}
                            <span className="font-mono text-[9px] bg-accent-red text-white px-1 py-0.2 rounded font-bold">
                              -{b.discountPercentage}%
                            </span>
                          </div>
                          <div className="text-[10px] text-ink-500 font-normal">{b.description}</div>
                        </div>
                        <div className="font-mono font-bold text-accent-red">
                          {formatPKR(b.pricePerMonthPKR)}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1.5">
                  Weekly Schedule
                </label>
                <div className="flex gap-1 font-mono text-xs">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const isSelected = sessionDays.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`flex-1 py-1 rounded border transition-all ${
                          isSelected
                            ? "bg-ink-900 text-white border-ink-900 font-bold"
                            : "bg-white text-ink-600 border-ink-200 hover:border-ink-400"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-2.5 bg-ink-50 border border-ink-200 rounded text-[11px] text-ink-600 font-mono">
                ✓ Includes live syllabus checklist, AI assessments & progress tracking.
              </div>
            </div>

            <div className="p-4 bg-ink-50 border-t border-ink-200 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] text-ink-400 uppercase">Monthly Fee</div>
                <div className="font-mono text-sm font-bold text-ink-900">{formatPKR(activePrice)}</div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-ink-700 bg-white border border-ink-200 hover:border-ink-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-ink-900 hover:bg-black rounded flex items-center gap-1"
                >
                  Confirm & Track
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
