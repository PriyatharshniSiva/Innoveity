import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const caseStudiesData = await prisma.caseStudy.findMany({
      orderBy: { id: "asc" }
    });
    
    const testimonialsData = await prisma.testimonial.findMany({
      orderBy: { id: "asc" }
    });

    const parsedCaseStudies = caseStudiesData.map(cs => ({
      ...cs,
      results: JSON.parse(cs.results)
    }));

    return NextResponse.json({
      caseStudies: parsedCaseStudies,
      partnerQuotes: testimonialsData
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCaseStudy = await prisma.caseStudy.create({
      data: {
        title: body.title,
        type: body.type || "Communities",
        challenge: body.challenge || "",
        solution: body.solution || "",
        results: JSON.stringify(body.results || []),
        image: body.image || "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
        order: body.order || 1
      }
    });
    
    return NextResponse.json({
      ...newCaseStudy,
      results: JSON.parse(newCaseStudy.results)
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}
