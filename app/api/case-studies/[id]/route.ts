import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    const body = await request.json();
    
    const updatedCaseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        title: body.title,
        type: body.type,
        challenge: body.challenge,
        solution: body.solution,
        results: JSON.stringify(body.results || []),
        image: body.image,
      }
    });
    
    return NextResponse.json({
      ...updatedCaseStudy,
      results: JSON.parse(updatedCaseStudy.results)
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    await prisma.caseStudy.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
  }
}
