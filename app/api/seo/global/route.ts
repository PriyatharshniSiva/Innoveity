import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const globalSeo = await (prisma as any).globalSeoSettings.findUnique({
      where: { id: 1 }
    });
    
    return NextResponse.json({ globalSeo: globalSeo || null });
  } catch (error) {
    console.error("Failed to fetch global SEO settings:", error);
    return NextResponse.json({ error: "Failed to fetch global SEO settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { websiteName, defaultTitle, defaultDescription, defaultOgImage, organizationLogo } = body;

    const globalSeo = await (prisma as any).globalSeoSettings.upsert({
      where: { id: 1 },
      update: {
        websiteName,
        defaultTitle,
        defaultDescription,
        defaultOgImage,
        organizationLogo
      },
      create: {
        id: 1,
        websiteName,
        defaultTitle,
        defaultDescription,
        defaultOgImage,
        organizationLogo
      }
    });

    return NextResponse.json(globalSeo);
  } catch (error) {
    console.error("Failed to save global SEO settings:", error);
    return NextResponse.json({ error: "Failed to save global SEO settings" }, { status: 500 });
  }
}
