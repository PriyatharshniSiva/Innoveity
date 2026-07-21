import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const servicesContent = await prisma.servicesContent.findUnique({
      where: { id: 1 },
    });

    if (!servicesContent) {
      return NextResponse.json({ error: "Services content not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(servicesContent.contentJson));
  } catch (error) {
    console.error("Error fetching services content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const servicesContent = await prisma.servicesContent.upsert({
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
    console.error("Error updating services content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
