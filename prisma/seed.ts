import { PrismaClient } from "@prisma/client";
import { MOCK_TUTORS } from "../src/data/mockTutors";
import { MOCK_SYLLABUS_ROADMAPS } from "../src/data/mockSyllabus";
import { MOCK_QUIZZES } from "../src/data/mockQuizzes";
import { MOCK_STUDENT_ANALYTICS } from "../src/data/mockAnalytics";
import { MOCK_PAST_PAPERS } from "../src/data/mockPastPapers";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Clean existing records
  await prisma.review.deleteMany();
  await prisma.bundlePackage.deleteMany();
  await prisma.hireContract.deleteMany();
  await prisma.tutor.deleteMany();
  await prisma.syllabusTopic.deleteMany();
  await prisma.syllabusRoadmap.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.academicScoreLog.deleteMany();
  await prisma.pastPaper.deleteMany();

  // 2. Seed Tutors with Bundles and Reviews
  for (const tut of MOCK_TUTORS) {
    const createdTutor = await prisma.tutor.create({
      data: {
        id: tut.id,
        name: tut.name,
        tagline: tut.tagline,
        bio: tut.bio,
        avatarUrl: tut.avatarUrl,
        qualification: tut.qualification,
        verifiedCnic: tut.verifiedCnic,
        verifiedDegree: tut.verifiedDegree,
        subjects: JSON.stringify(tut.subjects),
        curricula: JSON.stringify(tut.curricula),
        grades: JSON.stringify(tut.grades),
        hourlyRatePKR: tut.hourlyRatePKR,
        monthlyRatePKR: tut.monthlyRatePKR,
        teachingModes: JSON.stringify(tut.teachingModes),
        city: tut.location.city,
        area: tut.location.area,
        lat: tut.location.lat,
        lng: tut.location.lng,
        maxTravelKm: tut.location.maxTravelKm,
        rating: tut.rating,
        totalStudentsTaught: tut.totalStudentsTaught,
        syllabusCompletionRate: tut.syllabusCompletionRate,
        responseSpeed: tut.responseSpeed,
        bundles: {
          create: tut.bundles.map((b) => ({
            id: b.id,
            name: b.name,
            discountPercentage: b.discountPercentage,
            description: b.description,
            pricePerMonthPKR: b.pricePerMonthPKR,
          })),
        },
        reviews: {
          create: tut.reviews.map((r) => ({
            id: r.id,
            authorType: r.authorType,
            authorName: r.authorName,
            rating: r.rating,
            comment: r.comment,
            date: r.date,
            verifiedHire: r.verifiedHire,
            clarity: r.criteria?.clarity,
            punctuality: r.criteria?.punctuality,
            behavior: r.criteria?.behavior,
          })),
        },
      },
    });
    console.log(`Seeded tutor: ${createdTutor.name}`);
  }

  // 3. Seed Syllabus Roadmaps & Topics
  for (const rm of MOCK_SYLLABUS_ROADMAPS) {
    await prisma.syllabusRoadmap.create({
      data: {
        id: rm.id,
        studentName: rm.studentName,
        tutorName: rm.tutorName,
        subject: rm.subject,
        curriculum: rm.curriculum,
        targetExamDate: rm.targetExamDate,
        totalTopics: rm.topics.length,
        completedTopics: rm.topics.filter((t) => t.status === "completed").length,
        topics: {
          create: rm.topics.map((t) => ({
            id: t.id,
            chapterNumber: t.chapterNumber,
            chapterName: t.chapterName,
            topicName: t.topicName,
            estimatedHours: t.estimatedHours,
            status: t.status,
            completedDate: t.completedDate,
            tutorNotes: t.tutorNotes,
            homeworkAssigned: t.homeworkAssigned,
          })),
        },
      },
    });
    console.log(`Seeded roadmap for student: ${rm.studentName}`);
  }

  // 4. Seed Quizzes & Questions
  for (const q of MOCK_QUIZZES) {
    await prisma.quiz.create({
      data: {
        id: q.id,
        title: q.title,
        subject: q.subject,
        curriculum: q.curriculum,
        topic: q.topic,
        timeLimitMinutes: q.timeLimitMinutes,
        generatedFrom: q.generatedFrom,
        questions: {
          create: q.questions.map((qn) => ({
            id: qn.id,
            question: qn.question,
            options: JSON.stringify(qn.options),
            correctAnswerIndex: qn.correctAnswerIndex,
            explanation: qn.explanation,
            topicTag: qn.topicTag,
          })),
        },
      },
    });
    console.log(`Seeded quiz: ${q.title}`);
  }

  // 5. Seed Historical Academic Score Logs
  for (const log of MOCK_STUDENT_ANALYTICS.recentAssessments) {
    await prisma.academicScoreLog.create({
      data: {
        id: log.id,
        studentName: log.studentName,
        date: log.date,
        assessmentType: log.assessmentType,
        title: log.title,
        subject: log.subject,
        scorePercentage: log.scorePercentage,
        classAveragePercentage: log.classAveragePercentage,
        topicsTested: JSON.stringify(log.topicsTested),
      },
    });
  }

  // 6. Seed Past Papers
  for (const pp of MOCK_PAST_PAPERS) {
    await prisma.pastPaper.create({
      data: {
        id: pp.id,
        country: pp.country,
        category: pp.category,
        subCategory: pp.subCategory,
        subject: pp.subject,
        year: pp.year,
        session: pp.session,
        paperCode: pp.paperCode,
        hasMarkScheme: pp.hasMarkScheme,
        hasExaminerReport: pp.hasExaminerReport,
        fileSizeMb: pp.fileSizeMb,
        downloadUrl: pp.downloadUrl,
      },
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
