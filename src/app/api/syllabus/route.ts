import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roadmaps = await prisma.syllabusRoadmap.findMany({
      include: {
        topics: {
          orderBy: { chapterNumber: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, roadmaps });
  } catch (error: any) {
    console.error("Error fetching roadmaps:", error);
    return NextResponse.json(
      { error: "Failed to fetch syllabus roadmaps." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { topicId, status, completedDate, tutorNotes, homeworkAssigned } = body;

    if (!topicId) {
      return NextResponse.json({ error: "topicId is required." }, { status: 400 });
    }

    const updatedTopic = await prisma.syllabusTopic.update({
      where: { id: topicId },
      data: {
        ...(status !== undefined && { status }),
        ...(completedDate !== undefined && { completedDate }),
        ...(tutorNotes !== undefined && { tutorNotes }),
        ...(homeworkAssigned !== undefined && { homeworkAssigned }),
      },
    });

    // Recalculate roadmap stats
    const roadmapId = updatedTopic.roadmapId;
    const allTopics = await prisma.syllabusTopic.findMany({
      where: { roadmapId },
    });
    const completedCount = allTopics.filter((t) => t.status === "completed").length;

    await prisma.syllabusRoadmap.update({
      where: { id: roadmapId },
      data: {
        totalTopics: allTopics.length,
        completedTopics: completedCount,
      },
    });

    return NextResponse.json({ success: true, topic: updatedTopic });
  } catch (error: any) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { error: "Failed to update syllabus topic." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roadmapId, chapterName, topicName, estimatedHours } = body;

    if (!roadmapId || !topicName) {
      return NextResponse.json(
        { error: "roadmapId and topicName are required." },
        { status: 400 }
      );
    }

    const existingCount = await prisma.syllabusTopic.count({
      where: { roadmapId },
    });

    const newTopic = await prisma.syllabusTopic.create({
      data: {
        roadmapId,
        chapterNumber: existingCount + 1,
        chapterName: chapterName || "General Topic",
        topicName,
        estimatedHours: Number(estimatedHours) || 2.0,
        status: "upcoming",
      },
    });

    await prisma.syllabusRoadmap.update({
      where: { id: roadmapId },
      data: { totalTopics: existingCount + 1 },
    });

    return NextResponse.json({ success: true, topic: newTopic });
  } catch (error: any) {
    console.error("Error adding topic:", error);
    return NextResponse.json(
      { error: "Failed to add syllabus topic." },
      { status: 500 }
    );
  }
}
