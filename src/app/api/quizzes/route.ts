import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const parsedQuizzes = quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      subject: q.subject,
      curriculum: q.curriculum,
      topic: q.topic,
      timeLimitMinutes: q.timeLimitMinutes,
      generatedFrom: q.generatedFrom as "lecture_notes" | "textbook_summary" | "topic_prompt",
      questions: q.questions.map((qn) => ({
        id: qn.id,
        question: qn.question,
        options: JSON.parse(qn.options || "[]"),
        correctAnswerIndex: qn.correctAnswerIndex,
        explanation: qn.explanation,
        topicTag: qn.topicTag,
      })),
    }));

    return NextResponse.json({ success: true, quizzes: parsedQuizzes });
  } catch (error: any) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes from database." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subject, curriculum, topic, timeLimitMinutes, generatedFrom, questions } = body;

    const createdQuiz = await prisma.quiz.create({
      data: {
        title: title || `${topic} Assessment`,
        subject: subject || "General",
        curriculum: curriculum || "CAIE O Level",
        topic: topic || "Core Concept",
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
        generatedFrom: generatedFrom || "lecture_notes",
        questions: {
          create: (questions || []).map((qn: any) => ({
            question: qn.question,
            options: JSON.stringify(qn.options || []),
            correctAnswerIndex: Number(qn.correctAnswerIndex) || 0,
            explanation: qn.explanation || "",
            topicTag: qn.topicTag || topic || "",
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json({
      success: true,
      quiz: {
        ...createdQuiz,
        questions: createdQuiz.questions.map((qn) => ({
          ...qn,
          options: JSON.parse(qn.options || "[]"),
        })),
      },
    });
  } catch (error: any) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Failed to save quiz to database." },
      { status: 500 }
    );
  }
}
