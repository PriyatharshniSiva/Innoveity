import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const themeSettings = await prisma.themeSettings.findUnique({
      where: { id: 1 },
    });

    if (!themeSettings) {
      return NextResponse.json({ error: "Theme settings not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(themeSettings.contentJson));
  } catch (error) {
    console.error("Error fetching theme settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const themeSettings = await prisma.themeSettings.upsert({
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
    console.error("Error updating theme settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
