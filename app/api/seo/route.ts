import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    
    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 });
    }

    const seoSettings = await (prisma as any).seoSettings.findUnique({
      where: { page }
    });

    return NextResponse.json({ seoSettings: seoSettings || null });
  } catch (error) {
    console.error("Failed to fetch SEO settings:", error);
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, title, description, canonicalUrl, ogTitle, ogDescription, ogImage, indexPage, followLinks } = body;

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 });
    }

    const seoSettings = await (prisma as any).seoSettings.upsert({
      where: { page },
      update: {
        title,
        description,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogImage,
        indexPage,
        followLinks
      },
      create: {
        page,
        title,
        description,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogImage,
        indexPage,
        followLinks
      }
    });

    return NextResponse.json(seoSettings);
  } catch (error) {
    console.error("Failed to save SEO settings:", error);
    return NextResponse.json({ error: "Failed to save SEO settings" }, { status: 500 });
  }
}
