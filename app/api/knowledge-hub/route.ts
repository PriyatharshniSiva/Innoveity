import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.knowledgeArticle.findMany({
      orderBy: { id: "asc" }
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch knowledge articles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newArticle = await prisma.knowledgeArticle.create({
      data: {
        title: body.title,
        desc: body.desc,
        image: body.image || "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
        level: body.level || "GENERAL",
        nextBatch: body.nextBatch || new Date().toLocaleDateString(),
        instructor: body.instructor || "Guest Author"
      }
    });
    return NextResponse.json(newArticle);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create knowledge article" }, { status: 500 });
  }
}
