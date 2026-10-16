import { AIQuizGenerator } from "@/components/quiz/AIQuizGenerator";

export const metadata = {
  title: "AI Quiz Arena | TutorBridge PK",
  description: "Generate and attempt custom MCQ quizzes from study notes using Gemini AI.",
};

export default function AIQuizPage() {
  return <AIQuizGenerator />;
}
