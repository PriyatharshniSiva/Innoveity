import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const csrContent = await prisma.cSRContent.findUnique({
      where: { id: 1 },
    });

    if (!csrContent) {
      return NextResponse.json({ error: "CSR content not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(csrContent.contentJson));
  } catch (error) {
    console.error("Error fetching CSR content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const csrContent = await prisma.cSRContent.upsert({
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
    console.error("Error updating CSR content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
