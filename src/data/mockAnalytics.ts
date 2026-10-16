import { AcademicScoreLog } from "@/types";

export interface StudentProgressSummary {
  studentName: string;
  subject: string;
  tutorName: string;
  hireDate: string;
  baselineScore: number; // e.g. 52% (initial diagnostic before hiring)
  currentScore: number;  // e.g. 88%
  improvementDelta: number; // +36%
  targetExamScore: number; // 90% (A*)
  trendData: {
    month: string;
    score: number;
    benchmark: number;
    stage: string;
  }[];
  topicStrengths: {
    topic: string;
    masteryPercentage: number;
    status: "mastered" | "proficient" | "needs_review";
  }[];
  recentAssessments: AcademicScoreLog[];
}

export const MOCK_STUDENT_ANALYTICS: StudentProgressSummary = {
  studentName: "Hamza Shah",
  subject: "O-Level Physics (5054)",
  tutorName: "Engr. Bilal Farooq",
  hireDate: "July 2024",
  baselineScore: 52,
  currentScore: 88,
  improvementDelta: 36,
  targetExamScore: 90,
  trendData: [
    { month: "Jun 2024", score: 52, benchmark: 60, stage: "Before Tutor (School Mid-Year)" },
    { month: "Jul 2024", score: 58, benchmark: 62, stage: "Hired Sir Bilal (Diagnostic Test)" },
    { month: "Aug 2024", score: 66, benchmark: 65, stage: "Topical AI Quiz: Measurement" },
    { month: "Sep 2024", score: 74, benchmark: 68, stage: "Monthly Mock: Kinematics & Dynamics" },
    { month: "Oct 2024", score: 81, benchmark: 70, stage: "School Term Exam" },
    { month: "Nov 2024", score: 88, benchmark: 72, stage: "In-App AI Quiz: Wave & Optics" },
  ],
  topicStrengths: [
    { topic: "Physical Quantities & Vernier", masteryPercentage: 94, status: "mastered" },
    { topic: "Kinematics & Graph Velocity", masteryPercentage: 91, status: "mastered" },
    { topic: "Newton's Laws & Dynamics", masteryPercentage: 86, status: "proficient" },
    { topic: "Work, Energy & Power", masteryPercentage: 88, status: "proficient" },
    { topic: "Thermal Properties & Latent Heat", masteryPercentage: 78, status: "proficient" },
    { topic: "Light Refraction & Critical Angles", masteryPercentage: 64, status: "needs_review" },
    { topic: "Lenses & Ray Diagrams", masteryPercentage: 58, status: "needs_review" },
  ],
  recentAssessments: [
    {
      id: "as-1",
      studentName: "Hamza Shah",
      date: "2024-11-18",
      assessmentType: "in_app_ai_quiz",
      title: "AI Quiz: Light Refraction & Snell's Law",
      subject: "Physics",
      scorePercentage: 80,
      classAveragePercentage: 68,
      topicsTested: ["Refraction", "Snell's Law", "Total Internal Reflection"],
    },
    {
      id: "as-2",
      studentName: "Hamza Shah",
      date: "2024-11-04",
      assessmentType: "tutor_mock",
      title: "Comprehensive Mock Paper 2 (Theory)",
      subject: "Physics",
      scorePercentage: 85,
      classAveragePercentage: 70,
      topicsTested: ["Thermal Physics", "Kinematics", "Pressure"],
    },
    {
      id: "as-3",
      studentName: "Hamza Shah",
      date: "2024-10-15",
      assessmentType: "school_term_exam",
      title: "School 1st Term Board Examination",
      subject: "Physics",
      scorePercentage: 81,
      classAveragePercentage: 65,
      topicsTested: ["Chapters 1 through 8"],
    },
  ],
};
