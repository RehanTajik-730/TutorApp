import { NextRequest, NextResponse } from "next/server";
import { generateMCQsWithGemini } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, subject, curriculum, topic, questionCount } = body;

    if (!content || !topic) {
      return NextResponse.json(
        { error: "Content and topic are required to generate a quiz." },
        { status: 400 }
      );
    }

    const questions = await generateMCQsWithGemini({
      content,
      subject: subject || "General Academic",
      curriculum: curriculum || "CAIE O Level",
      topic,
      questionCount: Number(questionCount) || 5,
    });

    // Save to database so newly generated quiz persists
    const savedQuiz = await prisma.quiz.create({
      data: {
        title: `${topic} (${curriculum})`,
        subject: subject || "General Academic",
        curriculum: curriculum || "CAIE O Level",
        topic,
        timeLimitMinutes: Math.max(5, questions.length * 2),
        generatedFrom: "lecture_notes",
        questions: {
          create: questions.map((q) => ({
            question: q.question,
            options: JSON.stringify(q.options),
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation,
            topicTag: q.topicTag || topic,
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
        id: savedQuiz.id,
        title: savedQuiz.title,
        subject: savedQuiz.subject,
        curriculum: savedQuiz.curriculum,
        topic: savedQuiz.topic,
        timeLimitMinutes: savedQuiz.timeLimitMinutes,
        generatedFrom: savedQuiz.generatedFrom,
        questions: savedQuiz.questions.map((qn) => ({
          id: qn.id,
          question: qn.question,
          options: JSON.parse(qn.options || "[]"),
          correctAnswerIndex: qn.correctAnswerIndex,
          explanation: qn.explanation,
          topicTag: qn.topicTag,
        })),
      },
    });
  } catch (error: any) {
    console.error("API error generating quiz:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate quiz." },
      { status: 500 }
    );
  }
}
