import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    const body = await request.json();
    
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        quote: body.quote,
        author: body.author,
      }
    });
    
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    await prisma.testimonial.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
