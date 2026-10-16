import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quizId, studentName, score, total, percentage, timeSpentSeconds } = body;

    if (!quizId) {
      return NextResponse.json({ error: "quizId is required." }, { status: 400 });
    }

    // 1. Fetch quiz to get subject and topic details
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    const currentDate = new Date().toISOString().split("T")[0];
    const name = studentName || "Hamza Shah";

    // 2. Save Quiz Attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        studentName: name,
        score: Number(score),
        total: Number(total),
        percentage: Number(percentage),
        date: currentDate,
        timeSpentSeconds: Number(timeSpentSeconds) || 0,
      },
    });

    // 3. Automatically link and log to AcademicScoreLog for live analytics
    await prisma.academicScoreLog.create({
      data: {
        studentName: name,
        date: currentDate,
        assessmentType: "in_app_ai_quiz",
        title: quiz ? `In-App AI Quiz: ${quiz.title}` : "In-App AI Diagnostic Quiz",
        subject: quiz ? quiz.subject : "General Academic",
        scorePercentage: Number(percentage),
        classAveragePercentage: 70, // Benchmark
        topicsTested: JSON.stringify(quiz ? [quiz.topic] : ["General"]),
      },
    });

    return NextResponse.json({
      success: true,
      attempt,
      message: "Attempt recorded and synced to Student Performance Analytics.",
    });
  } catch (error: any) {
    console.error("Error saving quiz attempt:", error);
    return NextResponse.json(
      { error: "Failed to record quiz attempt." },
      { status: 500 }
    );
  }
}
