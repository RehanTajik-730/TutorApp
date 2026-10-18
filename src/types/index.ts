export type Curriculum = 
  | "CAIE O Level"
  | "CAIE A Level"
  | "Matric (Federal)"
  | "Matric (Punjab)"
  | "Matric (Sindh)"
  | "FSc Pre-Engineering"
  | "FSc Pre-Medical"
  | "MDCAT"
  | "ECAT"
  | "SAT / ACT"
  | "Junior School (Grade 1-8)";

export type TeachingMode = "home_visit" | "in_center" | "online" | "hybrid";

export interface InstituteBranch {
  name: string;
  address: string;
  phone?: string;
  city: string;
}

export interface BundlePackage {
  id: string;
  name: string; // e.g. "Sibling Saver (2 Students)", "Group Duo (2-3 Peers)", "Exam Sprint (4 Sessions/wk)"
  discountPercentage: number;
  description: string;
  pricePerMonthPKR: number;
}

export interface Review {
  id: string;
  authorType: "parent" | "tutor" | "student";
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verifiedHire: boolean;
  criteria?: {
    clarity?: number;
    punctuality?: number;
    behavior?: number;
    attentiveness?: number;
  };
}

export interface TutorLocation {
  city: string; // "Karachi" | "Lahore" | "Islamabad" | "Rawalpindi"
  area: string; // e.g. "Gulshan-e-Iqbal", "DHA Phase 5", "F-8/3"
  lat: number;
  lng: number;
  maxTravelKm: number;
}

export interface Tutor {
  id: string;
  name: string;
  instituteName: string; // e.g. "SKH Solutions", "Anees Hussain", "GreenHall Academy", "KIPS Preparations", "Independent"
  tagline: string;
  bio: string;
  avatarUrl: string;
  qualification: string; // e.g. "M.A Islamic Studies (Karachi Univ) • 15+ Yrs Exp"
  verifiedCnic: boolean;
  verifiedDegree: boolean;
  subjects: string[];
  curricula: Curriculum[];
  grades: string[];
  hourlyRatePKR: number;
  monthlyRatePKR: number;
  teachingModes: TeachingMode[];
  location: TutorLocation;
  phone?: string;
  website?: string;
  bundles: BundlePackage[];
  reviews: Review[];
  studentReviewsGiven: Review[]; // Reviews given by this tutor to students/parents
  rating: number;
  totalStudentsTaught: number;
  syllabusCompletionRate: number; // e.g. 96%
  responseSpeed: string; // e.g. "< 15 mins"
}

// Syllabus Tracker Types
export interface SyllabusTopic {
  id: string;
  chapterNumber: number;
  chapterName: string;
  topicName: string;
  estimatedHours: number;
  status: "completed" | "in_progress" | "upcoming";
  completedDate?: string;
  tutorNotes?: string;
  homeworkAssigned?: string;
}

export interface SyllabusRoadmap {
  id: string;
  studentName: string;
  tutorName: string;
  subject: string;
  curriculum: Curriculum;
  targetExamDate: string;
  totalTopics: number;
  completedTopics: number;
  topics: SyllabusTopic[];
}

// AI Quiz Types
export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topicTag: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  curriculum: Curriculum;
  topic: string;
  timeLimitMinutes: number;
  questions: MCQQuestion[];
  generatedFrom: "lecture_notes" | "textbook_summary" | "topic_prompt";
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentName: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  timeSpentSeconds: number;
  questionResults: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}

// Analytics Types
export interface AcademicScoreLog {
  id: string;
  studentName: string;
  date: string;
  assessmentType: "in_app_ai_quiz" | "tutor_mock" | "school_term_exam";
  title: string;
  subject: string;
  scorePercentage: number;
  classAveragePercentage?: number;
  topicsTested: string[];
}

// Past Paper Archive Types
export type PastPaperCountry = "pakistan" | "usa" | "uk";

export interface PastPaper {
  id: string;
  country: PastPaperCountry;
  category: string; // "GCE O Level" | "GCE A Level" | "FSc" | "Matric" | "MDCAT" | "SAT" | "ACT" | "AP" | "GCSE"
  subCategory?: string; // "Federal Board" | "Punjab Board" | "Digital SAT" | "Cambridge (CIE)"
  subject: string;
  year: number;
  session: string; // "May/June", "Oct/Nov", "Annual 2024", "Fall", etc.
  paperCode: string; // e.g. "5054/12", "9701/22", "MDCAT-2024-UHS", "SAT-Practice-1"
  hasMarkScheme: boolean;
  hasExaminerReport: boolean;
  fileSizeMb: number;
  downloadUrl: string;
}
