import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { id: "desc" }
    });
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTestimonial = await prisma.testimonial.create({
      data: {
        quote: body.quote,
        author: body.author,
      }
    });
    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
