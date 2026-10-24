import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TopicAttachment } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tutorId = searchParams.get("tutorId");
    const studentName = searchParams.get("studentName");

    const rawRoadmaps = await prisma.syllabusRoadmap.findMany({
      where: {
        ...(tutorId ? { tutorId } : {}),
      },
      include: {
        topics: {
          orderBy: { chapterNumber: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const roadmaps = rawRoadmaps.map((rm) => {
      let enrolledStudents: string[] = [];
      if (rm.enrolledStudents) {
        try {
          enrolledStudents = JSON.parse(rm.enrolledStudents);
        } catch {
          enrolledStudents = [rm.studentName || "Enrolled Batch"];
        }
      } else if (rm.studentName) {
        enrolledStudents = [rm.studentName];
      }

      const formattedTopics = rm.topics.map((t) => {
        let parsedAttachments: TopicAttachment[] = [];
        if (t.attachments) {
          try {
            parsedAttachments = JSON.parse(t.attachments);
          } catch {
            parsedAttachments = [];
          }
        }
        return {
          ...t,
          attachments: parsedAttachments,
        };
      });

      return {
        ...rm,
        courseTitle: rm.courseTitle || rm.subject,
        instituteName: rm.instituteName || "Independent",
        enrolledStudents,
        topics: formattedTopics,
      };
    });

    // Optional filter by student name
    const filteredRoadmaps = studentName
      ? roadmaps.filter((rm) =>
          rm.enrolledStudents.some((s) =>
            s.toLowerCase().includes(studentName.toLowerCase())
          )
        )
      : roadmaps;

    return NextResponse.json({ success: true, roadmaps: filteredRoadmaps });
  } catch (error: any) {
    console.error("Error fetching roadmaps:", error);
    return NextResponse.json(
      { error: "Failed to fetch syllabus roadmaps." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // 1. CREATE ROADMAP ACTION
    if (action === "create_roadmap") {
      const {
        tutorId,
        tutorName,
        instituteName,
        courseTitle,
        subject,
        curriculum,
        batchSchedule,
        targetExamDate,
        enrolledStudents,
        initialTopic,
      } = body;

      if (!tutorName || !courseTitle || !subject) {
        return NextResponse.json(
          { error: "Teacher name, course title, and subject are required." },
          { status: 400 }
        );
      }

      const enrolledArr = Array.isArray(enrolledStudents)
        ? enrolledStudents
        : enrolledStudents
        ? enrolledStudents.split(",").map((s: string) => s.trim()).filter(Boolean)
        : ["All Enrolled Students"];

      const createdRoadmap = await prisma.syllabusRoadmap.create({
        data: {
          tutorId: tutorId || `tut-${Date.now()}`,
          tutorName,
          instituteName: instituteName || "SKH Solutions",
          courseTitle,
          subject,
          curriculum: curriculum || "CAIE O Level",
          batchSchedule: batchSchedule || "Mon, Wed, Fri • 4:00 PM - 5:30 PM",
          targetExamDate: targetExamDate || "May/June 2025",
          studentName: enrolledArr[0] || "Enrolled Batch",
          enrolledStudents: JSON.stringify(enrolledArr),
          totalTopics: initialTopic ? 1 : 0,
          completedTopics: 0,
          topics: initialTopic
            ? {
                create: [
                  {
                    chapterNumber: 1,
                    chapterName: initialTopic.chapterName || "Chapter 1",
                    topicName: initialTopic.topicName || "Introduction & Foundations",
                    estimatedHours: Number(initialTopic.estimatedHours) || 3.0,
                    status: "upcoming",
                  },
                ],
              }
            : undefined,
        },
        include: {
          topics: true,
        },
      });

      return NextResponse.json({ success: true, roadmap: createdRoadmap });
    }

    // 2. ATTACH RESOURCE ACTION (Note / Homework / Assignment)
    if (action === "add_attachment") {
      const { topicId, attachment } = body;

      if (!topicId || !attachment || !attachment.title || !attachment.type) {
        return NextResponse.json(
          { error: "topicId, attachment type, and title are required." },
          { status: 400 }
        );
      }

      const existingTopic = await prisma.syllabusTopic.findUnique({
        where: { id: topicId },
      });

      if (!existingTopic) {
        return NextResponse.json({ error: "Topic not found." }, { status: 404 });
      }

      let currentAttachments: TopicAttachment[] = [];
      if (existingTopic.attachments) {
        try {
          currentAttachments = JSON.parse(existingTopic.attachments);
        } catch {
          currentAttachments = [];
        }
      }

      const newAttachment: TopicAttachment = {
        id: `att-${Date.now()}`,
        type: attachment.type,
        title: attachment.title,
        description: attachment.description || "",
        fileName:
          attachment.fileName ||
          `${attachment.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${attachment.type === "note" ? "pdf" : "pdf"}`,
        fileSize: attachment.fileSize || "250 KB",
        dueDate: attachment.dueDate,
        maxMarks: attachment.maxMarks ? Number(attachment.maxMarks) : undefined,
        downloadContent:
          attachment.downloadContent ||
          `TOPIC RESOURCE: ${attachment.title}\nTYPE: ${attachment.type.toUpperCase()}\nTEACHER INSTRUCTIONS: ${attachment.description || "Refer to lecture notes and complete all required questions."}\nDATE: ${new Date().toLocaleDateString()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };

      currentAttachments.push(newAttachment);

      const updatedTopic = await prisma.syllabusTopic.update({
        where: { id: topicId },
        data: {
          attachments: JSON.stringify(currentAttachments),
        },
      });

      return NextResponse.json({
        success: true,
        topic: {
          ...updatedTopic,
          attachments: currentAttachments,
        },
        attachment: newAttachment,
      });
    }

    // 3. ADD TOPIC TO ROADMAP ACTION
    const { roadmapId, chapterNumber, chapterName, topicName, estimatedHours } = body;

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
        chapterNumber: chapterNumber ? Number(chapterNumber) : existingCount + 1,
        chapterName: chapterName || `Chapter ${existingCount + 1}`,
        topicName,
        estimatedHours: Number(estimatedHours) || 2.0,
        status: "upcoming",
        attachments: JSON.stringify([]),
      },
    });

    await prisma.syllabusRoadmap.update({
      where: { id: roadmapId },
      data: { totalTopics: existingCount + 1 },
    });

    return NextResponse.json({
      success: true,
      topic: { ...newTopic, attachments: [] },
    });
  } catch (error: any) {
    console.error("Error in syllabus POST API:", error);
    return NextResponse.json(
      { error: "Failed to process syllabus request." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, topicId, status, completedDate, tutorNotes, homeworkAssigned, attachmentId } = body;

    if (!topicId) {
      return NextResponse.json({ error: "topicId is required." }, { status: 400 });
    }

    // REMOVE ATTACHMENT ACTION
    if (action === "remove_attachment") {
      const topic = await prisma.syllabusTopic.findUnique({
        where: { id: topicId },
      });

      if (!topic) {
        return NextResponse.json({ error: "Topic not found." }, { status: 404 });
      }

      let attachments: TopicAttachment[] = [];
      if (topic.attachments) {
        try {
          attachments = JSON.parse(topic.attachments);
        } catch {
          attachments = [];
        }
      }

      const updatedList = attachments.filter((a) => a.id !== attachmentId);

      const updatedTopic = await prisma.syllabusTopic.update({
        where: { id: topicId },
        data: { attachments: JSON.stringify(updatedList) },
      });

      return NextResponse.json({
        success: true,
        topic: { ...updatedTopic, attachments: updatedList },
      });
    }

    // REGULAR TOPIC UPDATE (status, notes, homework)
    const updatedTopic = await prisma.syllabusTopic.update({
      where: { id: topicId },
      data: {
        ...(status !== undefined && { status }),
        ...(completedDate !== undefined && { completedDate }),
        ...(tutorNotes !== undefined && { tutorNotes }),
        ...(homeworkAssigned !== undefined && { homeworkAssigned }),
      },
    });

    // Recalculate roadmap statistics
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

    let attachments: TopicAttachment[] = [];
    if (updatedTopic.attachments) {
      try {
        attachments = JSON.parse(updatedTopic.attachments);
      } catch {
        attachments = [];
      }
    }

    return NextResponse.json({
      success: true,
      topic: { ...updatedTopic, attachments },
    });
  } catch (error: any) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { error: "Failed to update syllabus topic." },
      { status: 500 }
    );
  }
}
