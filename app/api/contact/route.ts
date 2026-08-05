import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {
  try {
    const contactContent = await prisma.contactContent.findUnique({
      where: { id: 1 },
    });

    if (!contactContent) {
      return NextResponse.json({ error: "Contact content not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(contactContent.contentJson));
  } catch (error) {
    console.error("Error fetching contact content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const contactContent = await prisma.contactContent.upsert({
      where: { id: 1 },
      update: {
        contentJson: JSON.stringify(body),
      },
      create: {
        id: 1,
        contentJson: JSON.stringify(body),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating contact content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
