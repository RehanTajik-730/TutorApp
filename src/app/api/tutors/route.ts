import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_TUTORS } from "@/data/mockTutors";

export async function GET(req: NextRequest) {
  try {
    let tutors: any[] = [];
    try {
      tutors = await prisma.tutor.findMany({
        include: {
          bundles: true,
          reviews: true,
        },
        orderBy: {
          rating: "desc",
        },
      });
    } catch (e) {
      console.warn("DB query failed, using mock tutors:", e);
    }

    if (!tutors || tutors.length === 0) {
      return NextResponse.json({ success: true, tutors: MOCK_TUTORS });
    }

    const parsedTutors = tutors.map((t) => ({
      id: t.id,
      providerType: (t.providerType as "tutor" | "institute") || "tutor",
      name: t.name,
      tagline: t.tagline,
      bio: t.bio,
      avatarUrl: t.avatarUrl,
      qualification: t.qualification,
      verifiedCnic: t.verifiedCnic,
      verifiedDegree: t.verifiedDegree,
      subjects: JSON.parse(t.subjects || "[]"),
      curricula: JSON.parse(t.curricula || "[]"),
      grades: JSON.parse(t.grades || "[]"),
      hourlyRatePKR: t.hourlyRatePKR,
      monthlyRatePKR: t.monthlyRatePKR,
      teachingModes: JSON.parse(t.teachingModes || "[]"),
      location: {
        city: t.city,
        area: t.area,
        lat: t.lat,
        lng: t.lng,
        maxTravelKm: t.maxTravelKm,
      },
      instituteBranches: JSON.parse(t.instituteBranches || "[]"),
      establishedYear: t.establishedYear ?? undefined,
      facultyCount: t.facultyCount ?? undefined,
      phone: t.phone ?? undefined,
      website: t.website ?? undefined,
      bundles: (t.bundles || []).map((b: any) => ({
        id: b.id,
        name: b.name,
        discountPercentage: b.discountPercentage,
        description: b.description,
        pricePerMonthPKR: b.pricePerMonthPKR,
      })),
      reviews: (t.reviews || []).map((r: any) => ({
        id: r.id,
        authorType: r.authorType as "parent" | "tutor" | "student",
        authorName: r.authorName,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
        verifiedHire: r.verifiedHire,
        criteria: {
          clarity: r.clarity ?? undefined,
          punctuality: r.punctuality ?? undefined,
          behavior: r.behavior ?? undefined,
          attentiveness: r.attentiveness ?? undefined,
        },
      })),
      studentReviewsGiven: [],
      rating: t.rating,
      totalStudentsTaught: t.totalStudentsTaught,
      syllabusCompletionRate: t.syllabusCompletionRate,
      responseSpeed: t.responseSpeed,
    }));

    return NextResponse.json({ success: true, tutors: parsedTutors });
  } catch (error: any) {
    console.error("Error fetching tutors:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutors from database." },
      { status: 500 }
    );
  }
}
