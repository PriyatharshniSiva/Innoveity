import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    const body = await request.json();
    
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title: body.title,
        desc: body.desc,
        image: body.image,
        level: body.level,
        duration: body.duration,
        mode: body.mode,
        instructor: body.instructor,
      }
    });
    
    return NextResponse.json({
      ...updatedCourse,
      features: JSON.parse(updatedCourse.features)
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    await prisma.course.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
