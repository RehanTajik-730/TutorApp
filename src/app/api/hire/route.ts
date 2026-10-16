import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tutorId, studentName, packageName, pricePerMonthPKR, scheduleDays } = body;

    if (!tutorId || !studentName) {
      return NextResponse.json(
        { error: "tutorId and studentName are required." },
        { status: 400 }
      );
    }

    const tutor = await prisma.tutor.findUnique({
      where: { id: tutorId },
    });

    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found." }, { status: 404 });
    }

    // 1. Create Hire Contract
    const contract = await prisma.hireContract.create({
      data: {
        tutorId,
        studentName,
        packageName: packageName || "Standard Individual Package",
        pricePerMonthPKR: Number(pricePerMonthPKR) || tutor.monthlyRatePKR,
        scheduleDays: JSON.stringify(scheduleDays || ["Mon", "Wed", "Fri"]),
        status: "ACTIVE",
      },
    });

    // 2. Ensure Syllabus Roadmap exists for this student & tutor
    const curriculaParsed = JSON.parse(tutor.curricula || "[]");
    const subjectsParsed = JSON.parse(tutor.subjects || "[]");

    let roadmap = await prisma.syllabusRoadmap.findFirst({
      where: {
        studentName,
        tutorName: tutor.name,
      },
    });

    if (!roadmap) {
      roadmap = await prisma.syllabusRoadmap.create({
        data: {
          studentName,
          tutorName: tutor.name,
          subject: subjectsParsed[0] || "General Academic",
          curriculum: curriculaParsed[0] || "CAIE O Level",
          targetExamDate: "May/June 2025",
          totalTopics: 1,
          completedTopics: 0,
          topics: {
            create: [
              {
                chapterNumber: 1,
                chapterName: "Foundations & Diagnostic Review",
                topicName: "Initial diagnostic review and core principles recap",
                estimatedHours: 2.0,
                status: "in_progress",
                tutorNotes: `Contract initialized with ${tutor.name}. Starting first session.`,
              },
            ],
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      contract,
      roadmapId: roadmap.id,
      message: `Successfully hired ${tutor.name}. Syllabus roadmap initialized.`,
    });
  } catch (error: any) {
    console.error("Error creating hire contract:", error);
    return NextResponse.json(
      { error: "Failed to create hire contract." },
      { status: 500 }
    );
  }
}
