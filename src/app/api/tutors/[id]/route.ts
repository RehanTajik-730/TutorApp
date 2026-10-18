import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_TUTORS } from "@/data/mockTutors";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    let t = null;
    try {
      t = await prisma.tutor.findUnique({
        where: { id },
        include: {
          bundles: true,
          reviews: true,
        },
      });
    } catch (e) {
      console.warn("DB findUnique failed, using mock fallback:", e);
    }

    if (!t) {
      const mock = MOCK_TUTORS.find((m) => m.id === id);
      if (mock) {
        return NextResponse.json({ success: true, tutor: mock });
      }
      return NextResponse.json({ error: "Tutor or institute not found." }, { status: 404 });
    }

    const tutor = {
      id: t.id,
      name: t.name,
      instituteName: t.instituteName || "Independent",
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
    };

    return NextResponse.json({ success: true, tutor });
  } catch (error: any) {
    console.error("Error fetching single tutor:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutor details." },
      { status: 500 }
    );
  }
}
