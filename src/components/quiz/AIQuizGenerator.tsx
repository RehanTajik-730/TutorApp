"use client";

import React, { useState, useEffect } from "react";
import { Play, Clock, ArrowRight, Loader2, FileText, Check } from "lucide-react";
import { Quiz } from "@/types";
import { MOCK_QUIZZES } from "@/data/mockQuizzes";
import { QuizPlayerModal } from "./QuizPlayerModal";

export function AIQuizGenerator() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(MOCK_QUIZZES);
  const [activeQuizToPlay, setActiveQuizToPlay] = useState<Quiz | null>(null);

  // Form
  const [subject, setSubject] = useState("Physics");
  const [curriculum, setCurriculum] = useState("CAIE O Level");
  const [topic, setTopic] = useState("Newton's Laws & Dynamics");
  const [notesContent, setNotesContent] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.quizzes && data.quizzes.length > 0) {
          setQuizzes(data.quizzes);
        }
      })
      .catch((err) => console.error("Error loading quizzes from DB:", err));
  }, []);

  const sampleNotes = [
    {
      title: "Newton's 3 Laws & Momentum",
      subj: "Physics",
      curr: "CAIE O Level",
      topic: "Dynamics & Momentum",
      notes: `Newton's First Law: An object remains at rest or in uniform motion unless acted upon by a resultant external force.
Newton's Second Law: Resultant force is directly proportional to the rate of change of momentum (F = ma when mass is constant).
Newton's Third Law: For every action force, there is an equal and opposite reaction force acting on different bodies.
Momentum is defined as the product of mass and velocity (p = mv). In a closed system, total momentum is conserved during elastic and inelastic collisions. Friction opposes relative motion and dissipates energy as thermal output.`,
    },
    {
      title: "MDCAT Bio: Photosynthesis Light Reaction",
      subj: "Biology",
      curr: "MDCAT",
      topic: "Bioenergetics",
      notes: `Light-dependent reactions occur across the thylakoid membrane inside chloroplasts.
Chlorophyll a and accessory pigments form Photosystems II and I.
Water photolysis at PS II produces protons, electrons, and evolves molecular oxygen: 2H2O -> 4H+ + 4e- + O2.
Electrons pass through the electron transport chain, creating a proton gradient across the thylakoid lumen that drives ATP synthase to synthesize ATP via chemiosmosis.
NADP+ reductase receives terminal electrons to form NADPH used later in the Calvin cycle in the stroma.`,
    },
    {
      title: "SAT Math: Quadratic Functions & Parabolas",
      subj: "Mathematics",
      curr: "SAT / ACT",
      topic: "Advanced Math",
      notes: `Quadratic equation standard form: y = ax^2 + bx + c.
Vertex form: y = a(x - h)^2 + k, where (h, k) is the vertex and x = h is the axis of symmetry.
If a > 0, the parabola opens upwards and has a minimum value of k. If a < 0, it opens downwards with a maximum.
Discriminant D = b^2 - 4ac determines root nature:
If D > 0: two distinct real roots.
If D = 0: one repeated real root (tangent to x-axis).
If D < 0: zero real roots (does not intersect x-axis).
Sum of roots = -b/a, Product of roots = c/a.`,
    },
  ];

  const handlePreFill = (sample: typeof sampleNotes[0]) => {
    setSubject(sample.subj);
    setCurriculum(sample.curr);
    setTopic(sample.topic);
    setNotesContent(sample.notes);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notesContent.trim() || !topic.trim()) {
      setErrorMsg("Please provide notes or study material to generate a quiz.");
      return;
    }

    setErrorMsg("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: notesContent,
          subject,
          curriculum,
          topic,
          questionCount,
        }),
      });

      const data = await res.json();
      if (data.success && data.quiz) {
        setQuizzes([data.quiz, ...quizzes]);
        setActiveQuizToPlay(data.quiz);
      } else {
        setErrorMsg(data.error || "Failed to generate quiz.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Error connecting to AI service.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-ink-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2 font-mono text-[11px] mb-1">
          <span className="font-bold text-accent-blue uppercase tracking-wider">
            Assessment Engine
          </span>
          <span className="text-ink-400">•</span>
          <span className="text-ink-500">Gemini Powered</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-ink-900">
          Curriculum MCQ Assessment Generator
        </h1>
        <p className="text-xs text-ink-600 mt-1 max-w-2xl leading-relaxed">
          Input lecture notes, revision points, or past-paper topics. The engine builds structured multiple-choice diagnostic tests. Scores sync directly to the student improvement log.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Generator Form */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-ink-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-2">
            <h2 className="font-bold text-sm text-ink-900">Generate New Assessment</h2>
            <span className="font-mono text-[10px] text-ink-400 uppercase">Input Terminal</span>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block font-mono text-[10px] uppercase font-bold text-ink-400 mb-1.5 tracking-wider">
              Load Preset Material
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sampleNotes.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePreFill(sample)}
                  className="px-2 py-1 text-[11px] font-mono font-medium bg-ink-50 hover:bg-ink-100 text-ink-800 rounded border border-ink-200 transition-colors"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                  Curriculum
                </label>
                <select
                  value={curriculum}
                  onChange={(e) => setCurriculum(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-medium"
                >
                  <option value="CAIE O Level">CAIE O Level</option>
                  <option value="CAIE A Level">CAIE A Level</option>
                  <option value="Matric (Federal)">Matric (Federal)</option>
                  <option value="FSc Pre-Medical">FSc Pre-Medical</option>
                  <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                  <option value="MDCAT">MDCAT</option>
                  <option value="SAT / ACT">SAT / ACT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono uppercase text-[10px] font-bold text-ink-400 mb-1">
                Topic Name
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-mono uppercase text-[10px] font-bold text-ink-400">
                  Notes / Source Material
                </label>
                <span className="font-mono text-[10px] text-ink-400">{notesContent.length} chars</span>
              </div>
              <textarea
                rows={5}
                required
                placeholder="Paste whiteboard notes, textbook summary, or key formula rules..."
                value={notesContent}
                onChange={(e) => setNotesContent(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-ink-50 border border-ink-200 rounded focus:outline-none focus:border-ink-900 text-ink-900 font-mono text-[11px] leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="font-mono uppercase text-[10px] font-bold text-ink-400">
                Number of MCQs
              </label>
              <div className="flex gap-1.5 font-mono text-xs">
                {[3, 5, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`px-2.5 py-0.5 rounded border transition-all ${
                      questionCount === count
                        ? "bg-ink-900 text-white border-ink-900 font-bold"
                        : "bg-white text-ink-600 border-ink-200"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-accent-red font-mono bg-accent-red-subtle p-2 rounded border border-accent-red-border">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2 bg-ink-900 hover:bg-black disabled:opacity-50 text-white font-bold font-mono text-xs rounded transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-accent-blue" />
                  Compiling Assessment...
                </>
              ) : (
                <>Generate {questionCount} MCQs</>
              )}
            </button>
          </form>
        </div>

        {/* Right: Available Quizzes List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-ink-900">Available Diagnostic Quizzes</h2>
            <span className="font-mono text-[11px] text-ink-400">
              {quizzes.length} Quizzes Ready
            </span>
          </div>

          <div className="space-y-2.5">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg border border-ink-200 p-4 hover:border-ink-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="font-bold text-accent-blue bg-accent-blue-subtle px-1.5 py-0.2 rounded border border-accent-blue-border">
                      {quiz.curriculum}
                    </span>
                    <span className="text-ink-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {quiz.timeLimitMinutes} min limit
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-ink-900 mt-1.5">{quiz.title}</h3>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-ink-500 mt-1.5">
                    <span>Subject: {quiz.subject}</span>
                    <span>•</span>
                    <span>{quiz.questions.length} Items</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-ink-100 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-400">
                    Synced with student record
                  </span>

                  <button
                    onClick={() => setActiveQuizToPlay(quiz)}
                    className="px-3 py-1 bg-ink-900 hover:bg-black text-white rounded text-xs font-semibold font-mono flex items-center gap-1 transition-colors"
                  >
                    Start Test
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuizPlayerModal
        quiz={activeQuizToPlay}
        onClose={() => setActiveQuizToPlay(null)}
      />
    </div>
  );
}
