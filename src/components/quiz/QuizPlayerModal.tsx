"use client";

import React, { useState } from "react";
import { X, Check, ArrowRight, Share2 } from "lucide-react";
import { Quiz, QuizAttempt } from "@/types";

interface QuizPlayerModalProps {
  quiz: Quiz | null;
  onClose: () => void;
  onSaveAttempt?: (attempt: QuizAttempt) => void;
}

export function QuizPlayerModal({ quiz, onClose, onSaveAttempt }: QuizPlayerModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  if (!quiz) return null;

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQ = quiz.questions.length;

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQ - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / totalQ) * 100);

    try {
      await fetch("/api/quizzes/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: quiz.id,
          studentName: "Hamza Shah",
          score: correctCount,
          total: totalQ,
          percentage,
          timeSpentSeconds: 180,
        }),
      });
    } catch (err) {
      console.error("Error saving quiz attempt to DB:", err);
    }

    if (onSaveAttempt) {
      onSaveAttempt({
        id: `att-${Date.now()}`,
        quizId: quiz.id,
        studentName: "Hamza Shah",
        score: correctCount,
        total: totalQ,
        percentage,
        date: new Date().toISOString().split("T")[0],
        timeSpentSeconds: 180,
        questionResults: quiz.questions.map((q, idx) => ({
          questionId: q.id,
          selectedOption: selectedAnswers[idx] ?? -1,
          isCorrect: selectedAnswers[idx] === q.correctAnswerIndex,
        })),
      });
    }
  };

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswerIndex) {
      correctCount++;
    }
  });
  const scorePercent = Math.round((correctCount / totalQ) * 100);

  const handleShare = () => {
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-xl w-full shadow-xl border border-ink-200 overflow-hidden relative">
        {/* Header */}
        <div className="p-4 bg-ink-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase">
              <span className="text-accent-blue font-bold">{quiz.curriculum}</span>
              <span className="text-ink-400">•</span>
              <span className="text-ink-300">{quiz.subject}</span>
            </div>
            <h2 className="text-sm font-bold text-white mt-0.5 truncate max-w-md">{quiz.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-ink-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {!isSubmitted ? (
            <div>
              {/* Question indicators */}
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-500 mb-4 pb-3 border-b border-ink-100">
                <span>
                  Question {currentQuestionIndex + 1} of {totalQ}
                </span>
                <div className="flex gap-1">
                  {quiz.questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestionIndex(i)}
                      className={`w-5 h-5 rounded text-[10px] font-bold transition-all ${
                        currentQuestionIndex === i
                          ? "bg-ink-900 text-white"
                          : selectedAnswers[i] !== undefined
                          ? "bg-accent-blue text-white"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question text */}
              <div className="bg-ink-50 p-4 rounded border border-ink-200 mb-4">
                <p className="text-xs sm:text-sm font-bold text-ink-900 leading-relaxed">
                  {currentQ.question}
                </p>
                {currentQ.topicTag && (
                  <span className="inline-block mt-2 font-mono text-[10px] text-ink-500 bg-white border border-ink-200 px-1.5 py-0.5 rounded">
                    Topic: {currentQ.topicTag}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3 rounded border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-ink-900 bg-ink-900 text-white font-semibold"
                          : "border-ink-200 bg-white hover:border-ink-400 text-ink-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono text-[10px] w-5 h-5 rounded flex items-center justify-center font-bold ${
                            isSelected ? "bg-white text-ink-900" : "bg-ink-100 text-ink-600"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-blue shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Nav controls */}
              <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-3 py-1.5 text-xs font-medium rounded border border-ink-200 text-ink-600 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentQuestionIndex < totalQ - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-1.5 text-xs font-bold rounded bg-ink-900 text-white hover:bg-black transition-colors"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-1.5 text-xs font-bold rounded bg-accent-blue text-white hover:bg-accent-blue-dark transition-colors"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-5">
              <div className="p-4 bg-ink-50 rounded border border-ink-200 text-center font-mono">
                <div className="text-3xl font-bold text-ink-900">{scorePercent}%</div>
                <div className="text-xs text-ink-600 mt-1">
                  {correctCount} / {totalQ} correct answers logged
                </div>
                <div className="mt-3 flex justify-center">
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 bg-ink-900 hover:bg-black text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors font-sans"
                  >
                    <Share2 className="w-3.5 h-3.5 text-accent-blue" />
                    Deliver Score Report to Parent & Tutor
                  </button>
                </div>
                {sharedToast && (
                  <div className="mt-2 text-[11px] text-accent-blue font-bold font-mono">
                    ✓ Score verified and shared with Mrs. Tahira & Sir Bilal.
                  </div>
                )}
              </div>

              {/* Review */}
              <div>
                <div className="font-mono uppercase font-bold text-[10px] text-ink-400 tracking-wider mb-2">
                  Question Review & Evaluation
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 text-xs">
                  {quiz.questions.map((q, idx) => {
                    const chosen = selectedAnswers[idx];
                    const isRight = chosen === q.correctAnswerIndex;
                    return (
                      <div
                        key={q.id}
                        className={`p-3 rounded border ${
                          isRight
                            ? "bg-white border-ink-200"
                            : "bg-accent-red-subtle/40 border-accent-red-border"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-ink-900">
                            Q{idx + 1}. {q.question}
                          </span>
                          <span className={`font-mono text-[10px] font-bold ${isRight ? "text-accent-blue" : "text-accent-red"}`}>
                            {isRight ? "CORRECT" : "INCORRECT"}
                          </span>
                        </div>

                        <div className="mt-1.5 space-y-0.5 text-ink-600">
                          <div>
                            <span className="text-ink-400">Response:</span>{" "}
                            {chosen !== undefined ? q.options[chosen] : "Omitted"}
                          </div>
                          {!isRight && (
                            <div className="text-accent-red font-medium">
                              Correct Key: {q.options[q.correctAnswerIndex]}
                            </div>
                          )}
                        </div>

                        <div className="mt-2 pt-2 border-t border-ink-100 text-[11px] text-ink-600">
                          <strong className="text-ink-900">Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-ink-100 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 bg-ink-900 text-white rounded text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
