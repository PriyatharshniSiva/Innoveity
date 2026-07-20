import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const aboutData = await (prisma as any).aboutContent.findUnique({
      where: { id: 1 }
    });
    
    if (!aboutData) {
      return NextResponse.json({ data: null });
    }
    
    return NextResponse.json({ data: JSON.parse(aboutData.contentJson) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const upsertedData = await (prisma as any).aboutContent.upsert({
      where: { id: 1 },
      update: {
        contentJson: JSON.stringify(body)
      },
      create: {
        id: 1,
        contentJson: JSON.stringify(body)
      }
    });
    
    return NextResponse.json({ success: true, data: JSON.parse(upsertedData.contentJson) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}
