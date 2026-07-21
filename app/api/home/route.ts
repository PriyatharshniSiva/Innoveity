import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const homeContent = await prisma.homeContent.findUnique({
      where: { id: 1 },
    });

    if (!homeContent) {
      return NextResponse.json({ error: "Home content not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(homeContent.contentJson));
  } catch (error) {
    console.error("Error fetching home content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const homeContent = await prisma.homeContent.upsert({
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
    console.error("Error updating home content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
